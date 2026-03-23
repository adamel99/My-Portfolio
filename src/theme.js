import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#08080E",        // slightly deeper, more blue-black than warm black
      paper: "rgba(255,255,255,0.02)",  // neutral glass instead of pink-tinted
      elevated: "#0F0F18",       // subtle step up for cards/surfaces
    },
    primary: {
      main: "#DC136C",
      light: "#F03D8A",
      dark: "#9E0E4E",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FDCFF3",
      contrastText: "#000000",
    },
    tertiary: {
      main: "#00BBF9",
      light: "#33CAFF",
      dark: "#007DB5",
    },
    // NEW — purple accent, bridges cyan and pink naturally
    accent: {
      main: "#7B61FF",
      light: "#9D85FF",
      dark: "#5A3FD4",
    },
    // NEW — for success/active states, replaces hardcoded #27C93F
    success: {
      main: "#1DB954",
      light: "#3DDC77",
      dark: "#148A3C",
    },
    muted: {
      main: "#FDCFF3",
    },
    text: {
      primary: "#F0F0F8",        // slightly cooler white, less harsh
      secondary: "rgba(220,220,240,1.0)",  // blue-tinted secondary text
      disabled: "rgba(220,220,240,0.75)",
    },
    divider: "rgba(255,255,255,0.05)",
  },
  typography: {
    fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
    h1: {
      fontWeight: 900,
      fontSize: "clamp(2.8rem, 6vw, 5.2rem)",
      letterSpacing: "-0.04em",
      lineHeight: 1.0,
    },
    h2: {
      fontWeight: 800,
      fontSize: "clamp(1.9rem, 4vw, 3.2rem)",
      letterSpacing: "-0.025em",
      lineHeight: 1.12,
    },
    h3: {
      fontWeight: 700,
      fontSize: "clamp(1.4rem, 3vw, 2.4rem)",
      letterSpacing: "-0.015em",
      lineHeight: 1.22,
    },
    h4: {
      fontWeight: 700,
      fontSize: "clamp(1.15rem, 2.5vw, 1.75rem)",
      letterSpacing: "-0.01em",
      lineHeight: 1.32,
    },
    h5: {
      fontWeight: 600,
      fontSize: "clamp(1rem, 2vw, 1.4rem)",
      letterSpacing: "-0.005em",
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      fontSize: "clamp(0.95rem, 1.5vw, 1.15rem)",
      lineHeight: 1.5,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.78,
      letterSpacing: "0.005em",
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.72,
      letterSpacing: "0.005em",
    },
    subtitle1: {
      fontSize: "1.05rem",
      fontWeight: 500,
      lineHeight: 1.65,
    },
    subtitle2: {
      fontSize: "0.9rem",
      fontWeight: 500,
      lineHeight: 1.55,
    },
    button: {
      fontWeight: 700,
      fontSize: "0.88rem",
      letterSpacing: "0.02em",
    },
    caption: {
      fontSize: "0.72rem",
      letterSpacing: "0.06em",
      lineHeight: 1.5,
    },
    overline: {
      fontSize: "0.68rem",
      fontWeight: 700,
      letterSpacing: "0.15em",
      lineHeight: 1.5,
      textTransform: "uppercase",
    },
  },
  shape: {
    borderRadius: 10,
  },
  shadows: [
    "none",
    "0 1px 3px rgba(0,0,0,0.3)",
    "0 2px 6px rgba(0,0,0,0.35)",
    "0 4px 12px rgba(0,0,0,0.4)",
    "0 8px 20px rgba(0,0,0,0.45)",
    "0 12px 28px rgba(0,0,0,0.5)",
    "0 16px 36px rgba(0,0,0,0.55)",
    "0 20px 44px rgba(0,0,0,0.6)",
    "0 2px 8px rgba(0,0,0,0.3)",
    "0 4px 14px rgba(0,0,0,0.35)",
    "0 8px 22px rgba(0,0,0,0.4)",
    "0 12px 30px rgba(0,0,0,0.45)",
    "0 16px 38px rgba(0,0,0,0.5)",
    "0 20px 46px rgba(0,0,0,0.55)",
    "0 24px 54px rgba(0,0,0,0.6)",
    "0 28px 62px rgba(0,0,0,0.65)",
    // Cyan glow shadows
    "0 0 20px rgba(0,187,249,0.15)",
    "0 4px 20px rgba(0,187,249,0.2)",
    "0 8px 28px rgba(0,187,249,0.25)",
    "0 0 40px rgba(0,187,249,0.2)",
    // Pink glow shadows
    "0 0 20px rgba(220,19,108,0.15)",
    "0 4px 20px rgba(220,19,108,0.2)",
    "0 8px 28px rgba(220,19,108,0.25)",
    "0 0 40px rgba(220,19,108,0.2)",
    // Purple glow
    "0 0 30px rgba(123,97,255,0.2)",
  ],
  transitions: {
    duration: {
      shortest: 100,
      shorter: 160,
      short: 200,
      standard: 260,
      complex: 320,
      enteringScreen: 180,
      leavingScreen: 160,
    },
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
      smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "@import": "url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap')",
        "*, *::before, *::after": {
          boxSizing: "border-box",
        },
        body: {
          scrollBehavior: "smooth",
          backgroundColor: "#08080E",
          color: "#F0F0F8",
          // Thin cyan scrollbar
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(0,187,249,0.25)",
            borderRadius: "2px",
            "&:hover": {
              background: "rgba(0,187,249,0.45)",
            },
          },
        },
        // Selection color
        "::selection": {
          background: "rgba(0,187,249,0.25)",
          color: "#fff",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(20px)",
          background: "linear-gradient(145deg, rgba(255,255,255,0.025), rgba(255,255,255,0.01))",
          border: "1px solid rgba(255,255,255,0.055)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
          transition: "all 0.22s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          position: "relative",
          overflow: "hidden",
          // Subtle top shimmer line
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(0,187,249,0.5), transparent)",
            opacity: 0,
            transition: "opacity 0.22s ease",
          },
          "&:hover": {
            transform: "translateY(-3px)",
            border: "1px solid rgba(0,187,249,0.18)",
            boxShadow: "0 16px 48px rgba(0,0,0,0.6), 0 0 24px rgba(0,187,249,0.06)",
            "&::before": {
              opacity: 1,
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 700,
          textTransform: "none",
          fontSize: "0.88rem",
          letterSpacing: "0.02em",
          transition: "all 0.18s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          position: "relative",
          overflow: "hidden",
        },
        contained: ({ theme }) => ({
          background: `linear-gradient(135deg, ${theme.palette.tertiary.main}, ${theme.palette.tertiary.dark})`,
          color: "#000",
          fontWeight: 800,
          boxShadow: `0 0 0 1px ${theme.palette.tertiary.dark}, 0 4px 16px rgba(0,187,249,0.2)`,
          "&:hover": {
            background: `linear-gradient(135deg, ${theme.palette.tertiary.light}, ${theme.palette.tertiary.main})`,
            boxShadow: `0 0 0 1px ${theme.palette.tertiary.main}, 0 4px 24px rgba(0,187,249,0.35)`,
            transform: "translateY(-1px)",
          },
          "&:active": {
            transform: "translateY(0)",
            boxShadow: `0 0 0 1px ${theme.palette.tertiary.dark}`,
          },
        }),
        outlined: {
          borderColor: "rgba(255,255,255,0.1)",
          borderWidth: "1px",
          color: "rgba(255,255,255,0.6)",
          "&:hover": {
            borderColor: "rgba(255,255,255,0.25)",
            backgroundColor: "rgba(255,255,255,0.04)",
            color: "#fff",
          },
        },
        text: {
          color: "rgba(255,255,255,0.5)",
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.04)",
            color: "rgba(255,255,255,0.8)",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 5,
          fontWeight: 600,
          fontSize: "0.7rem",
          letterSpacing: "0.04em",
          height: 26,
          transition: "all 0.18s ease",
        },
        filled: {
          background: "rgba(0,187,249,0.08)",
          border: "1px solid rgba(0,187,249,0.15)",
          color: "rgba(0,187,249,0.9)",
        },
        outlined: {
          borderColor: "rgba(255,255,255,0.1)",
          color: "rgba(255,255,255,0.5)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#0F0F18",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: "all 0.18s ease",
          "&:hover": {
            transform: "scale(1.08)",
            backgroundColor: "rgba(0,187,249,0.07)",
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "rgba(255,255,255,0.05)",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.tertiary.main,
          textDecoration: "none",
          transition: "color 0.18s ease, opacity 0.18s ease",
          "&:hover": {
            color: theme.palette.tertiary.light,
            opacity: 0.85,
          },
        }),
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "rgba(8,8,14,0.8)",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#1A1A2E",
          border: "1px solid rgba(255,255,255,0.08)",
          fontSize: "0.75rem",
          borderRadius: 6,
        },
      },
    },
  },
});

export default theme;
