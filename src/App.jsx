import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Home", "About", "Skills", "Projects", "CAD Work", "Contact"];

const SKILLS = [
  // Nuclear Simulation Tools
  { name: "RELAP5", level: 95, category: "Simulation" },
  { name: "TRACE", level: 92, category: "Simulation" },
  { name: "MCNP6", level: 93, category: "Simulation" },
  { name: "SCALE/TRITON", level: 90, category: "Simulation" },
  // Nuclear Engineering
  { name: "Reactor Core Physics & Neutronics", level: 97, category: "Engineering" },
  { name: "Thermal-Hydraulic Transient Analysis (LOCA)", level: 96, category: "Engineering" },
  { name: "Fuel Depletion & Reactivity Control", level: 93, category: "Engineering" },
  { name: "Radiation Shielding Design", level: 91, category: "Engineering" },
  { name: "Probabilistic Risk Assessment (PRA)", level: 89, category: "Engineering" },
  { name: "Radioactive Waste Management", level: 88, category: "Engineering" },
  // Regulatory & Safety
  { name: "NRC 10 CFR Part 50/52 Compliance", level: 97, category: "Regulatory" },
  { name: "Safety Analysis Reports (SAR/LRA)", level: 95, category: "Regulatory" },
  { name: "NEPA / Environmental Impact Statements", level: 92, category: "Regulatory" },
  { name: "Emergency Operating Procedures (EOPs)", level: 90, category: "Regulatory" },
  // CAD & Design Tools (for AI Trainer role)
  { name: "SolidWorks", level: 85, category: "CAD & Design" },
  { name: "AutoCAD Mechanical", level: 80, category: "CAD & Design" },
  { name: "AutoDesk Inventor", level: 78, category: "CAD & Design" },
  { name: "FreeCAD / FreeCAD BIM", level: 75, category: "CAD & Design" },
  { name: "Rhino 3D", level: 72, category: "CAD & Design" },
  // Software & Programming
  { name: "Python (NumPy / Pandas)", level: 82, category: "Software" },
  { name: "MATLAB / Simulink", level: 80, category: "Software" },
  // Leadership & Communication
  { name: "PMP-Certified Project Management", level: 93, category: "Leadership" },
  { name: "Multi-disciplinary Team Leadership", level: 94, category: "Leadership" },
  { name: "Technical Report Writing", level: 96, category: "Leadership" },
  { name: "Vendor Oversight & Model Validation", level: 90, category: "Leadership" },
];

const PROJECTS = [
  {
    title: "SLR Safety Analysis — Dual-Unit PWR ($2.5M)",
    description:
      "Directed a $2.5 million Subsequent License Renewal safety analysis project for a dual-unit Pressurized Water Reactor plant at Enercon Services. Led multi-disciplinary teams through rigorous NRC review, resulting in successful approval for a 20-year license extension.",
    tags: ["RELAP5", "NRC", "License Renewal", "PWR", "Safety Analysis"],
    image: null,
    placeholder: "⚛️",
  },
  {
    title: "Extended Power Uprate — Thermal-Hydraulic Analysis",
    description:
      "Conducted RELAP5 modeling for a 5% Extended Power Uprate (EPU) at a commercial nuclear facility. Identified and mitigated thermal-hydraulic bottlenecks in the primary coolant system, increasing plant output while fully maintaining required safety margins.",
    tags: ["RELAP5", "TRACE", "Power Uprate", "Thermal-Hydraulic"],
    image: null,
    placeholder: "🔬",
  },
  {
    title: "AP1000® Next-Gen Fuel Cycle Design — Westinghouse",
    description:
      "Spearheaded the design of a high-burnup fuel cycle model at Westinghouse Electric Company for AP1000® PWRs using MCNP6 and SCALE/TRITON. Achieved a 15% improvement in fuel cycle efficiency and a 10% reduction in radioactive waste generation across client utilities.",
    tags: ["MCNP6", "SCALE/TRITON", "AP1000", "Fuel Cycle", "Westinghouse"],
    image: null,
    placeholder: "🏭",
  },
  {
    title: "Radiation Shielding Design Review",
    description:
      "Led a cross-functional team at Westinghouse in reviewing and optimizing radiation shielding for a new reactor containment design. Ensured compliance with international safety standards and reduced projected worker dose rates by 20%.",
    tags: ["MCNP6", "Shielding Design", "Safety", "Regulatory"],
    image: null,
    placeholder: "🛡️",
  },
  {
    title: "Vogtle 3 & 4 — Initial Core Loading Support",
    description:
      "Provided technical oversight for initial core loading procedures for new reactor units at Plant Vogtle (Southern Company). Ensured 100% compliance with all safety protocols with zero incidents during this critical commissioning phase.",
    tags: ["Core Loading", "Southern Company", "Safety Protocols", "Plant Vogtle"],
    image: null,
    placeholder: "🌐",
  },
  {
    title: "Thermal Discharge Environmental Study",
    description:
      "Conducted a multi-year environmental impact study on thermal discharge into local water bodies at Plant Vogtle. Data-driven findings led to improved cooling tower protocols, reducing thermal environmental impact by 15%.",
    tags: ["Environmental Analysis", "NEPA", "Thermal Discharge", "EIS"],
    image: null,
    placeholder: "🌍",
  },
];

