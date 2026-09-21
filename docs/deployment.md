# DigitalOcean deployment

## Option 1: Ubuntu Droplet + Docker

Create an Ubuntu LTS Droplet sized for a Next.js build (2 GB RAM or more is a practical starting point). Add your SSH public key, create a non-root administrative user, and connect using your actual host: `ssh deploy@YOUR_DROPLET_HOST`. This guide does not create or pay for infrastructure.

Allow SSH, HTTP, and HTTPS in the DigitalOcean firewall. Do not expose port 3000 publicly. Point your domain's A record to the Droplet's public IPv4 address; add an AAAA record only if IPv6 is configured. Point `www` to the same host if you want it served.

### Install Docker and Git

On a fresh Ubuntu host, use Docker's official apt repository. If Docker is already installed from another source, follow the conflict-removal steps in the [official Ubuntu installation guide](https://docs.docker.com/engine/install/ubuntu/) first.

```bash
sudo apt-get update
sudo apt-get install -y ca-certificates curl git nginx
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
sudo tee /etc/apt/sources.list.d/docker.sources > /dev/null <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: $(. /etc/os-release && echo "$VERSION_CODENAME")
Components: stable
Architectures: $(dpkg --print-architecture)
Signed-By: /etc/apt/keyrings/docker.asc
EOF
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo systemctl enable --now docker
sudo docker run --rm hello-world
```

Commands use `sudo docker` so adding a user to the root-equivalent Docker group is unnecessary.

### Clone, configure, and start

Replace the repository URL with your published repository; none is assumed to exist.

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git portfolio
cd portfolio
cp .env.example .env
chmod 600 .env
nano .env
```

Set `NEXT_PUBLIC_SITE_URL=https://yourdomain.com`. Configure optional Resend values on this server only. Then:

```bash
sudo docker compose build --pull
sudo docker compose up -d
sudo docker compose ps
curl --fail http://127.0.0.1:3000/api/health
sudo docker compose logs --tail=100
```

Build-time `NEXT_PUBLIC_SITE_URL` and runtime origin must match. Never pass private keys as Docker build arguments. For very small Droplets, build in CI and pull the resulting image instead of compiling on the server.

### Nginx reverse proxy

```bash
sudo cp docs/nginx.conf /etc/nginx/sites-available/portfolio
sudo nano /etc/nginx/sites-available/portfolio
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/portfolio
sudo nginx -t
sudo systemctl reload nginx
```

Replace both placeholder domain names in the Nginx file. If using a host firewall, allow SSH before enabling it and allow Nginx traffic:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

The supplied config forwards traffic to loopback, disables response buffering for streaming, caps request sizes, and rate-limits the contact route. It lives in Nginx's `http` context through Ubuntu's `sites-enabled` inclusion. Review other enabled sites if a default virtual host handles your domain unexpectedly.

### HTTPS with Certbot and Let's Encrypt

Wait for DNS to resolve correctly and ensure ports 80 and 443 are reachable. On a fresh host, install Certbot using the [official Nginx instructions](https://certbot.eff.org/instructions?os=snap&ws=nginx):

```bash
sudo apt-get install -y snapd
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
sudo certbot renew --dry-run
```

If Certbot or the symlink already exists, use the existing installation rather than duplicating it. Omit `www` if you have not configured its DNS. Follow the prompt to enable HTTP-to-HTTPS redirection. Certbot modifies Nginx and keeps certificates under `/etc/letsencrypt` on the server. Never copy certificates or private keys into the repository or image. Verify the automatic renewal timer. Redirect the alternate hostname to the canonical one so the contact form origin matches.

```bash
sudo nginx -t
sudo systemctl reload nginx
curl --fail https://yourdomain.com/api/health
```

### Update and operate

```bash
git pull --ff-only
sudo docker compose build --pull
sudo docker compose up -d
sudo docker compose ps
sudo docker compose logs -f --tail=100
```

Rebuilds complete before Compose replaces the existing container; a single-container deployment still has a short replacement interruption. Use immutable image tags and retain the prior image for rollback. For a failed release, check out the previous known-good commit and rebuild, or redeploy its registry tag.

```bash
sudo docker compose restart
sudo docker compose stop
sudo docker compose start
sudo docker compose down
```

These respectively restart, stop, start, and remove the service container. There is no application database to migrate. Preserve your private env file and server configuration. Patch Ubuntu, update dependencies/base images, monitor logs, and check health after every release.

## Option 2: DigitalOcean App Platform

App Platform can build from a Git repository containing this Dockerfile or run a pushed container image. See DigitalOcean's [deployment examples](https://docs.digitalocean.com/products/app-platform/getting-started/deploy-sample-apps/) and [container-image deployment instructions](https://docs.digitalocean.com/products/app-platform/how-to/deploy-from-container-images/).

1. Create an app and connect the repository, or select the container registry and image tag.
2. For source builds, select this Dockerfile and set `NEXT_PUBLIC_SITE_URL` at build and runtime scope. For images, build the image with that public URL before pushing it.
3. Configure HTTP port **3000** and health-check path **`/api/health`**. Keep the Dockerfile start command (`node server.js`); a custom run command would override it.
4. Add `RESEND_API_KEY`, `CONTACT_EMAIL`, and `CONTACT_FROM` as encrypted runtime variables if enabling email. No private build-time variables are necessary.
5. Connect the domain and use App Platform's managed HTTPS. Ensure the primary domain matches the built canonical URL; rebuild after changing it.
6. Configure edge request/rate protection if enabling contact mail across multiple replicas. The built-in process limit is not a distributed rate limiter.

Nginx and Certbot are unnecessary on App Platform. No filesystem persistence is required; contact submissions are sent directly to the provider. Outbound HTTPS must be allowed. Images or documents should be committed as public assets or hosted externally, not uploaded into the running container.

## Registry workflow

Build once for the production origin, then tag and push to your chosen registry. Examples are placeholders; use your own registry path and an immutable release identifier.

```bash
docker build --build-arg NEXT_PUBLIC_SITE_URL=https://yourdomain.com -t personal-portfolio:RELEASE .
docker tag personal-portfolio:RELEASE registry.digitalocean.com/YOUR_REGISTRY/portfolio:RELEASE
docker push registry.digitalocean.com/YOUR_REGISTRY/portfolio:RELEASE
```

Authenticate first using your registry's recommended credential flow. Equivalent destinations include `ghcr.io/YOUR_USERNAME/portfolio:RELEASE` and `YOUR_DOCKERHUB_USERNAME/portfolio:RELEASE`. Build for the target host architecture, using Buildx if the build host differs. Keep authentication out of the Dockerfile. GitHub Actions credentials belong in GitHub Secrets and production deployments should use protected environments.
