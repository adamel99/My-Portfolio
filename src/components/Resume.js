import React, { useRef, useState } from "react";
import {
  Box, Typography, Container, Grid, Stack, Divider, Link,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import {
  Email, Phone, GitHub, School, Security,
  VerifiedUser, Shield, Terminal, Cloud,
} from "@mui/icons-material";

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

const SpotlightCard = ({ children, color = "#00BBF9", sx = {} }) => {
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
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        position: "relative",
        borderRadius: "18px",
        border: "1px solid rgba(255,255,255,0.055)",
        background: "linear-gradient(160deg, rgba(255,255,255,0.022) 0%, rgba(255,255,255,0.008) 100%)",
        overflow: "hidden",
        transition: "border-color 0.28s ease, transform 0.28s ease, box-shadow 0.28s ease",
        "&:hover": {
          border: `1px solid ${color}25`,
          transform: "translateY(-3px)",
          boxShadow: `0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px ${color}10`,
        },
        ...sx,
      }}
    >
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.22 }}
        style={{
          position: "absolute", pointerEvents: "none", zIndex: 0,
          width: 300, height: 300, borderRadius: "50%",
          background: `radial-gradient(circle, ${color}0E 0%, transparent 70%)`,
          left: mouse.x - 150, top: mouse.y - 150,
        }}
      />
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1px",
          background: `linear-gradient(90deg, transparent, ${color}50, transparent)`,
          zIndex: 2,
        }}
      />
      <Box sx={{ position: "relative", zIndex: 1 }}>{children}</Box>
    </Box>
  );
};

// ─────────────────────────────────────────────
// SECTION WRAPPER
// ─────────────────────────────────────────────

const Section = ({ eyebrow, title, color, children }) => {
  const theme = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Box sx={{ mb: { xs: 10, md: 14 } }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
          <Box sx={{ width: 18, height: 1, background: color || theme.palette.tertiary.main, opacity: 0.6 }} />
          <Typography sx={{
            fontFamily: "monospace", fontSize: "0.62rem", fontWeight: 700,
            letterSpacing: "0.2em", color: color || theme.palette.tertiary.main,
          }}>
            {eyebrow}
          </Typography>
        </Box>
        <Typography sx={{
          fontWeight: 900, letterSpacing: "-0.032em", lineHeight: 1.06,
          fontSize: { xs: "2rem", md: "2.9rem" }, mb: 6,
          color: theme.palette.text.primary,
        }}>
          {title}
        </Typography>
        {children}
      </Box>
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// CONTACT LINK PILL
// ─────────────────────────────────────────────

const ContactPill = ({ icon, text, href }) => {
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);
  return (
    <Box
      component={href ? "a" : "div"}
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener" : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        display: "inline-flex", alignItems: "center", gap: 1.1,
        px: 2, py: 1,
        fontFamily: "monospace", fontSize: "0.78rem",
        color: hovered ? theme.palette.text.primary : theme.palette.text.disabled,
        textDecoration: "none",
        background: hovered ? "rgba(255,255,255,0.055)" : "rgba(255,255,255,0.025)",
        border: hovered ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(255,255,255,0.06)",
        borderRadius: "8px",
        transition: "all 0.2s ease",
        cursor: href ? "pointer" : "default",
      }}
    >
      <Box sx={{ color: theme.palette.tertiary.main, display: "flex", fontSize: 15 }}>{icon}</Box>
      {text}
    </Box>
  );
};

// ─────────────────────────────────────────────
// SKILL ROW
// ─────────────────────────────────────────────

