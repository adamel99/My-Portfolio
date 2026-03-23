import React from "react";
import {
  Box, Typography, Container, Grid, Stack, Divider,
  IconButton, Avatar,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import {
  GitHub, LinkedIn, Email,
  Security, Code, Extension, MusicNote, NorthEast,
} from "@mui/icons-material";
import { useHistory } from "react-router-dom";

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

// ── Timeline item ───────────────────────────────────────────────

const TimelineItem = ({ year, title, body, color, last = false }) => {
  const theme = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ display: "flex", gap: 3 }}>
        {/* Left — line + dot */}
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
          <Box sx={{
            width: 10, height: 10, borderRadius: "50%",
            background: color, flexShrink: 0,
            boxShadow: `0 0 10px ${color}80`,
            mt: 0.5,
          }} />
          {!last && (
            <Box sx={{
              width: 1, flex: 1, mt: 1,
              background: `linear-gradient(180deg, ${color}30, transparent)`,
              minHeight: 40,
            }} />
          )}
        </Box>

        {/* Right — content */}
        <Box sx={{ pb: last ? 0 : 5 }}>
          <Typography sx={{
            fontFamily: "monospace", fontSize: "0.62rem", fontWeight: 700,
            color: color, letterSpacing: "0.12em", textTransform: "uppercase", mb: 0.5,
          }}>
            {year}
          </Typography>
          <Typography sx={{ fontWeight: 800, fontSize: "1rem", color: theme.palette.text.primary, mb: 1 }}>
            {title}
          </Typography>
          <Typography sx={{ fontSize: "0.88rem", color: theme.palette.text.secondary, lineHeight: 1.82 }}>
            {body}
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
};

// ── Data ────────────────────────────────────────────────────────

const sections = [
  {
    icon: <Security sx={{ fontSize: 22 }} />,
    title: "Cybersecurity",
    subtitle: "Securing What I Build",
    body: "CompTIA Security+ certified, focused on incident response, threat detection, and security monitoring — with a developer's understanding of how systems are built and how they can be broken.",
    skills: ["CompTIA Security+", "Incident Response", "Threat Detection", "SIEM"],
    color: "#00BBF9",
  },
  {
    icon: <Code sx={{ fontSize: 22 }} />,
    title: "Full-Stack Development",
    subtitle: "Building Across the Stack",
    body: "Skilled in React, Node.js, and SQL, I design robust web applications with clean code and security baked in from day one — not bolted on after the fact.",
    skills: ["React", "Node.js", "SQL", "OWASP", "REST APIs"],
    color: "#DC136C",
  },
  {
    icon: <Extension sx={{ fontSize: 22 }} />,
    title: "Audio Plugin Dev",
    subtitle: "Where Hobbies Meet Engineering",
    body: "Built a real-time stereo imager VST using C++ and JUCE — something I and close friends actually use. C++ also deepens my understanding of low-level systems, directly relevant to malware analysis and vulnerability research.",
    skills: ["JUCE", "C++", "DSP", "Real-time Audio"],
    color: "#7B61FF",
  },
  {
    icon: <MusicNote sx={{ fontSize: 22 }} />,
    title: "Music Producer",
    subtitle: "Where It All Started",
    body: "Music production was my first creative outlet — and ironically, conversations with producer friends about software security gaps are part of what sparked my interest in cybersecurity.",
    skills: ["Production", "Sound Design", "Mixing", "Mastering"],
    color: "#FDCFF3",
  },
];

const socialLinks = [
  { icon: <GitHub sx={{ fontSize: 20 }} />, url: "https://github.com/adamel99", label: "GitHub" },
  { icon: <LinkedIn sx={{ fontSize: 20 }} />, url: "#", label: "LinkedIn" },
  { icon: <Email sx={{ fontSize: 20 }} />, url: "mailto:adamelh1999@gmail.com", label: "Email" },
];

