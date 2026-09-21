import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Download,
  MapPin,
  Code2,
  Check,
  GitBranch,
} from "lucide-react";
import { personal } from "@/data/personal";
import { SocialLinks } from "@/components/ui/social-links";
export function Hero() {
  return (
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero-copy">
        <div className="availability">
          <span /> Available for new projects
        </div>
        <p className="hero-intro">HELLO, I’M {personal.name.toUpperCase()}</p>
        <h1 id="hero-title">
          Web
          <br />
          <span>Developer</span>
          <span className="heading-dot">.</span>
        </h1>
        <p className="hero-description">{personal.hero}</p>
        <div className="hero-buttons">
          <a className="button primary" href="#projects">
            View my work <ArrowUpRight size={18} />
          </a>
          <a className="button secondary" href="#experience">
            View experience <ArrowRight size={17} />
          </a>
        </div>
        <div className="hero-secondary">
          <a href={personal.resume} download>
            <Download size={15} /> Download resume
          </a>
          <span />
          <a href="#contact">
            Contact me <ArrowUpRight size={14} />
          </a>
        </div>
        <div className="hero-location">
          <MapPin size={15} />
          {personal.location}
          <span className="location-divider" />
          Open to collaboration
        </div>
      </div>
      <div className="hero-visual" aria-hidden="true">
        <div className="visual-grid" />
        <div className="code-card">
          <div className="code-toolbar">
            <div className="window-dots">
              <i />
              <i />
              <i />
            </div>
            <span>developer.ts</span>
            <Code2 size={15} />
          </div>
          <div className="code-body">
            <div className="code-line">
              <span className="ln">01</span>
              <span className="comment">{"// A little about how I work"}</span>
            </div>
            <div className="code-line">
              <span className="ln">02</span>
              <span>
                <b>const</b> developer = {"{"}
              </span>
            </div>
            <div className="code-line">
              <span className="ln">03</span>
              <span>
                {" "}
                name: <em>&quot;{personal.name}&quot;</em>,
              </span>
            </div>
            <div className="code-line">
              <span className="ln">04</span>
              <span> focus: [</span>
            </div>
            <div className="code-line">
              <span className="ln">05</span>
              <span>
                {" "}
                <em>&quot;Creative development&quot;</em>,
              </span>
            </div>
            <div className="code-line">
              <span className="ln">06</span>
              <span>
                {" "}
                <em>&quot;Thoughtful experiences&quot;</em>,
              </span>
            </div>
            <div className="code-line">
              <span className="ln">07</span>
              <span>
                {" "}
                <em>&quot;Continuous learning&quot;</em>
              </span>
            </div>
            <div className="code-line">
              <span className="ln">08</span>
              <span> ],</span>
            </div>
            <div className="code-line">
              <span className="ln">09</span>
              <span>
                {" "}
                mindset: <em>&quot;Build. Learn. Improve.&quot;</em>
              </span>
            </div>
            <div className="code-line">
              <span className="ln">10</span>
              <span>{"};"}</span>
            </div>
            <div className="code-line">
              <span className="ln">11</span>
              <span />
            </div>
            <div className="code-line">
              <span className="ln">12</span>
              <span className="comment">
                {"// Good software is a work in progress."}
              </span>
            </div>
          </div>
          <div className="code-status">
            <span>
              <GitBranch size={13} /> main
            </span>
            <span>
              <span className="green-dot" /> Always improving
            </span>
            <span>TypeScript</span>
          </div>
        </div>
        <div className="quality-note">
          <span className="quality-icon">
            <Check size={17} />
          </span>
          <div>
            Built with intention.<small>Maintainable. Tested. Reliable.</small>
          </div>
          <span className="note-spark">✳</span>
        </div>
        <div className="visual-caption">
          <span /> THOUGHTFUL CODE. DEPENDABLE SOFTWARE.
        </div>
      </div>
      <div className="hero-bottom">
        <SocialLinks />
        <a href="#about">
          A little more about me <ArrowDown size={14} />
        </a>
      </div>
    </section>
  );
}
