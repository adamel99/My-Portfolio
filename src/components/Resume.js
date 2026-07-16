import React, { useRef, useState } from "react";
import {
  Box, Typography, Container, Grid, Stack,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import {
  Email, Phone, GitHub, School, Work,
  VerifiedUser, Shield, Cloud, GraphicEq,
} from "@mui/icons-material";

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
        borderRadius: "14px",
        border: `1px solid ${hovered ? color + "22" : "rgba(255,255,255,0.06)"}`,
        background: "rgba(255,255,255,0.018)",
        overflow: "hidden",
        transition: "border-color 0.25s ease, transform 0.25s ease",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "1px",
          background: `linear-gradient(90deg, transparent 0%, ${color}55 40%, ${color}55 60%, transparent 100%)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.25s ease",
        },
        ...sx,
      }}
    >
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{
          position: "absolute", pointerEvents: "none", zIndex: 0,
          width: 300, height: 300, borderRadius: "50%",
          background: `radial-gradient(circle, ${color}0D 0%, transparent 70%)`,
          left: mouse.x - 150, top: mouse.y - 150,
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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Box sx={{ mb: { xs: 10, md: 14 } }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
          <Box sx={{ width: 16, height: 1, background: color || theme.palette.tertiary.main, opacity: 0.6 }} />
          <Typography sx={{
            fontFamily: "monospace", fontSize: "0.6rem", fontWeight: 600,
            letterSpacing: "0.22em", color: color || theme.palette.tertiary.main,
            textTransform: "uppercase",
          }}>
            {eyebrow}
          </Typography>
        </Box>
        <Typography sx={{
          fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.06,
          fontSize: { xs: "2rem", md: "2.8rem" }, mb: 5,
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
// CONTACT PILL
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
        display: "inline-flex", alignItems: "center", gap: 1,
        px: 1.75, py: 0.9,
        fontFamily: "monospace", fontSize: "0.75rem",
        color: hovered ? theme.palette.text.primary : theme.palette.text.disabled,
        textDecoration: "none",
        background: hovered ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
        border: `1px solid rgba(255,255,255,${hovered ? "0.1" : "0.06"})`,
        borderRadius: "6px",
        transition: "all 0.18s ease",
        cursor: href ? "pointer" : "default",
      }}
    >
      <Box sx={{ color: theme.palette.tertiary.main, display: "flex", fontSize: 14 }}>{icon}</Box>
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
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
        <Box sx={{ width: 3, height: 10, borderRadius: "2px", background: color, opacity: 0.65, flexShrink: 0 }} />
        <Typography sx={{
          fontSize: "0.6rem", fontFamily: "monospace", fontWeight: 600,
          color, letterSpacing: "0.16em", textTransform: "uppercase",
        }}>
          {label}
        </Typography>
      </Box>
      <Typography sx={{ fontSize: "0.88rem", color: theme.palette.text.secondary, lineHeight: 1.82, pl: "11px" }}>
        {items}
      </Typography>
    </Box>
  );
};

// ─────────────────────────────────────────────
// BULLET LIST (shared)
// ─────────────────────────────────────────────

const BulletList = ({ items, color }) => {
  const theme = useTheme();
  return (
    <Stack spacing={1.25}>
      {items.map((d, i) => (
        <Box key={i} sx={{ display: "flex", alignItems: "flex-start", gap: 1.75 }}>
          <Box sx={{
            flexShrink: 0, mt: 0.75,
            width: 4, height: 4, borderRadius: "50%",
            background: color, opacity: 0.55,
          }} />
          <Typography sx={{
            fontSize: "0.9rem",
            color: theme.palette.text.secondary,
            lineHeight: 1.8,
          }}>
            {d}
          </Typography>
        </Box>
      ))}
    </Stack>
  );
};

// ─────────────────────────────────────────────
// DATE BADGE
// ─────────────────────────────────────────────

const DateBadge = ({ text, color }) => (
  <Box sx={{
    px: 1.5, py: 0.55, flexShrink: 0,
    background: `${color}0A`,
    border: `1px solid ${color}18`,
    borderRadius: "6px",
  }}>
    <Typography sx={{ fontFamily: "monospace", fontSize: "0.68rem", color, letterSpacing: "0.04em" }}>
      {text}
    </Typography>
  </Box>
);

// ─────────────────────────────────────────────
// DATA — merged DSP + cybersecurity projects, newest first
// ─────────────────────────────────────────────

const projects = [
  {
    name: "Soft Clipper VST Plugin",
    subtitle: "Multi-mode saturation processor · C++ | JUCE | Real-Time DSP | 4x Oversampling",
    date: "Jan 2026 – Mar 2026",
    color: "#00BBF9",
    link: "https://github.com/adamel99/Soft-Clipper",
    desc: [
      "Built a real-time saturation plugin with 5 nonlinear waveshaping modes and matched makeup-gain compensation for consistent perceived loudness.",
      "Implemented 4x polyphase oversampling to suppress aliasing and managed host latency reporting to keep the DAW in sync.",
      "Used per-sample parameter smoothing and a lock-free FIFO to safely pass metering from the audio thread to the UI thread, eliminating zipper noise and UI-thread contention.",
    ],
  },
  {
    name: "Stereo Imager VST Plugin",
    subtitle: "Mid/side width & phase processor · C++ | JUCE | Real-Time DSP",
    date: "Oct 2025 – Dec 2025",
    color: "#FDCFF3",
    link: "https://github.com/adamel99/Stereo-Imager-",
    desc: [
      "Developed a stereo-width plugin using mid/side encoding with crossfeed and harmonic exciter stages processed sample-by-sample in the audio callback.",
      "Built a real-time phase correlation meter (running dot-product/RMS calculation) to flag mono-incompatible mixes.",
      "Implemented a vectorscope visualizer with cached image compositing and frame-rate capping for low CPU usage during idle/silent playback.",
    ],
  },
  {
    name: "SOC Log Analyzer",
    subtitle: "Python-based threat detection tool",
    date: "June 2025",
    color: "#1DB954",
    link: "https://github.com/adamel99/Event-Logger",
    desc: [
      "Built a cross-platform log analysis tool in Python that ingests Linux auth logs and Windows Event Log CSV exports, detecting threats across 24 scenarios and mapping every finding to MITRE ATT&CK techniques.",
      "Engineered a brute-force correlation engine using a sliding-window algorithm to correlate failed login events, firing a single alert when the threshold is met — replicating core SIEM logic used in platforms like Splunk.",
      "Implemented lateral movement detection for 7 Windows attack techniques including Pass-the-Hash, PsExec, WMI/DCOM remote execution, SMB admin share access, and token impersonation.",
      "Designed correlated multi-source SSH detection for Linux, identifying when the same user authenticates from multiple source IPs within a 5-minute window.",
      "Built an interactive HTML triage dashboard with severity-based filtering, lateral movement indicators, and MITRE ATT&CK annotations, exportable alongside CSV and JSON formats.",
    ],
  },
  {
    name: "TDX Arena IR Expert Challenge",
    subtitle: "Advanced incident response simulations",
    date: "Feb 2025 – Nov 2025",
    color: "#DC136C",
    link: null,
    desc: [
      "Conducted memory forensics on compromised Windows systems, extracting credentials, analyzing process artifacts, and recovering encrypted data from malicious Office documents.",
      "Performed malware triage and static analysis using Linux CLI tools (strings, file, grep, hash generation), validating threats via ClamAV signature matching.",
      "Analyzed PCAP files to identify reconnaissance activity including TCP SYN scans and port enumeration.",
      "Documented Indicators of Compromise (IoCs) and remediation steps following industry incident response frameworks.",
      "Utilized tcpdump, Wireshark, Snort, and Snorby for end-to-end threat detection and alert validation.",
    ],
  },
  {
    name: "Full-Stack E-Commerce Website",
    subtitle: "Secure marketplace for musicians",
    date: "Oct 2024 – Dec 2024",
    color: "#7B61FF",
    link: "https://doomsprodstore.onrender.com/",
    desc: [
      "Built a full-stack e-commerce web application from the ground up for selling original beats, loop kits, and drum kits, covering front-end UI, back-end APIs, and database design.",
      "Designed a production-ready marketplace for beats and kits with secure role-based permissions.",
      "Built RESTful APIs with Express and Sequelize, supporting full CRUD operations and relational data modeling.",
      "Applied OWASP principles including SQL injection prevention and secure session management.",
    ],
  },
  {
    name: "Portfolio Website",
    subtitle: "Personal portfolio and resume showcase",
    date: "Oct 2024 – Dec 2024",
    color: "#FFBD2E",
    link: "https://lively-meerkat-2d2686.netlify.app/",
    desc: [
      "Built a fully static React portfolio using component-based architecture and client-side navigation.",
      "Implemented a consistent design system with a defined color palette, typography scale, and reusable component library across 6 pages.",
      "Applied secure coding practices including input sanitization and error handling.",
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
      <Box sx={{
        position: "relative",
        pt: { xs: 14, md: 22 }, pb: { xs: 12, md: 18 },
        "&::before": {
          content: '""',
          position: "absolute",
          left: { xs: 24, md: "calc(50% - 580px)" },
          top: 0, bottom: 0, width: "1px",
          background: "linear-gradient(to bottom, transparent 0%, rgba(0,187,249,0.1) 25%, rgba(0,187,249,0.1) 75%, transparent 100%)",
          pointerEvents: "none",
        },
      }}>
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Eyebrow */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 5 }}>
              <Box sx={{ width: 16, height: 1, background: theme.palette.tertiary.main, opacity: 0.6 }} />
              <Typography sx={{
                fontFamily: "monospace", fontSize: "0.6rem", fontWeight: 600,
                letterSpacing: "0.22em", color: theme.palette.tertiary.main,
                textTransform: "uppercase",
              }}>
                Resume
              </Typography>
            </Box>

            {/* Name */}
            <Box sx={{ mb: 4 }}>
              {["adam", "elhamami"].map((name, i) => (
                <Typography key={name} sx={{
                  fontWeight: 800,
                  lineHeight: 0.94,
                  letterSpacing: "-0.045em",
                  fontSize: { xs: "4rem", sm: "5.5rem", md: "7.5rem" },
                  color: i === 0 ? theme.palette.text.primary : theme.palette.tertiary.main,
                }}>
                  {name}
                </Typography>
              ))}
            </Box>

            <Typography sx={{
              fontSize: { xs: "0.93rem", md: "1rem" },
              color: theme.palette.text.secondary,
              lineHeight: 1.88, mb: 5, maxWidth: 560,
            }}>
              CompTIA Security+ certified cybersecurity professional and JUCE audio/DSP engineer.
              I build real-time C++ audio plugins and threat-detection tooling with equal comfort —
              bringing a developer's mindset to security operations and a security-conscious mindset
              to signal processing and full-stack development.
            </Typography>

            {/* Cert badges */}
            <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap sx={{ mb: 5 }}>
              {[
                { label: "CompTIA Security+", color: theme.palette.tertiary.main, icon: <VerifiedUser sx={{ fontSize: 17 }} /> },
                { label: "JUCE / C++ DSP", color: theme.palette.accent.main, icon: <GraphicEq sx={{ fontSize: 17 }} /> },
              ].map((cert) => (
                <Box key={cert.label} sx={{
                  display: "inline-flex", alignItems: "center", gap: 1.5,
                  px: 2, py: 1.1,
                  background: `${cert.color}07`,
                  border: `1px solid ${cert.color}18`,
                  borderRadius: "8px",
                }}>
                  <Box sx={{ color: cert.color, display: "flex" }}>{cert.icon}</Box>
                  <Typography sx={{ fontSize: "0.88rem", fontWeight: 700, color: theme.palette.text.primary, letterSpacing: "-0.01em" }}>
                    {cert.label}
                  </Typography>
                </Box>
              ))}
            </Stack>

            {/* Contact links */}
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <ContactPill icon={<Email sx={{ fontSize: 14 }} />} text="adamelh1999@gmail.com" href="mailto:adamelh1999@gmail.com" />
              <ContactPill icon={<Phone sx={{ fontSize: 14 }} />} text="(201) 234-2766" />
              <ContactPill icon={<GitHub sx={{ fontSize: 14 }} />} text="github.com/adamel99" href="https://github.com/adamel99" />
            </Stack>
          </motion.div>
        </Container>
      </Box>

      {/* ── CONTENT ── */}
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1, pb: { xs: 14, md: 20 } }}>

        {/* Professional Summary */}
        <Section eyebrow="Overview" title="Professional Summary" color={theme.palette.tertiary.main}>
          <SpotlightCard color={theme.palette.tertiary.main}>
            <Box sx={{ p: { xs: 3.5, md: 4.5 } }}>
              <Typography sx={{ fontSize: "0.97rem", color: theme.palette.text.secondary, lineHeight: 1.9 }}>
                CompTIA Security+ certified cybersecurity professional specializing in incident response,
                threat detection, and security monitoring, combined with hands-on experience building
                real-time audio plugins in C++ and JUCE. Comfortable working across the stack — from
                memory forensics and SIEM-style log correlation to DSP algorithm design, multithreaded
                audio callbacks, and full-stack web development. Strong programming foundation in C++,
                Python, JavaScript, SQL, and Bash for automation, signal processing, and vulnerability analysis.
              </Typography>
            </Box>
          </SpotlightCard>
        </Section>

        {/* Education */}
        <Section eyebrow="Background" title="Education" color={theme.palette.accent.main}>
          <SpotlightCard color={theme.palette.accent.main}>
            <Box sx={{ p: { xs: 3.5, md: 4.5 } }}>
              <Box sx={{
                display: "flex", justifyContent: "space-between",
                alignItems: "flex-start", flexWrap: "wrap", gap: 2, mb: 2.5,
              }}>
                <Box>
                  <Typography sx={{
                    fontWeight: 800, fontSize: "1.18rem",
                    color: theme.palette.text.primary, mb: 0.5, letterSpacing: "-0.015em",
                  }}>
                    New Jersey Institute of Technology
                  </Typography>
                  <Typography sx={{
                    fontSize: "0.82rem", color: theme.palette.accent.main,
                    fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.02em",
                  }}>
                    CompTIA Security+ Cybersecurity Certificate Program
                  </Typography>
                </Box>
                <DateBadge text="Feb 2025 – Nov 2025" color={theme.palette.accent.main} />
              </Box>

              <Typography sx={{
                fontSize: "0.72rem", fontFamily: "monospace",
                color: theme.palette.text.disabled, mb: 2.5, letterSpacing: "0.03em",
              }}>
                Newark, New Jersey
              </Typography>

              <Box sx={{ height: "1px", background: `linear-gradient(to right, ${theme.palette.accent.main}22, transparent)`, mb: 2.5 }} />

              <Typography sx={{
                fontSize: "0.57rem", fontFamily: "monospace",
                color: theme.palette.text.disabled, letterSpacing: "0.18em",
                textTransform: "uppercase", mb: 1.5,
              }}>
                Key Courses
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
                {[
                  "Threat Hunting & Intelligence",
                  "Incident Response & Digital Forensics",
                  "Computer Networking Fundamentals",
                  "Security Information & Event Management",
                ].map((course) => (
                  <Box key={course} sx={{
                    px: 1.25, py: 0.4,
                    fontSize: "0.72rem", fontFamily: "monospace",
                    color: theme.palette.accent.main,
                    background: `${theme.palette.accent.main}09`,
                    border: `1px solid ${theme.palette.accent.main}18`,
                    borderRadius: "4px", letterSpacing: "0.02em",
                  }}>
                    {course}
                  </Box>
                ))}
              </Box>
            </Box>
          </SpotlightCard>
        </Section>

        {/* Work Experience */}
        <Section eyebrow="Work History" title="Work Experience" color={theme.palette.success.main}>
          <SpotlightCard color={theme.palette.success.main}>
            <Box sx={{ p: { xs: 3.5, md: 4.5 } }}>
              <Box sx={{
                display: "flex", justifyContent: "space-between",
                alignItems: "flex-start", flexWrap: "wrap", gap: 2, mb: 2.5,
              }}>
                <Box>
                  <Typography sx={{
                    fontWeight: 800, fontSize: "1.18rem",
                    color: theme.palette.text.primary, mb: 0.4, letterSpacing: "-0.015em",
                  }}>
                    Delivery Driver
                  </Typography>
                  <Typography sx={{
                    fontSize: "0.78rem", color: theme.palette.success.main,
                    fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.03em",
                  }}>
                    UberEats · Jersey City, NJ
                  </Typography>
                </Box>
                <DateBadge text="2022 – Jan 2025" color={theme.palette.success.main} />
              </Box>

              <Box sx={{ height: "1px", background: `linear-gradient(to right, ${theme.palette.success.main}22, transparent)`, mb: 2.5 }} />

              <BulletList
                color={theme.palette.success.main}
                items={[
                  "Managed independent workload consistently over 3 years, maintaining high customer satisfaction ratings in a fast-paced, customer-facing role.",
                  "Resolved delivery issues and route conflicts in real time, demonstrating strong problem-solving and adaptability under pressure.",
                  "Communicated professionally with customers and support teams to address concerns and ensure reliable service delivery.",
                ]}
              />
            </Box>
          </SpotlightCard>
        </Section>

        {/* Certifications & Skills */}
        <Section eyebrow="Qualifications" title="Certifications & Skills" color={theme.palette.primary.main}>
          <Stack spacing={2.5}>
            {/* Cert cards */}
            <SpotlightCard color={theme.palette.primary.main}>
              <Box sx={{ p: { xs: 3.5, md: 4.5 } }}>
                <Typography sx={{
                  fontSize: "0.57rem", fontFamily: "monospace",
                  color: theme.palette.text.disabled, letterSpacing: "0.18em",
                  textTransform: "uppercase", mb: 2.5,
                }}>
                  Certifications
                </Typography>
                <Stack direction="row" spacing={1.25} flexWrap="wrap" useFlexGap>
                  {[
                    { label: "CompTIA Security+", color: theme.palette.tertiary.main, icon: <VerifiedUser sx={{ fontSize: 15 }} /> },
                    { label: "TDX Arena IR Expert", color: theme.palette.primary.main, icon: <Shield sx={{ fontSize: 15 }} /> },
                    { label: "NJIT Cybersecurity Program", color: theme.palette.success.main, icon: <School sx={{ fontSize: 15 }} /> },
                  ].map((cert) => (
                    <Box key={cert.label} sx={{
                      display: "flex", alignItems: "center", gap: 1,
                      px: 1.75, py: 1,
                      background: `${cert.color}07`,
                      border: `1px solid ${cert.color}1E`,
                      borderRadius: "7px",
                      transition: "all 0.18s ease",
                      "&:hover": { background: `${cert.color}12`, border: `1px solid ${cert.color}28` },
                    }}>
                      <Box sx={{ color: cert.color, display: "flex" }}>{cert.icon}</Box>
                      <Typography sx={{
                        fontSize: "0.8rem", fontWeight: 600,
                        color: theme.palette.text.primary,
                        fontFamily: "monospace", letterSpacing: "0.01em",
                      }}>
                        {cert.label}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </SpotlightCard>

            {/* Skills grid */}
            <SpotlightCard color={theme.palette.tertiary.main}>
              <Box sx={{ p: { xs: 3.5, md: 4.5 } }}>
                <Typography sx={{
                  fontSize: "0.57rem", fontFamily: "monospace",
                  color: theme.palette.text.disabled, letterSpacing: "0.18em",
                  textTransform: "uppercase", mb: 3,
                }}>
                  Technical Skills
                </Typography>
                <Grid container spacing={{ xs: 2, md: 5 }}>
                  <Grid item xs={12} sm={6}>
                    <SkillRow
                      label="Languages"
                      items="C++ (C++17), Python, JavaScript, SQL, Bash"
                      color={theme.palette.tertiary.main}
                    />
                    <SkillRow
                      label="Audio / DSP"
                      items="JUCE Framework, Real-Time Audio Processing, Digital Signal Processing, VST3/AU Plugin Development, DSP Algorithms"
                      color={theme.palette.tertiary.main}
                    />
                    <SkillRow
                      label="Systems / Concepts"
                      items="Multithreading, Synchronization, Memory Management, Windows/Linux/macOS"
                      color={theme.palette.tertiary.main}
                    />
                    <SkillRow
                      label="Security Tools / Platforms"
                      items="Splunk, Wireshark, Snort IDS/IPS, ClamAV, Nmap, tcpdump, Snorby, Active Directory/GPO"
                      color={theme.palette.tertiary.main}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <SkillRow
                      label="Security Skills"
                      items="Incident Response, Digital Forensics, Threat Hunting, Malware Analysis, Vulnerability Assessment, SIEM Analysis, Log Analysis, Network Traffic Analysis"
                      color={theme.palette.accent.main}
                    />
                    <SkillRow
                      label="Networking"
                      items="TCP/IP, Packet Analysis, OSI Model, HTTP/HTTPS, Firewall Configuration"
                      color={theme.palette.accent.main}
                    />
                    <SkillRow
                      label="Web / Full-Stack"
                      items="React, Node.js, Express, Sequelize, RESTful API Design, OWASP Security Principles"
                      color={theme.palette.accent.main}
                    />
                  </Grid>
                </Grid>
              </Box>
            </SpotlightCard>
          </Stack>
        </Section>

        {/* Projects */}
        <Section eyebrow="Experience" title="Projects & Labs" color={theme.palette.tertiary.main}>
          <Stack spacing={3}>
            {projects.map((proj, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
              >
                <SpotlightCard color={proj.color}>
                  <Box sx={{ p: { xs: 3.5, md: 4.5 } }}>

                    {/* Header */}
                    <Box sx={{
                      display: "flex", justifyContent: "space-between",
                      alignItems: "flex-start", flexWrap: "wrap", gap: 2, mb: 2.5,
                    }}>
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                          <Box
                            component={motion.div}
                            animate={{ opacity: [1, 0.25, 1] }}
                            transition={{ duration: 2.8, repeat: Infinity }}
                            sx={{
                              width: 5, height: 5, borderRadius: "50%",
                              background: proj.color, opacity: 0.8,
                            }}
                          />
                          <Typography sx={{
                            fontFamily: "monospace", fontSize: "0.58rem",
                            color: proj.color, fontWeight: 600, letterSpacing: "0.14em",
                            textTransform: "uppercase",
                          }}>
                            Complete
                          </Typography>
                        </Box>
                        <Typography sx={{
                          fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.15, mb: 0.5,
                          fontSize: { xs: "1.1rem", md: "1.38rem" },
                          color: theme.palette.text.primary,
                        }}>
                          {proj.name}
                        </Typography>
                        <Typography sx={{
                          fontSize: "0.7rem", fontFamily: "monospace",
                          color: theme.palette.text.disabled, letterSpacing: "0.03em",
                        }}>
                          {proj.subtitle}
                        </Typography>
                      </Box>
                      <DateBadge text={proj.date} color={proj.color} />
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
                            fontFamily: "monospace", fontSize: "0.75rem",
                            color: proj.color, textDecoration: "none",
                            display: "inline-flex", alignItems: "center", gap: 0.75,
                            opacity: 0.75, transition: "opacity 0.18s ease",
                            "&:hover": { opacity: 1 },
                          }}
                        >
                          <span style={{ fontWeight: 700 }}>→</span>
                          {proj.link}
                        </Box>
                      </Box>
                    )}

                    <Box sx={{ height: "1px", background: `linear-gradient(to right, ${proj.color}22, transparent)`, mb: 2.5 }} />

                    <BulletList items={proj.desc} color={proj.color} />
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
