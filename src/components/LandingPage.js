import React from "react";
import {
  Box, Typography, Container, Button, Stack, Grid, Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Security, Code, Audiotrack, ArrowForward,
  Shield, VerifiedUser, Terminal, GitHub, Email,
  KeyboardArrowDown, CheckCircle, NorthEast,
} from "@mui/icons-material";
import { useHistory } from "react-router-dom";

// ── Ambient gradient orb ────────────────────────────────────────
const Orb = ({ size, top, left, right, bottom, color, delay = 0, opacity = 1 }) => (
  <motion.div
    animate={{ scale: [1, 1.12, 1], opacity: [opacity * 0.7, opacity, opacity * 0.7] }}
    transition={{ duration: 16, repeat: Infinity, delay, ease: "easeInOut" }}
    style={{
      position: "absolute",
      width: size, height: size,
      top, left, right, bottom,
      borderRadius: "50%",
      background: color,
      filter: "blur(120px)",
      pointerEvents: "none", zIndex: 0,
    }}
  />
);

// ── Shared grid bg ──────────────────────────────────────────────
const GridBg = ({ opacity = 0.022 }) => (
  <Box sx={{
    position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
    backgroundImage: `
      linear-gradient(rgba(0,187,249,${opacity}) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,187,249,${opacity}) 1px, transparent 1px)
    `,
    backgroundSize: "80px 80px",
  }} />
);

// ── Typing text ─────────────────────────────────────────────────
const TypingText = ({ texts }) => {
  const [display, setDisplay] = React.useState("");
  const [idx, setIdx] = React.useState(0);
  const [del, setDel] = React.useState(false);
  React.useEffect(() => {
    const cur = texts[idx];
    if (!del && display === cur) { setTimeout(() => setDel(true), 2600); return; }
    if (del && display === "") { setDel(false); setIdx(p => (p + 1) % texts.length); return; }
    const t = setTimeout(() => setDisplay(p => del ? cur.slice(0, p.length - 1) : cur.slice(0, p.length + 1)), del ? 35 : 70);
    return () => clearTimeout(t);
  }, [display, idx, del, texts]);
  return (
    <span>
      {display}
      <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}>_</motion.span>
    </span>
  );
};

// ── Section label ───────────────────────────────────────────────
const Label = ({ text, color }) => {
  const theme = useTheme();
  return (
    <Typography sx={{
      fontFamily: "monospace", fontSize: "0.7rem", fontWeight: 700,
      letterSpacing: "0.18em", textTransform: "uppercase",
      color: color || theme.palette.text.disabled,
      mb: 2,
    }}>
      {text}
    </Typography>
  );
};