const SkillRow = ({ label, items, color }) => {
  const theme = useTheme();
  return (
    <Box sx={{ mb: 3.5 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.25 }}>
        <Box sx={{ width: 3, height: 12, borderRadius: "2px", background: color, opacity: 0.7, flexShrink: 0 }} />
        <Typography sx={{
          fontSize: "0.62rem", fontFamily: "monospace", fontWeight: 700,
          color, letterSpacing: "0.16em", textTransform: "uppercase",
        }}>
          {label}
        </Typography>
      </Box>
      <Typography sx={{ fontSize: "0.9rem", color: theme.palette.text.secondary, lineHeight: 1.85, pl: "11px" }}>
        {items}
      </Typography>
    </Box>
  );
};

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const projects = [
  {
    name: "TDX Arena IR Expert Challenge",
    subtitle: "Advanced incident response simulations",
    date: "Feb 2025 – Nov 2025",
    color: "#00BBF9",
    link: null,
    desc: [
      "Conducted memory forensics on compromised Windows systems, extracting credentials and analyzing process artifacts.",
      "Performed malware triage and static analysis using Linux CLI tools, validating threats via ClamAV signature matching.",
      "Analyzed PCAP files to identify reconnaissance activity including TCP SYN scans and port enumeration.",
      "Documented IoCs and remediation steps following industry IR frameworks.",
      "Utilized tcpdump, Wireshark, Snort, and Snorby for end-to-end threat detection.",
    ],
  },
  {
    name: "Full-Stack E-Commerce Website",
    subtitle: "Secure marketplace for musicians",
    date: "Oct 2024 – Dec 2024",
    color: "#DC136C",
    link: "https://doomsprodstore.onrender.com/",
    desc: [
      "Built a production-ready marketplace for beats and kits with secure role-based permissions.",
      "Built RESTful APIs with Express and Sequelize supporting full CRUD and relational data modeling.",
      "Applied OWASP principles including SQL injection prevention and secure session management.",
      "Developed admin-only product management workflow for creating, updating, and publishing products.",
    ],
  },
  {
    name: "Full-Stack Portfolio Website",
    subtitle: "Personal portfolio and resume showcase",
    date: "Oct 2024 – Dec 2024",
    color: "#7B61FF",
    link: "https://lively-meerkat-2d2686.netlify.app/",
    desc: [
      "Designed and implemented backend APIs with PostgreSQL, Sequelize, and Node.js.",
      "Applied secure coding practices including input sanitization, error handling, and authentication workflows.",
    ],
  },
  {
    name: "Stereo Imager Plugin",
    subtitle: "Spatial audio processing VST",
    date: "Jun 2024 – Aug 2024",
    color: "#FDCFF3",
    link: null,
    desc: [
      "Built a real-time stereo imaging effect using C++ and JUCE, implementing mid/side processing, adjustable width controls, and smooth gain compensation.",
    ],
  },
];

// ══════════════════════════════════════════════
// RESUME PAGE
// ══════════════════════════════════════════════

