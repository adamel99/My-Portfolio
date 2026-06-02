import React, { useRef, useState, useEffect, useCallback } from "react";
import { Box, Typography, Container, Button, Stack, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import {
  Security, VerifiedUser, Shield, GitHub, Email,
  KeyboardArrowDown, NorthEast, LinkedIn, Terminal,
} from "@mui/icons-material";
import { useHistory } from "react-router-dom";

// ─────────────────────────────────────────────
// UTILITY: Magnetic hover effect hook
// ─────────────────────────────────────────────
const useMagnetic = (strength = 0.35) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  }, [x, y, strength]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { ref, sx, sy, handleMouseMove, handleMouseLeave };
};

// ─────────────────────────────────────────────
// AMBIENT ORB
// ─────────────────────────────────────────────
const Orb = ({ size, top, left, right, bottom, color, delay = 0, opacity = 1 }) => (
  <motion.div
    animate={{ scale: [1, 1.12, 1], opacity: [opacity * 0.65, opacity, opacity * 0.65] }}
    transition={{ duration: 18, repeat: Infinity, delay, ease: "easeInOut" }}
    style={{
      position: "absolute", width: size, height: size,
      top, left, right, bottom,
      borderRadius: "50%", background: color,
      filter: "blur(130px)", pointerEvents: "none", zIndex: 0,
    }}
  />
);

// ─────────────────────────────────────────────
// NOISE TEXTURE OVERLAY
// ─────────────────────────────────────────────
const NoiseOverlay = () => (
  <Box sx={{
    position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", opacity: 0.03,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
    backgroundSize: "256px 256px",
  }} />
);

// ─────────────────────────────────────────────
// GRID BACKGROUND
// ─────────────────────────────────────────────
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

// ─────────────────────────────────────────────
// ANIMATED BORDER BEAM
// ─────────────────────────────────────────────
const BorderBeam = ({ color1 = "#00BBF9", color2 = "#DC136C", duration = 4, size = 100 }) => {
  return (
    <Box sx={{
      position: "absolute", inset: 0, borderRadius: "inherit", overflow: "hidden",
      pointerEvents: "none", zIndex: 0,
    }}>
      <motion.div
        style={{
          position: "absolute",
          top: "-50%", left: "-50%",
          width: "200%", height: "200%",
          background: `conic-gradient(transparent 270deg, ${color1}, ${color2}, transparent)`,
          opacity: 0,
        }}
        animate={{ rotate: 360, opacity: [0, 0.6, 0] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      />
      <Box sx={{
        position: "absolute", inset: "1px", borderRadius: "inherit",
        background: "inherit", zIndex: 1,
      }} />
    </Box>
  );
};

// ─────────────────────────────────────────────
// TYPING TEXT
// ─────────────────────────────────────────────
const TypingText = ({ texts }) => {
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = texts[idx];
    if (!del && display === cur) { setTimeout(() => setDel(true), 2800); return; }
    if (del && display === "") { setDel(false); setIdx(p => (p + 1) % texts.length); return; }
    const t = setTimeout(() => setDisplay(p => del ? cur.slice(0, p.length - 1) : cur.slice(0, p.length + 1)), del ? 32 : 65);
    return () => clearTimeout(t);
  }, [display, idx, del, texts]);
  return (
    <span>
      {display}
      <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}>_</motion.span>
    </span>
  );
};

