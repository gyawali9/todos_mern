export const Background = () => (
  <>
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
        pointerEvents: "none",
      }}
    />
    <div
      style={{
        position: "fixed",
        top: "-10%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "600px",
        height: "400px",
        background:
          "radial-gradient(ellipse, rgba(99, 102, 241, 0.12) 0%, transparent 70%)",
        pointerEvents: "none",
        filter: "blur(40px)",
      }}
    />
  </>
);