const timeline = [
  {
    year: "NJIT · Division I Track",
    title: "Athlete & Student",
    body: "Ran Division I track at NJIT for two years while carrying a full technical courseload. Balancing that level of athletic commitment alongside rigorous academic work built the discipline and time management that carries into everything I do professionally.",
    color: "#00BBF9",
  },
  {
    year: "Early Career",
    title: "Started as a Developer",
    body: "Built real applications from scratch — web platforms, RESTful APIs, databases. I enjoyed learning how systems were built and how creative we can get along the way. It even led me to build useful applications for my own music production that my producer friends and I still use to this day! My favorite one is the Stereo Imager plugin that allows me to control stereo width of the audio. It was a real life-saver for my mixes and financially because a lot of modern plugins can get quite expensive.",
    color: "#7B61FF",
  },
  {
    year: "The Turning Point",
    title: "A Conversation That Changed Everything",
    body: "Producer friends mentioned you can high-level and expensive plugins for free without any risk of virus or compromise. That stopped me cold. Organizations put enormous resources into building powerful software but almost none into securing it. It made me question everything I had built — was any of it actually secure? Am I putting anyone else at risk? That curiosity led me directly to cybersecurity.",
    color: "#DC136C",
  },
  {
    year: "NJIT Cybersecurity Program",
    title: "Hands-On Training",
    body: "The program covered threat hunting, incident response, digital forensics, and networking fundamentals — both offensive and defensive. Through TDX Arena I worked through real compromise scenarios: memory forensics, malware triage, and PCAP analysis, writing formal IR reports at the end of each case.",
    color: "#00BBF9",
  },
  {
    year: "2025",
    title: "CompTIA Security+ Certified",
    body: "Earned Security+ through NJIT's program — a DoD-approved baseline cert. I also went back into every application I had built and applied what I'd learned: parameterized queries, secure session management, RBAC, and OWASP principles throughout. Building things and securing them — that's the combination I bring.",
    color: "#1DB954",
  },
];

// ════════════════════════════════════════════════════════════════
// ABOUT PAGE
// ════════════════════════════════════════════════════════════════

