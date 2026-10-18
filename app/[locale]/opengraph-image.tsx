import { ImageResponse } from "next/og";

// Image de partage (Open Graph / Twitter). Rendue a la demande via `next/og` :
// pas de fichier binaire a maintenir, et le rendu suit toujours le branding.
export const runtime = "edge";

export const alt = "TCF Simulator — entraînement au TCF en conditions réelles";

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

const CHIPS = ["Correction détaillée", "Niveau CECRL estimé", "Chronomètre officiel"];

export default function OpengraphImage(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #0B2A6B 0%, #1E4BB3 58%, #2C63D6 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -140,
            right: -100,
            width: 520,
            height: 520,
            borderRadius: 9999,
            display: "flex",
            background:
              "radial-gradient(closest-side, rgba(240,139,30,0.5), rgba(240,139,30,0) 72%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 72,
              borderRadius: 20,
              background: "#ffffff",
              color: "#1E4BB3",
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            TCF
          </div>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 700, letterSpacing: -0.5 }}>
            TCF Simulator
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              fontSize: 66,
              fontWeight: 800,
              lineHeight: 1.06,
              letterSpacing: -1.5,
              maxWidth: 960,
            }}
          >
            Entraînez-vous au TCF en conditions réelles
          </div>
          <div style={{ display: "flex", fontSize: 32, color: "rgba(255,255,255,0.85)" }}>
            5 tests blancs · 8 séries d’écoute · 370 questions corrigées
          </div>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {CHIPS.map((label) => (
            <div
              key={label}
              style={{
                display: "flex",
                padding: "12px 26px",
                borderRadius: 9999,
                background: "rgba(255,255,255,0.14)",
                border: "1px solid rgba(255,255,255,0.28)",
                fontSize: 26,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
