import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { Security, Timeline, Web } from "@mui/icons-material";
import ProductCard from "../components/ProductCard";
import projects from "../data/projects";

const FocusItem = ({ icon, label, color }) => (
  <Stack direction="row" alignItems="center" spacing={1.1}>
    <Box sx={{ display: "flex", color, fontSize: 18 }}>{icon}</Box>
    <Typography sx={{ color: "text.secondary", fontSize: "0.82rem" }}>{label}</Typography>
  </Stack>
);

const ProductList = () => {
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: theme.palette.background.default, overflowX: "hidden", py: { xs: 2.5, md: 6 } }}>
      <Container maxWidth="lg" sx={{ px: { xs: 1.5, sm: 3 } }}>
        <Box component="main" sx={{ maxWidth: 1120, mx: "auto" }}>
          <Box
            component="header"
            sx={{
              position: "relative",
              overflow: "hidden",
              p: { xs: 2.5, sm: 4, md: 5 },
              mb: { xs: 4, md: 6 },
              borderRadius: 3,
              border: `1px solid ${theme.palette.divider}`,
              background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.elevated} 100%)`,
              "&::after": {
                content: '""',
                position: "absolute",
                width: 320,
                height: 320,
                right: -110,
                top: -155,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${theme.palette.tertiary.main}22 0%, transparent 72%)`,
                pointerEvents: "none",
              },
            }}
          >
            <Box sx={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) 260px" }, gap: { xs: 3, md: 5 }, alignItems: "end" }}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: "easeOut" }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2.2 }}>
                  <Box sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: theme.palette.tertiary.main, boxShadow: `0 0 12px ${theme.palette.tertiary.main}88` }} />
                  <Typography sx={{ color: "text.secondary", fontFamily: theme.typography.mono, fontSize: "0.69rem", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                    Security Portfolio
                  </Typography>
                </Stack>
                <Typography component="h1" sx={{ fontSize: { xs: "2.65rem", sm: "3.7rem", md: "4.45rem" }, fontWeight: 800, letterSpacing: "-0.06em", lineHeight: 0.98 }}>
                  Security <Box component="span" sx={{ color: theme.palette.tertiary.main }}>Projects</Box>
                </Typography>
                <Typography sx={{ color: "text.secondary", fontSize: { xs: "0.96rem", md: "1.04rem" }, lineHeight: 1.75, maxWidth: 610, mt: 2 }}>
                  Selected work in incident response, detection engineering, and secure application development.
                </Typography>
              </motion.div>

              <Box sx={{ p: 2.2, borderRadius: 2, backgroundColor: `${theme.palette.tertiary.main}0A`, border: `1px solid ${theme.palette.tertiary.main}28` }}>
                <Typography sx={{ color: theme.palette.tertiary.main, fontFamily: theme.typography.mono, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", mb: 1.4 }}>
                  AREAS OF FOCUS
                </Typography>
                <Stack spacing={1.2}>
                  <FocusItem icon={<Security fontSize="inherit" />} label="Incident response" color={theme.palette.tertiary.main} />
                  <FocusItem icon={<Timeline fontSize="inherit" />} label="Detection engineering" color={theme.palette.accent.main} />
                  <FocusItem icon={<Web fontSize="inherit" />} label="Application security" color={theme.palette.primary.light} />
                </Stack>
              </Box>
            </Box>
          </Box>

          <Box component="section" aria-labelledby="featured-work-heading">
            <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ xs: "flex-start", sm: "baseline" }} justifyContent="space-between" spacing={1} sx={{ mb: 2.4 }}>
              <Typography id="featured-work-heading" component="h2" sx={{ color: theme.palette.text.primary, fontSize: "1.3rem", fontWeight: 750, letterSpacing: "-0.02em" }}>
                Featured work
              </Typography>
              <Typography sx={{ color: theme.palette.text.secondary, fontFamily: theme.typography.mono, fontSize: "0.72rem" }}>
                {projects.length} selected projects
              </Typography>
            </Stack>

            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 330px), 1fr))", gap: { xs: 2, md: 2.5 }, alignItems: "stretch" }}>
              {projects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.08, duration: 0.45 }}
                  style={{ height: "100%" }}
                >
                  <ProductCard project={project} />
                </motion.div>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ProductList;
