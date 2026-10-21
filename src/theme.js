import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0D111A",
      paper: "#0D111A",
      elevated: "rgba(245,211,221,0.035)",
      terminal: "#0D111A",
    },
    primary: {
      main: "#E42278",
      light: "#ED7BAB",
      dark: "#E42278",
      contrastText: "#F9F9F9",
    },
    secondary: {
      main: "#F5D3DD",
      contrastText: "#0D111A",
    },
    tertiary: {
      main: "#ED7BAB",
      light: "#F5D3DD",
      dark: "#E42278",
    },
    accent: {
      main: "#E42278",
      light: "#ED7BAB",
      dark: "#E42278",
    },
    success: {
      main: "#ED7BAB",
      light: "#F5D3DD",
      dark: "#E42278",
    },
    warning: {
      main: "#E42278",
    },
    text: {
      primary: "#F9F9F9",
      secondary: "#F5D3DD",
      disabled: "rgba(245,211,221,0.42)",
    },
    divider: "rgba(245,211,221,0.12)",
  },
  typography: {
    fontFamily: `"Inter", system-ui, sans-serif`,
    mono: `"JetBrains Mono", "Fira Code", monospace`,
    h1: {
      fontFamily: `"Inter", sans-serif`,
      fontWeight: 700,
      fontSize: "clamp(2.6rem, 5.2vw, 4.6rem)",
      letterSpacing: "-0.03em",
      lineHeight: 1.04,
    },
    h2: {
      fontFamily: `"Inter", sans-serif`,
      fontWeight: 700,
      fontSize: "clamp(1.7rem, 3vw, 2.6rem)",
      letterSpacing: "-0.025em",
      lineHeight: 1.14,
    },
    h3: {
      fontFamily: `"Inter", sans-serif`,
      fontWeight: 600,
      fontSize: "clamp(1.05rem, 1.8vw, 1.3rem)",
      letterSpacing: "-0.01em",
    },
    h4: {
      fontFamily: `"Inter", sans-serif`,
      fontWeight: 600,
      fontSize: "1rem",
      letterSpacing: "-0.005em",
    },
    body1: {
      fontFamily: `"Inter", sans-serif`,
      fontSize: "0.95rem",
      lineHeight: 1.75,
      letterSpacing: 0,
    },
    body2: {
      fontFamily: `"Inter", sans-serif`,
      fontSize: "0.86rem",
      lineHeight: 1.68,
    },
    caption: {
      fontFamily: `"JetBrains Mono", monospace`,
      fontSize: "0.68rem",
      letterSpacing: "0.08em",
      lineHeight: 1.6,
    },
    overline: {
      fontFamily: `"JetBrains Mono", monospace`,
      fontSize: "0.62rem",
      fontWeight: 500,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
    },
  },
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; }
        html { color-scheme: dark; }

        body {
          background-color: #0D111A;
          color: #F9F9F9;
          scroll-behavior: smooth;
          font-feature-settings: "ss01", "cv02";
        }

        body::-webkit-scrollbar { width: 6px; }
        body::-webkit-scrollbar-track { background: #0D111A; }
        body::-webkit-scrollbar-thumb {
          background: rgba(245,211,221,0.16);
          border-radius: 3px;
        }
        body::-webkit-scrollbar-thumb:hover { background: rgba(245,211,221,0.28); }

        ::selection {
          background: rgba(228,34,120,0.32);
          color: #F9F9F9;
        }

        a { color: inherit; text-decoration: none; }

        :focus-visible {
          outline: 1px solid #ED7BAB;
          outline-offset: 3px;
          border-radius: 2px;
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: `"JetBrains Mono", monospace`,
          fontWeight: 500,
          textTransform: "none",
          letterSpacing: "0.01em",
          borderRadius: 6,
          fontSize: "0.8rem",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#0D111A",
        },
      },
    },
  },
});

export default theme;
