import { Link } from "wouter";

const sectionStyle = {
  marginBottom: "3.5rem",
};

const headingStyle = {
  fontFamily: "'Cormorant Garamond', Georgia, serif",
  fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)",
  fontWeight: 400,
  fontStyle: "italic",
  color: "#F4EFE9",
  marginBottom: "1.25rem",
  letterSpacing: "0.02em",
};

const bodyStyle = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.95rem",
  lineHeight: 1.9,
  color: "#B8AEA5",
  fontWeight: 300 as const,
};

export default function Privacy() {
  return (
    <main
      style={{
        background:
          "radial-gradient(circle at top, rgba(59,7,10,0.22), transparent 45%), #0A0A0A",
        minHeight: "100dvh",
        width: "100%",
        padding: "clamp(3rem, 7vw, 7rem) clamp(1.5rem, 6vw, 5rem)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: "820px" }}>
        <div style={{ marginBottom: "5rem", textAlign: "center" }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.68rem",
              letterSpacing: "0.34em",
              color: "#C6A46A",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
              opacity: 0.8,
            }}
          >
            Legal
          </p>

          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              fontWeight: 300,
              lineHeight: 1,
              letterSpacing: "0.02em",
              color: "#F4EFE9",
              fontStyle: "italic",
              marginBottom: "2rem",
            }}
          >
            Privacy Policy
          </h1>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.95rem",
              lineHeight: 1.9,
              color: "#9D9187",
              maxWidth: "620px",
              margin: "0 auto",
              fontWeight: 300,
            }}
          >
            This Privacy Policy explains how OLYM SKIN collects, uses, protects,
            and manages information provided through our website, applications,
            Founder Circle experiences, communications, and purchases.
          </p>
        </div>

        <div
          style={{
            border: "1px solid rgba(198,164,106,0.16)",
            background: "rgba(255,255,255,0.015)",
            backdropFilter: "blur(12px)",
            borderRadius: "28px",
            padding: "clamp(2rem, 5vw, 4rem)",
          }}
        >
          <section style={sectionStyle}>
            <h2 style={headingStyle}>Information We Collect</h2>
            <p style={bodyStyle}>
              OLYM SKIN may collect personal information you provide directly,
              including your name, email address, phone number, shipping address,
              billing details, application responses, membership information,
              purchase history, and communication preferences.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>How We Use Information</h2>
            <p style={bodyStyle}>
              We use collected information to process applications, manage
              Founder Circle membership, fulfill purchases, provide customer
              support, send brand communications, improve our website, protect
              against fraud, and deliver relevant product or membership
              experiences.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>Payments</h2>
            <p style={bodyStyle}>
              Payment information is processed through third-party payment
              processors. OLYM SKIN does not directly store full credit card
              numbers. Payment processors may collect and process information
              according to their own privacy and security policies.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>Email & SMS Communications</h2>
            <p style={bodyStyle}>
              By providing your contact information, you may receive transactional
              messages, membership updates, application notices, product updates,
              launch communications, or promotional messages from OLYM SKIN.
              You may unsubscribe from promotional communications where
              available, though certain transactional messages may still be sent.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>Cookies & Analytics</h2>
            <p style={bodyStyle}>
              Our website may use cookies, pixels, analytics tools, and similar
              technologies to understand website performance, visitor behavior,
              campaign effectiveness, and user experience. You may adjust cookie
              settings through your browser.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>Sharing of Information</h2>
            <p style={bodyStyle}>
              OLYM SKIN may share limited information with trusted service
              providers who help operate the website, process payments, fulfill
              orders, manage communications, host communities, analyze
              performance, or prevent fraud. We do not sell your personal
              information.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>Data Security</h2>
            <p style={bodyStyle}>
              We take reasonable measures to protect personal information.
              However, no online system, website, payment processor, or digital
              platform can be guaranteed completely secure. You are responsible
              for keeping account credentials and access information private.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>Your Choices</h2>
            <p style={bodyStyle}>
              You may request updates, corrections, or deletion of certain
              personal information by contacting OLYM SKIN. Some information may
              be retained where required for legal, tax, fraud prevention,
              dispute resolution, security, or business record purposes.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>Children’s Privacy</h2>
            <p style={bodyStyle}>
              OLYM SKIN is not intended for children under 13. We do not
              knowingly collect personal information from children under 13. If
              we become aware that such information has been collected, we will
              take reasonable steps to delete it.
            </p>
          </section>

          <section style={{ ...sectionStyle, marginBottom: 0 }}>
            <h2 style={headingStyle}>Contact</h2>
            <p style={bodyStyle}>
              Questions about this Privacy Policy may be directed to{" "}
              <a
                href="mailto:support@olymskin.com"
                style={{
                  color: "#C6A46A",
                  textDecoration: "none",
                }}
              >
                support@olymskin.com
              </a>
              .
            </p>
          </section>
        </div>

        <div style={{ marginTop: "3rem", textAlign: "center" }}>
          <Link
            href="/"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.7rem",
              letterSpacing: "0.24em",
              color: "#9D9187",
              textDecoration: "none",
              textTransform: "uppercase",
              opacity: 0.7,
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.opacity = "1";
              el.style.color = "#C6A46A";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.opacity = "0.7";
              el.style.color = "#9D9187";
            }}
          >
            ← Back to OLYM
          </Link>
        </div>
      </div>
    </main>
  );
}