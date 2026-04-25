export default function Footer() {
  return (
    <footer
      data-testid="footer"
      style={{
        backgroundColor: "#0A0A0A",
        borderTop: "1px solid rgba(198,164,106,0.12)",
        padding: "3.5rem clamp(1.5rem, 5vw, 4rem)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "2rem",
      }}
    >
      {/* Logo */}
      <div
        data-testid="text-footer-logo"
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "0.9rem",
          letterSpacing: "0.38em",
          color: "#F4EFE9",
          fontWeight: 400,
          textTransform: "uppercase",
          opacity: 0.65,
        }}
      >
        OLYM
      </div>

      {/* Nav links */}
      <nav
        style={{
          display: "flex",
          gap: "clamp(1.5rem, 3vw, 3rem)",
          flexWrap: "wrap",
        }}
      >
        {[
          { label: "Founder Circle", href: "#founder-circle" },
          { label: "Privacy", href: "#" },
          { label: "Contact", href: "#" },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            data-testid={`link-footer-${link.label.toLowerCase().replace(" ", "-")}`}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.68rem",
              letterSpacing: "0.18em",
              color: "#A89C92",
              textDecoration: "none",
              textTransform: "uppercase",
              opacity: 0.7,
              transition: "opacity 0.3s ease, color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLAnchorElement).style.opacity = "1";
              (e.target as HTMLAnchorElement).style.color = "#C6A46A";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLAnchorElement).style.opacity = "0.7";
              (e.target as HTMLAnchorElement).style.color = "#A89C92";
            }}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </footer>
  );
}