// ─────────────────────────────────────────────
// GLOW BUTTON — Skiper-inspired
// ─────────────────────────────────────────────
const GlowButton = ({ children, onClick, href, target, variant = "primary", ...props }) => {
  const theme = useTheme();
  const { ref, sx: mx, sy: my, handleMouseMove, handleMouseLeave } = useMagnetic(0.2);
  const [hovered, setHovered] = useState(false);

  const isPrimary = variant === "primary";

  return (
    <motion.div
      ref={ref}
      style={{ x: mx, y: my, display: "inline-block" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.96 }}
    >
      <Box
        component={href ? "a" : "button"}
        href={href}
        target={target}
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        sx={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          gap: 1,
          px: isPrimary ? 3.5 : 2.5,
          py: isPrimary ? 1.5 : 1.25,
          borderRadius: "100px",
          border: "none",
          cursor: "pointer",
          textDecoration: "none",
          fontFamily: "monospace",
          fontSize: "0.85rem",
          fontWeight: 700,
          letterSpacing: "0.03em",
          overflow: "hidden",
          transition: "all 0.22s ease",
          background: isPrimary
            ? `linear-gradient(135deg, ${theme.palette.tertiary.main}, ${theme.palette.tertiary.dark})`
            : "transparent",
          color: isPrimary ? "#000" : "rgba(255,255,255,0.55)",
          boxShadow: isPrimary
            ? hovered ? `0 0 32px ${theme.palette.tertiary.main}55, 0 4px 20px rgba(0,187,249,0.3)` : `0 0 16px ${theme.palette.tertiary.main}25`
            : "none",
          "&::before": isPrimary ? {} : {
            content: '""', position: "absolute", inset: 0, borderRadius: "100px",
            padding: "1px",
            background: "linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.03))",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          },
          ...(props.sx || {}),
        }}
      >
        {/* Inner glow on hover */}
        {isPrimary && (
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            style={{
              position: "absolute", inset: 0,
              background: `radial-gradient(ellipse at center, ${theme.palette.tertiary.light}40, transparent 70%)`,
              borderRadius: "100px",
            }}
          />
        )}
        <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
      </Box>
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// CARD WITH SPOTLIGHT EFFECT — Skiper-inspired
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
        borderRadius: "20px",
        border: "1px solid rgba(255,255,255,0.06)",
        background: "linear-gradient(160deg, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0.01) 100%)",
        overflow: "hidden",
        cursor: onClick ? "pointer" : "default",
        transition: "border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          border: `1px solid ${color}22`,
          transform: "translateY(-4px)",
          boxShadow: `0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px ${color}15`,
        },
        ...sx,
      }}
    >
      {/* Spotlight radial follow */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{
          position: "absolute",
          pointerEvents: "none",
          zIndex: 0,
          width: 350,
          height: 350,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color}12 0%, transparent 70%)`,
          left: mouse.x - 175,
          top: mouse.y - 175,
        }}
      />
      {/* Top shimmer line */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1px",
          background: `linear-gradient(90deg, transparent, ${color}60, transparent)`,
          zIndex: 2,
        }}
      />
      <Box sx={{ position: "relative", zIndex: 1 }}>
        {children}
      </Box>
    </Box>
  );
};

// ─────────────────────────────────────────────
// FLOATING BADGE
// ─────────────────────────────────────────────
const FloatingBadge = ({ label, value, color, position, delay }) => {
  const theme = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      style={{ position: "absolute", zIndex: 10, ...position }}
    >
      <Box sx={{
        px: 2, py: 1.4,
        backdropFilter: "blur(24px)",
        background: "rgba(8,8,14,0.88)",
        border: `1px solid ${color}22`,
        borderRadius: "12px",
        boxShadow: `0 16px 40px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)`,
        minWidth: 110,
      }}>
        <Typography sx={{ fontFamily: "monospace", fontSize: "0.52rem", color, letterSpacing: "0.14em", mb: 0.25, textTransform: "uppercase" }}>
          {label}
        </Typography>
        <Typography sx={{ fontSize: "0.88rem", fontWeight: 800, color: "#F0F0F8", letterSpacing: "-0.01em" }}>
          {value}
        </Typography>
      </Box>
    </motion.div>
  );
};

// ══════════════════════════════════════════════
// HERO SECTION
// ══════════════════════════════════════════════
const Hero = () => {
  const theme = useTheme();
  const history = useHistory();
  const { scrollY } = useScroll();
  const fadeOut = useTransform(scrollY, [0, 420], [1, 0]);
  const slideUp = useTransform(scrollY, [0, 420], [0, 70]);

  return (
    <Box sx={{
      position: "relative",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      background: theme.palette.background.default,
      overflow: "hidden",
    }}>
      <NoiseOverlay />

      {/* Orbs */}
      <Orb size={900} top="-25%" left="-18%"
        color={`radial-gradient(circle, ${theme.palette.tertiary.main}50, ${theme.palette.accent.main}28, transparent 68%)`}
        delay={0} opacity={0.85}
      />
      <Orb size={700} bottom="-28%" right="-12%"
        color={`radial-gradient(circle, ${theme.palette.primary.main}45, ${theme.palette.accent.main}22, transparent 68%)`}
        delay={7} opacity={0.8}
      />
      <Orb size={350} top="38%" left="44%"
        color={`radial-gradient(circle, ${theme.palette.accent.main}32, transparent 70%)`}
        delay={12} opacity={0.55}
      />

      {/* Scanline */}
      <Box sx={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.012) 0px, transparent 2px)",
      }} />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Grid container spacing={10} alignItems="center" sx={{ minHeight: "100vh" }}>

          {/* ── Left column ── */}
          <Grid item xs={12} md={7}>
            <motion.div
              style={{ opacity: fadeOut, y: slideUp }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Status pill */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Box sx={{
                  display: "inline-flex", alignItems: "center", gap: 1.25,
                  mb: 7, px: 2, py: 0.9,
                  background: "rgba(29,185,84,0.07)",
                  border: "1px solid rgba(29,185,84,0.18)",
                  borderRadius: "100px",
                  backdropFilter: "blur(12px)",
                }}>
                  <Box
                    component={motion.div}
                    animate={{ opacity: [1, 0.2, 1], scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    sx={{ width: 6, height: 6, borderRadius: "50%", background: theme.palette.success.main, boxShadow: `0 0 10px ${theme.palette.success.main}` }}
                  />
                  <Typography sx={{ fontFamily: "monospace", fontSize: "0.68rem", color: theme.palette.success.main, fontWeight: 700, letterSpacing: "0.12em" }}>
                    OPEN TO WORK
                  </Typography>
                  <Box sx={{ width: "1px", height: 12, background: "rgba(29,185,84,0.25)" }} />
                  <Typography sx={{ fontFamily: "monospace", fontSize: "0.64rem", color: "rgba(29,185,84,0.5)", letterSpacing: "0.06em" }}>
                    NJ · REMOTE OK
                  </Typography>
                </Box>
              </motion.div>

              {/* Name */}
              <Box sx={{ mb: 5 }}>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <Typography sx={{
                    fontWeight: 900, lineHeight: 0.92, letterSpacing: "-0.05em",
                    fontSize: { xs: "4rem", sm: "5.2rem", md: "6.5rem", lg: "8rem" },
                    color: theme.palette.text.primary,
                  }}>
                    Adam
                  </Typography>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.42, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <Typography sx={{
                    fontWeight: 900, lineHeight: 0.92, letterSpacing: "-0.05em",
                    fontSize: { xs: "4rem", sm: "5.2rem", md: "6.5rem", lg: "8rem" },
                    background: `linear-gradient(110deg, ${theme.palette.tertiary.main} 0%, ${theme.palette.accent.main} 48%, ${theme.palette.primary.main} 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 4s ease infinite",
                    "@keyframes shimmer": {
                      "0%": { backgroundPosition: "0% 50%" },
                      "50%": { backgroundPosition: "100% 50%" },
                      "100%": { backgroundPosition: "0% 50%" },
                    },
                  }}>
                    Elhamami
                  </Typography>
                </motion.div>
              </Box>

              {/* Role typing */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <Box sx={{
                  display: "inline-flex", alignItems: "center", gap: 2,
                  mb: 4, px: 2.5, py: 1.1,
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "8px",
                  backdropFilter: "blur(8px)",
                }}>
                  <Box sx={{ width: 6, height: 6, borderRadius: "1px", background: theme.palette.tertiary.main, transform: "rotate(45deg)", opacity: 0.8 }} />
                  <Typography sx={{ fontFamily: "monospace", fontSize: "0.82rem", color: theme.palette.tertiary.main, letterSpacing: "0.04em" }}>
                    <TypingText texts={["Cybersecurity Professional", "Incident Responder", "Full-Stack Developer", "Security Analyst"]} />
                  </Typography>
                </Box>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <Typography sx={{
                  fontSize: { xs: "0.95rem", md: "1.05rem" },
                  color: theme.palette.text.secondary,
                  lineHeight: 1.9,
                  mb: 6,
                  maxWidth: 480,
                  letterSpacing: "0.005em",
                }}>
                  with a passion for{" "}
                  <Box component="span" sx={{
                    color: theme.palette.tertiary.main, fontWeight: 600,
                    textShadow: `0 0 20px ${theme.palette.tertiary.main}40`,
                  }}>
                    protecting ideas
                  </Box>
                  {" "}and building secure, thoughtful digital experiences.
                </Typography>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.6 }}
              >
                <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" useFlexGap>
                  <GlowButton variant="primary" onClick={() => history.push("/skills")}>
                    View Portfolio <NorthEast sx={{ fontSize: 14 }} />
                  </GlowButton>

                  <GlowButton variant="ghost" onClick={() => history.push("/resume")}>
                    Resume
                  </GlowButton>

                  {/* Icon links */}
                  {[
                    { icon: <GitHub sx={{ fontSize: 20 }} />, href: "https://github.com/adamel99" },
                    { icon: <LinkedIn sx={{ fontSize: 20 }} />, href: "https://www.linkedin.com/in/adam-elhamami-33767029a/" },
                  ].map(({ icon, href }) => {
                    const { ref, sx: mx, sy: my, handleMouseMove, handleMouseLeave } = useMagnetic(0.3);
                    return (
                      <motion.a
                        key={href}
                        ref={ref}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        style={{ x: mx, y: my, display: "inline-flex" }}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                      >
                        <Box sx={{
                          width: 40, height: 40, borderRadius: "10px",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "rgba(255,255,255,0.4)",
                          transition: "all 0.2s ease",
                          "&:hover": {
                            color: "#fff",
                            border: "1px solid rgba(255,255,255,0.2)",
                            background: "rgba(255,255,255,0.05)",
                          },
                        }}>
                          {icon}
                        </Box>
                      </motion.a>
                    );
                  })}
                </Stack>
              </motion.div>
            </motion.div>
          </Grid>

          {/* ── Right column: photo card ── */}
          <Grid item xs={12} md={5} sx={{ display: { xs: "none", md: "flex" }, justifyContent: "flex-end", alignItems: "center" }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ position: "relative", width: 310 }}
            >
              {/* Outer glow ring */}
              <Box sx={{
                position: "absolute", inset: -1, borderRadius: "22px",
                background: `linear-gradient(135deg, ${theme.palette.tertiary.main}30, ${theme.palette.accent.main}20, ${theme.palette.primary.main}30)`,
                filter: "blur(1px)",
              }} />

              <Box sx={{
                position: "relative", zIndex: 1,
                borderRadius: "20px", overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: `0 40px 120px rgba(0,0,0,0.8), 0 0 60px ${theme.palette.tertiary.main}10`,
              }}>
                {/* Mac-style titlebar */}
                <Box sx={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  px: 2.5, py: 1.1,
                  background: "rgba(15,15,24,0.95)",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}>
                  <Box sx={{ display: "flex", gap: 0.65 }}>
                    {["#FF5F56", "#FFBD2E", "#27C93F"].map((c, i) => (
                      <Box key={i} sx={{
                        width: 9, height: 9, borderRadius: "50%", background: c, opacity: 0.75,
                        transition: "opacity 0.2s",
                        "&:hover": { opacity: 1 },
                      }} />
                    ))}
                  </Box>
                  <Typography sx={{ fontFamily: "monospace", fontSize: "0.56rem", color: "rgba(255,255,255,0.18)", letterSpacing: "0.05em" }}>
                    adam_elhamami.sh
                  </Typography>
                  <Box sx={{ width: 40, display: "flex", justifyContent: "flex-end" }}>
                    <Terminal sx={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }} />
                  </Box>
                </Box>

                {/* Photo */}
                <Box sx={{ position: "relative", background: "#000" }}>
                  <img
                    src="/Images/selfie.jpg"
                    alt="Adam Elhamami"
                    style={{ width: "100%", display: "block", opacity: 0.88 }}
                  />
                  <Box sx={{
                    position: "absolute", bottom: 0, left: 0, right: 0, height: "55%",
                    background: `linear-gradient(transparent, ${theme.palette.background.default}D0)`,
                  }} />
                </Box>

                {/* Status strip */}
                <Box sx={{
                  px: 2.5, py: 1.5,
                  background: "rgba(8,8,14,0.97)",
                  borderTop: "1px solid rgba(255,255,255,0.04)",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.9 }}>
                    <Box
                      component={motion.div}
                      animate={{ opacity: [1, 0.15, 1], scale: [1, 1.4, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                      sx={{ width: 6, height: 6, borderRadius: "50%", background: theme.palette.success.main, boxShadow: `0 0 8px ${theme.palette.success.main}` }}
                    />
                    <Typography sx={{ fontFamily: "monospace", fontSize: "0.6rem", color: theme.palette.success.main, fontWeight: 700, letterSpacing: "0.1em" }}>
                      OPEN TO WORK
                    </Typography>
                  </Box>
                  <Typography sx={{ fontFamily: "monospace", fontSize: "0.56rem", color: theme.palette.text.disabled, letterSpacing: "0.05em" }}>NJ, USA</Typography>
                </Box>
              </Box>

              {/* Floating badges */}
              <FloatingBadge
                label="Certified" value="Security+"
                color={theme.palette.tertiary.main}
                position={{ top: 22, right: -60 }}
                delay={1.1}
              />
              <FloatingBadge
                label="IR Expert" value="TDX Arena"
                color={theme.palette.primary.main}
                position={{ bottom: 68, left: -62 }}
                delay={1.35}
              />
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }} transition={{ duration: 2.4, repeat: Infinity }}
        style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", zIndex: 2 }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.8 }}>
          <Typography sx={{ fontFamily: "monospace", fontSize: "0.52rem", color: "rgba(255,255,255,0.18)", letterSpacing: "0.2em" }}>
            SCROLL
          </Typography>
          <Box sx={{ width: 1, height: 28, background: "linear-gradient(to bottom, rgba(0,187,249,0.5), transparent)", borderRadius: "1px" }} />
        </Box>
      </motion.div>
    </Box>
  );
};

