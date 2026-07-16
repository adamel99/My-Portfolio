import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#08080B",
      paper: "#0D0D12",
      elevated: "#131319",
      terminal: "#050507",
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
    accent: {
      main: "#7B61FF",
      light: "#9D85FF",
      dark: "#5A3FD4",
    },
    success: {
      main: "#1DB954",
      light: "#3DDC77",
      dark: "#148A3C",
    },
    warning: {
      main: "#FFB02E",
    },
    text: {
      primary: "#EDEDF2",
      secondary: "rgba(210,210,225,0.64)",
      disabled: "rgba(210,210,225,0.34)",
    },
    divider: "rgba(255,255,255,0.08)",
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
          background-color: #08080B;
          color: #EDEDF2;
          scroll-behavior: smooth;
          font-feature-settings: "ss01", "cv02";
        }

        body::-webkit-scrollbar { width: 6px; }
        body::-webkit-scrollbar-track { background: #08080B; }
        body::-webkit-scrollbar-thumb {
          background: #1C1C24;
          border-radius: 3px;
        }
        body::-webkit-scrollbar-thumb:hover { background: #26262F; }

        ::selection {
          background: rgba(0,187,249,0.22);
          color: #fff;
        }

        a { color: inherit; text-decoration: none; }

        :focus-visible {
          outline: 1px solid #00BBF9;
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
          backgroundColor: "#0D0D12",
        },
      },
    },
  },
});

export default theme;
