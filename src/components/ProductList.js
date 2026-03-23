import React from "react";
import { Box, Typography, Container, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { Terminal } from "@mui/icons-material";
import ProductCard from "../components/ProductCard";
import projects from "../data/projects";

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

const ProductList = () => {
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
            <Label text="Portfolio" color={theme.palette.tertiary.main} />
            <Typography sx={{
              fontWeight: 900,
              fontSize: { xs: "3.5rem", sm: "5rem", md: "7rem" },
              lineHeight: 0.95, letterSpacing: "-0.045em", mb: 4,
            }}>
              <Box component="span" sx={{ color: theme.palette.text.primary }}>security</Box>
              <br />
              <Box component="span" sx={{
                background: `linear-gradient(100deg, ${theme.palette.tertiary.main}, ${theme.palette.accent.main} 50%, ${theme.palette.primary.main})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                projects
              </Box>
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
              <Typography sx={{ fontSize: "1rem", color: theme.palette.text.secondary, lineHeight: 1.85, maxWidth: 480 }}>
                A collection of security work, full-stack builds, and audio engineering projects.
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, px: 2, py: 0.75, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "6px" }}>
                <Box
                  component={motion.div}
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  sx={{ width: 5, height: 5, borderRadius: "50%", background: theme.palette.success.main, boxShadow: `0 0 5px ${theme.palette.success.main}` }}
                />
                <Typography sx={{ fontFamily: "monospace", fontSize: "0.68rem", color: theme.palette.text.disabled, letterSpacing: "0.08em" }}>
                  {projects.length} ACTIVE REPOS
                </Typography>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* ── PROJECTS GRID ── */}
      <Box sx={{ pb: { xs: 12, md: 18 }, position: "relative" }}>
        <GridBg />
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>

          <Box sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
          }}>
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                style={{ height: "100%" }}
              >
                <ProductCard project={project} />
              </motion.div>
            ))}
          </Box>

          {/* Footer status */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <Box sx={{
              mt: 12, pt: 3,
              borderTop: "1px solid rgba(255,255,255,0.05)",
              display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2,
            }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box
                  component={motion.div}
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  sx={{ width: 5, height: 5, borderRadius: "50%", background: theme.palette.success.main, boxShadow: `0 0 5px ${theme.palette.success.main}` }}
                />
                <Typography sx={{ fontFamily: "monospace", fontSize: "0.65rem", color: theme.palette.text.disabled, letterSpacing: "0.1em" }}>
                  SYSTEM: OPERATIONAL
                </Typography>
                <Box sx={{ width: 1, height: 12, background: "rgba(255,255,255,0.08)" }} />
                <Typography sx={{ fontFamily: "monospace", fontSize: "0.65rem", color: theme.palette.text.disabled, letterSpacing: "0.1em" }}>
                  {projects.length} ACTIVE REPOS
                </Typography>
              </Box>
              <Typography sx={{ fontFamily: "monospace", fontSize: "0.62rem", color: theme.palette.text.disabled, letterSpacing: "0.08em" }}>
                LAST_SCAN: {new Date().toISOString().split("T")[0]}
              </Typography>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default ProductList;
