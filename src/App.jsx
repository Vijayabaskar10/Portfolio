import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ----------------------------------------------------------------------
// CUSTOM HOOKS & UTILITIES (Replacing external dependencies)
// ----------------------------------------------------------------------

const TypingEffect = ({ words }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 2000);
      return () => clearTimeout(timeout);
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 50 : 100, parseInt(Math.random() * 150)));
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <span>
      {words[index].substring(0, subIndex)}
      <span className="animate-pulse text-purple-400">|</span>
    </span>
  );
};

const ScrollLink = ({ to, children, className, onClick, activeClass }) => {
  const handleClick = (e) => {
    e.preventDefault();
    const element = document.getElementById(to);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    if (onClick) onClick();
  };
  return (
    <a href={`#${to}`} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

const ParticlesBackground = () => {
  const particles = Array.from({ length: 40 });
  return (
    <div className="fixed inset-0 pointer-events-none z-[0] overflow-hidden bg-[#050816]">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1 + "px",
            height: Math.random() * 3 + 1 + "px",
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
            backgroundColor: i % 2 === 0 ? "#00f0ff" : "#a855f7",
          }}
          animate={{
            y: [0, Math.random() * 100 - 50],
            x: [0, Math.random() * 100 - 50],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const TiltCard = ({ children, className }) => (
  <motion.div
    whileHover={{ scale: 1.02, y: -5 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className={className}
  >
    {children}
  </motion.div>
);

// ----------------------------------------------------------------------
// SVG ICONS (Replacing react-icons to ensure compilation)
// ----------------------------------------------------------------------

const Icons = {
  Github: ({ className }) => <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>,
  Linkedin: ({ className }) => <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>,
  Hackerrank: ({ className }) => <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M11.984 0L1.094 6.333v11.334L11.984 24l10.922-6.333V6.333L11.984 0zm5.625 15.667l-2.016 1.166v-4.114h-7.22v4.114l-2.015-1.166V8.333l2.015-1.166v4.114h7.22V7.167l2.016 1.166v7.334z"/></svg>,
  Mail: ({ className }) => <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>,
  Code: ({ className }) => <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>,
  Database: ({ className }) => <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>,
  Server: ({ className }) => <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>,
  Globe: ({ className }) => <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>,
  Terminal: ({ className }) => <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>,
  Graduation: ({ className }) => <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>,
  Link: ({ className }) => <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>,
  Bars: ({ className }) => <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>,
  Times: ({ className }) => <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  Phone: ({ className }) => <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>,
  Map: ({ className }) => <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>,
  React: ({ className }) => <svg className={className} viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor"><circle cx="0" cy="0" r="2.05"/><g stroke="currentColor" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>
};

// ----------------------------------------------------------------------
// DATA MODELS
// ----------------------------------------------------------------------

const skillsData = [
  { category: "Programming", items: [
      { name: "Java", icon: <Icons.Code className="w-5 h-5 text-orange-500" />, level: 90 },
      { name: "HTML", icon: <Icons.Globe className="w-5 h-5 text-orange-600" />, level: 95 },
      { name: "CSS", icon: <Icons.Globe className="w-5 h-5 text-blue-500" />, level: 85 },
      { name: "SQL", icon: <Icons.Database className="w-5 h-5 text-blue-400" />, level: 80 }
    ]
  },
  { category: "Frontend", items: [
      { name: "React.js", icon: <Icons.React className="w-5 h-5 text-cyan-400" />, level: 85 },
      { name: "Bootstrap 5", icon: <Icons.Globe className="w-5 h-5 text-purple-500" />, level: 90 },
      { name: "Responsive Design", icon: <Icons.Globe className="w-5 h-5 text-cyan-300" />, level: 95 }
    ]
  },
  { category: "Networking", items: [
      { name: "Wireshark", icon: <Icons.Server className="w-5 h-5 text-blue-600" />, level: 75 },
      { name: "Cisco Packet Tracer", icon: <Icons.Server className="w-5 h-5 text-cyan-500" />, level: 80 },
      { name: "Networking Basics", icon: <Icons.Terminal className="w-5 h-5 text-gray-400" />, level: 85 }
    ]
  }
];

const toolsData = [
  { name: "Git", icon: <Icons.Terminal className="w-12 h-12 text-[#F05032]" /> },
  { name: "GitHub", icon: <Icons.Github className="w-12 h-12 text-white" /> },
  { name: "VS Code", icon: <Icons.Code className="w-12 h-12 text-[#007ACC]" /> },
  { name: "Wireshark", icon: <Icons.Server className="w-12 h-12 text-[#1660EA]" /> },
  { name: "Packet Tracer", icon: <Icons.Server className="w-12 h-12 text-[#049FD9]" /> }
];

const certificationsData = [
  { title: "NPTEL — Programming in Java", issuer: "NPTEL", link: "https://archive.nptel.ac.in/content/noc/NOC25/SEM1/Ecertificates/106/noc25-cs57/Course/NPTEL25CS57S125870083504437489.pdf" },
  { title: "Applied Database Systems", issuer: "Oracle", link: "#" },
  { title: "CSS (Basic)", issuer: "HackerRank", link: "https://www.hackerrank.com/certificates/ebbca74768e8" },
  { title: "Java (Basic)", issuer: "HackerRank", link: "https://www.hackerrank.com/certificates/4d12aa5d7ea8" },
  { title: "Basics of Cloud Computing", issuer: "Udemy", link: "https://udemy-certificate.s3.amazonaws.com/pdf/UC-36d0f878-6144-4684-89d4-f17e25920581.pdf" },
  { title: "Getting Started with Cisco Packet Tracer", issuer: "Cisco Networking Academy", link: "https://www.netacad.com/certificates/?issuanceId=332a3dad-1741-403e-b00e-3280fbe7911c" },
  { title: "Advanced Software Engineering Job Simulation", issuer: "Walmart USA", link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/prBZoAihniNijyD6d/oX6f9BbCL9kJDJzfg_prBZoAihniNijyD6d_ENapZiXL7DtwnWp2W_1751036652139_completion_certificate.pdf" },
  { title: "Front-End Software Engineering Job Simulation", issuer: "Skyscanner", link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/skoQmxqhtgWmKv2pm/km4rw7dihDr3etqom_skoQmxqhtgWmKv2pm_ENapZiXL7DtwnWp2W_1751086569480_completion_certificate.pdf" }
];

// ----------------------------------------------------------------------
// REUSABLE COMPONENTS
// ----------------------------------------------------------------------

const FadeIn = ({ children, delay = 0, direction = "up" }) => {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  };
  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

const SectionHeading = ({ title, subtitle }) => (
  <div className="text-center mb-16 relative z-10">
    <motion.h2 
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-4 tracking-wider"
    >
      {title}
    </motion.h2>
    {subtitle && <p className="text-gray-400 text-lg uppercase tracking-widest">{subtitle}</p>}
    <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto mt-4 rounded-full shadow-[0_0_10px_#00f0ff]" />
  </div>
);

// ----------------------------------------------------------------------
// SECTIONS
// ----------------------------------------------------------------------

const Loader = ({ onLoadingComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onLoadingComplete, 2800);
    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050816]"
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="relative flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          className="absolute w-32 h-32 border-t-2 border-b-2 border-cyan-400 rounded-full"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="absolute w-24 h-24 border-l-2 border-r-2 border-purple-500 rounded-full shadow-[0_0_15px_#a855f7]"
        />
        <motion.h1 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-400 z-10"
        >
          VJB
        </motion.h1>
      </div>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-cyan-200 tracking-[0.2em] font-light text-sm shadow-cyan-500"
      >
        INITIALIZING PORTFOLIO EXPERIENCE...
      </motion.p>
    </motion.div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["Home", "About", "Skills", "Tools", "Projects", "Certifications", "Contact"];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-40 transition-all duration-300 ${scrolled ? "bg-[#050816]/90 backdrop-blur-md border-b border-cyan-900/50 shadow-[0_4px_30px_rgba(0,240,255,0.1)] py-4" : "bg-transparent py-6"}`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center relative z-10">
        <ScrollLink to="Home" className="cursor-pointer">
          <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 hover:drop-shadow-[0_0_10px_rgba(0,240,255,0.8)] transition-all">
            VJB
          </span>
        </ScrollLink>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-8">
          {navLinks.map((item, idx) => (
            <li key={idx}>
              <ScrollLink 
                to={item} 
                className="text-gray-300 hover:text-cyan-400 cursor-pointer font-medium transition-all text-sm uppercase tracking-wider relative group"
              >
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all group-hover:w-full"></span>
              </ScrollLink>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <div className="md:hidden text-2xl text-cyan-400 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <Icons.Times className="w-6 h-6" /> : <Icons.Bars className="w-6 h-6" />}
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0f24]/95 backdrop-blur-lg border-b border-purple-500/30 overflow-hidden"
          >
            <ul className="flex flex-col items-center py-6 space-y-6">
              {navLinks.map((item, idx) => (
                <li key={idx}>
                  <ScrollLink 
                    to={item} 
                    onClick={() => setIsOpen(false)}
                    className="text-gray-200 hover:text-cyan-400 cursor-pointer text-lg tracking-widest uppercase font-bold"
                  >
                    {item}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const HeroSection = () => {
  return (
    <section id="Home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 flex flex-col-reverse md:flex-row items-center z-10">
        
        {/* Left Content */}
        <div className="w-full md:w-3/5 text-center md:text-left mt-12 md:mt-0">
          <FadeIn delay={0.2} direction="right">
            <h3 className="text-cyan-400 text-xl md:text-2xl font-semibold mb-2 tracking-wide">
              Hello, I am
            </h3>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              Vijayabaskar M
            </h1>
            <h4 className="text-lg md:text-xl text-gray-400 mb-6 font-medium">
              Final Year Computer Science and Engineering Student
            </h4>
            
            <div className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-6 h-12">
              <TypingEffect words={[
                  "Java Developer", 
                  "Frontend Developer", 
                  "React Developer", 
                  "Networking Enthusiast"
              ]} />
            </div>

            <p className="text-gray-300 max-w-lg mb-8 leading-relaxed mx-auto md:mx-0 text-lg">
              Passionate about building modern web applications, solving complex technical problems, and exploring the depths of networking technologies.
            </p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-10">
              <ScrollLink to="Projects">
                <motion.button 
                  whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(0, 240, 255, 0.6)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-cyan-500 text-[#050816] font-bold rounded-full transition-all"
                >
                  Explore Projects
                </motion.button>
              </ScrollLink>
              <ScrollLink to="Contact">
                <motion.button 
                  whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(168, 85, 247, 0.6)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 border border-purple-500 text-purple-400 font-bold rounded-full hover:bg-purple-500/10 transition-all"
                >
                  Contact Me
                </motion.button>
              </ScrollLink>
            </div>

            <div className="flex space-x-6 justify-center md:justify-start text-2xl text-gray-400">
              {[
                { icon: <Icons.Github className="w-7 h-7" />, link: "https://github.com/Vijayabaskar10", color: "hover:text-white" },
                { icon: <Icons.Linkedin className="w-7 h-7" />, link: "https://www.linkedin.com/in/vjbaskar10", color: "hover:text-[#0A66C2]" },
                { icon: <Icons.Mail className="w-7 h-7" />, link: "mailto:vijayabaskarm10@gmail.com", color: "hover:text-red-400" },
                { icon: <Icons.Hackerrank className="w-7 h-7" />, link: "https://www.hackerrank.com/vijayabaskarm10", color: "hover:text-[#00EA64]" }
              ].map((item, idx) => (
                <motion.a 
                  key={idx} href={item.link} target="_blank" rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.2 }}
                  className={`transition-colors duration-300 drop-shadow-lg ${item.color}`}
                >
                  {item.icon}
                </motion.a>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Right Illustration */}
        <div className="w-full md:w-2/5 flex justify-center relative">
          <FadeIn delay={0.4} direction="left">
            <TiltCard className="relative w-72 h-72 md:w-96 md:h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full animate-pulse blur-2xl opacity-40"></div>
              <div className="absolute inset-2 bg-[#050816] rounded-full border border-cyan-500/30 flex items-center justify-center overflow-hidden z-10 shadow-[0_0_40px_rgba(0,240,255,0.2)]">
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="text-cyan-400 drop-shadow-[0_0_20px_#00f0ff]"
                >
                  <Icons.React className="w-32 h-32" />
                </motion.div>
              </div>
              {/* Floating Tech Badges */}
              <motion.div animate={{ y: [-15, 15, -15] }} transition={{ duration: 5, repeat: Infinity }} className="absolute -top-4 -left-4 bg-[#111827] p-4 rounded-xl border border-purple-500/50 shadow-lg shadow-purple-500/20 z-20 text-orange-500">
                <Icons.Code className="w-8 h-8" />
              </motion.div>
              <motion.div animate={{ y: [15, -15, 15] }} transition={{ duration: 6, repeat: Infinity }} className="absolute bottom-4 -right-4 bg-[#111827] p-4 rounded-xl border border-blue-500/50 shadow-lg shadow-blue-500/20 z-20 text-blue-500">
                <Icons.Globe className="w-8 h-8" />
              </motion.div>
            </TiltCard>
          </FadeIn>
        </div>

      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section id="About" className="py-24 bg-[#0a0f24] relative border-t border-cyan-900/30">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <SectionHeading title="About Me" subtitle="My Background & Education" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <FadeIn direction="right">
            <div className="bg-[#111827]/80 backdrop-blur-md border border-cyan-500/20 p-8 rounded-2xl shadow-[0_0_30px_rgba(0,240,255,0.05)] hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] transition-all">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Icons.Graduation className="w-8 h-8 text-cyan-400" /> Education
              </h3>
              <div className="pl-6 border-l-2 border-purple-500/50 relative">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_10px_#00f0ff]" />
                <h4 className="text-xl font-bold text-cyan-300">Saranathan College of Engineering</h4>
                <p className="text-gray-400 mb-1">Tiruchirappalli</p>
                <p className="text-white font-medium mb-3">B.E. Computer Science and Engineering</p>
                <div className="inline-block px-4 py-1 bg-purple-500/20 border border-purple-500/50 rounded-full text-purple-300 text-sm font-bold shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                  CGPA: 7.82 (Till 5th Semester)
                </div>
                <p className="text-cyan-500 text-sm mt-3 font-semibold uppercase tracking-widest animate-pulse">Final Year Student</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="left" delay={0.2}>
            <div className="text-gray-300 text-lg leading-relaxed space-y-6">
              <p>
                I am a Final Year Computer Science and Engineering student with a strong interest in <span className="text-cyan-400 font-semibold">software development, frontend technologies, Java programming, and networking technologies.</span>
              </p>
              <p>
                I enjoy creating responsive web applications and continuously improving my technical skills through projects, certifications, and practical hands-on learning. I strive to build intuitive and dynamic user experiences.
              </p>
              <div className="bg-[#050816] p-6 rounded-xl border border-purple-500/30 shadow-inner">
                <h4 className="text-purple-400 font-bold mb-3 uppercase tracking-wider text-sm">Currently Focused On:</h4>
                <div className="flex flex-wrap gap-3">
                  {["Java", "React", "Frontend Development", "SQL", "Networking technologies"].map((item, idx) => (
                    <span key={idx} className="px-3 py-1 bg-cyan-900/30 text-cyan-300 rounded-md text-sm border border-cyan-700/50 hover:bg-cyan-500 hover:text-[#050816] transition-colors cursor-default">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

const SkillsSection = () => {
  return (
    <section id="Skills" className="py-24 relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-900/10 to-transparent pointer-events-none" />
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <SectionHeading title="Skills Showcase" subtitle="My Technical Proficiency" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillsData.map((category, idx) => (
            <FadeIn key={idx} delay={idx * 0.2}>
              <TiltCard className="h-full">
                <div className="bg-[#111827]/80 backdrop-blur-md border border-gray-800 p-8 rounded-2xl h-full hover:border-cyan-500/50 transition-colors group shadow-lg">
                  <h3 className="text-2xl font-bold text-white mb-6 text-center group-hover:text-cyan-400 transition-colors">
                    {category.category}
                  </h3>
                  <div className="space-y-6">
                    {category.items.map((skill, sIdx) => (
                      <div key={sIdx}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300 flex items-center gap-2 font-medium">
                            {skill.icon} {skill.name}
                          </span>
                          <span className="text-cyan-400 text-sm font-bold">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                            className="bg-gradient-to-r from-cyan-400 to-purple-500 h-2 rounded-full relative"
                          >
                            <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full shadow-[0_0_10px_#fff] animate-pulse" />
                          </motion.div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const ToolsSection = () => {
  return (
    <section id="Tools" className="py-24 bg-[#0a0f24] relative border-y border-cyan-900/30">
      <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
        <SectionHeading title="Technologies & Tools" subtitle="What I use daily" />
        
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {toolsData.map((tool, idx) => (
            <FadeIn key={idx} delay={idx * 0.1} direction="up">
              <TiltCard>
                <div className="w-32 h-32 md:w-40 md:h-40 bg-[#050816] rounded-2xl border border-gray-800 hover:border-cyan-500 flex flex-col items-center justify-center gap-4 transition-all group shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(0,240,255,0.3)] cursor-pointer">
                  <div className="group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">
                    {tool.icon}
                  </div>
                  <span className="text-gray-400 font-medium group-hover:text-cyan-300 transition-colors">
                    {tool.name}
                  </span>
                </div>
              </TiltCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectsSection = () => {
  return (
    <section id="Projects" className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <SectionHeading title="Featured Project" subtitle="Real-world implementation" />

        <FadeIn delay={0.2}>
          <TiltCard>
            <div className="relative bg-[#111827] rounded-3xl overflow-hidden border border-gray-800 hover:border-purple-500/50 transition-all shadow-2xl flex flex-col md:flex-row group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="w-full md:w-5/12 bg-[#0a0f24] p-12 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <h3 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 z-10 group-hover:scale-110 transition-transform duration-500">
                  SwapSkill <span className="text-purple-500">AI</span>
                </h3>
              </div>

              <div className="w-full md:w-7/12 p-8 md:p-12 z-10">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors">SwapSkill AI</h3>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-bold border border-purple-500/30 uppercase tracking-wide">Devpost Platform</span>
                </div>
                
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                  A comprehensive project focused on <span className="text-white font-semibold">skill-sharing and AI-assisted collaboration</span>. The platform seamlessly connects users who want to exchange knowledge and skills efficiently, fostering a community of mutual growth.
                </p>

                <div className="mb-8">
                  <h4 className="text-sm text-gray-500 uppercase tracking-widest mb-3 font-semibold">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {["React", "HTML", "CSS", "Bootstrap", "JavaScript"].map((tech, i) => (
                      <span key={i} className="px-4 py-1.5 bg-[#050816] border border-cyan-800 text-cyan-300 rounded-full text-sm font-medium shadow-[0_0_10px_rgba(0,240,255,0.1)]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-sm text-gray-500 uppercase tracking-widest mb-3 font-semibold">Key Features</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-300">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-purple-500 rounded-full shadow-[0_0_5px_#a855f7]"></div> Responsive UI</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-cyan-500 rounded-full shadow-[0_0_5px_#00f0ff]"></div> Skill-sharing platform</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-purple-500 rounded-full shadow-[0_0_5px_#a855f7]"></div> Interactive frontend</li>
                  </ul>
                </div>

                <div className="flex gap-4">
                  <a href="https://github.com/Vijayabaskar10/SkillSwap-ai" target="_blank" rel="noopener noreferrer" 
                     className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors">
                    <Icons.Github className="w-5 h-5" /> View Repository
                  </a>
                </div>
              </div>
            </div>
          </TiltCard>
        </FadeIn>
      </div>
    </section>
  );
};

const CertificationsSection = () => {
  return (
    <section id="Certifications" className="py-24 bg-[#0a0f24] relative border-y border-purple-900/30">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <SectionHeading title="Certifications" subtitle="Achievements & Learning" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificationsData.map((cert, idx) => (
            <FadeIn key={idx} delay={idx * 0.1}>
              <TiltCard className="h-full">
                <a href={cert.link} target="_blank" rel="noopener noreferrer" className="block h-full">
                  <div className="h-full bg-[#111827] border border-gray-800 hover:border-cyan-500/60 p-6 rounded-xl flex flex-col justify-between group transition-all hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] relative overflow-hidden">
                    <div className="absolute -right-10 -top-10 w-32 h-32 bg-cyan-600/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>
                    
                    <div>
                      <div className="text-purple-500 mb-4 group-hover:text-cyan-400 group-hover:scale-110 transition-all origin-left">
                        <Icons.Graduation className="w-8 h-8" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-cyan-300 transition-colors">
                        {cert.title}
                      </h3>
                      <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">
                        {cert.issuer}
                      </p>
                    </div>
                    
                    <div className="mt-6 flex items-center text-cyan-500 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                      View Credential <Icons.Link className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </a>
              </TiltCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section id="Contact" className="py-24 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-cyan-900/20 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <SectionHeading title="Initiate Contact" subtitle="Let's build something together" />

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left: Info */}
          <div className="w-full lg:w-1/3">
            <FadeIn direction="right">
              <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2 h-full bg-gradient-to-b from-cyan-400 to-purple-500"></div>
                
                <h3 className="text-2xl font-bold text-white mb-8">Contact Information</h3>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-[#0a0f24] rounded-full flex items-center justify-center text-cyan-400 border border-cyan-500/30 group-hover:bg-cyan-500 group-hover:text-[#050816] transition-all shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                      <Icons.Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm uppercase tracking-wider font-semibold">Phone</p>
                      <p className="text-white font-medium text-lg">9488450114</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-[#0a0f24] rounded-full flex items-center justify-center text-purple-400 border border-purple-500/30 group-hover:bg-purple-500 group-hover:text-[#050816] transition-all shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                      <Icons.Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm uppercase tracking-wider font-semibold">Email</p>
                      <a href="mailto:vijayabaskarm10@gmail.com" className="text-white font-medium text-lg hover:text-purple-400 transition-colors break-all">
                        vijayabaskarm10@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-[#0a0f24] rounded-full flex items-center justify-center text-cyan-400 border border-cyan-500/30 group-hover:bg-cyan-500 group-hover:text-[#050816] transition-all shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                      <Icons.Map className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm uppercase tracking-wider font-semibold">Location</p>
                      <p className="text-white font-medium text-lg">Tiruchirappalli</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-800">
                  <p className="text-gray-400 mb-4 font-medium">Social Connect</p>
                  <div className="flex gap-4">
                    <a href="https://github.com/Vijayabaskar10" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
                      <Icons.Github className="w-5 h-5" />
                    </a>
                    <a href="https://www.linkedin.com/in/vjbaskar10" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-[#0A66C2] transition-colors">
                      <Icons.Linkedin className="w-5 h-5" />
                    </a>
                    <a href="https://www.hackerrank.com/vijayabaskarm10" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-[#00EA64] transition-colors">
                      <Icons.Hackerrank className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right: Form */}
          <div className="w-full lg:w-2/3">
            <FadeIn direction="left" delay={0.2}>
              <form 
                className="bg-[#111827]/80 backdrop-blur-md p-8 md:p-12 rounded-2xl border border-gray-800 shadow-2xl relative"
                onSubmit={(e) => { e.preventDefault(); alert("System Message: Message transmission successful."); }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="relative group">
                    <input type="text" id="name" required className="w-full bg-transparent border-b-2 border-gray-700 text-white py-3 px-2 focus:outline-none focus:border-cyan-400 peer transition-colors" placeholder=" " />
                    <label htmlFor="name" className="absolute left-2 top-3 text-gray-500 transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-cyan-400 peer-valid:-top-4 peer-valid:text-xs peer-valid:text-cyan-400 cursor-text">
                      Your Name
                    </label>
                  </div>
                  <div className="relative group">
                    <input type="email" id="email" required className="w-full bg-transparent border-b-2 border-gray-700 text-white py-3 px-2 focus:outline-none focus:border-purple-500 peer transition-colors" placeholder=" " />
                    <label htmlFor="email" className="absolute left-2 top-3 text-gray-500 transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-purple-400 peer-valid:-top-4 peer-valid:text-xs peer-valid:text-purple-400 cursor-text">
                      Email Address
                    </label>
                  </div>
                </div>

                <div className="relative group mb-8">
                  <input type="text" id="subject" required className="w-full bg-transparent border-b-2 border-gray-700 text-white py-3 px-2 focus:outline-none focus:border-cyan-400 peer transition-colors" placeholder=" " />
                  <label htmlFor="subject" className="absolute left-2 top-3 text-gray-500 transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-cyan-400 peer-valid:-top-4 peer-valid:text-xs peer-valid:text-cyan-400 cursor-text">
                    Subject
                  </label>
                </div>

                <div className="relative group mb-10">
                  <textarea id="message" rows="4" required className="w-full bg-transparent border-b-2 border-gray-700 text-white py-3 px-2 focus:outline-none focus:border-purple-500 peer transition-colors resize-none" placeholder=" "></textarea>
                  <label htmlFor="message" className="absolute left-2 top-3 text-gray-500 transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-purple-400 peer-valid:-top-4 peer-valid:text-xs peer-valid:text-purple-400 cursor-text">
                    Transmission Message
                  </label>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(0, 240, 255, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-bold rounded-lg uppercase tracking-widest text-sm hover:from-cyan-500 hover:to-purple-500 transition-all flex justify-center items-center gap-2"
                >
                  Send Message
                </motion.button>
              </form>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#02040a] py-12 border-t border-gray-800 relative">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center relative z-10">
        
        <div className="text-center md:text-left mb-6 md:mb-0">
          <ScrollLink to="Home" className="cursor-pointer inline-block mb-2">
            <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              VJB
            </h2>
          </ScrollLink>
          <p className="text-gray-500 text-sm">
            Futuristic Developer Portfolio
          </p>
        </div>

        <div className="flex flex-col items-center mb-6 md:mb-0">
          <ul className="flex space-x-6 mb-4">
            {["Home", "About", "Projects", "Contact"].map((item, idx) => (
              <li key={idx}>
                <ScrollLink to={item} className="text-gray-400 hover:text-cyan-400 text-sm cursor-pointer uppercase tracking-wider transition-colors">
                  {item}
                </ScrollLink>
              </li>
            ))}
          </ul>
          <div className="flex space-x-4 text-xl">
            <a href="https://github.com/Vijayabaskar10" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors"><Icons.Github className="w-5 h-5"/></a>
            <a href="https://www.linkedin.com/in/vjbaskar10" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#0A66C2] transition-colors"><Icons.Linkedin className="w-5 h-5"/></a>
          </div>
        </div>

        <div className="text-center md:text-right">
          <ScrollLink to="Home">
            <motion.div 
              whileHover={{ y: -5 }}
              className="w-12 h-12 border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-400 cursor-pointer mx-auto md:ml-auto md:mr-0 mb-4 transition-all"
            >
              <div className="transform -rotate-90">➔</div>
            </motion.div>
          </ScrollLink>
          <p className="text-gray-600 text-sm">
            &copy; 2026 Vijayabaskar M. <br/>All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

// ----------------------------------------------------------------------
// MAIN APP COMPONENT
// ----------------------------------------------------------------------

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="bg-[#050816] min-h-screen text-white font-sans selection:bg-cyan-500 selection:text-black">
      <AnimatePresence>
        {loading && <Loader onLoadingComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1 }}
        >
          {/* Custom Lightweight Particles Replacement */}
          <ParticlesBackground />

          <Navbar />
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ToolsSection />
          <ProjectsSection />
          <CertificationsSection />
          <ContactSection />
          <Footer />
        </motion.div>
      )}
    </div>
  );
}