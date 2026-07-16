import React, { useRef, useState } from "react";
import { Box, Typography, Container, Grid, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { Code, Database, Shield, Music, Terminal, Palette } from "lucide-react";

// ─────────────────────────────────────────────
// SHARED PRIMITIVES
// ─────────────────────────────────────────────

const NoiseOverlay = () => (
  <Box sx={{
    position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", opacity: 0.03,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
    backgroundSize: "256px 256px",
  }} />
);

const GridBg = ({ opacity = 0.018 }) => (
  <Box sx={{
    position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
    backgroundImage: `
      linear-gradient(rgba(0,187,249,${opacity}) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,187,249,${opacity}) 1px, transparent 1px)
    `,
    backgroundSize: "72px 72px",
  }} />
);

const Orb = ({ size, top, left, right, bottom, color, delay = 0, opacity = 1 }) => (
  <motion.div
    animate={{ scale: [1, 1.12, 1], opacity: [opacity * 0.65, opacity, opacity * 0.65] }}
    transition={{ duration: 18, repeat: Infinity, delay, ease: "easeInOut" }}
    style={{
      position: "absolute", width: size, height: size,
      top, left, right, bottom, borderRadius: "50%",
      background: color, filter: "blur(130px)",
      pointerEvents: "none", zIndex: 0,
    }}
  />
);

// ─────────────────────────────────────────────
// SPOTLIGHT CARD
// ─────────────────────────────────────────────

const SpotlightCard = ({ children, color = "#00BBF9", sx = {}, onClick }) => {
  const cardRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <Box
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        position: "relative",
        borderRadius: "18px",
        border: "1px solid rgba(255,255,255,0.055)",
        background: "linear-gradient(160deg, rgba(255,255,255,0.022) 0%, rgba(255,255,255,0.008) 100%)",
        overflow: "hidden",
        cursor: onClick ? "pointer" : "default",
        transition: "border-color 0.28s ease, transform 0.28s ease, box-shadow 0.28s ease",
        "&:hover": {
          border: `1px solid ${color}25`,
          transform: "translateY(-4px)",
          boxShadow: `0 28px 72px rgba(0,0,0,0.55), 0 0 0 1px ${color}12`,
        },
        ...sx,
      }}
    >
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.22 }}
        style={{
          position: "absolute", pointerEvents: "none", zIndex: 0,
          width: 320, height: 320, borderRadius: "50%",
          background: `radial-gradient(circle, ${color}10 0%, transparent 70%)`,
          left: mouse.x - 160, top: mouse.y - 160,
        }}
      />
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1px",
          background: `linear-gradient(90deg, transparent, ${color}55, transparent)`,
          zIndex: 2,
        }}
      />
      <Box sx={{ position: "relative", zIndex: 1 }}>{children}</Box>
    </Box>
  );
};

// ─────────────────────────────────────────────
// ANIMATED SKILL BAR
// ─────────────────────────────────────────────

const SkillBar = ({ skill, level, color }) => {
  const theme = useTheme();
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.85 }}>
        <Typography sx={{ fontSize: "0.78rem", fontWeight: 600, color: theme.palette.text.secondary, fontFamily: "monospace", letterSpacing: "0.02em" }}>
          {skill}
        </Typography>
        <Typography sx={{ fontSize: "0.7rem", color: color, fontWeight: 700, fontFamily: "monospace" }}>
          {level}%
        </Typography>
      </Box>
      <Box sx={{ height: 4, background: "rgba(255,255,255,0.04)", borderRadius: "4px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.04)" }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
          style={{
            height: "100%",
            background: `linear-gradient(90deg, ${color}70, ${color})`,
            borderRadius: "4px",
            boxShadow: `0 0 8px ${color}50`,
          }}
        />
      </Box>
    </Box>
  );
};

// ─────────────────────────────────────────────
// SECTION HEADER
// ─────────────────────────────────────────────