const Resume = () => {
  const theme = useTheme();

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
                RESUME
              </Typography>
            </Box>

            {/* Name */}
            <Box sx={{ mb: 5 }}>
              <Typography sx={{
                fontWeight: 900, lineHeight: 0.93, letterSpacing: "-0.048em",
                fontSize: { xs: "4rem", sm: "5.5rem", md: "7.5rem" },
                color: theme.palette.text.primary,
              }}>
                adam
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
                elhamami
              </Typography>
            </Box>

            <Typography sx={{
              fontSize: { xs: "0.95rem", md: "1.05rem" },
              color: theme.palette.text.secondary,
              lineHeight: 1.9, mb: 5, maxWidth: 500, letterSpacing: "0.005em",
            }}>
              CompTIA Security+ certified cybersecurity professional and full-stack developer
              with hands-on incident response experience via TDX Arena.
            </Typography>

            {/* Cert badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <Box sx={{
                display: "inline-flex", alignItems: "center", gap: 1.5,
                px: 2.5, py: 1.4, mb: 5,
                background: `${theme.palette.tertiary.main}08`,
                border: `1px solid ${theme.palette.tertiary.main}20`,
                borderRadius: "12px",
                boxShadow: `0 0 20px ${theme.palette.tertiary.main}10`,
              }}>
                <VerifiedUser sx={{ fontSize: 20, color: theme.palette.tertiary.main }} />
                <Box>
                  <Typography sx={{ fontFamily: "monospace", fontSize: "0.54rem", color: theme.palette.tertiary.main, letterSpacing: "0.14em", fontWeight: 700, lineHeight: 1, mb: 0.2 }}>
                    CERTIFIED
                  </Typography>
                  <Typography sx={{ fontSize: "0.9rem", fontWeight: 800, color: theme.palette.text.primary, letterSpacing: "-0.01em" }}>
                    CompTIA Security+
                  </Typography>
                </Box>
              </Box>
            </motion.div>

            {/* Contact links */}
            <Stack direction="row" spacing={1.25} flexWrap="wrap" useFlexGap>
              <ContactPill icon={<Email sx={{ fontSize: 15 }} />} text="adamelh1999@gmail.com" href="mailto:adamelh1999@gmail.com" />
              <ContactPill icon={<Phone sx={{ fontSize: 15 }} />} text="(201) 234-2766" />
              <ContactPill icon={<GitHub sx={{ fontSize: 15 }} />} text="github.com/adamel99" href="https://github.com/adamel99" />
            </Stack>
          </motion.div>
        </Container>
      </Box>

      {/* ── CONTENT ── */}
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1, pb: { xs: 14, md: 20 } }}>
        <GridBg />

        {/* Professional Summary */}
        <Section eyebrow="OVERVIEW" title="Professional Summary" color={theme.palette.tertiary.main}>
          <SpotlightCard color={theme.palette.tertiary.main}>
            <Box sx={{ p: { xs: 3.5, md: 4.5 } }}>
              <Typography sx={{ fontSize: "1rem", color: theme.palette.text.secondary, lineHeight: 1.92, letterSpacing: "0.005em" }}>
                CompTIA Security+ certified cybersecurity professional specializing in incident response,
                threat detection, and security monitoring. Combines hands-on experience in digital forensics,
                malware analysis, and network defense with technical proficiency in SIEM platforms, packet
                analysis, and threat hunting. Brings a developer's mindset to security operations with strong
                programming skills in Python, JavaScript, SQL, and C++ for automation and vulnerability analysis.
              </Typography>
            </Box>
          </SpotlightCard>
        </Section>

        {/* Education */}
        <Section eyebrow="BACKGROUND" title="Education" color={theme.palette.accent.main}>
          <SpotlightCard color={theme.palette.accent.main}>
            <Box sx={{ p: { xs: 3.5, md: 4.5 } }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 2, mb: 2.5 }}>
                <Box>
                  <Typography sx={{ fontWeight: 900, fontSize: "1.28rem", color: theme.palette.text.primary, mb: 0.5, letterSpacing: "-0.015em" }}>
                    New Jersey Institute of Technology
                  </Typography>
                  <Typography sx={{ fontSize: "0.88rem", color: theme.palette.accent.main, fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.02em" }}>
                    CompTIA Security+ Cybersecurity Certificate
                  </Typography>
                </Box>
                <Box sx={{
                  px: 1.5, py: 0.6, flexShrink: 0,
                  background: `${theme.palette.accent.main}0A`,
                  border: `1px solid ${theme.palette.accent.main}1E`,
                  borderRadius: "7px",
                }}>
                  <Typography sx={{ fontFamily: "monospace", fontSize: "0.72rem", color: theme.palette.accent.main, letterSpacing: "0.05em" }}>
                    Feb 2025 – Nov 2025
                  </Typography>
                </Box>
              </Box>

              <Typography sx={{ fontSize: "0.78rem", fontFamily: "monospace", color: theme.palette.text.disabled, mb: 2.5, letterSpacing: "0.03em" }}>
                Newark, New Jersey
              </Typography>

              <Box sx={{ height: "1px", background: `linear-gradient(to right, ${theme.palette.accent.main}25, transparent)`, mb: 2.5 }} />

              <Typography sx={{ fontSize: "0.58rem", fontFamily: "monospace", color: theme.palette.text.disabled, letterSpacing: "0.18em", textTransform: "uppercase", mb: 1.75 }}>
                Key Courses
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {["Threat Hunting & Intelligence", "Incident Response & Digital Forensics", "Computer Networking Fundamentals", "Security Information & Event Management"].map((course) => (
                  <Box
                    key={course}
                    sx={{
                      px: 1.4, py: 0.5, fontSize: "0.75rem", fontFamily: "monospace",
                      color: theme.palette.accent.main,
                      background: `${theme.palette.accent.main}09`,
                      border: `1px solid ${theme.palette.accent.main}18`,
                      borderRadius: "5px", letterSpacing: "0.02em",
                      transition: "all 0.18s ease",
                      "&:hover": { background: `${theme.palette.accent.main}18`, border: `1px solid ${theme.palette.accent.main}30` },
                    }}
                  >
                    {course}
                  </Box>
                ))}
              </Box>
            </Box>
          </SpotlightCard>
        </Section>

        {/* Certifications & Skills */}
        <Section eyebrow="QUALIFICATIONS" title="Certifications & Skills" color={theme.palette.primary.main}>
          <Stack spacing={3}>

            {/* Cert cards */}
            <SpotlightCard color={theme.palette.primary.main}>
              <Box sx={{ p: { xs: 3.5, md: 4.5 } }}>
                <Typography sx={{ fontSize: "0.58rem", fontFamily: "monospace", color: theme.palette.text.disabled, letterSpacing: "0.18em", textTransform: "uppercase", mb: 2.5 }}>
                  Certifications
                </Typography>
                <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
                  {[
                    { label: "CompTIA Security+", color: theme.palette.tertiary.main, icon: <VerifiedUser sx={{ fontSize: 16 }} /> },
                    { label: "TDX Arena IR Expert", color: theme.palette.primary.main, icon: <Shield sx={{ fontSize: 16 }} /> },
                    { label: "NJIT Cybersecurity Program", color: theme.palette.success.main, icon: <School sx={{ fontSize: 16 }} /> },
                    { label: "AWS Cloud Practitioner", color: theme.palette.accent.main, icon: <Cloud sx={{ fontSize: 16 }} />, inProgress: true },
                  ].map((cert, i) => (
                    <motion.div
                      key={cert.label}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <Box sx={{
                        display: "flex", alignItems: "center", gap: 1,
                        px: 2, py: 1.1,
                        background: `${cert.color}08`,
                        border: `1px solid ${cert.color}20`,
                        borderRadius: "9px",
                        transition: "all 0.2s ease",
                        "&:hover": { background: `${cert.color}14`, border: `1px solid ${cert.color}30`, transform: "translateY(-1px)" },
                      }}>
                        <Box sx={{ color: cert.color, display: "flex" }}>{cert.icon}</Box>
                        <Typography sx={{ fontSize: "0.82rem", fontWeight: 700, color: theme.palette.text.primary, fontFamily: "monospace", letterSpacing: "0.01em" }}>
                          {cert.label}
                        </Typography>
                        {cert.inProgress && (
                          <Box sx={{ px: 0.8, py: 0.2, fontSize: "0.52rem", fontFamily: "monospace", color: cert.color, background: `${cert.color}15`, border: `1px solid ${cert.color}25`, borderRadius: "3px", letterSpacing: "0.1em" }}>
                            IN PROGRESS
                          </Box>
                        )}
                      </Box>
                    </motion.div>
                  ))}
                </Stack>
              </Box>
            </SpotlightCard>

            {/* Skills grid */}
            <SpotlightCard color={theme.palette.tertiary.main}>
              <Box sx={{ p: { xs: 3.5, md: 4.5 } }}>
                <Typography sx={{ fontSize: "0.58rem", fontFamily: "monospace", color: theme.palette.text.disabled, letterSpacing: "0.18em", textTransform: "uppercase", mb: 3 }}>
                  Technical Skills
                </Typography>
                <Grid container spacing={{ xs: 2, md: 5 }}>
                  <Grid item xs={12} sm={6}>
                    <SkillRow label="Security Tools" items="Splunk, Wireshark, Snort IDS/IPS, ClamAV, Nmap, tcpdump, Snorby, Active Directory/GPO" color={theme.palette.tertiary.main} />
                    <SkillRow label="Security Skills" items="Incident Response, Digital Forensics, Threat Hunting, Malware Analysis, Vulnerability Assessment, SIEM, Log Analysis" color={theme.palette.tertiary.main} />
                    <SkillRow label="Networking" items="TCP/IP, Packet Analysis, OSI Model, HTTP/HTTPS, Firewall Configuration" color={theme.palette.tertiary.main} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <SkillRow label="Operating Systems" items="Windows (Memory Forensics), Linux (CLI investigation), MacOS" color={theme.palette.accent.main} />
                    <SkillRow label="Programming" items="Python, JavaScript, SQL, Bash — for automation and log parsing" color={theme.palette.accent.main} />
                    <SkillRow label="Development" items="React, Node.js, Express, PostgreSQL, REST APIs, AWS, JWT, OWASP" color={theme.palette.accent.main} />
                  </Grid>
                </Grid>
              </Box>
            </SpotlightCard>
          </Stack>
        </Section>

        {/* Projects */}
        <Section eyebrow="EXPERIENCE" title="Professional Projects" color={theme.palette.success.main}>
          <Stack spacing={3.5}>
            {projects.map((proj, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.07, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <SpotlightCard color={proj.color}>
                  <Box sx={{ p: { xs: 3.5, md: 4.5 } }}>

                    {/* Header */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 2, mb: 3 }}>
                      <Box sx={{ flex: 1 }}>
                        {/* Status */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.2 }}>
                          <Box
                            component={motion.div}
                            animate={{ opacity: [1, 0.25, 1] }}
                            transition={{ duration: 2.5, repeat: Infinity }}
                            sx={{ width: 5, height: 5, borderRadius: "50%", background: proj.color, boxShadow: `0 0 6px ${proj.color}` }}
                          />
                          <Typography sx={{ fontFamily: "monospace", fontSize: "0.6rem", color: proj.color, fontWeight: 700, letterSpacing: "0.14em" }}>
                            COMPLETE
                          </Typography>
                        </Box>

                        <Typography sx={{
                          fontWeight: 900, letterSpacing: "-0.022em", lineHeight: 1.12, mb: 0.6,
                          fontSize: { xs: "1.2rem", md: "1.5rem" },
                          color: theme.palette.text.primary,
                        }}>
                          {proj.name}
                        </Typography>
                        <Typography sx={{ fontSize: "0.72rem", fontFamily: "monospace", color: theme.palette.text.disabled, letterSpacing: "0.04em" }}>
                          {proj.subtitle}
                        </Typography>
                      </Box>

                      <Box sx={{
                        px: 1.5, py: 0.6, flexShrink: 0,
                        background: `${proj.color}0A`,
                        border: `1px solid ${proj.color}18`,
                        borderRadius: "7px",
                      }}>
                        <Typography sx={{ fontFamily: "monospace", fontSize: "0.7rem", color: proj.color, letterSpacing: "0.04em" }}>
                          {proj.date}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Link */}
                    {proj.link && (
                      <Box sx={{ mb: 2.5 }}>
                        <Box
                          component="a"
                          href={proj.link}
                          target="_blank"
                          rel="noopener"
                          sx={{
                            fontFamily: "monospace", fontSize: "0.78rem",
                            color: proj.color, textDecoration: "none",
                            display: "inline-flex", alignItems: "center", gap: 0.75,
                            opacity: 0.8, transition: "opacity 0.2s ease",
                            "&:hover": { opacity: 1 },
                          }}
                        >
                          <Box sx={{ fontWeight: 700 }}>→</Box>
                          {proj.link}
                        </Box>
                      </Box>
                    )}

                    {/* Divider */}
                    <Box sx={{ height: "1px", background: `linear-gradient(to right, ${proj.color}25, transparent)`, mb: 2.5 }} />

                    {/* Bullet points */}
                    <Stack spacing={1.35}>
                      {proj.desc.map((d, j) => (
                        <motion.div
                          key={j}
                          initial={{ opacity: 0, x: -6 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.06 + j * 0.05 }}
                        >
                          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.75 }}>
                            <Box sx={{
                              flexShrink: 0, mt: 0.72,
                              width: 4, height: 4, borderRadius: "50%",
                              background: proj.color, opacity: 0.6,
                              boxShadow: `0 0 5px ${proj.color}`,
                            }} />
                            <Typography sx={{ fontSize: "0.92rem", color: theme.palette.text.secondary, lineHeight: 1.78, letterSpacing: "0.004em" }}>
                              {d}
                            </Typography>
                          </Box>
                        </motion.div>
                      ))}
                    </Stack>
                  </Box>
                </SpotlightCard>
              </motion.div>
            ))}
          </Stack>
        </Section>
      </Container>
    </Box>
  );
};

export default Resume;
