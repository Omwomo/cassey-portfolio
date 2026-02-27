import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Home", "About", "Skills", "Projects", "Contact"];

const SKILLS = [
  { name: "RELAP5", level: 95, category: "Simulation" },
  { name: "MCNP6", level: 92, category: "Simulation" },
  { name: "SCALE/TRITON", level: 90, category: "Simulation" },
  { name: "TRACE", level: 88, category: "Simulation" },
  { name: "Reactor Safety Analysis", level: 97, category: "Engineering" },
  { name: "Thermal-Hydraulic Analysis", level: 95, category: "Engineering" },
  { name: "Radiation Transport", level: 93, category: "Engineering" },
  { name: "NRC Regulatory Compliance", level: 96, category: "Regulatory" },
  { name: "Project Management", level: 90, category: "Leadership" },
  { name: "Multi-disciplinary Team Leadership", level: 92, category: "Leadership" },
  { name: "Environmental Remediation", level: 87, category: "Engineering" },
  { name: "Technical Report Writing", level: 94, category: "Communication" },
];

const PROJECTS = [
  {
    title: "Advanced Reactor Kinetics Modeling",
    description:
      "Led high-fidelity simulation of complex reactor kinetics and thermal-hydraulic transients using RELAP5 and TRACE for a next-generation reactor design program.",
    tags: ["RELAP5", "TRACE", "Reactor Kinetics"],
    image: null, // Replace with your image path e.g. "/images/project1.jpg"
    placeholder: "🔬",
  },
  {
    title: "NRC Safety Analysis Report",
    description:
      "Directed the synthesis of multi-dimensional simulation data into a comprehensive safety analysis report submitted to the Nuclear Regulatory Commission, achieving full compliance.",
    tags: ["NRC", "Safety Analysis", "Regulatory"],
    image: null,
    placeholder: "📋",
  },
  {
    title: "Environmental Remediation Program",
    description:
      "Managed a large-scale environmental remediation project, coordinating multi-disciplinary engineering teams to achieve remediation targets ahead of schedule.",
    tags: ["Project Management", "Remediation", "Leadership"],
    image: null,
    placeholder: "🌍",
  },
  {
    title: "Radiation Transport Study",
    description:
      "Conducted advanced radiation transport modeling using MCNP6 and SCALE/TRITON to validate shielding designs and ensure personnel safety across multiple facility upgrades.",
    tags: ["MCNP6", "SCALE/TRITON", "Radiation"],
    image: null,
    placeholder: "⚛️",
  },
];

function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15, ...options }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function AnimatedSection({ children, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      {children}
    </div>
  );
}