const SectionHeader = ({ eyebrow, title, color }) => {
  const theme = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
    >
      <Box sx={{ mb: 10 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
          <Box sx={{ width: 18, height: 1, background: color, opacity: 0.6 }} />
          <Typography sx={{ fontFamily: "monospace", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.2em", color }}>
            {eyebrow}
          </Typography>
        </Box>
        <Typography sx={{ fontWeight: 900, letterSpacing: "-0.035em", lineHeight: 1.02, fontSize: { xs: "2.4rem", md: "3.4rem" } }}>
          {title}
        </Typography>
      </Box>
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const skillCategories = [
  {
    name: "Cybersecurity",
    icon: <Shield size={16} />,
    color: "#00BBF9",
    desc: "Defensive security spanning incident response, threat analysis, and network hardening — with hands-on experience across Windows and Linux environments.",
    skills: ["Incident Response", "Windows Security", "Linux Security", "Threat Analysis", "Network Security", "Vulnerability Assessment", "Security Auditing", "SIEM"],
    proficiency: [
      { label: "Incident Response", value: 95 },
      { label: "Threat Analysis", value: 90 },
      { label: "Network Security", value: 87 },
      { label: "Vulnerability Assessment", value: 82 },
    ],
  },
  {
    name: "Frontend",
    icon: <Code size={16} />,
    color: "#FDCFF3",
    desc: "Component-driven UIs with React and Redux, built with security baked in — XSS prevention, secure auth flows, and OWASP best practices throughout.",
    skills: ["React", "Redux", "Material-UI", "CSS3", "Framer Motion", "JavaScript ES6+", "XSS Prevention", "Secure Auth"],
    proficiency: [
      { label: "React / Redux", value: 85 },
      { label: "JavaScript ES6+", value: 88 },
      { label: "CSS3 / Material-UI", value: 82 },
      { label: "Secure Auth", value: 85 },
    ],
  },
  {
    name: "Backend",
    icon: <Database size={16} />,
    color: "#DC136C",
    desc: "Node.js/Express APIs with PostgreSQL — rate limiting, parameterized queries, RBAC, and JWT authentication designed from the ground up for security.",
    skills: ["Node.js", "Express.js", "PostgreSQL", "MySQL", "REST APIs", "JWT Auth", "Rate Limiting", "API Security"],
    proficiency: [
      { label: "Node.js / Express", value: 75 },
      { label: "PostgreSQL", value: 70 },
      { label: "JWT Auth", value: 82 },
      { label: "Secure API Design", value: 85 },
    ],
  },
  {
    name: "Audio Engineering",
    icon: <Music size={16} />,
    color: "#7B61FF",
    desc: "C++ plugin development with JUCE — DSP pipelines, FFT analysis, and audio production tooling bridging engineering and creative disciplines.",
    skills: ["JUCE Framework", "C++", "DSP", "FFT Analysis", "Plugin Development", "Audio Production", "Mixing & Mastering"],
    proficiency: [
      { label: "C++ / JUCE", value: 78 },
      { label: "DSP / FFT", value: 74 },
      { label: "Plugin Development", value: 70 },
      { label: "Audio Production", value: 88 },
    ],
  },
  {
    name: "Tools & DevOps",
    icon: <Terminal size={16} />,
    color: "#00BBF9",
    desc: "CLI-first workflow — Git, AWS, CI/CD pipelines, and environment security. Comfortable across terminal, VS Code, and cloud infrastructure.",
    skills: ["Git", "VS Code", "Terminal / CLI", "AWS", "CI/CD", "Package Managers", "Env Security"],
    proficiency: [
      { label: "Git / Version Control", value: 88 },
      { label: "Terminal / CLI", value: 85 },
      { label: "AWS", value: 68 },
      { label: "CI/CD", value: 72 },
    ],
  },
  {
    name: "Design",
    icon: <Palette size={16} />,
    color: "#DC136C",
    desc: "UI/UX from concept to component — visual design, prototyping, and component architecture that balances aesthetics with usability.",
    skills: ["UI Design", "Component Architecture", "Visual Design", "User Experience", "Prototyping"],
    proficiency: [
      { label: "UI Design", value: 82 },
      { label: "Component Architecture", value: 80 },
      { label: "User Experience", value: 75 },
      { label: "Prototyping", value: 70 },
    ],
  },
];

const projectData = [
  {
    title: "CompTIA Security+",
    subtitle: "Industry-recognized cybersecurity certification",
    image: "/Images/Untitled.jpg",
    color: "#00BBF9",
    desc: "Validates comprehensive cybersecurity knowledge across threat management, cryptography, identity management, and network security.",
    highlights: [
      "Comprehensive coverage of all 5 exam domains",
      "DoD-approved baseline certification (8570/8140)",
      "Validates both technical and operational security skills",
    ],
    skills: [
      { label: "Network Security", value: 90 },
      { label: "Threat Management", value: 85 },
      { label: "Risk Assessment", value: 88 },
      { label: "Security Protocols", value: 87 },
    ],
    tech: ["Encryption", "Firewalls", "IDS/IPS", "VPN", "PKI", "Compliance"],
  },
  {
    title: "SOC Log Analyzer",
    subtitle: "Cross-platform Python threat detection tool",
    image: "/Images/eventlogger.jpg",  // ← add your screenshot here
    color: "#00BBF9",
    desc: "A Python-based log analysis tool that ingests Linux auth logs and Windows Event Log exports, automatically detects threats, correlates brute force attacks, and maps every finding to MITRE ATT&CK technique IDs.",
    highlights: [
      "Brute force correlation engine fires a single alert from 5+ failed logins within 60 seconds, replicating core SIEM logic used in Splunk",
      "Auto-detects Linux syslog vs Windows CSV format with zero configuration needed",
      "15+ detection rules covering privilege escalation, RDP logins, new account creation, and audit log tampering",
      "Exports severity-ranked triage reports to CSV and JSON for downstream analysis",
    ],
    skills: [
      { label: "Threat Detection", value: 90 },
      { label: "Log Analysis", value: 88 },
      { label: "Python Scripting", value: 85 },
      { label: "MITRE ATT&CK", value: 87 },
    ],
    tech: ["Python", "MITRE ATT&CK", "Windows Event Logs", "Linux Auth Logs", "Regex", "CSV", "JSON"],
  },
  {
    title: "TDX Arena IR Expert",
    subtitle: "Hands-on incident response simulations",
    image: "/Images/cert.jpg",
    color: "#DC136C",
    desc: "Advanced cybersecurity training through real-world IR scenarios — memory forensics, malware triage, PCAP analysis, and threat detection.",
    highlights: [
      "Memory forensics on compromised Windows systems",
      "Malware triage using ClamAV and static analysis tools",
      "End-to-end threat detection with Wireshark and Snort",
    ],
    skills: [
      { label: "Incident Response", value: 95 },
      { label: "Threat Analysis", value: 90 },
      { label: "Windows Security", value: 85 },
      { label: "Linux Security", value: 80 },
    ],
    tech: ["Windows", "Linux", "ClamAV", "Snort", "Wireshark", "tcpdump", "Forensics"],
  },
];

// ══════════════════════════════════════════════
// SKILLS PAGE
// ══════════════════════════════════════════════

const Skills = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(skillCategories[0].name);

  const activeCategory = skillCategories.find((c) => c.name === activeTab);

  return (
    <Box sx={{ minHeight: "100vh", background: theme.palette.background.default, overflowX: "hidden" }}>

      {/* ── HERO ── */}
      <Box sx={{ position: "relative", pt: { xs: 14, md: 22 }, pb: { xs: 12, md: 18 }, overflow: "hidden" }}>
        <GridBg />
        <NoiseOverlay />
        <Orb size={800} top="-22%" left="-18%"
          color={`radial-gradient(circle, ${theme.palette.tertiary.main}45, ${theme.palette.accent.main}22, transparent 68%)`}
          delay={0} opacity={0.85}
        />
        <Orb size={550} bottom="-12%" right="-12%"
          color={`radial-gradient(circle, ${theme.palette.primary.main}38, transparent 68%)`}
          delay={6} opacity={0.8}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}>

            {/* Eyebrow */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 5 }}>
              <Box sx={{ width: 18, height: 1, background: theme.palette.tertiary.main, opacity: 0.6 }} />
              <Typography sx={{ fontFamily: "monospace", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.2em", color: theme.palette.tertiary.main }}>
                TECHNICAL ARSENAL
              </Typography>
            </Box>

            {/* Headline */}
            <Box sx={{ mb: 5 }}>
              <Typography sx={{
                fontWeight: 900, lineHeight: 0.93, letterSpacing: "-0.048em",
                fontSize: { xs: "4rem", sm: "5.5rem", md: "7.5rem" },
                color: theme.palette.text.primary,
              }}>
                technical
              </Typography>
              <Typography sx={{
                fontWeight: 900, lineHeight: 0.93, letterSpacing: "-0.048em",
                fontSize: { xs: "4rem", sm: "5.5rem", md: "7.5rem" },
                background: `linear-gradient(110deg, ${theme.palette.tertiary.main} 0%, ${theme.palette.accent.main} 50%, ${theme.palette.primary.main} 100%)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundSize: "200% 100%",
                animation: "shimmer 4s ease infinite",
                "@keyframes shimmer": {
                  "0%": { backgroundPosition: "0% 50%" },
                  "50%": { backgroundPosition: "100% 50%" },
                  "100%": { backgroundPosition: "0% 50%" },
                },
              }}>
                expertise
              </Typography>
            </Box>

            <Typography sx={{
              fontSize: { xs: "0.95rem", md: "1.05rem" },
              color: theme.palette.text.secondary,
              maxWidth: 500, lineHeight: 1.9, letterSpacing: "0.005em",
            }}>
              Multi-domain skill set spanning cybersecurity, full-stack development,
              and audio engineering — with a security-first approach throughout.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* ── SKILL CATEGORIES (TABBED) ── */}
      <Box sx={{ py: { xs: 12, md: 16 }, position: "relative" }}>
        <GridBg />
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>

          <SectionHeader eyebrow="CORE COMPETENCIES" title="Skills Overview" color={theme.palette.primary.main} />

          {/* Tab bar */}
          <Box sx={{ display: "flex", gap: "6px", flexWrap: "wrap", mb: 4 }}>
            {skillCategories.map((cat) => (
              <Box
                key={cat.name}
                onClick={() => setActiveTab(cat.name)}
                sx={{
                  display: "flex", alignItems: "center", gap: "8px",
                  px: 1.75, py: 1,
                  borderRadius: "8px",
                  border: activeTab === cat.name
                    ? "1px solid rgba(255,255,255,0.18)"
                    : "1px solid rgba(255,255,255,0.055)",
                  background: activeTab === cat.name
                    ? "rgba(255,255,255,0.055)"
                    : "transparent",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  color: activeTab === cat.name
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
                  fontSize: "0.82rem",
                  fontWeight: activeTab === cat.name ? 600 : 400,
                  userSelect: "none",
                  "&:hover": {
                    background: "rgba(255,255,255,0.035)",
                    color: theme.palette.text.primary,
                    borderColor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                <Box sx={{
                  display: "flex",
                  color: activeTab === cat.name ? cat.color : "inherit",
                  transition: "color 0.15s ease",
                }}>
                  {cat.icon}
                </Box>
                {cat.name}
              </Box>
            ))}
          </Box>

          {/* Active panel */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <SpotlightCard color={activeCategory.color}>
              <Grid container>

                {/* Left: description + chips */}
                <Grid item xs={12} md={6}>
                  <Box sx={{
                    p: { xs: 3.5, md: 5 },
                    display: "flex", flexDirection: "column", gap: 3,
                    borderRight: { md: "1px solid rgba(255,255,255,0.045)" },
                    borderBottom: { xs: "1px solid rgba(255,255,255,0.045)", md: "none" },
                    height: "100%",
                  }}>
                    {/* Title + desc */}
                    <Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                        <Box sx={{
                          p: 1.1, display: "flex",
                          background: `${activeCategory.color}0D`,
                          border: `1px solid ${activeCategory.color}1A`,
                          borderRadius: "9px",
                          color: activeCategory.color,
                        }}>
                          {activeCategory.icon}
                        </Box>
                        <Typography sx={{ fontWeight: 800, fontSize: "1.25rem", letterSpacing: "-0.02em", color: theme.palette.text.primary }}>
                          {activeCategory.name}
                        </Typography>
                      </Box>
                      <Typography sx={{ fontSize: "0.88rem", color: theme.palette.text.secondary, lineHeight: 1.9 }}>
                        {activeCategory.desc}
                      </Typography>
                    </Box>

                    <Box sx={{ height: "1px", background: "rgba(255,255,255,0.045)" }} />

                    {/* Skill chips */}
                    <Box>
                      <Typography sx={{ fontSize: "0.58rem", fontFamily: "monospace", color: theme.palette.text.disabled, letterSpacing: "0.18em", mb: 1.75, textTransform: "uppercase" }}>
                        Technologies
                      </Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8 }}>
                        {activeCategory.skills.map((skill, j) => (
                          <motion.div
                            key={skill}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: j * 0.03, duration: 0.2 }}
                          >
                            <Box sx={{
                              px: 1.35, py: 0.55,
                              fontSize: "0.68rem", fontFamily: "monospace", letterSpacing: "0.025em",
                              color: "rgba(255,255,255,0.7)",
                              background: "rgba(255,255,255,0.03)",
                              border: "1px solid rgba(255,255,255,0.065)",
                              borderRadius: "999px",
                              cursor: "default",
                              transition: "all 0.15s ease",
                              "&:hover": {
                                color: activeCategory.color,
                                background: `${activeCategory.color}0C`,
                                border: `1px solid ${activeCategory.color}30`,
                              },
                            }}>
                              {skill}
                            </Box>
                          </motion.div>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </Grid>

                {/* Right: proficiency bars */}
                <Grid item xs={12} md={6}>
                  <Box sx={{ p: { xs: 3.5, md: 5 }, display: "flex", flexDirection: "column", gap: 3 }}>
                    <Typography sx={{ fontSize: "0.58rem", fontFamily: "monospace", color: theme.palette.text.disabled, letterSpacing: "0.18em", textTransform: "uppercase" }}>
                      Proficiency
                    </Typography>
                    <Stack spacing={2.5}>
                      {activeCategory.proficiency.map((s, j) => (
                        <motion.div
                          key={s.label}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: j * 0.07, duration: 0.3 }}
                        >
                          <SkillBar skill={s.label} level={s.value} color={activeCategory.color} />
                        </motion.div>
                      ))}
                    </Stack>
                  </Box>
                </Grid>

              </Grid>
            </SpotlightCard>
          </motion.div>

        </Container>
      </Box>

      {/* ── PROJECTS / CERTS ── */}
      <Box sx={{ py: { xs: 12, md: 18 }, position: "relative", overflow: "hidden" }}>
        <GridBg />
        <NoiseOverlay />
        <Orb size={600} top="5%" right="-8%"
          color={`radial-gradient(circle, ${theme.palette.accent.main}22, transparent 70%)`}
          delay={4} opacity={0.8}
        />
        <Orb size={400} bottom="10%" left="-6%"
          color={`radial-gradient(circle, ${theme.palette.primary.main}18, transparent 70%)`}
          delay={9} opacity={0.6}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>

          <SectionHeader eyebrow="FEATURED PROJECTS" title="Technical Showcase" color={theme.palette.accent.main} />

          <Stack spacing={4}>
            {projectData.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <SpotlightCard color={project.color}>
                  <Grid container>

                    {/* Image column */}
                    {project.image && (
                      <Grid item xs={12} md={3}>
                        <Box sx={{
                          height: { xs: 180, md: "100%" }, maxHeight: { md: 350 },
                          background: "rgba(0,0,0,0.45)",
                          position: "relative", overflow: "hidden",
                          borderRight: { md: "1px solid rgba(255,255,255,0.04)" },
                          borderBottom: { xs: "1px solid rgba(255,255,255,0.04)", md: "none" },
                          borderRadius: { xs: "16px 16px 0 0", md: "16px 0 0 16px" },
                        }}>
                          <Box
                            component="img"
                            src={project.image}
                            alt={project.title}
                            sx={{ width: "100%", height: "100%", objectFit: "contain", p: { xs: 3, md: 4 }, opacity: 0.9 }}
                          />
                          <Box sx={{ position: "absolute", inset: 0, background: `linear-gradient(145deg, ${project.color}08, transparent 60%)` }} />
                          <Box sx={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(transparent, rgba(8,8,14,0.6))", display: { xs: "block", md: "none" } }} />
                        </Box>
                      </Grid>
                    )}

                    {/* Content column */}
                    <Grid item xs={12} md={project.image ? 9 : 12}>
                      <Box sx={{ p: { xs: 3.5, md: 5 }, display: "flex", flexDirection: "column", gap: 3, height: "100%" }}>

                        {/* Status tag */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Box sx={{
                            display: "inline-flex", alignItems: "center", gap: 0.75,
                            px: 1.4, py: 0.45,
                            fontSize: "0.58rem", fontFamily: "monospace", letterSpacing: "0.12em",
                            color: project.color,
                            background: `${project.color}0C`,
                            border: `1px solid ${project.color}20`,
                            borderRadius: "5px",
                          }}>
                            <Box
                              component={motion.div}
                              animate={{ opacity: [1, 0.25, 1] }}
                              transition={{ duration: 2.5, repeat: Infinity }}
                              sx={{ width: 4, height: 4, borderRadius: "50%", background: project.color, boxShadow: `0 0 5px ${project.color}` }}
                            />
                            COMPLETE
                          </Box>
                        </Box>

                        {/* Title block */}
                        <Box>
                          <Typography sx={{
                            fontWeight: 900, letterSpacing: "-0.028em", lineHeight: 1.08, mb: 0.75,
                            fontSize: { xs: "1.55rem", md: "2.1rem" },
                            color: theme.palette.text.primary,
                          }}>
                            {project.title}
                          </Typography>
                          <Typography sx={{ fontSize: "0.7rem", fontFamily: "monospace", color: theme.palette.text.disabled, letterSpacing: "0.05em" }}>
                            {project.subtitle}
                          </Typography>
                        </Box>

                        <Typography sx={{ fontSize: "0.88rem", color: theme.palette.text.secondary, lineHeight: 1.88, letterSpacing: "0.004em" }}>
                          {project.desc}
                        </Typography>

                        {/* Highlights */}
                        <Box>
                          <Typography sx={{ fontSize: "0.58rem", fontFamily: "monospace", color: theme.palette.text.disabled, letterSpacing: "0.18em", mb: 1.75, textTransform: "uppercase" }}>
                            Key Highlights
                          </Typography>
                          <Stack spacing={1.2}>
                            {project.highlights.map((h, j) => (
                              <motion.div
                                key={j}
                                initial={{ opacity: 0, x: -8 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.08 + j * 0.06 }}
                              >
                                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.75 }}>
                                  <Box sx={{
                                    flexShrink: 0, mt: 0.7,
                                    width: 4, height: 4, borderRadius: "50%",
                                    background: project.color, opacity: 0.65,
                                    boxShadow: `0 0 6px ${project.color}`,
                                  }} />
                                  <Typography sx={{ fontSize: "0.85rem", color: theme.palette.text.secondary, lineHeight: 1.75 }}>
                                    {h}
                                  </Typography>
                                </Box>
                              </motion.div>
                            ))}
                          </Stack>
                        </Box>

                        {/* Skill bars */}
                        <Box>
                          <Typography sx={{ fontSize: "0.58rem", fontFamily: "monospace", color: theme.palette.text.disabled, letterSpacing: "0.18em", mb: 2, textTransform: "uppercase" }}>
                            Proficiency
                          </Typography>
                          <Grid container spacing={2.5}>
                            {project.skills.map((s, j) => (
                              <Grid item xs={12} sm={6} key={j}>
                                <SkillBar skill={s.label} level={s.value} color={project.color} />
                              </Grid>
                            ))}
                          </Grid>
                        </Box>

                        {/* Tech stack */}
                        <Box sx={{ pt: 2.5, borderTop: "1px solid rgba(255,255,255,0.045)", mt: "auto" }}>
                          <Typography sx={{ fontSize: "0.58rem", fontFamily: "monospace", color: theme.palette.text.disabled, letterSpacing: "0.18em", mb: 1.5, textTransform: "uppercase" }}>
                            Tech Stack
                          </Typography>
                          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8 }}>
                            {project.tech.map((t) => (
                              <Box
                                key={t}
                                sx={{
                                  px: 1.4, py: 0.45,
                                  fontSize: "0.62rem", fontFamily: "monospace", letterSpacing: "0.04em",
                                  color: project.color, fontWeight: 700,
                                  background: `${project.color}09`,
                                  border: `1px solid ${project.color}18`,
                                  borderRadius: "5px",
                                  transition: "all 0.18s ease",
                                  "&:hover": { background: `${project.color}18`, border: `1px solid ${project.color}30` },
                                }}
                              >
                                {t}
                              </Box>
                            ))}
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </SpotlightCard>
              </motion.div>
            ))}
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Skills;
