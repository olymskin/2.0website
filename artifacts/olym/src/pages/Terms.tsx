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

export default function Terms() {
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
      <div
        style={{
          width: "100%",
          maxWidth: "820px",
        }}
      >
        {/* Top */}
        <div
          style={{
            marginBottom: "5rem",
            textAlign: "center",
          }}
        >
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
            Terms of Service
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
            These Terms of Service govern access to and participation in OLYM
            SKIN, including Founder Circle membership, digital experiences,
            product purchases, and related services.
          </p>
        </div>

        {/* Content Card */}
        <div
          style={{
            border: "1px solid rgba(198,164,106,0.16)",
            background: "rgba(255,255,255,0.015)",
            backdropFilter: "blur(12px)",
            borderRadius: "28px",
            padding: "clamp(2rem, 5vw, 4rem)",
          }}
        >
          {/* Acceptance */}
          <section style={sectionStyle}>
            <h2 style={headingStyle}>Acceptance of Terms</h2>

            <p style={bodyStyle}>
              By accessing this website, submitting an application, purchasing
              products, joining Founder Circle, or interacting with OLYM SKIN
              services, you agree to these Terms of Service and all applicable
              policies referenced herein.
            </p>
          </section>

          {/* Founder Circle */}
          <section style={sectionStyle}>
            <h2 style={headingStyle}>Founder Circle Membership</h2>

            <p style={bodyStyle}>
              Founder Circle is a limited private founding membership experience
              offered by OLYM SKIN. Membership availability may be capped,
              modified, paused, or discontinued at any time.
              <br />
              <br />
              Founder Circle benefits may include product samples, early access,
              development updates, private community participation, events,
              educational materials, and future member offerings. Certain
              benefits may evolve over time as the brand develops.
            </p>
          </section>

          {/* Payments */}
          <section style={sectionStyle}>
            <h2 style={headingStyle}>Payments & Billing</h2>

            <p style={bodyStyle}>
              By submitting payment, you authorize OLYM SKIN and its payment
              processors to charge your selected payment method for all approved
              purchases, memberships, taxes, shipping fees, or related charges.
              <br />
              <br />
              Prices, availability, and membership structures may change without
              prior notice.
            </p>
          </section>

          {/* Refunds */}
          <section style={sectionStyle}>
            <h2 style={headingStyle}>Refund Policy</h2>

            <p style={bodyStyle}>
              Founder Circle payments are considered final once membership
              access, onboarding materials, digital access, or member benefits
              have been delivered.
              <br />
              <br />
              Due to the limited and developmental nature of Founder Circle,
              refunds may not be issued for dissatisfaction, unused access,
              preference changes, or evolving product timelines.
              <br />
              <br />
              If you believe your payment was submitted in error, you must
              contact OLYM SKIN within 48 hours of purchase at{" "}
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

          {/* Products */}
          <section style={sectionStyle}>
            <h2 style={headingStyle}>Product Disclaimer</h2>

            <p style={bodyStyle}>
              OLYM SKIN products are cosmetic products and are not intended to
              diagnose, treat, cure, or prevent any medical condition.
              Individual skin responses and results may vary.
              <br />
              <br />
              Customers are responsible for reviewing ingredient information and
              discontinuing use if irritation occurs.
            </p>
          </section>

          {/* Conduct */}
          <section style={sectionStyle}>
            <h2 style={headingStyle}>Community Conduct</h2>

            <p style={bodyStyle}>
              OLYM SKIN reserves the right to suspend or remove access to
              Founder Circle, private communities, digital experiences, or brand
              events if behavior is determined to be abusive, fraudulent,
              threatening, exploitative, or harmful to the brand or its members.
            </p>
          </section>

          {/* IP */}
          <section style={sectionStyle}>
            <h2 style={headingStyle}>Intellectual Property</h2>

            <p style={bodyStyle}>
              All OLYM SKIN branding, imagery, visuals, copy, packaging,
              concepts, videos, trademarks, and creative materials are protected
              intellectual property and may not be reproduced, distributed, or
              used without written permission.
            </p>
          </section>

          {/* Liability */}
          <section style={sectionStyle}>
            <h2 style={headingStyle}>Limitation of Liability</h2>

            <p style={bodyStyle}>
              To the fullest extent permitted by law, OLYM SKIN shall not be
              liable for indirect, incidental, consequential, or special damages
              arising from use of the website, products, Founder Circle
              membership, digital services, or related experiences.
            </p>
          </section>

          {/* Contact */}
          <section
            style={{
              ...sectionStyle,
              marginBottom: 0,
            }}
          >
            <h2 style={headingStyle}>Contact</h2>

            <p style={bodyStyle}>
              Questions regarding these Terms may be directed to{" "}
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

        {/* Back Link */}
        <div
          style={{
            marginTop: "3rem",
            textAlign: "center",
          }}
        >
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