function SkillBar({ skill, delay }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ marginBottom: "1.2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <span style={{ color: "var(--text-primary)", fontSize: "0.9rem", fontFamily: "var(--font-mono)" }}>
          {skill.name}
        </span>
        <span style={{ color: "var(--accent)", fontSize: "0.85rem", fontFamily: "var(--font-mono)" }}>
          {skill.level}%
        </span>
      </div>
      <div style={{ background: "var(--surface-2)", borderRadius: "2px", height: "4px", overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: inView ? `${skill.level}%` : "0%",
            background: "linear-gradient(90deg, var(--accent), var(--accent-2))",
            transition: `width 1.2s ease ${delay}ms`,
            borderRadius: "2px",
            boxShadow: "0 0 8px var(--accent)",
          }}
        />
      </div>
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map((id) => document.getElementById(id.toLowerCase()));
      sections.forEach((sec) => {
        if (!sec) return;
        const rect = sec.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          setActiveSection(sec.id.charAt(0).toUpperCase() + sec.id.slice(1));
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: "", email: "", message: "" });
  };

  const categoryColors = {
    Simulation: "#00d4ff",
    Engineering: "#00ffaa",
    Regulatory: "#ff9500",
    Leadership: "#bf7fff",
    Communication: "#ff6b9d",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Share+Tech+Mono&family=Rajdhani:wght@300;400;500;600&display=swap');

        :root {
          --bg: #050a12;
          --bg-2: #080f1c;
          --surface: #0d1829;
          --surface-2: #152035;
          --accent: #00d4ff;
          --accent-2: #00ffaa;
          --accent-3: #0066ff;
          --text-primary: #e8f4ff;
          --text-secondary: #7a9bbf;
          --border: rgba(0, 212, 255, 0.15);
          --font-display: 'Orbitron', monospace;
          --font-mono: 'Share Tech Mono', monospace;
          --font-body: 'Rajdhani', sans-serif;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        html { scroll-behavior: smooth; }

        body {
          background: var(--bg);
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 17px;
          line-height: 1.7;
          overflow-x: hidden;
        }

        ::selection { background: var(--accent); color: var(--bg); }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 2px; }

        /* Grid background */
        body::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          z-index: 0;
        }

        /* NAV */
        nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.2rem 2.5rem;
          background: rgba(5,10,18,0.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
        }

        .nav-logo {
          font-family: var(--font-display);
          font-size: 1rem;
          color: var(--accent);
          letter-spacing: 0.15em;
          font-weight: 700;
        }

        .nav-links { display: flex; gap: 2rem; list-style: none; }

        .nav-links button {
          background: none; border: none; cursor: pointer;
          font-family: var(--font-mono);
          font-size: 0.85rem;
          letter-spacing: 0.1em;
          color: var(--text-secondary);
          transition: color 0.2s, text-shadow 0.2s;
          padding: 0.25rem 0;
          position: relative;
        }

        .nav-links button::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0; right: 0;
          height: 1px;
          background: var(--accent);
          transform: scaleX(0);
          transition: transform 0.2s;
        }

        .nav-links button:hover, .nav-links button.active {
          color: var(--accent);
          text-shadow: 0 0 12px var(--accent);
        }
        .nav-links button.active::after, .nav-links button:hover::after {
          transform: scaleX(1);
        }

        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 4px;
        }
        .hamburger span {
          display: block; width: 24px; height: 2px;
          background: var(--accent);
          transition: all 0.3s;
        }

        .mobile-menu {
          display: none;
          position: fixed;
          top: 65px; left: 0; right: 0;
          background: rgba(5,10,18,0.98);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
          z-index: 99;
          flex-direction: column;
          padding: 1rem 0;
        }
        .mobile-menu.open { display: flex; }
        .mobile-menu button {
          background: none; border: none; cursor: pointer;
          font-family: var(--font-mono);
          font-size: 1rem;
          color: var(--text-secondary);
          padding: 1rem 2.5rem;
          text-align: left;
          transition: color 0.2s;
        }
        .mobile-menu button:hover { color: var(--accent); }

        /* SECTIONS */
        section { position: relative; z-index: 1; }

        /* HERO */
        #home {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 8rem 2.5rem 4rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .hero-content { max-width: 700px; }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: var(--accent);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
          padding: 0.4rem 1rem;
          border: 1px solid var(--border);
          border-radius: 2px;
          background: rgba(0,212,255,0.05);
        }

        .hero-badge::before {
          content: '';
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--accent-2);
          box-shadow: 0 0 6px var(--accent-2);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .hero-name {
          font-family: var(--font-display);
          font-size: clamp(2.8rem, 7vw, 5.5rem);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -0.02em;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #fff 0%, var(--accent) 50%, var(--accent-2) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-title {
          font-family: var(--font-mono);
          font-size: clamp(0.85rem, 2vw, 1rem);
          color: var(--text-secondary);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 2rem;
        }

        .hero-desc {
          font-size: 1.1rem;
          color: var(--text-secondary);
          max-width: 580px;
          margin-bottom: 2.5rem;
          font-weight: 300;
          line-height: 1.8;
        }

        .hero-cta {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .btn-primary {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.85rem 2rem;
          background: var(--accent);
          color: var(--bg);
          border: none;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
        }

        .btn-primary:hover {
          background: var(--accent-2);
          box-shadow: 0 0 30px rgba(0, 212, 255, 0.4);
          transform: translateY(-2px);
        }

        .btn-secondary {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.85rem 2rem;
          background: transparent;
          color: var(--accent);
          border: 1px solid var(--accent);
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-secondary:hover {
          background: rgba(0,212,255,0.1);
          box-shadow: 0 0 20px rgba(0, 212, 255, 0.2);
        }

        .hero-visual {
          position: absolute;
          right: 2.5rem;
          top: 50%;
          transform: translateY(-50%);
          width: 340px;
          height: 340px;
        }

        /* PROFILE IMAGE */
        .profile-ring {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 2px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          animation: rotate 20s linear infinite;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .profile-ring::before {
          content: '';
          position: absolute;
          inset: 8px;
          border-radius: 50%;
          border: 1px solid rgba(0,212,255,0.2);
        }

        .profile-img-wrapper {
          position: absolute;
          inset: 20px;
          border-radius: 50%;
          overflow: hidden;
          animation: rotate 20s linear infinite reverse;
          border: 2px solid rgba(0,212,255,0.3);
        }

        .profile-img-wrapper img {
          width: 100%; height: 100%;
          object-fit: cover;
          filter: brightness(0.9) contrast(1.1);
        }

        .profile-placeholder {
          width: 100%; height: 100%;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          background: var(--surface);
          color: var(--text-secondary);
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          text-align: center;
          gap: 0.5rem;
        }

        .profile-placeholder span:first-child { font-size: 2.5rem; }

        /* Section layout */
        .section-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 6rem 2.5rem;
        }

        .section-label {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 0.75rem;
        }

        .section-title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          margin-bottom: 1rem;
          line-height: 1.1;
        }

        .section-divider {
          width: 60px;
          height: 2px;
          background: linear-gradient(90deg, var(--accent), transparent);
          margin-bottom: 3rem;
        }

        /* ABOUT */
        #about { background: var(--bg-2); }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: start;
        }

        .about-image-box {
          position: relative;
          aspect-ratio: 3/4;
          max-height: 500px;
        }

        .about-image-box::before {
          content: '';
          position: absolute;
          inset: -12px -12px auto auto;
          width: 60%;
          height: 60%;
          border-top: 2px solid var(--accent);
          border-right: 2px solid var(--accent);
          pointer-events: none;
          z-index: 2;
        }

        .about-image-box::after {
          content: '';
          position: absolute;
          inset: auto auto -12px -12px;
          width: 60%;
          height: 60%;
          border-bottom: 2px solid var(--accent-2);
          border-left: 2px solid var(--accent-2);
          pointer-events: none;
          z-index: 2;
        }

        .about-img {
          width: 100%; height: 100%;
          object-fit: cover;
          filter: brightness(0.85) contrast(1.1);
        }

        .about-img-placeholder {
          width: 100%; height: 100%;
          background: var(--surface);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          font-family: var(--font-mono);
          font-size: 0.8rem;
          gap: 1rem;
          border: 1px solid var(--border);
        }

        .about-img-placeholder span:first-child { font-size: 3rem; opacity: 0.4; }

        .about-text p {
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
          font-size: 1.05rem;
          font-weight: 300;
        }

        .stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-top: 2.5rem;
        }

        .stat-card {
          padding: 1.2rem;
          border: 1px solid var(--border);
          background: var(--surface);
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 2px;
          background: linear-gradient(90deg, var(--accent), var(--accent-2));
        }

        .stat-num {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 700;
          color: var(--accent);
        }

        .stat-label {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          color: var(--text-secondary);
          text-transform: uppercase;
          margin-top: 0.25rem;
        }

        /* SKILLS */
        #skills { background: var(--bg); }

        .skills-categories {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 2.5rem;
        }

        .cat-badge {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          padding: 0.3rem 0.8rem;
          border: 1px solid;
          background: transparent;
          border-radius: 2px;
          cursor: default;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0 4rem;
        }

        /* PROJECTS */
        #projects { background: var(--bg-2); }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }

        .project-card {
          border: 1px solid var(--border);
          background: var(--surface);
          overflow: hidden;
          transition: transform 0.3s, box-shadow 0.3s;
          position: relative;
        }

        .project-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--accent), var(--accent-2));
          transform: scaleX(0);
          transition: transform 0.3s;
          transform-origin: left;
        }

        .project-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
        .project-card:hover::before { transform: scaleX(1); }

        .project-img {
          width: 100%;
          height: 180px;
          object-fit: cover;
          filter: brightness(0.8);
        }

        .project-img-placeholder {
          height: 180px;
          background: var(--surface-2);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--text-secondary);
          letter-spacing: 0.1em;
          border-bottom: 1px solid var(--border);
        }

        .project-img-placeholder span:first-child { font-size: 2.5rem; opacity: 0.5; }

        .project-body { padding: 1.5rem; }

        .project-title {
          font-family: var(--font-display);
          font-size: 0.95rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          color: var(--text-primary);
          letter-spacing: 0.05em;
        }

        .project-desc {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 1rem;
          font-weight: 300;
        }

        .project-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }

        .tag {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          padding: 0.2rem 0.6rem;
          border: 1px solid rgba(0,212,255,0.3);
          color: var(--accent);
          background: rgba(0,212,255,0.05);
        }

        /* CONTACT */
        #contact { background: var(--bg); }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 5rem;
          align-items: start;
        }

        .contact-info-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .contact-icon {
          width: 42px; height: 42px;
          border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          color: var(--accent);
          font-size: 1.1rem;
          flex-shrink: 0;
          background: var(--surface);
        }

        .contact-label {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.15em;
          color: var(--text-secondary);
          text-transform: uppercase;
          margin-bottom: 0.25rem;
        }

        .contact-value {
          font-family: var(--font-body);
          font-size: 1rem;
          color: var(--text-primary);
          font-weight: 500;
        }

        .contact-value a { color: var(--accent); text-decoration: none; }
        .contact-value a:hover { text-decoration: underline; }

        .contact-form { display: flex; flex-direction: column; gap: 1.2rem; }

        .form-group { display: flex; flex-direction: column; gap: 0.5rem; }

        .form-label {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text-secondary);
        }

        .form-input, .form-textarea {
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 1rem;
          padding: 0.85rem 1rem;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          font-weight: 300;
          resize: vertical;
        }

        .form-input:focus, .form-textarea:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 2px rgba(0,212,255,0.1), inset 0 0 20px rgba(0,212,255,0.03);
        }

        .form-textarea { min-height: 140px; }

        .form-submit {
          width: 100%;
          font-family: var(--font-mono);
          font-size: 0.85rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 1rem;
          background: var(--accent);
          color: var(--bg);
          border: none;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s;
        }

        .form-submit:hover {
          background: var(--accent-2);
          box-shadow: 0 0 30px rgba(0,212,255,0.3);
        }

        .form-submit.success {
          background: var(--accent-2);
          color: var(--bg);
        }

        /* FOOTER */
        footer {
          border-top: 1px solid var(--border);
          padding: 2rem 2.5rem;
          text-align: center;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-secondary);
          letter-spacing: 0.1em;
          position: relative;
          z-index: 1;
        }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          nav { padding: 1rem 1.5rem; }
          .nav-links { display: none; }
          .hamburger { display: flex; }

          #home { flex-direction: column; padding: 7rem 1.5rem 4rem; }
          .hero-visual {
            position: relative; right: auto; top: auto;
            transform: none;
            width: 220px; height: 220px;
            margin: 2rem auto 0;
          }

          .about-grid { grid-template-columns: 1fr; gap: 3rem; }
          .about-image-box { max-height: 320px; aspect-ratio: auto; height: 320px; }

          .skills-grid { grid-template-columns: 1fr; gap: 0; }

          .projects-grid { grid-template-columns: 1fr; }

          .contact-grid { grid-template-columns: 1fr; gap: 3rem; }

          .stats-row { grid-template-columns: repeat(3, 1fr); }

          .section-inner { padding: 4rem 1.5rem; }
        }

        @media (max-width: 480px) {
          .stats-row { grid-template-columns: 1fr 1fr; }
          .hero-name { font-size: 2.4rem; }
        }
      `}</style>

      {/* NAV */}
      <nav>
        <div className="nav-logo">C.HATHCOCK</div>
        <ul className="nav-links">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <button
                className={activeSection === link ? "active" : ""}
                onClick={() => scrollTo(link)}
              >
                {link}
              </button>
            </li>
          ))}
        </ul>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {NAV_LINKS.map((link) => (
          <button key={link} onClick={() => scrollTo(link)}>{link}</button>
        ))}
      </div>

      {/* HERO */}
      <section id="home">
        <div id="home" style={{ maxWidth: 1200, margin: "0 auto", padding: "8rem 2.5rem 4rem", minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", width: "100%" }}>
          <div className="hero-content" style={{ animation: "fadeUp 1s ease both" }}>
            <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }`}</style>
            <div className="hero-badge">Senior Nuclear Engineer</div>
            <h1 className="hero-name">Cassey<br />Hathcock</h1>
            <p className="hero-title">Nuclear Reactor Design · Safety Analysis · Project Management</p>
            <p className="hero-desc">
              Distinguished engineer with 14+ years of expertise in nuclear reactor design, advanced safety analysis, and federal regulatory compliance — driving next-generation nuclear innovation.
            </p>
            <div className="hero-cta">
              <button className="btn-primary" onClick={() => scrollTo("Contact")}>Get In Touch</button>
              <button className="btn-secondary" onClick={() => scrollTo("About")}>View Profile</button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="profile-ring">
              <div className="profile-img-wrapper">
                {/* REPLACE: Set image path below, e.g. src="/images/cassey-profile.jpg" */}
                {false ? (
                  <img src="/images/cassey-profile.jpg" alt="Cassey Hathcock" />
                ) : (
                  <div className="profile-placeholder">
                    <span>👤</span>
                    <span>ADD PHOTO</span>
                    <span style={{ fontSize: "0.6rem", opacity: 0.5 }}>src="/images/profile.jpg"</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="section-inner">
          <AnimatedSection>
            <p className="section-label">// 01. about</p>
            <h2 className="section-title">Profile</h2>
            <div className="section-divider" />
          </AnimatedSection>
          <div className="about-grid">
            <AnimatedSection>
              <div className="about-image-box">
                {/* REPLACE: Set image path below, e.g. src="/images/cassey-about.jpg" */}
                {false ? (
                  <img className="about-img" src="/images/cassey-about.jpg" alt="Cassey Hathcock" />
                ) : (
                  <div className="about-img-placeholder">
                    <span>🖼️</span>
                    <span>ADD ABOUT IMAGE</span>
                    <span style={{ fontSize: "0.7rem", opacity: 0.5 }}>src="/images/about.jpg"</span>
                  </div>
                )}
              </div>
            </AnimatedSection>
            <AnimatedSection>
              <div className="about-text">
                <p>
                  Distinguished Senior Nuclear Engineer and Project Manager with over <strong style={{ color: "var(--accent)" }}>14 years</strong> of comprehensive experience in nuclear reactor design, advanced safety analysis, and federal regulatory compliance.
                </p>
                <p>
                  Expert in utilizing high-fidelity simulation tools — including <strong style={{ color: "var(--accent-2)" }}>RELAP5, MCNP6, SCALE/TRITON,</strong> and <strong style={{ color: "var(--accent-2)" }}>TRACE</strong> — to model complex reactor kinetics, thermal-hydraulic transients, and radiation transport.
                </p>
                <p>
                  Proven track record in directing multi-disciplinary engineering teams, managing large-scale environmental remediation projects, and synthesizing multi-dimensional data into high-stakes technical reports for the <strong style={{ color: "var(--accent)" }}>Nuclear Regulatory Commission (NRC)</strong>.
                </p>
                <div className="stats-row">
                  <div className="stat-card">
                    <div className="stat-num">14+</div>
                    <div className="stat-label">Years Experience</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-num">4</div>
                    <div className="stat-label">Simulation Tools</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-num">NRC</div>
                    <div className="stat-label">Certified</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <div className="section-inner">
          <AnimatedSection>
            <p className="section-label">// 02. expertise</p>
            <h2 className="section-title">Skills & Tools</h2>
            <div className="section-divider" />
          </AnimatedSection>
          <AnimatedSection>
            <div className="skills-categories">
              {Object.entries(categoryColors).map(([cat, color]) => (
                <span
                  key={cat}
                  className="cat-badge"
                  style={{ borderColor: color, color }}
                >
                  {cat}
                </span>
              ))}
            </div>
          </AnimatedSection>
          <div className="skills-grid">
            {SKILLS.map((skill, i) => (
              <SkillBar key={skill.name} skill={skill} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="section-inner">
          <AnimatedSection>
            <p className="section-label">// 03. work</p>
            <h2 className="section-title">Key Projects</h2>
            <div className="section-divider" />
          </AnimatedSection>
          <div className="projects-grid">
            {PROJECTS.map((project, i) => (
              <AnimatedSection key={i}>
                <div className="project-card">
                  {project.image ? (
                    <img className="project-img" src={project.image} alt={project.title} />
                  ) : (
                    <div className="project-img-placeholder">
                      <span>{project.placeholder}</span>
                      <span>ADD PROJECT IMAGE</span>
                      <span style={{ fontSize: "0.65rem", opacity: 0.4 }}>
                        Set project.image in PROJECTS array
                      </span>
                    </div>
                  )}
                  <div className="project-body">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-desc">{project.description}</p>
                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="section-inner">
          <AnimatedSection>
            <p className="section-label">// 04. contact</p>
            <h2 className="section-title">Get In Touch</h2>
            <div className="section-divider" />
          </AnimatedSection>
          <div className="contact-grid">
            <AnimatedSection>
              <div>
                <div className="contact-info-item">
                  <div className="contact-icon">📍</div>
                  <div>
                    <div className="contact-label">Location</div>
                    <div className="contact-value">Oklahoma City, Oklahoma</div>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-icon">✉️</div>
                  <div>
                    <div className="contact-label">Email</div>
                    <div className="contact-value">
                      <a href="mailto:casseyhath@outlook.com">casseyhath@outlook.com</a>
                    </div>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-icon">⚛️</div>
                  <div>
                    <div className="contact-label">Specialization</div>
                    <div className="contact-value">Nuclear Engineering & Project Management</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    className="form-input"
                    type="text"
                    required
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    className="form-input"
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-textarea"
                    required
                    placeholder="How can I help you?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
                <button className={`form-submit ${submitted ? "success" : ""}`} type="submit">
                  {submitted ? "✓ Message Sent!" : "Send Message →"}
                </button>
              </form>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <span>© 2025 CASSEY HATHCOCK · NUCLEAR ENGINEER · OKLAHOMA CITY, OK</span>
      </footer>
    </>
  );
}
