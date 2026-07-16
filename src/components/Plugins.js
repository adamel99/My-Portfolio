import React from "react";
import { Box, Typography, Grid, Chip, Button, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { GitHub, PlayCircleOutline, Code } from "@mui/icons-material";

const plugins = [
  {
    title: "Soft Clipper VST Plugin",
    tagline: "Multi-Mode Saturation Processor",
    dates: "January 2026 – March 2026",
    video: "/Images/softclipper.mov",
    bullets: [
      "Built a real-time saturation plugin with 5 nonlinear waveshaping modes and matched makeup-gain compensation for consistent perceived loudness.",
      "Implemented 4x polyphase oversampling to suppress aliasing and managed host latency reporting to keep the DAW in sync.",
      "Used per-sample parameter smoothing and a lock-free FIFO to safely pass metering from the audio thread to the UI thread, eliminating zipper noise and UI-thread contention.",
    ],
    stack: ["C++", "JUCE Framework", "Real-Time DSP", "4x Oversampling"],
    github: "https://github.com/adamel99/Soft-Clipper",
  },
  {
    title: "Stereo Imager VST Plugin",
    tagline: "Mid/Side Width & Phase Processor",
    dates: "October 2025 – December 2025",
    video: "/Images/stereoimager.mov",
    bullets: [
      "Developed a stereo-width plugin using mid/side encoding with crossfeed and harmonic exciter stages processed sample-by-sample in the audio callback.",
      "Built a real-time phase correlation meter (running dot-product/RMS calculation) to flag mono-incompatible mixes.",
      "Implemented a vectorscope visualizer with cached image compositing and frame-rate capping for low CPU usage during idle/silent playback.",
    ],
    stack: ["C++", "JUCE Framework", "Real-Time DSP"],
    github: "https://github.com/adamel99/Stereo-Imager-",
  },
];

function PluginCard({ plugin, index }) {
  const theme = useTheme();

  return (
    <Grid item xs={12} key={plugin.title}>
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: index % 2 === 0 ? "row" : "row-reverse" },
          gap: { xs: 3, md: 5 },
          p: { xs: 2.5, md: 4 },
          borderRadius: "12px",
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
          mb: 4,
        }}
      >
        {/* Video */}
        <Box
          sx={{
            flex: { md: "0 0 48%" },
            borderRadius: "10px",
            overflow: "hidden",
            border: `1px solid ${theme.palette.tertiary.main}25`,
            background: "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <video
            src={plugin.video}
            controls
            playsInline
            preload="metadata"
            style={{ width: "100%", height: "100%", display: "block", maxHeight: 380, objectFit: "cover" }}
          />
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Typography
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              fontSize: { xs: "1.2rem", md: "1.45rem" },
              color: theme.palette.text.primary,
              mb: 0.5,
              lineHeight: 1.3,
            }}
          >
            {plugin.title}
          </Typography>
          <Typography
            sx={{
              fontFamily: "monospace",
              fontSize: "0.8rem",
              color: theme.palette.tertiary.main,
              mb: 0.5,
              letterSpacing: "0.02em",
            }}
          >
            {plugin.tagline}
          </Typography>
          <Typography
            sx={{
              fontFamily: "monospace",
              fontSize: "0.68rem",
              color: theme.palette.text.disabled,
              mb: 2,
              letterSpacing: "0.04em",
            }}
          >
            {plugin.dates}
          </Typography>

          <Box component="ul" sx={{ m: 0, mb: 2.5, pl: 2.2 }}>
            {plugin.bullets.map((bullet, i) => (
              <Typography
                component="li"
                key={i}
                sx={{
                  fontFamily: "monospace",
                  fontSize: "0.8rem",
                  lineHeight: 1.7,
                  color: theme.palette.text.secondary,
                  mb: 1,
                  "&::marker": { color: theme.palette.tertiary.main },
                }}
              >
                {bullet}
              </Typography>
            ))}
          </Box>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
            {plugin.stack.map((tech) => (
              <Chip
                key={tech}
                icon={<Code sx={{ fontSize: "14px !important" }} />}
                label={tech}
                size="small"
                sx={{
                  fontFamily: "monospace",
                  fontSize: "0.7rem",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: theme.palette.text.disabled,
                }}
              />
            ))}
          </Box>

          <Box sx={{ display: "flex", gap: 1.5 }}>
            <Button
              href={plugin.github}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<GitHub sx={{ fontSize: 16 }} />}
              sx={{
                fontFamily: "monospace",
                textTransform: "none",
                fontSize: "0.8rem",
                color: theme.palette.text.primary,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                px: 2,
                py: 0.8,
                borderRadius: "6px",
                "&:hover": { background: "rgba(255,255,255,0.09)" },
              }}
            >
              View Source
            </Button>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
}

function Plugins() {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{ mb: 6, textAlign: "center" }}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 1.5 }}>
          <PlayCircleOutline sx={{ fontSize: 18, color: theme.palette.tertiary.main }} />
          <Typography
            sx={{
              fontFamily: "monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.14em",
              color: theme.palette.tertiary.main,
            }}
          >
            AUDIO / DSP PROJECTS
          </Typography>
        </Box>
        <Typography
          sx={{
            fontFamily: "monospace",
            fontWeight: 800,
            fontSize: { xs: "1.8rem", md: "2.4rem" },
            background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${theme.palette.tertiary.main})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 1,
          }}
        >
          JUCE Audio Plugins
        </Typography>
        <Typography
          sx={{
            fontFamily: "monospace",
            fontSize: "0.85rem",
            color: theme.palette.text.disabled,
            maxWidth: 560,
            mx: "auto",
          }}
        >
          Two VST/AU plugins built from scratch in C++ using the JUCE framework,
          covering real-time saturation DSP and mid/side stereo field processing.
        </Typography>
      </Box>

      <Grid container>
        {plugins.map((plugin, i) => (
          <PluginCard plugin={plugin} index={i} key={plugin.title} />
        ))}
      </Grid>
    </Container>
  );
}

export default Plugins;
