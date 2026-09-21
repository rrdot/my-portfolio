import {
  Blocks,
  Check,
  Code2,
  Database,
  FileCode2,
  Layers,
  Monitor,
  Shirt,
} from "lucide-react";
import type { Project } from "@/types";
export function ProjectVisual({ visual }: { visual: Project["visual"] }) {
  return (
    <div className={`project-visual visual-${visual}`} aria-hidden="true">
      <div className="project-grid-pattern" />
      {visual === "shop" ? (
        <div className="shop-art">
          <div className="art-top">
            <span />
            <span />
            <span />
            <i />
          </div>
          <div className="shop-body">
            <div className="shop-sidebar">
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="shop-main">
              <span className="art-label">SAMPLE STORE</span>
              <div className="shop-items">
                <div>
                  <Shirt size={42} strokeWidth={1} />
                </div>
                <div>
                  <Shirt size={34} strokeWidth={1} />
                </div>
                <div>
                  <Shirt size={30} strokeWidth={1} />
                </div>
              </div>
              <div className="art-lines">
                <i />
                <i />
              </div>
            </div>
          </div>
          <span className="art-floating">
            <Layers size={14} /> Sample storefront
          </span>
        </div>
      ) : visual === "system" ? (
        <div className="system-art">
          <div className="system-node">
            <Monitor size={22} />
            <span>Interface</span>
          </div>
          <div className="system-connection" />
          <div className="system-node main-node">
            <Blocks size={25} />
            <span>REST API</span>
          </div>
          <div className="system-connection" />
          <div className="system-node">
            <Database size={22} />
            <span>Database</span>
          </div>
          <div className="system-caption">CONNECTED BY DESIGN</div>
        </div>
      ) : (
        <div className="website-art">
          <div className="website-window">
            <div className="website-header">
              <FileCode2 size={14} /> index.html <span>●</span>
            </div>
            <div className="website-code">
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="website-check">
              <Check size={13} /> Design · Build · Explore
            </div>
          </div>
          <div className="website-chip">
            <Code2 size={29} />
            <span>JS</span>
          </div>
        </div>
      )}
      <span className="concept-label">CONCEPTUAL ILLUSTRATION</span>
    </div>
  );
}
