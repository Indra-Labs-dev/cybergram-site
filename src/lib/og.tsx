import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const font = (f: string) => readFile(join(process.cwd(), "src/assets/fonts", f));

// Image de partage générée au build (export statique) : terminal sobre aux couleurs du site.
export async function ogImage({ eyebrow, title, accent = "teal", cmd }: { eyebrow: string; title: string; accent?: "teal" | "amber"; cmd: string }) {
  const color = accent === "amber" ? "#FF9F2E" : "#2FE6B8";
  const [regular, bold] = await Promise.all([font("JetBrainsMono-Regular.ttf"), font("JetBrainsMono-Bold.ttf")]);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#06090B", padding: 72, fontFamily: "JetBrains Mono", color: "#F4F8F7", borderTop: `6px solid ${color}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 22, letterSpacing: 2, color }}>
          <div style={{ width: 40, height: 2, background: color }} />
          {eyebrow.toUpperCase()}
        </div>
        <div style={{ display: "flex", fontSize: 68, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2, maxWidth: 1000 }}>{title}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24, color: "#8A9894" }}>
          <div style={{ display: "flex" }}><span style={{ color: "#5F6D69" }}>~/cybergram $&nbsp;</span><span style={{ color: "#D3DCDA" }}>{cmd}</span><span style={{ width: 14, height: 28, marginLeft: 6, background: color }} /></div>
          <div style={{ display: "flex", fontWeight: 700, color: "#F4F8F7" }}>cybergram<span style={{ color }}>.dev</span></div>
        </div>
      </div>
    ),
    { ...ogSize, fonts: [{ name: "JetBrains Mono", data: regular, weight: 400 }, { name: "JetBrains Mono", data: bold, weight: 700 }] },
  );
}