const AboutMe = () => {
  const theme = useTheme();
  const history = useHistory();

  return (
    <Box sx={{ minHeight: "100vh", background: theme.palette.background.default, overflowX: "hidden" }}>

      {/* ── HERO ── */}
      <Box sx={{ position: "relative", pt: { xs: 14, md: 20 }, pb: { xs: 10, md: 16 }, overflow: "hidden" }}>
        <GridBg />
        <Orb size={800} top="-20%" left="-15%"
          color={`radial-gradient(circle, ${theme.palette.tertiary.main}40, ${theme.palette.accent.main}20, transparent 70%)`}
          delay={0} opacity={0.85} />
        <Orb size={500} bottom="-10%" right="-10%"
          color={`radial-gradient(circle, ${theme.palette.primary.main}35, transparent 70%)`}
          delay={6} opacity={0.8} />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={8} alignItems="center">

            {/* Left — text */}
            <Grid item xs={12} md={7}>
              <motion.div initial={{ opacity: 0, x: -32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
                <Label text="About Me" color={theme.palette.tertiary.main} />

                <Typography sx={{
                  fontWeight: 900,
                  fontSize: { xs: "3.5rem", sm: "5rem", md: "7rem" },
                  lineHeight: 0.95, letterSpacing: "-0.045em", mb: 4,
                }}>
                  <Box component="span" sx={{ color: theme.palette.text.primary }}>tech &</Box>
                  <br />
                  <Box component="span" sx={{
                    background: `linear-gradient(100deg, ${theme.palette.tertiary.main}, ${theme.palette.accent.main} 50%, ${theme.palette.primary.main})`,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  }}>
                    creativity
                  </Box>
                </Typography>

                <Typography sx={{
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  color: theme.palette.text.secondary,
                  lineHeight: 1.88, mb: 2, maxWidth: 520,
                }}>
                  Cybersecurity found me as much as I found it. I started as a developer,
                  got deep into how systems are built, then started asking the harder question —
                  how do they get broken into? That curiosity led me here.
                </Typography>

                <Typography sx={{
                  fontSize: { xs: "0.9rem", md: "0.95rem" },
                  color: theme.palette.text.disabled,
                  lineHeight: 1.85, mb: 5, maxWidth: 500,
                }}>
                  CompTIA Security+ certified · Jersey City, NJ · Open to remote
                </Typography>

                {/* Social links */}
                <Stack direction="row" spacing={1.5} alignItems="center">
                  {socialLinks.map((link, i) => (
                    <motion.div key={i} whileHover={{ scale: 1.08, y: -2 }} whileTap={{ scale: 0.95 }}>
                      <IconButton
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={link.label}
                        sx={{
                          color: theme.palette.text.disabled,
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.07)",
                          borderRadius: "10px",
                          width: 42, height: 42,
                          transition: "all 0.2s ease",
                          "&:hover": {
                            color: theme.palette.text.primary,
                            background: "rgba(255,255,255,0.07)",
                            border: "1px solid rgba(255,255,255,0.14)",
                          },
                        }}
                      >
                        {link.icon}
                      </IconButton>
                    </motion.div>
                  ))}
                </Stack>
              </motion.div>
            </Grid>

            {/* Right — photo */}
            <Grid item xs={12} md={5} sx={{ display: { xs: "none", md: "flex" }, justifyContent: "flex-end" }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                style={{ position: "relative", width: 280 }}
              >
                <Box sx={{ position: "absolute", inset: -40, background: `radial-gradient(circle, ${theme.palette.tertiary.main}16, transparent 65%)`, filter: "blur(50px)", zIndex: 0 }} />

                <Box sx={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "center" }}>
                  <Box sx={{
                    position: "relative", padding: "3px", borderRadius: "50%",
                    background: `linear-gradient(135deg, ${theme.palette.tertiary.main}, ${theme.palette.accent.main}, ${theme.palette.primary.main})`,
                    boxShadow: `0 0 60px ${theme.palette.tertiary.main}25, 0 20px 80px rgba(0,0,0,0.6)`,
                  }}>
                    <Avatar
                      src="/Images/selfie.jpg"
                      alt="Adam Elhamami"
                      sx={{
                        width: { xs: 200, md: 260 },
                        height: { xs: 200, md: 260 },
                        border: `4px solid ${theme.palette.background.default}`,
                      }}
                    />
                    <Box sx={{
                      position: "absolute", bottom: 16, right: 16,
                      width: 18, height: 18, borderRadius: "50%",
                      background: theme.palette.background.default,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: `0 0 12px ${theme.palette.success.main}`,
                    }}>
                      <Box
                        component={motion.div}
                        animate={{ opacity: [1, 0.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        sx={{ width: 10, height: 10, borderRadius: "50%", background: theme.palette.success.main }}
                      />
                    </Box>
                  </Box>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                    style={{ position: "absolute", bottom: 10, right: -60, zIndex: 2 }}
                  >
                    <Box sx={{
                      px: 2, py: 1.5,
                      background: "rgba(8,8,14,0.92)", backdropFilter: "blur(20px)",
                      border: `1px solid ${theme.palette.tertiary.main}20`,
                      borderRadius: "12px", boxShadow: `0 12px 32px rgba(0,0,0,0.6)`,
                    }}>
                      <Typography sx={{ fontFamily: "monospace", fontSize: "0.55rem", color: theme.palette.success.main, letterSpacing: "0.12em", mb: 0.3, fontWeight: 700 }}>AVAILABLE</Typography>
                      <Typography sx={{ fontSize: "0.8rem", fontWeight: 800, color: theme.palette.text.primary }}>Open to Work</Typography>
                    </Box>
                  </motion.div>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ── STORY / TIMELINE ── */}
      <Box sx={{ py: { xs: 10, md: 16 }, position: "relative", overflow: "hidden", background: `linear-gradient(180deg, ${theme.palette.background.default}, ${theme.palette.background.elevated} 50%, ${theme.palette.background.default})` }}>
        <GridBg />
        <Orb size={500} top="10%" right="-10%"
          color={`radial-gradient(circle, ${theme.palette.accent.main}20, transparent 70%)`}
          delay={2} opacity={0.8} />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={{ xs: 6, md: 12 }} alignItems="flex-start">

            {/* Left — big statement */}
            <Grid item xs={12} md={5}>
              <Box sx={{ position: { md: "sticky" }, top: { md: 120 } }}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                  <Label text="The Journey" color={theme.palette.tertiary.main} />
                  <Typography sx={{
                    fontWeight: 900,
                    fontSize: { xs: "2.2rem", md: "3rem" },
                    letterSpacing: "-0.035em", lineHeight: 1.1, mb: 3,
                  }}>
                    Cybersecurity{" "}
                    <Box component="span" sx={{
                      background: `linear-gradient(100deg, ${theme.palette.tertiary.main}, ${theme.palette.accent.main})`,
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    }}>
                      found me
                    </Box>
                    <br />
                    as much as I found it.
                  </Typography>
                  <Typography sx={{ fontSize: "0.92rem", color: theme.palette.text.secondary, lineHeight: 1.9, maxWidth: 380 }}>
                    From running Division I track at NJIT to building production apps,
                    making beats, and eventually asking the question that changed everything —
                    how does this actually get broken into?
                  </Typography>
                </motion.div>
              </Box>
            </Grid>

            {/* Right — timeline */}
            <Grid item xs={12} md={7}>
              {timeline.map((item, i) => (
                <TimelineItem
                  key={i}
                  year={item.year}
                  title={item.title}
                  body={item.body}
                  color={item.color}
                  last={i === timeline.length - 1}
                />
              ))}
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ── EXPERTISE CARDS ── */}
      <Box sx={{ py: { xs: 10, md: 14 }, position: "relative", overflow: "hidden" }}>
        <GridBg />
        <Orb size={500} top="20%" right="-10%"
          color={`radial-gradient(circle, ${theme.palette.accent.main}22, transparent 70%)`}
          delay={3} opacity={0.8} />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <Label text="Expertise" color={theme.palette.primary.main} />
            <Typography sx={{ fontWeight: 900, fontSize: { xs: "2rem", md: "3rem" }, letterSpacing: "-0.03em", mb: 8 }}>
              What I Do
            </Typography>
          </motion.div>

          <Grid container spacing={3}>
            {sections.map((section, i) => (
              <Grid item xs={12} md={6} key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  style={{ height: "100%" }}
                >
                  <Box sx={{
                    height: "100%", p: 4, borderRadius: "18px",
                    border: "1px solid rgba(255,255,255,0.05)",
                    background: `linear-gradient(150deg, rgba(255,255,255,0.025), ${section.color}05)`,
                    display: "flex", flexDirection: "column", gap: 2.5,
                    transition: "all 0.22s ease",
                    "&:hover": {
                      border: `1px solid ${section.color}25`,
                      boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 30px ${section.color}08`,
                      transform: "translateY(-4px)",
                    },
                  }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box sx={{
                        p: 1.6, background: `${section.color}0E`,
                        border: `1px solid ${section.color}20`,
                        borderRadius: "12px", color: section.color, display: "flex",
                      }}>
                        {section.icon}
                      </Box>
                      <Box>
                        <Typography sx={{ fontWeight: 800, fontSize: "1rem", color: theme.palette.text.primary, lineHeight: 1.2 }}>
                          {section.title}
                        </Typography>
                        <Typography sx={{ fontSize: "0.72rem", color: theme.palette.text.disabled, fontFamily: "monospace", mt: 0.3 }}>
                          {section.subtitle}
                        </Typography>
                      </Box>
                    </Box>

                    <Divider sx={{ borderColor: "rgba(255,255,255,0.05)" }} />

                    <Typography sx={{ fontSize: "0.88rem", color: theme.palette.text.secondary, lineHeight: 1.85, flex: 1 }}>
                      {section.body}
                    </Typography>

                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.85, pt: 0.5 }}>
                      {section.skills.map((skill, j) => (
                        <motion.div key={j} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: j * 0.05 }}>
                          <Box sx={{
                            px: 1.4, py: 0.45,
                            fontSize: "0.68rem", fontFamily: "monospace",
                            color: section.color,
                            background: `${section.color}0A`,
                            border: `1px solid ${section.color}18`,
                            borderRadius: "5px", letterSpacing: "0.03em",
                            transition: "all 0.18s ease",
                            "&:hover": { background: `${section.color}16`, border: `1px solid ${section.color}30` },
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

      {/* ── PHILOSOPHY ── */}
      <Box sx={{ py: { xs: 10, md: 14 }, position: "relative", overflow: "hidden" }}>
        <GridBg />
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={8} alignItems="center">

            <Grid item xs={12} md={6}>
              <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <Label text="Philosophy" color={theme.palette.accent.main} />
                <Typography sx={{
                  fontWeight: 900,
                  fontSize: { xs: "2rem", md: "3rem" },
                  letterSpacing: "-0.035em", lineHeight: 1.1, mb: 3,
                }}>
                  Security is a{" "}
                  <Box component="span" sx={{
                    background: `linear-gradient(100deg, ${theme.palette.tertiary.main}, ${theme.palette.accent.main})`,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  }}>
                    mindset,
                  </Box>
                  <br />
                  not a feature.
                </Typography>
                <Typography sx={{ fontSize: "0.92rem", color: theme.palette.text.secondary, lineHeight: 1.9, maxWidth: 440, mb: 2.5 }}>
                  Every system I build is designed with defense in depth from day one.
                  I went back into every application I'd already built and applied what
                  I learned — parameterized queries, RBAC, secure session management,
                  OWASP principles throughout. Building first and securing later is a
                  lesson I learned the hard way, and one I won't repeat.
                </Typography>
                <Typography sx={{ fontSize: "0.92rem", color: theme.palette.text.secondary, lineHeight: 1.9, maxWidth: 440 }}>
                  The biggest thing I've taken from cybersecurity so far — every case
                  is different, every compromise has its own story. Thinking like both
                  the attacker and the developer is an elite combination in this field.
                  Real-world consequences are what keep me locked in.
                </Typography>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6}>
              <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
                <Stack spacing={2.5}>
                  {[
                    { label: "Certification", value: "CompTIA Security+", color: theme.palette.tertiary.main, sub: "DoD-approved baseline cert · Active 2025" },
                    { label: "IR Training", value: "TDX Arena Expert", color: theme.palette.primary.main, sub: "3 real-world IR simulations completed" },
                    { label: "Education", value: "NJIT Certificate", color: theme.palette.accent.main, sub: "Feb – Nov 2025 · Newark, NJ" },
                    { label: "Athletics", value: "Division I Track", color: "#FDCFF3", sub: "NJIT · 2 years competing" },
                    { label: "Location", value: "Jersey City, NJ", color: theme.palette.success.main, sub: "Remote OK · Open to work" },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <Box sx={{
                        display: "flex", alignItems: "center", gap: 2,
                        p: 2.5, borderRadius: "14px",
                        border: "1px solid rgba(255,255,255,0.05)",
                        background: `linear-gradient(135deg, rgba(255,255,255,0.025), ${stat.color}05)`,
                        transition: "all 0.2s ease",
                        "&:hover": { border: `1px solid ${stat.color}20`, transform: "translateX(4px)" },
                      }}>
                        <Box sx={{ width: 3, height: 36, borderRadius: "2px", background: stat.color, opacity: 0.6, flexShrink: 0 }} />
                        <Box>
                          <Typography sx={{ fontSize: "0.62rem", fontFamily: "monospace", color: stat.color, letterSpacing: "0.12em", textTransform: "uppercase", mb: 0.3 }}>
                            {stat.label}
                          </Typography>
                          <Typography sx={{ fontWeight: 800, fontSize: "0.95rem", color: theme.palette.text.primary, lineHeight: 1.2 }}>
                            {stat.value}
                          </Typography>
                          <Typography sx={{ fontSize: "0.75rem", color: theme.palette.text.disabled, mt: 0.2 }}>
                            {stat.sub}
                          </Typography>
                        </Box>
                      </Box>
                    </motion.div>
                  ))}
                </Stack>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ── CTA ── */}
      <Box sx={{ py: { xs: 12, md: 18 }, position: "relative", overflow: "hidden" }}>
        <GridBg />
        <Orb size={600} top="20%" left="30%"
          color={`radial-gradient(circle, ${theme.palette.accent.main}22, ${theme.palette.tertiary.main}12, transparent 70%)`}
          delay={0} opacity={0.9} />

        <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <Label text="Work Together" color={theme.palette.tertiary.main} />

            <Typography sx={{
              fontWeight: 900,
              fontSize: { xs: "2.8rem", md: "4rem" },
              letterSpacing: "-0.04em", lineHeight: 1.0, mb: 3,
            }}>
              let's build
              <br />
              <Box component="span" sx={{
                background: `linear-gradient(100deg, ${theme.palette.tertiary.main}, ${theme.palette.accent.main}, ${theme.palette.primary.main})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                something
              </Box>
            </Typography>

            <Typography sx={{ color: theme.palette.text.secondary, fontSize: "1rem", lineHeight: 1.88, mb: 6, maxWidth: 380, mx: "auto" }}>
              Want to explore my work or get in touch? Check out my projects or
              connect with me directly.
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center" alignItems="center">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Box
                  onClick={() => history.push("/products")}
                  sx={{
                    display: "inline-flex", alignItems: "center", gap: 1,
                    px: 4, py: 1.6, borderRadius: "40px", cursor: "pointer",
                    background: `linear-gradient(135deg, ${theme.palette.tertiary.main}, ${theme.palette.tertiary.dark})`,
                    color: "#000", fontWeight: 700, fontFamily: "monospace", fontSize: "0.9rem",
                    boxShadow: `0 0 24px ${theme.palette.tertiary.main}30`,
                    transition: "all 0.2s ease",
                    "&:hover": { boxShadow: `0 0 32px ${theme.palette.tertiary.main}50` },
                  }}
                >
                  View Projects <NorthEast sx={{ fontSize: 16 }} />
                </Box>
              </motion.div>

              <Box
                component="a"
                href="https://github.com/adamel99"
                target="_blank"
                rel="noreferrer"
                sx={{
                  display: "inline-flex", alignItems: "center", gap: 1,
                  fontSize: "0.9rem", fontFamily: "monospace",
                  color: theme.palette.text.secondary,
                  textDecoration: "underline",
                  textDecorationColor: "rgba(255,255,255,0.15)",
                  textUnderlineOffset: "4px",
                  transition: "all 0.2s ease",
                  "&:hover": { color: theme.palette.text.primary, textDecorationColor: "rgba(255,255,255,0.4)" },
                }}
              >
                <GitHub sx={{ fontSize: 18 }} /> GitHub Profile
              </Box>
            </Stack>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default AboutMe;
