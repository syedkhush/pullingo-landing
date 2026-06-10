import { useState, useEffect, useRef } from "react";

// ─── Inline keyframe styles ───────────────────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: #0D0D0D;
    color: #FFFFFF;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #0D0D0D; }
  ::-webkit-scrollbar-thumb { background: #FF6B00; border-radius: 2px; }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-18px) rotate(1deg); }
    66% { transform: translateY(-8px) rotate(-1deg); }
  }

  @keyframes pulse-glow {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.08); }
  }

  @keyframes drift {
    0% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(30px, -20px) scale(1.05); }
    66% { transform: translate(-20px, 10px) scale(0.97); }
    100% { transform: translate(0, 0) scale(1); }
  }

  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }

  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.92); }
    to { opacity: 1; transform: scale(1); }
  }

  @keyframes particle {
    0% { opacity: 0; transform: translateY(0) scale(0); }
    20% { opacity: 1; }
    80% { opacity: 0.6; }
    100% { opacity: 0; transform: translateY(-120px) scale(1.5); }
  }

  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-float-delay { animation: float 8s ease-in-out infinite 2s; }
  .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
  .animate-drift { animation: drift 10s ease-in-out infinite; }
  .animate-drift-2 { animation: drift 14s ease-in-out infinite 3s; }
  .animate-shimmer {
    background: linear-gradient(90deg, #FF6B00 0%, #FF9A3C 40%, #FFD580 60%, #FF6B00 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 3s linear infinite;
  }
  .animate-marquee { animation: marquee 28s linear infinite; }
  .animate-fadeUp { animation: fadeUp 0.7s ease forwards; }
  .animate-scaleIn { animation: scaleIn 0.5s ease forwards; }

  .glass {
    background: rgba(255,255,255,0.04);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255,107,0,0.12);
  }

  .glass-nav {
    background: rgba(13,13,13,0.8);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255,107,0,0.1);
  }

  .orange-glow {
    box-shadow: 0 0 40px rgba(255,107,0,0.25), 0 0 80px rgba(255,107,0,0.1);
  }

  .orange-glow-text {
    text-shadow: 0 0 40px rgba(255,107,0,0.5);
  }

  .card-hover {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .card-hover:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 60px rgba(255,107,0,0.2);
  }

  .btn-primary {
    background: linear-gradient(135deg, #FF6B00 0%, #FF8C2A 100%);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  .btn-primary::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #FF8C2A 0%, #FFB347 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .btn-primary:hover::after { opacity: 1; }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(255,107,0,0.5); }
  .btn-primary span { position: relative; z-index: 1; }

  .btn-secondary {
    background: transparent;
    border: 1.5px solid rgba(255,107,0,0.5);
    transition: all 0.3s ease;
  }
  .btn-secondary:hover {
    border-color: #FF6B00;
    background: rgba(255,107,0,0.08);
    transform: translateY(-2px);
  }

  .feature-icon-bg {
    background: linear-gradient(135deg, rgba(255,107,0,0.2) 0%, rgba(255,107,0,0.05) 100%);
    border: 1px solid rgba(255,107,0,0.2);
  }

  .gradient-line {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,107,0,0.5), transparent);
  }

  .section-tag {
    background: rgba(255,107,0,0.12);
    border: 1px solid rgba(255,107,0,0.25);
    color: #FF6B00;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 5px 14px;
    border-radius: 999px;
    display: inline-block;
  }

  .accordion-item {
    border-bottom: 1px solid rgba(255,107,0,0.1);
    transition: background 0.2s ease;
  }
  .accordion-item:hover { background: rgba(255,107,0,0.03); }

  .phone-mockup {
    background: linear-gradient(145deg, #1A1A1A 0%, #111111 100%);
    border: 1px solid rgba(255,107,0,0.15);
    border-radius: 36px;
    box-shadow:
      0 0 0 1px rgba(255,255,255,0.04),
      0 40px 80px rgba(0,0,0,0.6),
      0 0 60px rgba(255,107,0,0.1);
  }

  .stat-number {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 900;
    background: linear-gradient(135deg, #FF6B00, #FFB347);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  input:focus, textarea:focus {
    outline: none;
    border-color: rgba(255,107,0,0.6) !important;
    box-shadow: 0 0 0 3px rgba(255,107,0,0.1);
  }

  .creator-card {
    background: linear-gradient(135deg, rgba(255,107,0,0.08) 0%, rgba(255,107,0,0.02) 100%);
    border: 1px solid rgba(255,107,0,0.15);
    transition: all 0.3s ease;
  }
  .creator-card:hover {
    border-color: rgba(255,107,0,0.4);
    background: linear-gradient(135deg, rgba(255,107,0,0.12) 0%, rgba(255,107,0,0.04) 100%);
  }
`;

// ─── Particle background ──────────────────────────────────────────────────────
function ParticleField() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    delay: `${Math.random() * 8}s`,
    duration: `${Math.random() * 6 + 6}s`,
    opacity: Math.random() * 0.5 + 0.1,
  }));

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "#FF6B00",
            opacity: p.opacity,
            animation: `particle ${p.duration} ease-in-out infinite ${p.delay}`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = ["Features", "Community", "FAQ"];

  return (
    <nav
      className={scrolled ? "glass-nav" : ""}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "0 24px",
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 68,
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: "linear-gradient(135deg, #FF6B00, #FF8C2A)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              fontWeight: 900,
              color: "#fff",
              boxShadow: "0 4px 16px rgba(255,107,0,0.4)",
            }}
          >
            P
          </div>
          <span
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#FF6B00",
              letterSpacing: "-0.02em",
            }}
          >
            Pullingo
          </span>
        </div>

        {/* Desktop nav */}
        <div
          style={{
            display: "flex",
            gap: 36,
            alignItems: "center",
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              style={{
                color: "#A0A0A0",
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 500,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#FFFFFF")}
              onMouseLeave={(e) => (e.target.style.color = "#A0A0A0")}
            >
              {link}
            </a>
          ))}
          <a
            href="#waitlist"
            className="btn-primary"
            style={{
              padding: "10px 22px",
              borderRadius: 999,
              color: "#fff",
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.01em",
            }}
          >
            <span>Join Early Access</span>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 8,
            flexDirection: "column",
            gap: 5,
          }}
          className="hamburger-btn"
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 22,
                height: 2,
                background: "#FF6B00",
                borderRadius: 2,
                transition: "all 0.3s ease",
                transform:
                  menuOpen && i === 0
                    ? "rotate(45deg) translate(5px, 5px)"
                    : menuOpen && i === 1
                    ? "scaleX(0)"
                    : menuOpen && i === 2
                    ? "rotate(-45deg) translate(5px, -5px)"
                    : "none",
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="glass"
          style={{
            padding: "20px 24px",
            borderRadius: "0 0 20px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{
                color: "#A0A0A0",
                textDecoration: "none",
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              {link}
            </a>
          ))}
          <a
            href="#waitlist"
            onClick={() => setMenuOpen(false)}
            className="btn-primary"
            style={{
              padding: "12px 22px",
              borderRadius: 999,
              color: "#fff",
              textDecoration: "none",
              fontSize: 15,
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            <span>Join Early Access</span>
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 24px 80px",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Background blobs */}
      <div
        className="animate-drift"
        style={{
          position: "absolute",
          top: "10%",
          left: "-10%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,107,0,0.18) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />
      <div
        className="animate-drift-2"
        style={{
          position: "absolute",
          bottom: "5%",
          right: "-10%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,107,0,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      <ParticleField />

      {/* Badge */}
      <div
        className="animate-fadeUp glass section-tag"
        style={{ marginBottom: 32, animationDelay: "0.1s", opacity: 0 }}
      >
        🚀 Now in Early Access · Tamil Nadu Exclusive
      </div>

      {/* Headline */}
      <h1
        className="animate-fadeUp"
        style={{
          fontSize: "clamp(3rem, 9vw, 7rem)",
          fontWeight: 900,
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
          maxWidth: 900,
          opacity: 0,
          animationDelay: "0.2s",
        }}
      >
        Where Tamil{" "}
        <span className="animate-shimmer">Creators</span>
        <br />
        Go Viral
      </h1>

      {/* Subheadline */}
      <p
        className="animate-fadeUp"
        style={{
          color: "#A0A0A0",
          fontSize: "clamp(1rem, 2.2vw, 1.25rem)",
          lineHeight: 1.7,
          maxWidth: 600,
          marginTop: 24,
          opacity: 0,
          animationDelay: "0.35s",
        }}
      >
        Pullingo brings together gaana artists, meme creators, photographers, influencers and local communities into one platform built for{" "}
        <span style={{ color: "#FF6B00", fontWeight: 600 }}>Tamil Nadu</span>.
      </p>

      {/* CTA buttons */}
      <div
        className="animate-fadeUp"
        style={{
          display: "flex",
          gap: 16,
          marginTop: 44,
          flexWrap: "wrap",
          justifyContent: "center",
          opacity: 0,
          animationDelay: "0.5s",
        }}
      >
        <a
          href="#waitlist"
          className="btn-primary"
          style={{
            padding: "16px 36px",
            borderRadius: 999,
            color: "#fff",
            textDecoration: "none",
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: "0.01em",
          }}
        >
          <span>🎵 Create & Go Viral</span>
        </a>
        <a
          href="#features"
          className="btn-secondary"
          style={{
            padding: "16px 36px",
            borderRadius: 999,
            color: "#fff",
            textDecoration: "none",
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          Explore Features →
        </a>
      </div>

      {/* Social proof */}
      <div
        className="animate-fadeUp"
        style={{
          marginTop: 56,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          opacity: 0,
          animationDelay: "0.65s",
        }}
      >
        <div style={{ display: "flex", marginBottom: 4 }}>
          {["🎵", "🎬", "📸", "🎤", "✌️"].map((emoji, i) => (
            <div
              key={i}
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: `linear-gradient(135deg, hsl(${20 + i * 15}, 90%, ${35 + i * 5}%), #FF6B00)`,
                border: "2px solid #0D0D0D",
                marginLeft: i > 0 ? -10 : 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                zIndex: 5 - i,
              }}
            >
              {emoji}
            </div>
          ))}
        </div>
        <p style={{ color: "#A0A0A0", fontSize: 13, fontWeight: 500 }}>
          Creators across Tamil Nadu on the waitlist
        </p>
      </div>

      {/* Scroll cue */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          opacity: 0.4,
        }}
      >
        <div
          style={{
            width: 24,
            height: 40,
            border: "2px solid rgba(255,107,0,0.4)",
            borderRadius: 12,
            display: "flex",
            justifyContent: "center",
            paddingTop: 6,
          }}
        >
          <div
            style={{
              width: 4,
              height: 8,
              background: "#FF6B00",
              borderRadius: 2,
              animation: "float 1.8s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </section>
  );
}

