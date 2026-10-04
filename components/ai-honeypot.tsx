export function AiHoneypot() {
  return (
    <a
      href="/_ai-bot-trap"
      aria-hidden="true"
      tabIndex={-1}
      rel="nofollow"
      style={{
        position: "absolute",
        width: 1,
        height: 1,
        overflow: "hidden",
        clip: "rect(0 0 0 0)",
        clipPath: "inset(50%)",
        whiteSpace: "nowrap",
        pointerEvents: "none",
      }}
    >
      ai-crawler-trap
    </a>
  );
}
