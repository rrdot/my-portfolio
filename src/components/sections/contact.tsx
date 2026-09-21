import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { personal } from "@/data/personal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SocialLinks } from "@/components/ui/social-links";
import { ContactForm } from "./contact-form";
export function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <div className="container contact-layout">
        <div>
          <SectionHeading
            number="06"
            eyebrow="LET’S CONNECT"
            title="Interested in working together?"
            description="Have a project in mind or just want to say hello? Use this space to invite visitors to get in touch."
          />
          <a href={`mailto:${personal.email}`} className="contact-email">
            <Mail size={19} />
            {personal.email}
            <ArrowUpRight size={18} />
          </a>
          <p className="contact-location">
            <MapPin size={16} />
            {personal.location}
          </p>
          <SocialLinks />
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