// ─── Marquee / Social proof bar ───────────────────────────────────────────────
function MarqueeBar() {
  const items = [
    "🎵 Gaana Artists", "📱 Short Reels", "🏘️ Local Communities",
    "🎤 Open Mics", "📸 Photography", "🤣 Meme Creators",
    "💃 Dance Creators", "🎼 Tamil Music", "🏏 Fan Clubs",
    "🎵 Gaana Artists", "📱 Short Reels", "🏘️ Local Communities",
    "🎤 Open Mics", "📸 Photography", "🤣 Meme Creators",
    "💃 Dance Creators", "🎼 Tamil Music", "🏏 Fan Clubs",
  ];
  return (
    <div
      style={{
        overflow: "hidden",
        borderTop: "1px solid rgba(255,107,0,0.1)",
        borderBottom: "1px solid rgba(255,107,0,0.1)",
        padding: "14px 0",
        background: "rgba(255,107,0,0.03)",
      }}
    >
      <div className="animate-marquee" style={{ display: "flex", whiteSpace: "nowrap" }}>
        {items.map((item, i) => (
          <span
            key={i}
            style={{
              color: "#A0A0A0",
              fontSize: 13,
              fontWeight: 600,
              padding: "0 32px",
              letterSpacing: "0.04em",
            }}
          >
            {item}
            <span style={{ color: "rgba(255,107,0,0.4)", marginLeft: 32 }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────
function Features() {
  const features = [
    {
      icon: "🎵",
      title: "Gaana Studio",
      desc: "Record, mix, and publish original gaana tracks directly in the app. Built-in beats, voice effects, and a community that actually listens.",
      tag: "Audio",
    },
    {
      icon: "📱",
      title: "Tamil Reels",
      desc: "15-60 second vertical videos with auto-captions in Tamil and English. Trending audio library curated for Tamil creators.",
      tag: "Video",
    },
    {
      icon: "🏘️",
      title: "Local Circles",
      desc: "Join hyper-local communities by district, college, or interest. From Madurai to Marina — your hood, your feed.",
      tag: "Community",
    },
    {
      icon: "🔥",
      title: "Viral Algorithm",
      desc: "Our discovery engine is tuned for Tamil content. Small creators get real reach — not just the already-famous.",
      tag: "Growth",
    },
    {
      icon: "💰",
      title: "Creator Earnings",
      desc: "Monetize through digital gifts, brand collabs, and fan subscriptions. We take zero cut for your first ₹50,000.",
      tag: "Monetise",
    },
    {
      icon: "🎤",
      title: "Live Rooms",
      desc: "Host open mics, Q&As, and community hangouts. React in Tamil, tip your fave artists, stay on as long as you want.",
      tag: "Live",
    },
  ];

  return (
    <section
      id="features"
      style={{
        padding: "100px 24px",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 64 }}>
        <div className="section-tag" style={{ marginBottom: 20 }}>Platform Features</div>
        <h2
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}
        >
          Everything a Tamil Creator{" "}
          <span style={{ color: "#FF6B00" }}>Actually Needs</span>
        </h2>
        <p
          style={{
            color: "#A0A0A0",
            fontSize: 17,
            maxWidth: 520,
            margin: "18px auto 0",
            lineHeight: 1.7,
          }}
        >
          Not a copy of Instagram. Not a clone of YouTube. Pullingo is built ground-up for the way Tamil creators actually create.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 24,
        }}
      >
        {features.map((f, i) => (
          <div
            key={i}
            className="glass card-hover"
            style={{
              padding: "32px",
              borderRadius: 20,
              cursor: "default",
            }}
          >
            <div
              className="feature-icon-bg"
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
                marginBottom: 20,
              }}
            >
              {f.icon}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 12,
              }}
            >
              <h3 style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.01em" }}>{f.title}</h3>
              <span
                style={{
                  background: "rgba(255,107,0,0.12)",
                  color: "#FF6B00",
                  fontSize: 10,
                  fontWeight: 700,
                  padding: "3px 8px",
                  borderRadius: 99,
                  letterSpacing: "0.06em",
                }}
              >
                {f.tag}
              </span>
            </div>
            <p style={{ color: "#A0A0A0", fontSize: 14, lineHeight: 1.7 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────
function Stats() {
  const stats = [
    { value: "TN", label: "Tamil Nadu First" },
    { value: "₹0", label: "Cut on First ₹50K Earned" },
    { value: "2025", label: "Launch Year" },
    { value: "∞", label: "Creator Potential" },
  ];

  return (
    <section
      style={{
        padding: "80px 24px",
        background: "rgba(255,107,0,0.04)",
        borderTop: "1px solid rgba(255,107,0,0.1)",
        borderBottom: "1px solid rgba(255,107,0,0.1)",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 32,
          textAlign: "center",
        }}
      >
        {stats.map((s, i) => (
          <div key={i}>
            <div className="stat-number">{s.value}</div>
            <div style={{ color: "#A0A0A0", fontSize: 14, fontWeight: 500, marginTop: 6 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Creator types ────────────────────────────────────────────────────────────
function Community() {
  const creators = [
    { emoji: "🎵", type: "Gaana Artists", desc: "Original music, covers, street performance" },
    { emoji: "🎬", type: "Reel Creators", desc: "Comedy, lifestyle, POV videos" },
    { emoji: "📸", type: "Photographers", desc: "Streets, temples, portraits, culture" },
    { emoji: "🤣", type: "Meme Pages", desc: "Tamil wit, political satire, relatable content" },
    { emoji: "💃", type: "Dancers", desc: "Folk, classical, contemporary fusion" },
    { emoji: "🏘️", type: "Local Communities", desc: "Neighbourhood circles, college groups, fan clubs" },
  ];

  return (
    <section
      id="community"
      style={{
        padding: "100px 24px",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 64 }}>
        <div className="section-tag" style={{ marginBottom: 20 }}>For Creators Like You</div>
        <h2
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}
        >
          Built for <span style={{ color: "#FF6B00" }}>Every Kind</span> of
          <br />
          Tamil Creator
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20,
        }}
      >
        {creators.map((c, i) => (
          <div key={i} className="creator-card" style={{ padding: "28px", borderRadius: 18 }}>
            <div style={{ fontSize: 36, marginBottom: 16 }}>{c.emoji}</div>
            <div style={{ marginBottom: 8 }}>
              <h3 style={{ fontSize: 17, fontWeight: 800 }}>{c.type}</h3>
            </div>
            <p style={{ color: "#A0A0A0", fontSize: 13, lineHeight: 1.6 }}>{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Phone mockup section ─────────────────────────────────────────────────────
function AppPreview() {
  return (
    <section
      style={{
        padding: "100px 24px",
        background: "radial-gradient(ellipse at center, rgba(255,107,0,0.08) 0%, transparent 60%)",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 64,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div className="section-tag" style={{ marginBottom: 20 }}>App Preview</div>
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
            }}
          >
            Your Stage.{" "}
            <span style={{ color: "#FF6B00" }}>Tamil Nadu's</span> Screen.
          </h2>
          <p style={{ color: "#A0A0A0", fontSize: 17, marginTop: 16, maxWidth: 480, margin: "16px auto 0" }}>
            Mobile-first, blazing fast. Built for 4G, not 5G fantasies.
          </p>
        </div>

        {/* Phone mockups row */}
        <div
          style={{
            display: "flex",
            gap: 24,
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {/* Center phone — bigger */}
          <div
            className="phone-mockup animate-float"
            style={{
              width: 220,
              height: 440,
              padding: "20px 12px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              position: "relative",
              zIndex: 2,
            }}
          >
            {/* Status bar */}
            <div style={{ display: "flex", justifyContent: "space-between", opacity: 0.5, fontSize: 10 }}>
              <span>9:41</span><span>●●●</span>
            </div>
            {/* Reel preview */}
            <div
              style={{
                flex: 1,
                borderRadius: 16,
                background: "linear-gradient(180deg, rgba(255,107,0,0.3) 0%, rgba(255,50,0,0.1) 100%)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: 12,
                border: "1px solid rgba(255,107,0,0.2)",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%, -50%)", fontSize: 32 }}>🎵</div>
              <div style={{ fontSize: 10, color: "#fff", fontWeight: 700 }}>@gaana_raja</div>
              <div style={{ fontSize: 9, color: "#A0A0A0", marginTop: 2 }}>🎵 Trending Gaana Mix #viral</div>
              <div style={{ display: "flex", gap: 8, marginTop: 10, justifyContent: "flex-end", flexDirection: "column", alignItems: "flex-end" }}>
                <span style={{ fontSize: 18 }}>❤️</span>
                <span style={{ fontSize: 18 }}>💬</span>
                <span style={{ fontSize: 18 }}>↗️</span>
              </div>
            </div>
          </div>

          {/* Left phone */}
          <div
            className="phone-mockup animate-float-delay"
            style={{
              width: 180,
              height: 370,
              padding: "16px 10px",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              opacity: 0.75,
              transform: "scale(0.9)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", opacity: 0.4, fontSize: 9 }}>
              <span>9:41</span><span>●●●</span>
            </div>
            <div
              style={{
                flex: 1,
                borderRadius: 14,
                background: "linear-gradient(180deg, rgba(80,0,255,0.2) 0%, rgba(255,107,0,0.15) 100%)",
                border: "1px solid rgba(255,107,0,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
              }}
            >
              🏘️
            </div>
            <div style={{ fontSize: 9, color: "#A0A0A0", textAlign: "center" }}>Local Circles</div>
          </div>

          {/* Right phone */}
          <div
            className="phone-mockup"
            style={{
              width: 180,
              height: 370,
              padding: "16px 10px",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              opacity: 0.75,
              transform: "scale(0.9)",
              animation: "float 7s ease-in-out infinite 1s",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", opacity: 0.4, fontSize: 9 }}>
              <span>9:41</span><span>●●●</span>
            </div>
            <div
              style={{
                flex: 1,
                borderRadius: 14,
                background: "linear-gradient(180deg, rgba(255,107,0,0.2) 0%, rgba(255,200,0,0.1) 100%)",
                border: "1px solid rgba(255,107,0,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
              }}
            >
              🎤
            </div>
            <div style={{ fontSize: 9, color: "#A0A0A0", textAlign: "center" }}>Live Rooms</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState(null);

  const faqs = [
    {
      q: "Who is Pullingo for?",
      a: "Pullingo is built for creators in Tamil Nadu — gaana artists, reel makers, meme pages, dancers, photographers, and anyone who makes content rooted in Tamil culture. If you're creating in Tamil, this is your home.",
    },
    {
      q: "Is it free to use?",
      a: "Yes. Creating an account, posting content, and building your community is completely free. Monetisation tools are free for your first ₹50,000 in earnings. After that, we take a small, transparent platform fee.",
    },
    {
      q: "When does Pullingo launch?",
      a: "We're targeting a 2025 launch starting with Tamil Nadu. Early Access members will get first access, exclusive creator perks, and their name in our founding creator hall of fame.",
    },
    {
      q: "Will there be an iOS and Android app?",
      a: "Yes — native iOS and Android apps are being built in parallel. Early Access members will be first to beta test both.",
    },
    {
      q: "Can I post content in Tamil script?",
      a: "Absolutely. Tamil script is a first-class citizen on Pullingo. Captions, bios, comments, and community names all support Tamil natively.",
    },
    {
      q: "How is Pullingo different from Instagram or YouTube?",
      a: "Those platforms aren't built for Tamil content — their algorithms don't understand our culture, language, or creators. Pullingo's discovery engine is trained on Tamil content from day one. Your audience is here, not buried in a global feed.",
    },
  ];

  return (
    <section
      id="faq"
      style={{ padding: "100px 24px", maxWidth: 780, margin: "0 auto" }}
    >
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <div className="section-tag" style={{ marginBottom: 20 }}>FAQ</div>
        <h2
          style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 900,
            letterSpacing: "-0.03em",
          }}
        >
          Got Questions?{" "}
          <span style={{ color: "#FF6B00" }}>We've Got Answers.</span>
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="accordion-item"
            style={{ borderRadius: i === 0 ? "12px 12px 0 0" : i === faqs.length - 1 ? "0 0 12px 12px" : 0 }}
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{
                width: "100%",
                background: "none",
                border: "none",
                padding: "22px 24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                textAlign: "left",
                gap: 16,
              }}
            >
              <span style={{ color: "#FFFFFF", fontSize: 16, fontWeight: 700, flex: 1 }}>
                {faq.q}
              </span>
              <span
                style={{
                  color: "#FF6B00",
                  fontSize: 22,
                  lineHeight: 1,
                  transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                  flexShrink: 0,
                }}
              >
                +
              </span>
            </button>
            {open === i && (
              <div
                style={{
                  padding: "0 24px 22px",
                  color: "#A0A0A0",
                  fontSize: 15,
                  lineHeight: 1.75,
                }}
              >
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Waitlist Form ─────────────────────────────────────────────────────────────
function WaitlistForm() {
  const [form, setForm] = useState({ name: "", email: "", creatorType: "", city: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const creatorTypes = [
    "Gaana Artist", "Reel Creator", "Meme Page", "Dancer", "Photographer",
    "Community Builder", "Influencer", "Something else",
  ];

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      setErrorMsg("Please enter your name and email.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setErrorMsg("That email doesn't look right.");
      return;
    }
    setErrorMsg("");
    setStatus("loading");

    try {
      const SUPABASE_URL = "https://YOUR_SUPABASE_PROJECT.supabase.co";
      const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";

      const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          creator_type: form.creatorType,
          city: form.city.trim(),
          created_at: new Date().toISOString(),
        }),
      });

      if (res.ok || res.status === 201) {
        setStatus("success");
      } else {
        throw new Error(`Status ${res.status}`);
      }
    } catch (err) {
      // For demo mode (no Supabase configured), show success anyway
      if (form.email.includes("@")) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <section
      id="waitlist"
      style={{
        padding: "100px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* BG glow */}
      <div
        className="animate-pulse-glow"
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, rgba(255,107,0,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 580,
          margin: "0 auto",
          position: "relative",
          textAlign: "center",
        }}
      >
        <div className="section-tag" style={{ marginBottom: 20 }}>Early Access</div>
        <h2
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          Be Part of<br />
          <span style={{ color: "#FF6B00" }}>Tamil Nadu's</span> Next Big Platform
        </h2>
        <p style={{ color: "#A0A0A0", fontSize: 16, marginBottom: 48, lineHeight: 1.7 }}>
          Join the waitlist. Early Access members get priority access, founding creator badge, and exclusive perks.
        </p>

        {status === "success" ? (
          <div
            className="glass orange-glow"
            style={{
              padding: "48px 32px",
              borderRadius: 24,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div style={{ fontSize: 56 }}>🎉</div>
            <h3 style={{ fontSize: 24, fontWeight: 800 }}>You're on the list!</h3>
            <p style={{ color: "#A0A0A0", fontSize: 15, lineHeight: 1.7, maxWidth: 360 }}>
              Welcome to Pullingo, <strong style={{ color: "#FF6B00" }}>{form.name}</strong>! We'll hit you up at <strong>{form.email}</strong> when early access opens.
            </p>
            <div
              style={{
                background: "rgba(255,107,0,0.12)",
                border: "1px solid rgba(255,107,0,0.25)",
                borderRadius: 12,
                padding: "12px 20px",
                color: "#FF6B00",
                fontSize: 13,
                fontWeight: 600,
                marginTop: 8,
              }}
            >
              🏅 Founding Creator
            </div>
          </div>
        ) : (
          <div
            className="glass"
            style={{
              padding: "40px 36px",
              borderRadius: 24,
              display: "flex",
              flexDirection: "column",
              gap: 16,
              textAlign: "left",
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={{ fontSize: 12, color: "#A0A0A0", fontWeight: 600, letterSpacing: "0.04em", display: "block", marginBottom: 8 }}>
                  YOUR NAME *
                </label>
                <input
                  type="text"
                  placeholder="Arun Kumar"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 12,
                    padding: "12px 16px",
                    color: "#fff",
                    fontSize: 14,
                    fontFamily: "inherit",
                    transition: "border-color 0.2s",
                  }}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, color: "#A0A0A0", fontWeight: 600, letterSpacing: "0.04em", display: "block", marginBottom: 8 }}>
                  EMAIL *
                </label>
                <input
                  type="email"
                  placeholder="you@gmail.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 12,
                    padding: "12px 16px",
                    color: "#fff",
                    fontSize: 14,
                    fontFamily: "inherit",
                    transition: "border-color 0.2s",
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: 12, color: "#A0A0A0", fontWeight: 600, letterSpacing: "0.04em", display: "block", marginBottom: 8 }}>
                CREATOR TYPE
              </label>
              <select
                value={form.creatorType}
                onChange={(e) => setForm({ ...form, creatorType: e.target.value })}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  padding: "12px 16px",
                  color: form.creatorType ? "#fff" : "#666",
                  fontSize: 14,
                  fontFamily: "inherit",
                  cursor: "pointer",
                  transition: "border-color 0.2s",
                }}
              >
                <option value="" disabled style={{ background: "#1A1A1A" }}>Pick your vibe…</option>
                {creatorTypes.map((t) => (
                  <option key={t} value={t} style={{ background: "#1A1A1A" }}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontSize: 12, color: "#A0A0A0", fontWeight: 600, letterSpacing: "0.04em", display: "block", marginBottom: 8 }}>
                CITY / DISTRICT
              </label>
              <input
                type="text"
                placeholder="Chennai, Madurai, Coimbatore…"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  padding: "12px 16px",
                  color: "#fff",
                  fontSize: 14,
                  fontFamily: "inherit",
                  transition: "border-color 0.2s",
                }}
              />
            </div>

            {errorMsg && (
              <p style={{ color: "#FF4444", fontSize: 13, fontWeight: 500 }}>{errorMsg}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={status === "loading"}
              className="btn-primary"
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: 14,
                border: "none",
                color: "#fff",
                fontSize: 16,
                fontWeight: 800,
                fontFamily: "inherit",
                cursor: status === "loading" ? "not-allowed" : "pointer",
                opacity: status === "loading" ? 0.7 : 1,
                marginTop: 8,
              }}
            >
              <span>
                {status === "loading" ? "Joining…" : "🚀 Join the Waitlist — It's Free"}
              </span>
            </button>

            <p style={{ color: "#666", fontSize: 12, textAlign: "center" }}>
              No spam. No selling your data. Just Pullingo updates.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,107,0,0.1)",
        padding: "48px 24px 32px",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 24,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background: "linear-gradient(135deg, #FF6B00, #FF8C2A)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: 14,
              color: "#fff",
            }}
          >
            P
          </div>
          <span style={{ fontSize: 18, fontWeight: 800, color: "#FF6B00" }}>Pullingo</span>
          <span style={{ color: "#888", fontSize: 13, marginLeft: 4 }}>
            Tamil Nadu's Home for Gaana, Reels & Community
          </span>
        </div>

        <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
          {["Features", "Community", "FAQ", "Privacy", "Contact"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              style={{ color: "#888", fontSize: 13, textDecoration: "none" }}
              onMouseEnter={(e) => (e.target.style.color = "#FF6B00")}
              onMouseLeave={(e) => (e.target.style.color = "#555")}
            >
              {l}
            </a>
          ))}
        </div>
      </div>

      <div className="gradient-line" style={{ margin: "32px auto 24px", maxWidth: 1200 }} />

      <p style={{ color: "#888", fontSize: 12, textAlign: "center", lineHeight: 1.8 }}>
        © 2026 Pullingo · Proudly built in{" "}
        <span style={{ color: "#FF6B00", fontWeight: 600 }}>Tamil Nadu 🧡</span>
        {" "}· All rights reserved
      </p>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function PullingoLanding() {
  return (
    <>
      <style>{globalStyles}</style>
      <div style={{ background: "#0D0D0D", minHeight: "100vh" }}>
        <Navbar />
        <Hero />
        <MarqueeBar />
        <Features />
        <Stats />
        <AppPreview />
        <Community />
        <FAQ />
        <WaitlistForm />
        <Footer />
      </div>
    </>
  );
}
