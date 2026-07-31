import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "inSAKE — Certify, Upskill, Grow";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoData = await readFile(join(process.cwd(), "public/insake-logo.png"), "base64");
  const logoSrc = `data:image/png;base64,${logoData}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f2fc",
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(124,58,237,0.35), transparent 45%), radial-gradient(circle at 85% 75%, rgba(232,121,249,0.3), transparent 45%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={140} height={140} alt="" />
        <div
          style={{
            marginTop: 36,
            fontSize: 64,
            fontWeight: 700,
            color: "#17152a",
            display: "flex",
          }}
        >
          inSAKE Academy
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 30,
            color: "#6b6b83",
            display: "flex",
          }}
        >
          Certify. Upskill. Grow.
        </div>
      </div>
    ),
    { ...size }
  );
}
