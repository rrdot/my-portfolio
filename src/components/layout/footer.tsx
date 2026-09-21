import { personal } from "@/data/personal";
import { SocialLinks } from "@/components/ui/social-links";
export function Footer() {
  return (
    <footer className="container footer">
      <div>
        <a href="#top" className="footer-name">
          {personal.name}
          <span className="brand-dot">.</span>
        </a>
        <p>
          {personal.title} · {personal.location}
        </p>
      </div>
      <SocialLinks />
      <div className="footer-meta">
        <span>
          © {new Date().getFullYear()} {personal.name}
        </span>
        <span>
          Built with Next.js <span className="tiny-dot" /> Crafted with care.
        </span>
      </div>
    </footer>
  );
}
