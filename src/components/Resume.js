import React from "react";
import {
  Box, Typography, Container, Grid, Stack,
  Divider, Link, Chip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import {
  Email, Phone, GitHub, School, Build,
  Security, VerifiedUser, Shield, Terminal, CheckCircle, Cloud
} from "@mui/icons-material";

// ── Shared ──────────────────────────────────────────────────────

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

const Label = ({ text, color }) => (
  <Typography sx={{
    fontFamily: "monospace", fontSize: "0.68rem", fontWeight: 700,
    letterSpacing: "0.18em", textTransform: "uppercase",
    color: color, mb: 2,
  }}>
    {text}
  </Typography>
);

// ── Section wrapper ──────────────────────────────────────────────

const Section = ({ label, title, color, children }) => {
  const theme = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55 }}
    >
      <Box sx={{ mb: { xs: 10, md: 14 } }}>
        <Label text={label} color={color || theme.palette.tertiary.main} />
        <Typography sx={{
          fontWeight: 900,
          fontSize: { xs: "1.8rem", md: "2.6rem" },
          letterSpacing: "-0.03em", lineHeight: 1.1, mb: 6,
          color: theme.palette.text.primary,
        }}>
          {title}
        </Typography>
        {children}
      </Box>
    </motion.div>
  );
};

// ── Card wrapper ─────────────────────────────────────────────────

const Card = ({ children, color, sx = {} }) => {
  const theme = useTheme();
  return (
    <Box sx={{
      p: { xs: 3, md: 4 }, borderRadius: "16px",
      border: "1px solid rgba(255,255,255,0.06)",
      background: `linear-gradient(145deg, rgba(255,255,255,0.025), ${color || theme.palette.tertiary.main}05)`,
      transition: "all 0.22s ease",
      "&:hover": {
        border: `1px solid ${color || theme.palette.tertiary.main}22`,
        boxShadow: `0 16px 48px rgba(0,0,0,0.4)`,
        transform: "translateY(-2px)",
      },
      ...sx,
    }}>
      {children}
    </Box>
  );
};

// ── Skill row ────────────────────────────────────────────────────

const SkillRow = ({ label, items, color }) => {
  const theme = useTheme();
  return (
    <Box sx={{ mb: 3 }}>
      <Typography sx={{
        fontSize: "0.68rem", fontFamily: "monospace", fontWeight: 700,
        color: color || theme.palette.tertiary.main,
        letterSpacing: "0.12em", textTransform: "uppercase", mb: 1.25,
      }}>
        {label}
      </Typography>
      <Typography sx={{ fontSize: "0.88rem", color: theme.palette.text.secondary, lineHeight: 1.8 }}>
        {items}
      </Typography>
    </Box>
  );
};

// ── Contact link ─────────────────────────────────────────────────

const ContactLink = ({ icon, text, href }) => {
  const theme = useTheme();
  return (
    <Box
      component={href ? Link : "div"}
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener" : undefined}
      sx={{
        display: "flex", alignItems: "center", gap: 1,
        px: 2, py: 1,
        color: theme.palette.text.secondary,
        textDecoration: "none",
        fontFamily: "monospace", fontSize: "0.82rem",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "8px",
        transition: "all 0.2s ease",
        "&:hover": {
          color: theme.palette.text.primary,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.12)",
        },
      }}
    >
      <Box sx={{ color: theme.palette.tertiary.main, display: "flex" }}>{icon}</Box>
      {text}
    </Box>
  );
};

// ── Data ─────────────────────────────────────────────────────────

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
    link: "https://adamportfolio-xknb.onrender.com/",
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

// ════════════════════════════════════════════════════════════════
// RESUME PAGE
// ════════════════════════════════════════════════════════════════