// ══════════════════════════════════════════════════════════════
// HERO
// ══════════════════════════════════════════════════════════════
const Hero = () => {
  const theme = useTheme();
  const history = useHistory();
  const { scrollY } = useScroll();
  const fadeOut = useTransform(scrollY, [0, 400], [1, 0]);
  const slideUp = useTransform(scrollY, [0, 400], [0, 60]);

  return (
    <Box sx={{
      position: "relative",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      background: theme.palette.background.default,
      overflow: "hidden",
    }}>
      <Orb
        size={800} top="-20%" left="-15%"
        color={`radial-gradient(circle, ${theme.palette.tertiary.main}55, ${theme.palette.accent.main}30, transparent 70%)`}
        delay={0} opacity={0.9}
      />
      <Orb
        size={650} bottom="-25%" right="-10%"
        color={`radial-gradient(circle, ${theme.palette.primary.main}50, ${theme.palette.accent.main}25, transparent 70%)`}
        delay={6} opacity={0.85}
      />
      <Orb
        size={400} top="30%" left="40%"
        color={`radial-gradient(circle, ${theme.palette.accent.main}35, transparent 70%)`}
        delay={10} opacity={0.6}
      />

      <Box sx={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.015) 0px, transparent 2px)",
      }} />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={10} alignItems="center" sx={{ minHeight: "100vh" }}>

          {/* Left — text */}
          <Grid item xs={12} md={7}>
            <motion.div
              style={{ opacity: fadeOut, y: slideUp }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Open to work */}
              <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1, mb: 6 }}>
                <Box
                  component={motion.div}
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  sx={{ width: 7, height: 7, borderRadius: "50%", background: theme.palette.success.main, boxShadow: `0 0 10px ${theme.palette.success.main}` }}
                />
                <Typography sx={{ fontFamily: "monospace", fontSize: "0.72rem", color: theme.palette.success.main, fontWeight: 700, letterSpacing: "0.1em" }}>
                  OPEN TO WORK
                </Typography>
                <Typography sx={{ fontFamily: "monospace", fontSize: "0.68rem", color: theme.palette.text.disabled, letterSpacing: "0.06em" }}>
                  · NJ, USA · REMOTE OK
                </Typography>
              </Box>

              {/* Headline */}
              <Box sx={{ mb: 4 }}>
                <Typography sx={{
                  fontWeight: 900,
                  fontSize: { xs: "3.8rem", sm: "5rem", md: "6rem", lg: "7.5rem" },
                  lineHeight: 0.95,
                  letterSpacing: "-0.045em",
                  color: theme.palette.text.primary,
                }}>
                  Adam
                </Typography>
                <Typography sx={{
                  fontWeight: 900,
                  fontSize: { xs: "3.8rem", sm: "5rem", md: "6rem", lg: "7.5rem" },
                  lineHeight: 0.95,
                  letterSpacing: "-0.045em",
                  background: `linear-gradient(100deg, ${theme.palette.tertiary.main} 0%, ${theme.palette.accent.main} 45%, ${theme.palette.primary.main} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                  Elhamami
                </Typography>
              </Box>

              {/* Subtitle */}
              <Typography sx={{
                fontSize: { xs: "1rem", md: "1.15rem" },
                color: theme.palette.text.secondary,
                lineHeight: 1.85,
                mb: 5,
                maxWidth: 520,
              }}>
                with a passion for{" "}
                <Box component="span" sx={{ color: theme.palette.tertiary.main, fontWeight: 600 }}>protecting ideas</Box>
                {" "}and building secure, thoughtful digital experiences.
              </Typography>

              {/* Typing role */}
              <Typography sx={{
                fontFamily: "monospace",
                fontSize: { xs: "0.9rem", md: "1rem" },
                color: theme.palette.text.disabled,
                mb: 6,
                letterSpacing: "0.05em",
              }}>
                &gt;{" "}
                <Box component="span" sx={{ color: theme.palette.tertiary.main }}>
                  <TypingText texts={["Cybersecurity Professional", "Incident Responder", "Full-Stack Developer", "Security Analyst"]} />
                </Box>
              </Typography>

              {/* CTAs */}
              <Stack direction="row" spacing={3} alignItems="center" flexWrap="wrap" useFlexGap>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  <Button
                    variant="contained"
                    onClick={() => history.push("/skills")}
                    endIcon={<NorthEast sx={{ fontSize: 16 }} />}
                    sx={{
                      px: 4, py: 1.6,
                      fontSize: "0.88rem", fontFamily: "monospace", fontWeight: 700,
                      borderRadius: "40px",
                    }}
                  >
                    View Portfolio
                  </Button>
                </motion.div>

                <Button
                  onClick={() => history.push("/resume")}
                  sx={{
                    fontSize: "0.88rem", fontFamily: "monospace",
                    color: theme.palette.text.secondary,
                    textDecoration: "underline",
                    textDecorationColor: "rgba(255,255,255,0.15)",
                    textUnderlineOffset: "4px",
                    "&:hover": { color: theme.palette.text.primary, background: "transparent", textDecorationColor: "rgba(255,255,255,0.4)" },
                  }}
                >
                  Resume
                </Button>

                <Button
                  href="https://github.com/adamel99"
                  target="_blank"
                  sx={{ color: theme.palette.text.disabled, minWidth: "auto", p: 1, "&:hover": { color: theme.palette.text.primary, background: "transparent" } }}
                >
                  <GitHub sx={{ fontSize: 20 }} />
                </Button>
              </Stack>
            </motion.div>
          </Grid>

          {/* Right — photo */}
          <Grid item xs={12} md={5} sx={{ display: { xs: "none", md: "flex" }, justifyContent: "flex-end", alignItems: "center" }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ position: "relative", width: 320 }}
            >
              <Box sx={{
                position: "relative", zIndex: 1,
                borderRadius: "20px", overflow: "hidden",
                border: `1px solid rgba(255,255,255,0.08)`,
                boxShadow: `0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04)`,
              }}>
                {/* Titlebar */}
                <Box sx={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  px: 2.5, py: 1.25,
                  background: "rgba(255,255,255,0.03)",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  backdropFilter: "blur(8px)",
                }}>
                  <Box sx={{ display: "flex", gap: 0.7 }}>
                    {["#FF5F56", "#FFBD2E", "#27C93F"].map(c => (
                      <Box key={c} sx={{ width: 9, height: 9, borderRadius: "50%", background: c, opacity: 0.7 }} />
                    ))}
                  </Box>
                  <Typography sx={{ fontFamily: "monospace", fontSize: "0.58rem", color: "rgba(255,255,255,0.2)" }}>
                    adam_elhamami.exe
                  </Typography>
                  <Box sx={{ width: 9 }} />
                </Box>

                {/* Photo */}
                <Box sx={{ position: "relative", background: "#000" }}>
                  <img
                    src="/Images/selfie.jpg"
                    alt="Adam Elhamami"
                    style={{ width: "100%", display: "block", opacity: 0.9 }}
                  />
                  <Box sx={{
                    position: "absolute", bottom: 0, left: 0, right: 0, height: "50%",
                    background: `linear-gradient(transparent, ${theme.palette.background.default}CC)`,
                  }} />
                </Box>

                {/* Status strip */}
                <Box sx={{
                  px: 2.5, py: 1.4,
                  background: "rgba(255,255,255,0.02)",
                  borderTop: "1px solid rgba(255,255,255,0.05)",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.9 }}>
                    <Box
                      component={motion.div}
                      animate={{ opacity: [1, 0.2, 1] }}
                      transition={{ duration: 2.2, repeat: Infinity }}
                      sx={{ width: 6, height: 6, borderRadius: "50%", background: theme.palette.success.main, boxShadow: `0 0 6px ${theme.palette.success.main}` }}
                    />
                    <Typography sx={{ fontFamily: "monospace", fontSize: "0.62rem", color: theme.palette.success.main, fontWeight: 700, letterSpacing: "0.06em" }}>
                      OPEN TO WORK
                    </Typography>
                  </Box>
                  <Typography sx={{ fontFamily: "monospace", fontSize: "0.58rem", color: theme.palette.text.disabled }}>NJ, USA</Typography>
                </Box>
              </Box>

              {/* Floating cert badges */}
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                style={{ position: "absolute", top: 24, right: -56, zIndex: 2 }}
              >
                <Box sx={{
                  px: 1.75, py: 1.25,
                  background: "rgba(8,8,14,0.92)", backdropFilter: "blur(20px)",
                  border: `1px solid ${theme.palette.tertiary.main}20`,
                  borderRadius: "10px",
                  boxShadow: `0 12px 32px rgba(0,0,0,0.6)`,
                }}>
                  <Typography sx={{ fontFamily: "monospace", fontSize: "0.55rem", color: theme.palette.tertiary.main, letterSpacing: "0.12em", mb: 0.3 }}>CERTIFIED</Typography>
                  <Typography sx={{ fontSize: "0.82rem", fontWeight: 800, color: theme.palette.text.primary }}>Security+</Typography>
                </Box>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                style={{ position: "absolute", bottom: 72, left: -56, zIndex: 2 }}
              >
                <Box sx={{
                  px: 1.75, py: 1.25,
                  background: "rgba(8,8,14,0.92)", backdropFilter: "blur(20px)",
                  border: `1px solid ${theme.palette.primary.main}20`,
                  borderRadius: "10px",
                  boxShadow: `0 12px 32px rgba(0,0,0,0.6)`,
                }}>
                  <Typography sx={{ fontFamily: "monospace", fontSize: "0.55rem", color: theme.palette.primary.main, letterSpacing: "0.12em", mb: 0.3 }}>IR EXPERT</Typography>
                  <Typography sx={{ fontSize: "0.82rem", fontWeight: 800, color: theme.palette.text.primary }}>TDX Arena</Typography>
                </Box>
              </motion.div>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 7, 0] }} transition={{ duration: 2.2, repeat: Infinity }}
        style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", zIndex: 1 }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.6 }}>
          <Typography sx={{ fontFamily: "monospace", fontSize: "0.55rem", color: theme.palette.text.disabled, letterSpacing: "0.18em" }}>SCROLL</Typography>
          <KeyboardArrowDown sx={{ fontSize: 16, color: theme.palette.text.disabled, opacity: 0.5 }} />
        </Box>
      </motion.div>
    </Box>
  );
};

// ══════════════════════════════════════════════════════════════
// STATS BAR
// ══════════════════════════════════════════════════════════════
const StatsBar = () => {
  const theme = useTheme();
  const stats = [
    { value: "Security+", label: "CompTIA Certified", color: theme.palette.tertiary.main },
    { value: "TDX Arena", label: "IR Expert Challenge", color: theme.palette.primary.main },
    { value: "NJ Institute of Technology", label: "Cybersecurity Certificate", color: theme.palette.accent.main },
    { value: "4+", label: "Projects Shipped", color: theme.palette.success.main },
  ];

  return (
    <Box sx={{
      borderTop: `1px solid rgba(255,255,255,0.05)`,
      borderBottom: `1px solid rgba(255,255,255,0.05)`,
      background: "rgba(255,255,255,0.015)",
      backdropFilter: "blur(10px)",
    }}>
      <Container maxWidth="lg">
        <Grid container>
          {stats.map((s, i) => (
            <Grid item xs={6} md={3} key={i}>
              <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                <Box sx={{
                  py: 4.5, px: 4,
                  borderRight: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  borderBottom: { xs: i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none", md: "none" },
                  position: "relative",
                  "&::before": {
                    content: '""', position: "absolute",
                    left: 0, top: "28%", bottom: "28%",
                    width: "2px", borderRadius: "2px",
                    background: s.color, opacity: 0.45,
                    display: { xs: "none", md: "block" },
                  },
                }}>
                  <Typography sx={{ fontFamily: "monospace", fontSize: "1.3rem", fontWeight: 800, color: theme.palette.text.primary, mb: 0.4, letterSpacing: "-0.02em" }}>
                    {s.value}
                  </Typography>
                  <Typography sx={{ fontSize: "0.75rem", color: theme.palette.text.secondary, letterSpacing: "0.04em" }}>
                    {s.label}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

// ══════════════════════════════════════════════════════════════
// CERTS
// ══════════════════════════════════════════════════════════════
const Certs = () => {
  const theme = useTheme();
  const history = useHistory();

  const certs = [
    {
      image: "/Images/Untitled.jpg",
      color: theme.palette.tertiary.main,
      icon: <VerifiedUser sx={{ fontSize: 14 }} />,
      tag: "CERTIFIED",
      title: "CompTIA Security+",
      subtitle: "Industry-standard cybersecurity certification",
      desc: "Validates core cybersecurity skills including threat management, cryptography, identity and access management, and network security across enterprise environments.",
      chips: ["Threat Detection", "Network Security", "Risk Management", "Cryptography", "IAM"],
      highlights: ["Comprehensive coverage of all 5 domains", "DoD-approved baseline certification", "Technical and operational security skills"],
    },
    {
      image: "/Images/cert.jpg",
      color: theme.palette.primary.main,
      icon: <Shield sx={{ fontSize: 14 }} />,
      tag: "ID: 1008363",
      title: "TDX Arena IR Expert",
      subtitle: "Hands-on incident response challenge",
      desc: "Real-world IR simulations covering memory forensics on Windows systems, malware triage, PCAP analysis, and end-to-end threat detection workflows.",
      chips: ["Incident Response", "Threat Analysis", "Security Operations", "Forensics"],
      highlights: ["Memory forensics on compromised Windows systems", "Malware triage using ClamAV and static analysis", "PCAP analysis with Wireshark and Snort"],
    },
  ];

  return (
    <Box component="section" sx={{ py: { xs: 12, md: 18 }, position: "relative", background: theme.palette.background.default, overflow: "hidden" }}>
      <GridBg />
      <Orb size={500} top="-10%" right="-5%" color={`radial-gradient(circle, ${theme.palette.tertiary.main}20, transparent 70%)`} delay={2} opacity={0.8} />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <Label text="Credentials" color={theme.palette.tertiary.main} />
          <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", mb: 10, flexWrap: "wrap", gap: 3 }}>
            <Typography sx={{ fontWeight: 900, fontSize: { xs: "2.4rem", md: "3.6rem" }, letterSpacing: "-0.03em", lineHeight: 1.05, maxWidth: 500 }}>
              Certifications
            </Typography>
            <Button
              onClick={() => history.push("/skills")}
              endIcon={<NorthEast sx={{ fontSize: 13 }} />}
              sx={{ fontSize: "0.8rem", fontFamily: "monospace", color: theme.palette.text.secondary, px: 0, "&:hover": { background: "transparent", color: theme.palette.text.primary } }}
            >
              Full skill set
            </Button>
          </Box>
        </motion.div>

        <Grid container spacing={4}>
          {certs.map((cert, i) => (
            <Grid item xs={12} md={6} key={i}>
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.55 }}
              >
                <Box
                  onClick={() => history.push("/products")}
                  sx={{
                    cursor: "pointer",
                    borderRadius: "18px", overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.06)",
                    background: `linear-gradient(160deg, rgba(255,255,255,0.025) 0%, ${cert.color}06 100%)`,
                    height: "100%", display: "flex", flexDirection: "column",
                    transition: "all 0.25s ease",
                    "&:hover": {
                      border: `1px solid ${cert.color}28`,
                      boxShadow: `0 24px 80px rgba(0,0,0,0.6), 0 0 40px ${cert.color}0A`,
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  {/* Image */}
                  <Box sx={{ position: "relative", paddingTop: "58%", background: "rgba(0,0,0,0.45)", overflow: "hidden" }}>
                    <Box component="img" src={cert.image} alt={cert.title}
                      sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", p: 6 }} />
                    <Box sx={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: `linear-gradient(transparent, rgba(0,0,0,0.6))` }} />
                    <Box sx={{
                      position: "absolute", top: 14, right: 14,
                      display: "flex", alignItems: "center", gap: 0.75,
                      px: 1.4, py: 0.55,
                      background: "rgba(0,0,0,0.7)", backdropFilter: "blur(12px)",
                      border: `1px solid ${cert.color}25`, borderRadius: "6px",
                    }}>
                      <Box sx={{ color: cert.color }}>{cert.icon}</Box>
                      <Typography sx={{ fontFamily: "monospace", fontSize: "0.6rem", color: cert.color, fontWeight: 700, letterSpacing: "0.08em" }}>{cert.tag}</Typography>
                    </Box>
                  </Box>

                  {/* Content */}
                  <Box sx={{ p: 4, flex: 1, display: "flex", flexDirection: "column", gap: 2.5 }}>
                    <Box>
                      <Typography sx={{ fontWeight: 800, fontSize: "1.3rem", color: cert.color, mb: 0.5 }}>{cert.title}</Typography>
                      <Typography sx={{ fontSize: "0.75rem", color: theme.palette.text.disabled, fontFamily: "monospace" }}>{cert.subtitle}</Typography>
                    </Box>

                    <Typography sx={{ fontSize: "0.9rem", color: theme.palette.text.secondary, lineHeight: 1.85 }}>
                      {cert.desc}
                    </Typography>

                    <Box>
                      <Typography sx={{ fontSize: "0.62rem", fontFamily: "monospace", color: theme.palette.text.disabled, letterSpacing: "0.14em", mb: 1.5, textTransform: "uppercase" }}>
                        Key Highlights
                      </Typography>
                      <Stack spacing={1.2}>
                        {cert.highlights.map((h, j) => (
                          <Box key={j} sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                            <Box sx={{ width: 5, height: 5, borderRadius: "50%", background: cert.color, flexShrink: 0, mt: 0.65, opacity: 0.7 }} />
                            <Typography sx={{ fontSize: "0.84rem", color: theme.palette.text.secondary, lineHeight: 1.65 }}>{h}</Typography>
                          </Box>
                        ))}
                      </Stack>
                    </Box>

                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.9, mt: "auto", pt: 2.5, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                      {cert.chips.map(c => (
                        <Box key={c} sx={{ px: 1.4, py: 0.4, fontSize: "0.62rem", fontFamily: "monospace", color: cert.color, background: `${cert.color}0A`, border: `1px solid ${cert.color}18`, borderRadius: "4px", letterSpacing: "0.04em" }}>{c}</Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

// ══════════════════════════════════════════════════════════════
// CONTACT CTA
// ══════════════════════════════════════════════════════════════
const ContactCTA = () => {
  const theme = useTheme();
  return (
    <Box component="section" sx={{ py: { xs: 14, md: 22 }, position: "relative", background: theme.palette.background.default, overflow: "hidden" }}>
      <GridBg />
      <Orb
        size={700} top="50%" left="50%"
        color={`radial-gradient(circle, ${theme.palette.accent.main}28, ${theme.palette.tertiary.main}15, transparent 70%)`}
        delay={0} opacity={0.9}
      />

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>

          <Label text="Available for hire" color={theme.palette.tertiary.main} />

          <Typography sx={{
            fontWeight: 900,
            fontSize: { xs: "2.8rem", sm: "4rem", md: "5.5rem" },
            letterSpacing: "-0.04em",
            lineHeight: 1.0,
            mb: 4,
          }}>
            let's work
            <br />
            <Box component="span" sx={{
              background: `linear-gradient(100deg, ${theme.palette.tertiary.main}, ${theme.palette.accent.main}, ${theme.palette.primary.main})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              together
            </Box>
          </Typography>

          <Typography sx={{ color: theme.palette.text.secondary, fontSize: "1.05rem", lineHeight: 1.85, mb: 8, maxWidth: 420, mx: "auto" }}>
            Targeting internships and junior roles. Based in NJ — open to remote or hybrid.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2.5} justifyContent="center" alignItems="center">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Button
                variant="contained"
                size="large"
                href="mailto:adamelh1999@gmail.com"
                startIcon={<Email sx={{ fontSize: 17 }} />}
                sx={{ px: 4.5, py: 1.7, fontSize: "0.9rem", fontFamily: "monospace", fontWeight: 700, borderRadius: "40px" }}
              >
                Get In Touch
              </Button>
            </motion.div>

            <Button
              href="https://github.com/adamel99"
              target="_blank"
              startIcon={<GitHub sx={{ fontSize: 18 }} />}
              sx={{
                fontSize: "0.9rem", fontFamily: "monospace",
                color: theme.palette.text.secondary,
                textDecoration: "underline",
                textDecorationColor: "rgba(255,255,255,0.15)",
                textUnderlineOffset: "4px",
                "&:hover": { color: theme.palette.text.primary, background: "transparent", textDecorationColor: "rgba(255,255,255,0.4)" },
              }}
            >
              GitHub Profile
            </Button>
          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
};

// ══════════════════════════════════════════════════════════════
// PAGE
// ══════════════════════════════════════════════════════════════
const LandingPage = () => {
  const theme = useTheme();
  return (
    <Box sx={{ backgroundColor: theme.palette.background.default, width: "100%", minHeight: "100vh", overflowX: "hidden" }}>
      <Hero />
      <StatsBar />
      <Certs />
      <ContactCTA />
    </Box>
  );
};

export default LandingPage;
