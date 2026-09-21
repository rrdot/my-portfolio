import { personal } from "./personal";
import type { SocialLink } from "@/types";
export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: personal.github, icon: "github" },
  { label: "LinkedIn", href: personal.linkedin, icon: "linkedin" },
  { label: "Email", href: `mailto:${personal.email}`, icon: "email" },
].filter((link): link is SocialLink => Boolean(link.href));