// CAD Work samples — the technical drawings for the AI Trainer role
// These images should be placed in public/images/cad/
const CAD_WORK = [
  {
    title: "Supermarket Display Unit",
    description:
      "Multi-view orthographic technical drawing of a commercial supermarket display rack, including front elevation, side section, and isometric views with full dimensioning.",
    tags: ["Technical Drawing", "Orthographic Views", "Dimensioning"],
    image: "/images/supermarket_display_unit.jpeg",
    placeholder: "🗂️",
    note: "Add image: /images/supermarket-display-unit.jpg",
  },
  {
    title: "Standard Distribution Board",
    description:
      "Detailed CAD drawing of an electrical standard distribution board, showing front panel, side cross-section, and component layout with precise measurements.",
    tags: ["Electrical CAD", "Distribution Board", "Technical Drawing"],
    image: "/images/standard_distribution_board.jpeg", // Set to "/images/cad/sdb-standard.jpg"
    placeholder: "⚡",
    note: "Add image: /images/cad/sdb-standard.jpg",
  },
  {
    title: "6-Way Surface Distribution Board (6-W SDB)",
    description:
      "Complete multi-angle CAD documentation for a 6-way surface-mounted distribution board, including internal layout, cable entry positions, and mounting specifications.",
    tags: ["SDB", "Electrical Engineering", "Multi-view CAD"],
    image: "/images/6-W_SDB.jpeg", // Set to "/images/cad/6w-sdb.jpg"
    placeholder: "🔌",
    note: "Add image: /images/cad/6w-sdb.jpg",
  },
  {
    title: "Structural Panel Assembly",
    description:
      "Technical assembly drawing of a structural panel system with mounting bracket details, hole patterns, and hardware specifications for industrial installation.",
    tags: ["Structural CAD", "Assembly Drawing", "Panel Design"],
    image: "/images/structural_panel_assembly.jpeg", // Set to "/images/cad/panel-assembly.jpg"
    placeholder: "🔩",
    note: "Add image: /images/cad/panel-assembly.jpg",
  },
  {
    title: "Light Duty Warehouse Rack",
    description:
      "3D isometric CAD model of a light-duty warehouse storage rack, detailing steel frame construction, shelf tier spacing, and load-bearing structural connections.",
    tags: ["3D Modeling", "Storage Systems", "Structural Design"],
    image: "/images/light_duty_rack.jpeg", // Set to "/images/cad/warehouse-rack.jpg"
    placeholder: "🏗️",
    note: "Add image: /images/cad/warehouse-rack.jpg",
  },
  {
    title: "Hospital Bed",
    description:
      "Detailed 3D CAD model of a medical-grade hospital bed featuring articulating frame, safety side rails, castored base, and ergonomic mattress platform geometry.",
    tags: ["Medical Equipment", "3D Modeling", "Product Design"],
    image: "/images/hospital_bed.jpeg", // Set to "/images/cad/hospital-bed.jpg"
    placeholder: "🏥",
    note: "Add image: /images/cad/hospital-bed.jpg",
  },
  {
    title: "Wall Mount Network Server Rack",
    description:
      "Isometric 3D render of a wall-mounted network server enclosure with ventilated top panel, glazed front door, and internal rack-unit spacing for equipment mounting.",
    tags: ["Enclosure Design", "IT Infrastructure", "3D Modeling"],
    image: "/images/wall_mount.jpeg",
    placeholder: "🖥️",
    note: "Add image: /images/cad/server-rack.jpg",
  },
  {
    title: "Electric Socket Column",
    description:
      "3D CAD model of a floor-standing electric socket distribution column with modular panel slots, cable management channels, and a robust structural base frame.",
    tags: ["Electrical Infrastructure", "Product Design", "3D Modeling"],
    image: "/images/electric_socket.jpeg",
    placeholder: "🔋",
    note: "Add image: /images/cad/socket-column.jpg",
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
    "CAD & Design": "#ff6b9d",
    Software: "#ffdd00",
    Leadership: "#bf7fff",
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
            <p className="hero-title">Nuclear Reactor Design · Safety Analysis · CAD & Technical Drawing</p>
            <p className="hero-desc">
              Distinguished Senior Nuclear Engineer & PMP-certified Project Manager with 14+ years across Enercon Services, Westinghouse Electric, and Southern Company — specializing in reactor design, NRC regulatory compliance, and high-fidelity simulation.
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
                {true ? (
                  <img src="/images/profile_picture.png" alt="Cassey Hathcock" />
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
                {true ? (
                  <img className="about-img" src="/images/about_me.png" alt="Cassey Hathcock" />
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
                  Distinguished Senior Nuclear Engineer and PMP-certified Project Manager with over <strong style={{ color: "var(--accent)" }}>14 years</strong> of experience spanning Enercon Services, Westinghouse Electric Company, and Southern Company (Plant Vogtle).
                </p>
                <p>
                  Expert in high-fidelity simulation tools — <strong style={{ color: "var(--accent-2)" }}>RELAP5, MCNP6, SCALE/TRITON, TRACE</strong> — for reactor kinetics, thermal-hydraulic transient analysis, and radiation transport. Also proficient in <strong style={{ color: "var(--accent-2)" }}>SolidWorks, AutoCAD Mechanical, AutoDesk Inventor,</strong> and <strong style={{ color: "var(--accent-2)" }}>FreeCAD</strong> for technical CAD and engineering drawing.
                </p>
                <p>
                  Holds a <strong style={{ color: "var(--accent)" }}>Master of Science in Nuclear Engineering</strong> from NC State University (2011) and a B.S. Summa Cum Laude (2009), Tau Beta Pi Honor Society. Licensed <strong style={{ color: "var(--accent)" }}>Professional Engineer (PE)</strong> in Oklahoma & North Carolina, <strong style={{ color: "var(--accent)" }}>PMP</strong>, and <strong style={{ color: "var(--accent)" }}>Certified Safety Professional (CSP)</strong>.
                </p>
                <div className="stats-row">
                  <div className="stat-card">
                    <div className="stat-num">14+</div>
                    <div className="stat-label">Years Experience</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-num">PE</div>
                    <div className="stat-label">Licensed Engineer</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-num">PMP</div>
                    <div className="stat-label">Certified PM</div>
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

      {/* CAD WORK */}
      <section id="cad work">
        <div className="section-inner">
          <AnimatedSection>
            <p className="section-label">// 04. cad & technical drawing</p>
            <h2 className="section-title">CAD Work Samples</h2>
            <div className="section-divider" />
            <p style={{ color: "var(--text-secondary)", marginBottom: "2.5rem", maxWidth: "680px", fontSize: "1rem", fontWeight: 300 }}>
              Technical CAD drawings produced using AutoCAD Mechanical and SolidWorks — demonstrating precision drafting, multi-view orthographic documentation, and engineering drawing standards relevant to AI training data creation and validation.
            </p>
          </AnimatedSection>
          <div className="projects-grid">
            {CAD_WORK.map((work, i) => (
              <AnimatedSection key={i}>
                <div className="project-card">
                  {work.image ? (
                    <img className="project-img" src={work.image} alt={work.title} />
                  ) : (
                    <div className="project-img-placeholder">
                      <span>{work.placeholder}</span>
                      <span>ADD CAD IMAGE</span>
                      <span style={{ fontSize: "0.62rem", opacity: 0.4 }}>{work.note}</span>
                    </div>
                  )}
                  <div className="project-body">
                    <h3 className="project-title">{work.title}</h3>
                    <p className="project-desc">{work.description}</p>
                    <div className="project-tags">
                      {work.tags.map((tag) => (
                        <span key={tag} className="tag" style={{ borderColor: "rgba(255,107,157,0.4)", color: "#ff6b9d", background: "rgba(255,107,157,0.05)" }}>{tag}</span>
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
            <p className="section-label">// 05. contact</p>
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
                  <div className="contact-icon">📞</div>
                  <div>
                    <div className="contact-label">Phone</div>
                    <div className="contact-value">
                      <a href="tel:+19182827214">(918) 282-7214</a>
                    </div>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-icon">🏅</div>
                  <div>
                    <div className="contact-label">Certifications</div>
                    <div className="contact-value">PE (OK & NC) · PMP · CSP</div>
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
        <span>© 2025 CASSEY HATHCOCK · SENIOR NUCLEAR ENGINEER & PROJECT MANAGER · OKLAHOMA CITY, OK</span>
      </footer>
    </>
  );
}