// ══════════════════════════════════════════════
// STATS BAR — Skiper-style ticker
// ══════════════════════════════════════════════
const StatsBar = () => {
  const theme = useTheme();
  const stats = [
    { value: "Security+", label: "CompTIA Certified", color: theme.palette.tertiary.main },
    { value: "TDX Arena", label: "IR Expert Challenge", color: theme.palette.primary.main },
    { value: "NJIT", label: "Cybersecurity Certificate", color: theme.palette.accent.main },
    { value: "4+", label: "Projects Shipped", color: theme.palette.success.main },
  ];

  return (
    <Box sx={{
      position: "relative",
      borderTop: "1px solid rgba(255,255,255,0.04)",
      borderBottom: "1px solid rgba(255,255,255,0.04)",
      background: "rgba(255,255,255,0.012)",
      backdropFilter: "blur(20px)",
      overflow: "hidden",
    }}>
      {/* Left/right fade masks */}
      <Box sx={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 120, zIndex: 2, pointerEvents: "none",
        background: `linear-gradient(to right, ${theme.palette.background.default}, transparent)`,
      }} />
      <Box sx={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: 120, zIndex: 2, pointerEvents: "none",
        background: `linear-gradient(to left, ${theme.palette.background.default}, transparent)`,
      }} />

      <Container maxWidth="lg">
        <Grid container>
          {stats.map((s, i) => (
            <Grid item xs={6} md={3} key={i}>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
              >
                <Box sx={{
                  py: 5, px: 4.5,
                  borderRight: i < 3 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  borderBottom: { xs: i < 2 ? "1px solid rgba(255,255,255,0.04)" : "none", md: "none" },
                  position: "relative",
                  transition: "background 0.25s ease",
                  "&:hover": { background: "rgba(255,255,255,0.018)" },
                  "&::after": {
                    content: '""', position: "absolute",
                    bottom: 0, left: "12%", right: "12%", height: "1px",
                    background: `linear-gradient(to right, transparent, ${s.color}60, transparent)`,
                    opacity: 0, transition: "opacity 0.3s ease",
                  },
                  "&:hover::after": { opacity: 1 },
                }}>
                  {/* Accent bar */}
                  <Box sx={{
                    width: 24, height: 2, borderRadius: "2px",
                    background: s.color, mb: 2, opacity: 0.7,
                    boxShadow: `0 0 8px ${s.color}60`,
                  }} />
                  <Typography sx={{
                    fontFamily: "monospace", fontSize: "1.1rem", fontWeight: 800,
                    color: theme.palette.text.primary, mb: 0.5, letterSpacing: "-0.02em",
                  }}>
                    {s.value}
                  </Typography>
                  <Typography sx={{ fontSize: "0.72rem", color: theme.palette.text.disabled, letterSpacing: "0.03em" }}>
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

// ══════════════════════════════════════════════
// CERTS SECTION
// ══════════════════════════════════════════════
const Certs = () => {
  const theme = useTheme();
  const history = useHistory();

  const certs = [
    {
      image: "/Images/Untitled.jpg",
      color: theme.palette.tertiary.main,
      icon: <VerifiedUser sx={{ fontSize: 13 }} />,
      tag: "CERTIFIED",
      title: "CompTIA Security+",
      subtitle: "Industry-standard cybersecurity certification",
      desc: "Validates core cybersecurity skills including threat management, cryptography, identity and access management, and network security across enterprise environments.",
      chips: ["Threat Detection", "Network Security", "Risk Management", "Cryptography", "IAM"],
      highlights: [
        "Comprehensive coverage of all 5 domains",
        "DoD-approved baseline certification",
        "Technical and operational security skills",
      ],
    },
    {
      image: "/Images/cert.jpg",
      color: theme.palette.primary.main,
      icon: <Shield sx={{ fontSize: 13 }} />,
      tag: "ID: 1008363",
      title: "TDX Arena IR Expert",
      subtitle: "Hands-on incident response challenge",
      desc: "Real-world IR simulations covering memory forensics on Windows systems, malware triage, PCAP analysis, and end-to-end threat detection workflows.",
      chips: ["Incident Response", "Threat Analysis", "Security Operations", "Forensics"],
      highlights: [
        "Memory forensics on compromised Windows systems",
        "Malware triage using ClamAV and static analysis",
        "PCAP analysis with Wireshark and Snort",
      ],
    },
  ];

  return (
    <Box component="section" sx={{
      py: { xs: 14, md: 20 }, position: "relative",
      background: theme.palette.background.default, overflow: "hidden",
    }}>
      <GridBg opacity={0.015} />
      <NoiseOverlay />
      <Orb size={600} top="-8%" right="-8%" color={`radial-gradient(circle, ${theme.palette.tertiary.main}18, transparent 70%)`} delay={3} opacity={0.8} />
      <Orb size={400} bottom="5%" left="-5%" color={`radial-gradient(circle, ${theme.palette.accent.main}18, transparent 70%)`} delay={8} opacity={0.6} />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", mb: 12, flexWrap: "wrap", gap: 4 }}>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
                <Box sx={{ width: 20, height: 1, background: theme.palette.tertiary.main, opacity: 0.6 }} />
                <Typography sx={{ fontFamily: "monospace", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", color: theme.palette.tertiary.main }}>
                  CREDENTIALS
                </Typography>
              </Box>
              <Typography sx={{
                fontWeight: 900, letterSpacing: "-0.035em", lineHeight: 1.02,
                fontSize: { xs: "2.6rem", md: "3.8rem" },
              }}>
                Certifications
              </Typography>
            </Box>
            <motion.div whileHover={{ x: 4 }}>
              <Box
                onClick={() => history.push("/skills")}
                sx={{
                  display: "flex", alignItems: "center", gap: 1,
                  cursor: "pointer", color: theme.palette.text.disabled,
                  fontFamily: "monospace", fontSize: "0.78rem", letterSpacing: "0.04em",
                  transition: "color 0.2s ease",
                  "&:hover": { color: theme.palette.tertiary.main },
                }}
              >
                Full skill set
                <NorthEast sx={{ fontSize: 12 }} />
              </Box>
            </motion.div>
          </Box>
        </motion.div>

        {/* Cards */}
        <Grid container spacing={3}>
          {certs.map((cert, i) => (
            <Grid item xs={12} md={6} key={i}>
              <motion.div
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.12, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ height: "100%" }}
              >
                <SpotlightCard
                  color={cert.color}
                  onClick={() => history.push("/products")}
                  sx={{ height: "100%", display: "flex", flexDirection: "column" }}
                >
                  {/* Image area */}
                  <Box sx={{ position: "relative", paddingTop: "54%", background: "rgba(0,0,0,0.5)", overflow: "hidden" }}>
                    <Box
                      component="img"
                      src={cert.image}
                      alt={cert.title}
                      sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", p: 5 }}
                    />
                    {/* Bottom fade */}
                    <Box sx={{
                      position: "absolute", bottom: 0, left: 0, right: 0, height: "50%",
                      background: "linear-gradient(transparent, rgba(8,8,14,0.85))",
                    }} />

                    {/* Tag pill */}
                    <Box sx={{
                      position: "absolute", top: 14, right: 14,
                      display: "inline-flex", alignItems: "center", gap: 0.8,
                      px: 1.5, py: 0.6,
                      background: "rgba(8,8,14,0.82)", backdropFilter: "blur(16px)",
                      border: `1px solid ${cert.color}20`, borderRadius: "6px",
                    }}>
                      <Box sx={{ color: cert.color, display: "flex" }}>{cert.icon}</Box>
                      <Typography sx={{ fontFamily: "monospace", fontSize: "0.56rem", color: cert.color, fontWeight: 700, letterSpacing: "0.1em" }}>
                        {cert.tag}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Content */}
                  <Box sx={{ p: { xs: 3, md: 4 }, flex: 1, display: "flex", flexDirection: "column", gap: 2.5 }}>
                    <Box>
                      <Typography sx={{ fontWeight: 800, fontSize: "1.28rem", color: cert.color, mb: 0.6, letterSpacing: "-0.01em" }}>
                        {cert.title}
                      </Typography>
                      <Typography sx={{ fontSize: "0.72rem", color: theme.palette.text.disabled, fontFamily: "monospace", letterSpacing: "0.03em" }}>
                        {cert.subtitle}
                      </Typography>
                    </Box>

                    <Typography sx={{ fontSize: "0.88rem", color: theme.palette.text.secondary, lineHeight: 1.88, letterSpacing: "0.004em" }}>
                      {cert.desc}
                    </Typography>

                    {/* Highlights */}
                    <Box>
                      <Typography sx={{ fontSize: "0.58rem", fontFamily: "monospace", color: theme.palette.text.disabled, letterSpacing: "0.16em", mb: 1.5, textTransform: "uppercase" }}>
                        Key Highlights
                      </Typography>
                      <Stack spacing={1.25}>
                        {cert.highlights.map((h, j) => (
                          <motion.div
                            key={j}
                            initial={{ opacity: 0, x: -8 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 + j * 0.06 }}
                          >
                            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.75 }}>
                              <Box sx={{
                                flexShrink: 0, mt: 0.75,
                                width: 4, height: 4, borderRadius: "50%",
                                background: cert.color, opacity: 0.65,
                                boxShadow: `0 0 6px ${cert.color}`,
                              }} />
                              <Typography sx={{ fontSize: "0.82rem", color: theme.palette.text.secondary, lineHeight: 1.7 }}>
                                {h}
                              </Typography>
                            </Box>
                          </motion.div>
                        ))}
                      </Stack>
                    </Box>

                    {/* Chips */}
                    <Box sx={{
                      display: "flex", flexWrap: "wrap", gap: 0.8, mt: "auto", pt: 2.5,
                      borderTop: "1px solid rgba(255,255,255,0.045)",
                    }}>
                      {cert.chips.map((c) => (
                        <Box
                          key={c}
                          sx={{
                            px: 1.4, py: 0.45,
                            fontSize: "0.6rem", fontFamily: "monospace", letterSpacing: "0.05em",
                            color: cert.color, fontWeight: 700,
                            background: `${cert.color}09`,
                            border: `1px solid ${cert.color}16`,
                            borderRadius: "5px",
                            transition: "all 0.18s ease",
                            "&:hover": { background: `${cert.color}18`, border: `1px solid ${cert.color}30` },
                          }}
                        >
                          {c}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </SpotlightCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

// ══════════════════════════════════════════════
// CONTACT CTA — Skiper-style glowing section
// ══════════════════════════════════════════════
const ContactCTA = () => {
  const theme = useTheme();

  return (
    <Box component="section" sx={{
      py: { xs: 16, md: 24 }, position: "relative",
      background: theme.palette.background.default, overflow: "hidden",
    }}>
      <NoiseOverlay />
      <Orb
        size={800} top="50%" left="50%"
        color={`radial-gradient(circle, ${theme.palette.accent.main}25, ${theme.palette.tertiary.main}12, transparent 68%)`}
        delay={0} opacity={0.95}
      />

      {/* Radial spotlight from center */}
      <Box sx={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${theme.palette.tertiary.main}08, transparent)`,
      }} />

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Label */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1.5, mb: 4 }}>
            <Box sx={{ flex: 1, maxWidth: 60, height: "1px", background: "linear-gradient(to right, transparent, rgba(0,187,249,0.3))" }} />
            <Typography sx={{ fontFamily: "monospace", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", color: theme.palette.tertiary.main }}>
              AVAILABLE FOR HIRE
            </Typography>
            <Box sx={{ flex: 1, maxWidth: 60, height: "1px", background: "linear-gradient(to left, transparent, rgba(0,187,249,0.3))" }} />
          </Box>

          {/* Headline */}
          <Typography sx={{
            fontWeight: 900,
            fontSize: { xs: "3.2rem", sm: "4.5rem", md: "6rem" },
            letterSpacing: "-0.045em",
            lineHeight: 0.97,
            mb: 5,
          }}>
            let's work
            <br />
            <Box component="span" sx={{
              background: `linear-gradient(110deg, ${theme.palette.tertiary.main}, ${theme.palette.accent.main}, ${theme.palette.primary.main})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundSize: "200% 100%",
              animation: "shimmer 4s ease infinite",
              "@keyframes shimmer": {
                "0%": { backgroundPosition: "0% 50%" },
                "50%": { backgroundPosition: "100% 50%" },
                "100%": { backgroundPosition: "0% 50%" },
              },
            }}>
              together
            </Box>
          </Typography>

          <Typography sx={{
            color: theme.palette.text.disabled, fontSize: "0.95rem",
            lineHeight: 1.88, mb: 9, maxWidth: 380, mx: "auto", letterSpacing: "0.006em",
          }}>
            Targeting internships and junior roles. Based in NJ — open to remote or hybrid.
          </Typography>

          {/* CTA row */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center" alignItems="center" flexWrap="wrap">
            <GlowButton
              variant="primary"
              href="mailto:adamelh1999@gmail.com"
            >
              <Email sx={{ fontSize: 15 }} />
              Get In Touch
            </GlowButton>

            {[
              { label: "GitHub", icon: <GitHub sx={{ fontSize: 16 }} />, href: "https://github.com/adamel99" },
              { label: "LinkedIn", icon: <LinkedIn sx={{ fontSize: 16 }} />, href: "https://www.linkedin.com/in/adam-elhamami-33767029a/" },
            ].map(({ label, icon, href }) => (
              <GlowButton key={label} variant="ghost" href={href} target="_blank">
                {icon} {label}
              </GlowButton>
            ))}
          </Stack>

          {/* Email hint */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Typography sx={{
              mt: 6, fontFamily: "monospace", fontSize: "0.62rem",
              color: "rgba(255,255,255,0.15)", letterSpacing: "0.06em",
            }}>
              adamelh1999@gmail.com
            </Typography>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

// ══════════════════════════════════════════════
// PAGE ROOT
// ══════════════════════════════════════════════
const LandingPage = () => {
  const theme = useTheme();
  return (
    <Box sx={{
      backgroundColor: theme.palette.background.default,
      width: "100%", minHeight: "100vh", overflowX: "hidden",
    }}>
      <Hero />
      <StatsBar />
      <Certs />
      <ContactCTA />
    </Box>
  );
};

export default LandingPage;
