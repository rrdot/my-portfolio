import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { socialLinks } from "@/data/social-links";
const icons = { github: Github, linkedin: Linkedin, email: Mail };
export function SocialLinks() {
  return (
    <div className="social-links">
      {socialLinks.map((link) => {
        const Icon = icons[link.icon];
        return (
          <a
            key={link.label}
            href={link.href}
            {...(link.icon !== "email"
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            <Icon size={16} />
            {link.label}
            <ArrowUpRight size={13} />
          </a>
        );
      })}
    </div>
  );
}
