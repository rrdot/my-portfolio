import { ImageResponse } from "next/og";
import { personal } from "@/data/personal";
export const alt = `${personal.name} — ${personal.title} portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#f8f9f5",
        color: "#232b28",
        padding: "80px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", fontSize: 28 }}>
        {personal.name} · {personal.location}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ fontSize: 88, letterSpacing: -5, display: "flex" }}>
          {personal.title}
          <span style={{ color: "#4265d6" }}>.</span>
        </div>
        <div style={{ display: "flex", fontSize: 27, color: "#59665e" }}>
          Thoughtful code. Dependable software.
        </div>
      </div>
      <div style={{ fontSize: 20, display: "flex", color: "#4265d6" }}>
        Design / Development / Creative projects
      </div>
    </div>,
    size,
  );
}