const Resume = () => {
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: "100vh", background: theme.palette.background.default, overflowX: "hidden" }}>

      {/* ── HERO ── */}
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
            <Label text="Resume" color={theme.palette.tertiary.main} />
            <Typography sx={{
              fontWeight: 900,
              fontSize: { xs: "3.5rem", sm: "5rem", md: "7rem" },
              lineHeight: 0.95, letterSpacing: "-0.045em", mb: 4,
            }}>
              <Box component="span" sx={{ color: theme.palette.text.primary }}>adam</Box>
              <br />
              <Box component="span" sx={{
                background: `linear-gradient(100deg, ${theme.palette.tertiary.main}, ${theme.palette.accent.main} 50%, ${theme.palette.primary.main})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                elhamami
              </Box>
            </Typography>

            <Typography sx={{ fontSize: "1rem", color: theme.palette.text.secondary, lineHeight: 1.85, mb: 5, maxWidth: 520 }}>
              CompTIA Security+ certified cybersecurity professional and full-stack developer
              with hands-on incident response experience via TDX Arena.
            </Typography>

            {/* Cert badge */}
            <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1.25, px: 2.5, py: 1.25, background: `${theme.palette.tertiary.main}0A`, border: `1px solid ${theme.palette.tertiary.main}22`, borderRadius: "12px", mb: 5 }}>
              <VerifiedUser sx={{ fontSize: 20, color: theme.palette.tertiary.main }} />
              <Box>
                <Typography sx={{ fontFamily: "monospace", fontSize: "0.58rem", color: theme.palette.tertiary.main, letterSpacing: "0.12em", fontWeight: 700, lineHeight: 1 }}>CERTIFIED</Typography>
                <Typography sx={{ fontSize: "0.88rem", fontWeight: 700, color: theme.palette.text.primary }}>CompTIA Security+</Typography>
              </Box>
            </Box>

            {/* Contact links */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} flexWrap="wrap" useFlexGap>
              <ContactLink icon={<Email sx={{ fontSize: 16 }} />} text="adamelh1999@gmail.com" href="mailto:adamelh1999@gmail.com" />
              <ContactLink icon={<Phone sx={{ fontSize: 16 }} />} text="(201) 234-2766" />
              <ContactLink icon={<GitHub sx={{ fontSize: 16 }} />} text="github.com/adamel99" href="https://github.com/adamel99" />
            </Stack>
          </motion.div>
        </Container>
      </Box>

      {/* ── CONTENT ── */}
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1, pb: { xs: 12, md: 18 } }}>
        <GridBg />

        {/* Professional Summary */}
        <Section label="Overview" title="Professional Summary" color={theme.palette.tertiary.main}>
          <Card color={theme.palette.tertiary.main}>
            <Typography sx={{ fontSize: "0.92rem", color: theme.palette.text.secondary, lineHeight: 1.9 }}>
              CompTIA Security+ certified cybersecurity professional specializing in incident response,
              threat detection, and security monitoring. Combines hands-on experience in digital forensics,
              malware analysis, and network defense with technical proficiency in SIEM platforms, packet
              analysis, and threat hunting. Brings a developer's mindset to security operations with strong
              programming skills in Python, JavaScript, SQL, and C++ for automation and vulnerability analysis.
            </Typography>
          </Card>
        </Section>

        {/* Education */}
        <Section label="Background" title="Education" color={theme.palette.accent.main}>
          <Card color={theme.palette.accent.main}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 1, mb: 2 }}>
              <Box>
                <Typography sx={{ fontWeight: 800, fontSize: "1.1rem", color: theme.palette.text.primary, mb: 0.4 }}>
                  New Jersey Institute of Technology
                </Typography>
                <Typography sx={{ fontSize: "0.82rem", color: theme.palette.accent.main, fontFamily: "monospace", fontWeight: 600 }}>
                  CompTIA Security+ Cybersecurity Certificate
                </Typography>
              </Box>
              <Box sx={{ px: 1.5, py: 0.5, background: `${theme.palette.accent.main}0A`, border: `1px solid ${theme.palette.accent.main}20`, borderRadius: "6px" }}>
                <Typography sx={{ fontFamily: "monospace", fontSize: "0.65rem", color: theme.palette.accent.main, letterSpacing: "0.06em" }}>
                  Feb 2025 – Nov 2025
                </Typography>
              </Box>
            </Box>

            <Typography sx={{ fontSize: "0.78rem", color: theme.palette.text.disabled, mb: 2.5, fontFamily: "monospace" }}>
              Newark, New Jersey
            </Typography>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.05)", mb: 2.5 }} />

            <Typography sx={{ fontSize: "0.68rem", fontFamily: "monospace", color: theme.palette.text.disabled, letterSpacing: "0.12em", textTransform: "uppercase", mb: 1.5 }}>
              Key Courses
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {["Threat Hunting & Intelligence", "Incident Response & Digital Forensics", "Computer Networking Fundamentals", "Security Information & Event Management"].map((course) => (
                <Box key={course} sx={{ px: 1.4, py: 0.5, fontSize: "0.72rem", fontFamily: "monospace", color: theme.palette.accent.main, background: `${theme.palette.accent.main}0A`, border: `1px solid ${theme.palette.accent.main}18`, borderRadius: "5px" }}>
                  {course}
                </Box>
              ))}
            </Box>
          </Card>
        </Section>

        {/* Certifications & Skills */}
        <Section label="Qualifications" title="Certifications & Skills" color={theme.palette.primary.main}>
          <Stack spacing={3}>
            {/* Cert chips */}
            <Card color={theme.palette.primary.main}>
              <Typography sx={{ fontSize: "0.68rem", fontFamily: "monospace", color: theme.palette.text.disabled, letterSpacing: "0.12em", textTransform: "uppercase", mb: 2 }}>
                Certifications
              </Typography>
              <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
                {[
                  { label: "CompTIA Security+", color: theme.palette.tertiary.main, icon: <VerifiedUser sx={{ fontSize: 14 }} /> },
                  { label: "TDX Arena IR Expert", color: theme.palette.primary.main, icon: <Shield sx={{ fontSize: 14 }} /> },
                  { label: "Completing AWS Cloud Practitioner cert", color: theme.palette.accent.main, icon: <Cloud sx={{ fontSize: 14 }} /> },
                ].map((cert) => (
                  <Box key={cert.label} sx={{ display: "flex", alignItems: "center", gap: 0.75, px: 2, py: 1, background: `${cert.color}0A`, border: `1px solid ${cert.color}22`, borderRadius: "8px" }}>
                    <Box sx={{ color: cert.color }}>{cert.icon}</Box>
                    <Typography sx={{ fontSize: "0.82rem", fontWeight: 700, color: theme.palette.text.primary, fontFamily: "monospace" }}>{cert.label}</Typography>
                  </Box>
                ))}
              </Stack>
            </Card>

            {/* Skills grid */}
            <Card color={theme.palette.tertiary.main}>
              <Typography sx={{ fontSize: "0.68rem", fontFamily: "monospace", color: theme.palette.text.disabled, letterSpacing: "0.12em", textTransform: "uppercase", mb: 3 }}>
                Technical Skills
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <SkillRow
                    label="Security Tools"
                    items="Splunk, Wireshark, Snort IDS/IPS, ClamAV, Nmap, tcpdump, Snorby, Active Directory/GPO"
                    color={theme.palette.tertiary.main}
                  />
                  <SkillRow
                    label="Security Skills"
                    items="Incident Response, Digital Forensics, Threat Hunting, Malware Analysis, Vulnerability Assessment, SIEM, Log Analysis"
                    color={theme.palette.tertiary.main}
                  />
                  <SkillRow
                    label="Networking"
                    items="TCP/IP, Packet Analysis, OSI Model, HTTP/HTTPS, Firewall Configuration"
                    color={theme.palette.tertiary.main}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <SkillRow
                    label="Operating Systems"
                    items="Windows (Memory Forensics), Linux (CLI investigation), MacOS"
                    color={theme.palette.accent.main}
                  />
                  <SkillRow
                    label="Programming"
                    items="Python, JavaScript, SQL, Bash — for automation and log parsing"
                    color={theme.palette.accent.main}
                  />
                  <SkillRow
                    label="Development"
                    items="React, Node.js, Express, PostgreSQL, REST APIs, AWS, JWT, OWASP"
                    color={theme.palette.accent.main}
                  />
                </Grid>
              </Grid>
            </Card>
          </Stack>
        </Section>

        {/* Projects */}
        <Section label="Experience" title="Professional Projects" color={theme.palette.success.main}>
          <Stack spacing={4}>
            {projects.map((proj, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <Box sx={{
                  borderRadius: "16px", overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: `linear-gradient(145deg, rgba(255,255,255,0.025), ${proj.color}05)`,
                  transition: "all 0.22s ease",
                  "&:hover": {
                    border: `1px solid ${proj.color}22`,
                    boxShadow: `0 16px 48px rgba(0,0,0,0.4), 0 0 28px ${proj.color}08`,
                    transform: "translateY(-2px)",
                  },
                }}>
                  <Box sx={{ p: { xs: 3, md: 4 } }}>

                    {/* Header */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 1.5, mb: 2.5 }}>
                      <Box>
                        {/* Status dot */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 1 }}>
                          <Box
                            component={motion.div}
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 2.5, repeat: Infinity }}
                            sx={{ width: 5, height: 5, borderRadius: "50%", background: proj.color, boxShadow: `0 0 6px ${proj.color}` }}
                          />
                          <Typography sx={{ fontFamily: "monospace", fontSize: "0.6rem", color: proj.color, fontWeight: 700, letterSpacing: "0.12em" }}>
                            COMPLETE
                          </Typography>
                        </Box>
                        <Typography sx={{ fontWeight: 900, fontSize: { xs: "1.1rem", md: "1.4rem" }, color: theme.palette.text.primary, letterSpacing: "-0.02em", lineHeight: 1.15, mb: 0.5 }}>
                          {proj.name}
                        </Typography>
                        <Typography sx={{ fontSize: "0.72rem", fontFamily: "monospace", color: theme.palette.text.disabled }}>
                          {proj.subtitle}
                        </Typography>
                      </Box>
                      <Box sx={{ px: 1.5, py: 0.5, background: `${proj.color}0A`, border: `1px solid ${proj.color}18`, borderRadius: "6px", flexShrink: 0 }}>
                        <Typography sx={{ fontFamily: "monospace", fontSize: "0.62rem", color: proj.color, letterSpacing: "0.04em" }}>
                          {proj.date}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Link */}
                    {proj.link && (
                      <Box sx={{ mb: 2.5 }}>
                        <Link href={proj.link} target="_blank" rel="noopener"
                          sx={{ fontFamily: "monospace", fontSize: "0.78rem", color: proj.color, textDecoration: "none", display: "flex", alignItems: "center", gap: 0.5, "&:hover": { opacity: 0.75 } }}>
                          → {proj.link}
                        </Link>
                      </Box>
                    )}

                    <Divider sx={{ borderColor: "rgba(255,255,255,0.05)", mb: 2.5 }} />

                    {/* Description bullets */}
                    <Stack spacing={1.25}>
                      {proj.desc.map((d, j) => (
                        <Box key={j} sx={{ display: "flex", alignItems: "flex-start", gap: 1.75 }}>
                          <Box sx={{ width: 4, height: 4, borderRadius: "50%", background: proj.color, flexShrink: 0, mt: 0.72, opacity: 0.65 }} />
                          <Typography sx={{ fontSize: "0.87rem", color: theme.palette.text.secondary, lineHeight: 1.75 }}>
                            {d}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                </Box>
              </motion.div>
            ))}
          </Stack>
        </Section>
      </Container>
    </Box>
  );
};

export default Resume;
