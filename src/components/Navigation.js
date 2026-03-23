import React from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { Terminal, Shield } from "@mui/icons-material";

function Navigation() {
  const theme = useTheme();
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { to: "/about", label: "About" },
    { to: "/skills", label: "Skills" },
    { to: "/products", label: "Projects" },
    { to: "/resume", label: "Resume" },
  ];

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backdropFilter: "blur(28px)",
        backgroundColor: scrolled ? "rgba(8,8,14,0.92)" : "rgba(8,8,14,0.6)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        px: { xs: 1, md: 4 },
        transition: "all 0.3s ease",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: { xs: 60, md: 72 },
          px: 0,
        }}
      >
        {/* Logo */}
        <Box
          component={NavLink}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            textDecoration: "none",
            opacity: 1,
            transition: "opacity 0.2s ease",
            "&:hover": { opacity: 0.75 },
          }}
        >
          {/* Simple monogram instead of icon box */}
          <Box sx={{
            width: 34, height: 34,
            borderRadius: "8px",
            background: `linear-gradient(135deg, ${theme.palette.tertiary.main}22, ${theme.palette.accent.main}12)`,
            border: `1px solid ${theme.palette.tertiary.main}25`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Typography sx={{
              fontFamily: "monospace", fontWeight: 900,
              fontSize: "0.85rem",
              background: `linear-gradient(135deg, ${theme.palette.tertiary.main}, ${theme.palette.accent.main})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              AE
            </Typography>
          </Box>
          <Box>
            <Typography sx={{
              fontWeight: 700, fontFamily: "monospace",
              fontSize: { xs: "0.88rem", md: "0.95rem" },
              color: theme.palette.text.primary,
              letterSpacing: "0.02em", lineHeight: 1.2,
            }}>
              Adam Elhamami
            </Typography>
            <Typography sx={{
              fontSize: "0.55rem", fontFamily: "monospace",
              color: theme.palette.text.disabled,
              letterSpacing: "0.14em",
            }}>
              SECURITY · DEV · AUDIO
            </Typography>
          </Box>
        </Box>

        {/* Center nav links */}
        <Box sx={{
          display: { xs: "none", md: "flex" },
          gap: 0.5, alignItems: "center",
          position: "absolute", left: "50%",
          transform: "translateX(-50%)",
        }}>
          {navLinks.map(({ to, label }) => (
            <Button
              key={to}
              component={NavLink}
              to={to}
              sx={{
                color: theme.palette.text.disabled,
                textTransform: "none",
                fontWeight: 500,
                fontSize: "0.85rem",
                fontFamily: "monospace",
                px: 2, py: 0.85,
                minWidth: "auto",
                borderRadius: "6px",
                letterSpacing: "0.02em",
                transition: "all 0.18s ease",
                "&.active": {
                  color: theme.palette.text.primary,
                  background: "rgba(255,255,255,0.06)",
                },
                "&:hover": {
                  color: theme.palette.text.primary,
                  background: "rgba(255,255,255,0.04)",
                },
              }}
            >
              {label}
            </Button>
          ))}
        </Box>

        {/* Right side */}
        <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
          {/* Live clock */}
          <Box sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center", gap: 0.85,
            px: 1.5, py: 0.6,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "6px",
          }}>
            <Box
              component={motion.div}
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              sx={{ width: 5, height: 5, borderRadius: "50%", background: theme.palette.success.main, boxShadow: `0 0 5px ${theme.palette.success.main}` }}
            />
            <Typography sx={{ fontFamily: "monospace", fontSize: "0.65rem", color: theme.palette.text.disabled, letterSpacing: "0.04em" }}>
              {currentTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })}
            </Typography>
          </Box>

          {/* SEC+ badge */}
          <Box sx={{
            display: { xs: "none", lg: "flex" },
            alignItems: "center", gap: 0.7,
            px: 1.5, py: 0.6,
            background: `${theme.palette.primary.main}0A`,
            border: `1px solid ${theme.palette.primary.main}20`,
            borderRadius: "6px",
          }}>
            <Shield sx={{ fontSize: 12, color: theme.palette.primary.main }} />
            <Typography sx={{ fontFamily: "monospace", fontSize: "0.62rem", color: theme.palette.primary.main, fontWeight: 700, letterSpacing: "0.08em" }}>
              SEC+
            </Typography>
          </Box>

          {/* Mobile nav links */}
          <Box sx={{ display: { xs: "flex", md: "none" }, gap: 0.5 }}>
            {navLinks.map(({ to, label }) => (
              <Button
                key={to}
                component={NavLink}
                to={to}
                sx={{
                  color: theme.palette.text.disabled,
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: "0.75rem",
                  fontFamily: "monospace",
                  px: 1.25, py: 0.6,
                  minWidth: "auto",
                  borderRadius: "6px",
                  "&.active": { color: theme.palette.text.primary },
                  "&:hover": { color: theme.palette.text.primary, background: "rgba(255,255,255,0.04)" },
                }}
              >
                {label}
              </Button>
            ))}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
