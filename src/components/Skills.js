import React from "react";
import { Box, Typography, Container, Grid, Stack, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { Code, Database, Shield, Music, Terminal, Palette } from "lucide-react";

// ── Shared backgrounds ──────────────────────────────────────────

const GridBg = () => (
  <Box sx={{
    position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
    backgroundImage: `
      linear-gradient(rgba(0,187,249,0.022) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,187,249,0.022) 1px, transparent 1px)
    `,
    backgroundSize: "80px 80px",
  }} />
);

const Orb = ({ size, top, left, right, bottom, color, delay = 0, opacity = 1 }) => (
  <motion.div
    animate={{ scale: [1, 1.1, 1], opacity: [opacity * 0.65, opacity, opacity * 0.65] }}
    transition={{ duration: 16, repeat: Infinity, delay, ease: "easeInOut" }}
    style={{
      position: "absolute", width: size, height: size,
      top, left, right, bottom, borderRadius: "50%",
      background: color, filter: "blur(120px)",
      pointerEvents: "none", zIndex: 0,
    }}
  />
);

// ── Skill bar ───────────────────────────────────────────────────

const SkillBar = ({ skill, level, color }) => {
  const theme = useTheme();
  return (
    <Box sx={{ mb: 0 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.75 }}>
        <Typography sx={{ fontSize: "0.82rem", fontWeight: 600, color: theme.palette.text.primary, fontFamily: "monospace" }}>{skill}</Typography>
        <Typography sx={{ fontSize: "0.75rem", color: color || theme.palette.tertiary.main, fontWeight: 700, fontFamily: "monospace" }}>{level}%</Typography>
      </Box>
      <Box sx={{ height: 5, background: "rgba(255,255,255,0.05)", borderRadius: "4px", overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.15 }}
          style={{
            height: "100%",
            background: color ? `linear-gradient(90deg, ${color}99, ${color})` : `linear-gradient(90deg, rgba(0,187,249,0.6), #00BBF9)`,
            borderRadius: "4px",
          }}
        />
      </Box>
    </Box>
  );
};

// ── Section label ───────────────────────────────────────────────

const Label = ({ text, color }) => {
  const theme = useTheme();
  return (
    <Typography sx={{
      fontFamily: "monospace", fontSize: "0.68rem", fontWeight: 700,
      letterSpacing: "0.18em", textTransform: "uppercase",
      color: color || theme.palette.text.disabled, mb: 2,
    }}>
      {text}
    </Typography>
  );
};

// ── Data ────────────────────────────────────────────────────────

const skillCategories = [
  {
    name: "Cybersecurity",
    icon: <Shield size={20} />,
    color: "#00BBF9",
    skills: ["Incident Response", "Windows Security", "Linux Security", "Threat Analysis", "Network Security", "Vulnerability Assessment", "Security Auditing", "SIEM"],
  },
  {
    name: "Frontend Development",
    icon: <Code size={20} />,
    color: "#FDCFF3",
    skills: ["React", "Redux", "Material-UI", "CSS3", "Framer Motion", "JavaScript ES6+", "XSS Prevention", "Secure Auth"],
  },
  {
    name: "Backend & Database",
    icon: <Database size={20} />,
    color: "#DC136C",
    skills: ["Node.js", "Express.js", "PostgreSQL", "MySQL", "REST APIs", "JWT Auth", "Rate Limiting", "API Security"],
  },
  {
    name: "Audio Engineering",
    icon: <Music size={20} />,
    color: "#7B61FF",
    skills: ["JUCE Framework", "C++", "DSP", "FFT Analysis", "Plugin Development", "Audio Production", "Mixing & Mastering"],
  },
  {
    name: "Development Tools",
    icon: <Terminal size={20} />,
    color: "#00BBF9",
    skills: ["Git", "VS Code", "Terminal / CLI", "AWS", "CI/CD", "Package Managers", "Env Security"],
  },
  {
    name: "Design & UI/UX",
    icon: <Palette size={20} />,
    color: "#DC136C",
    skills: ["UI Design", "Component Architecture", "Visual Design", "User Experience", "Prototyping"],
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
  {
    title: "DoomsProd Music Store",
    subtitle: "Secure full-stack e-commerce platform",
    color: "#7B61FF",
    desc: "Security-hardened marketplace for beats and audio kits, built with defense-in-depth architecture and OWASP best practices throughout the stack.",
    highlights: [
      "JWT authentication with rate limiting and input sanitization",
      "PCI-compliant Stripe integration with CSRF protection",
      "PostgreSQL with parameterized queries and RBAC",
    ],
    skills: [
      { label: "React / Redux", value: 85 },
      { label: "Node.js / Express", value: 75 },
      { label: "PostgreSQL", value: 70 },
      { label: "Secure API Design", value: 85 },
    ],
    tech: ["React", "Redux", "Node.js", "Express", "PostgreSQL", "Stripe", "JWT", "bcrypt"],
  },
];

// ══════════════════════════════════════════════════════════════
// SKILLS PAGE
// ══════════════════════════════════════════════════════════════

const Skills = () => {
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: "100vh", background: theme.palette.background.default, overflowX: "hidden" }}>

      {/* ── HERO HEADER ── */}
      <Box sx={{ position: "relative", pt: { xs: 14, md: 20 }, pb: { xs: 10, md: 16 }, overflow: "hidden" }}>
        <GridBg />
        <Orb size={700} top="-20%" left="-15%"
          color={`radial-gradient(circle, ${theme.palette.tertiary.main}40, ${theme.palette.accent.main}20, transparent 70%)`}
          delay={0} opacity={0.85} />
        <Orb size={500} bottom="-10%" right="-10%"
          color={`radial-gradient(circle, ${theme.palette.primary.main}35, transparent 70%)`}
          delay={6} opacity={0.8} />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
            <Label text="Technical Arsenal" color={theme.palette.tertiary.main} />
            <Typography sx={{
              fontWeight: 900,
              fontSize: { xs: "3.5rem", sm: "5rem", md: "7rem" },
              lineHeight: 0.95, letterSpacing: "-0.045em",
              mb: 4,
            }}>
              <Box component="span" sx={{ color: theme.palette.text.primary }}>technical</Box>
              <br />
              <Box component="span" sx={{
                background: `linear-gradient(100deg, ${theme.palette.tertiary.main}, ${theme.palette.accent.main} 50%, ${theme.palette.primary.main})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                expertise
              </Box>
            </Typography>
            <Typography sx={{
              fontSize: { xs: "1rem", md: "1.1rem" },
              color: theme.palette.text.secondary,
              maxWidth: 520, lineHeight: 1.85,
            }}>
              Multi-domain skill set spanning cybersecurity, full-stack development,
              and audio engineering — with a security-first approach throughout.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* ── SKILL CATEGORIES ── */}
      <Box sx={{ py: { xs: 10, md: 14 }, position: "relative" }}>
        <GridBg />
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <Label text="Core Competencies" color={theme.palette.primary.main} />
            <Typography sx={{ fontWeight: 900, fontSize: { xs: "2rem", md: "3rem" }, letterSpacing: "-0.03em", mb: 8 }}>
              Skills Overview
            </Typography>
          </motion.div>

          <Grid container spacing={3}>
            {skillCategories.map((cat, i) => (
              <Grid item xs={12} sm={6} lg={4} key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  style={{ height: "100%" }}
                >
                  <Box sx={{
                    height: "100%", p: 3.5, borderRadius: "16px",
                    border: "1px solid rgba(255,255,255,0.05)",
                    background: `linear-gradient(150deg, rgba(255,255,255,0.025), ${cat.color}06)`,
                    transition: "all 0.22s ease",
                    display: "flex", flexDirection: "column", gap: 2.5,
                    "&:hover": {
                      border: `1px solid ${cat.color}22`,
                      boxShadow: `0 16px 48px rgba(0,0,0,0.4), 0 0 28px ${cat.color}08`,
                      transform: "translateY(-3px)",
                    },
                  }}>
                    {/* Header */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.75 }}>
                      <Box sx={{
                        p: 1.4,
                        background: `${cat.color}0E`,
                        border: `1px solid ${cat.color}18`,
                        borderRadius: "10px",
                        color: cat.color, display: "flex",
                      }}>
                        {cat.icon}
                      </Box>
                      <Typography sx={{ fontWeight: 800, fontSize: "0.98rem", color: theme.palette.text.primary }}>
                        {cat.name}
                      </Typography>
                    </Box>

                    <Divider sx={{ borderColor: "rgba(255,255,255,0.05)" }} />

                    {/* Skills */}
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.85 }}>
                      {cat.skills.map((skill, j) => (
                        <motion.div
                          key={j}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: j * 0.04 }}
                        >
                          <Box sx={{
                            px: 1.4, py: 0.5,
                            fontSize: "0.72rem", fontFamily: "monospace",
                            color: theme.palette.text.secondary,
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.07)",
                            borderRadius: "5px",
                            letterSpacing: "0.02em",
                            transition: "all 0.18s ease",
                            "&:hover": {
                              color: cat.color,
                              background: `${cat.color}0C`,
                              border: `1px solid ${cat.color}20`,
                            },
                          }}>
                            {skill}
                          </Box>
                        </motion.div>
                      ))}
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── PROJECTS / CERTS ── */}
      <Box sx={{ py: { xs: 10, md: 16 }, position: "relative", overflow: "hidden" }}>
        <GridBg />
        <Orb size={600} top="10%" right="-10%"
          color={`radial-gradient(circle, ${theme.palette.accent.main}25, transparent 70%)`}
          delay={4} opacity={0.8} />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <Label text="Featured Projects" color={theme.palette.accent.main} />
            <Typography sx={{ fontWeight: 900, fontSize: { xs: "2rem", md: "3rem" }, letterSpacing: "-0.03em", mb: 10 }}>
              Technical Showcase
            </Typography>
          </motion.div>

          <Stack spacing={5}>
            {projectData.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55 }}
              >
                <Box sx={{
                  borderRadius: "20px", overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: `linear-gradient(145deg, rgba(255,255,255,0.025), ${project.color}05)`,
                  transition: "all 0.25s ease",
                  "&:hover": {
                    border: `1px solid ${project.color}22`,
                    boxShadow: `0 24px 80px rgba(0,0,0,0.5), 0 0 40px ${project.color}08`,
                    transform: "translateY(-3px)",
                  },
                }}>
                  <Grid container>

                    {/* Left — image (if exists) */}
                    {project.image && (
                      <Grid item xs={12} md={5}>
                        <Box sx={{
                          height: { xs: 50, md: "100%" }, minHeight: { md: 100 },
                          background: "rgba(0,0,0,0.4)",
                          position: "relative", overflow: "hidden",
                          borderRight: { md: "1px solid rgba(255,255,255,0.05)" },
                        }}>
                          <Box
                            component="img"
                            src={project.image}
                            alt={project.title}
                            sx={{ width: "100%", height: "100%", objectFit: "contain", p: 10, opacity: 0.92 }}
                          />
                          <Box sx={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${project.color}08, transparent)` }} />
                        </Box>
                      </Grid>
                    )}

                    {/* Right — content */}
                    <Grid item xs={12} md={project.image ? 7 : 12}>
                      <Box sx={{ p: { xs: 3, md: 4.5 }, height: "100%", display: "flex", flexDirection: "column", gap: 3 }}>

                        {/* Status tag */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Box sx={{ px: 1.5, py: 0.4, fontSize: "0.6rem", fontFamily: "monospace", color: project.color, background: `${project.color}0C`, border: `1px solid ${project.color}22`, borderRadius: "4px", letterSpacing: "0.1em" }}>
                            COMPLETE
                          </Box>
                        </Box>

                        {/* Title */}
                        <Box>
                          <Typography sx={{ fontWeight: 900, fontSize: { xs: "1.5rem", md: "2rem" }, color: theme.palette.text.primary, letterSpacing: "-0.025em", lineHeight: 1.1, mb: 0.75 }}>
                            {project.title}
                          </Typography>
                          <Typography sx={{ fontSize: "0.75rem", fontFamily: "monospace", color: theme.palette.text.disabled, letterSpacing: "0.06em" }}>
                            {project.subtitle}
                          </Typography>
                        </Box>

                        {/* Description */}
                        <Typography sx={{ fontSize: "0.9rem", color: theme.palette.text.secondary, lineHeight: 1.85 }}>
                          {project.desc}
                        </Typography>

                        {/* Highlights */}
                        <Box>
                          <Typography sx={{ fontSize: "0.62rem", fontFamily: "monospace", color: theme.palette.text.disabled, letterSpacing: "0.14em", mb: 1.5, textTransform: "uppercase" }}>
                            Key Highlights
                          </Typography>
                          <Stack spacing={1.1}>
                            {project.highlights.map((h, j) => (
                              <Box key={j} sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                                <Box sx={{ width: 4, height: 4, borderRadius: "50%", background: project.color, flexShrink: 0, mt: 0.7, opacity: 0.7 }} />
                                <Typography sx={{ fontSize: "0.85rem", color: theme.palette.text.secondary, lineHeight: 1.7 }}>{h}</Typography>
                              </Box>
                            ))}
                          </Stack>
                        </Box>

                        {/* Skill bars */}
                        <Box>
                          <Typography sx={{ fontSize: "0.62rem", fontFamily: "monospace", color: theme.palette.text.disabled, letterSpacing: "0.14em", mb: 2, textTransform: "uppercase" }}>
                            Proficiency
                          </Typography>
                          <Grid container spacing={2}>
                            {project.skills.map((s, j) => (
                              <Grid item xs={12} sm={6} key={j}>
                                <SkillBar skill={s.label} level={s.value} color={project.color} />
                              </Grid>
                            ))}
                          </Grid>
                        </Box>

                        {/* Tech stack */}
                        <Box sx={{ pt: 1, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                          <Typography sx={{ fontSize: "0.62rem", fontFamily: "monospace", color: theme.palette.text.disabled, letterSpacing: "0.14em", mb: 1.5, textTransform: "uppercase" }}>
                            Tech Stack
                          </Typography>
                          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.85 }}>
                            {project.tech.map((t, j) => (
                              <Box key={j} sx={{
                                px: 1.4, py: 0.45,
                                fontSize: "0.68rem", fontFamily: "monospace",
                                color: project.color,
                                background: `${project.color}0A`,
                                border: `1px solid ${project.color}18`,
                                borderRadius: "5px", letterSpacing: "0.03em",
                              }}>
                                {t}
                              </Box>
                            ))}
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </motion.div>
            ))}
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Skills;
