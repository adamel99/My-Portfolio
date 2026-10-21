import React from "react";
import { Box, Button, Chip, Container, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { Code, GitHub, MusicNote, PlayCircleOutline } from "@mui/icons-material";

const plugins = [
  {
    title: "Soft Clipper VST Plugin",
    tagline: "Multi-Mode Saturation Processor",
    video: "/Images/softclipper.mov",
    bullets: [
      "Built a real-time saturation plugin with five nonlinear waveshaping modes and matched makeup-gain compensation for consistent perceived loudness.",
      "Implemented 4x polyphase oversampling to suppress aliasing and host latency reporting to keep the DAW in sync.",
      "Used per-sample parameter smoothing and a lock-free FIFO to safely pass metering between the audio and UI threads.",
    ],
    stack: ["C++", "JUCE Framework", "Real-Time DSP", "4x Oversampling"],
    github: "https://github.com/adamel99/Soft-Clipper",
  },
  {
    title: "Stereo Imager VST Plugin",
    tagline: "Mid/Side Width & Phase Processor",
    video: "/Images/stereoimager.mov",
    bullets: [
      "Developed a stereo-width plugin with mid/side encoding, crossfeed, and harmonic-exciter stages processed sample-by-sample in the audio callback.",
      "Built a real-time phase-correlation meter to flag mono-incompatible mixes.",
      "Implemented a vectorscope visualizer with cached image compositing and frame-rate capping for low CPU use during idle playback.",
    ],
    stack: ["C++", "JUCE Framework", "Real-Time DSP"],
    github: "https://github.com/adamel99/Stereo-Imager-",
  },
];

const PluginCard = ({ plugin }) => {
  const theme = useTheme();

  return (
    <Box
      component="article"
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "minmax(0, 0.92fr) minmax(0, 1.08fr)" },
        overflow: "hidden",
        borderRadius: 2.5,
        border: `1px solid ${theme.palette.divider}`,
        background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.background.elevated})`,
        transition: "border-color 0.22s ease, transform 0.22s ease, box-shadow 0.22s ease",
        "&:hover": {
          borderColor: `${theme.palette.tertiary.main}45`,
          transform: "translateY(-3px)",
          boxShadow: "0 18px 44px rgba(0,0,0,0.28)",
        },
      }}
    >
      <Box sx={{ p: { xs: 1.5, sm: 2 }, display: "flex", alignItems: "center", backgroundColor: theme.palette.background.terminal, borderRight: { md: `1px solid ${theme.palette.divider}` }, borderBottom: { xs: `1px solid ${theme.palette.divider}`, md: 0 } }}>
        <Box sx={{ width: "100%", aspectRatio: "16 / 10", overflow: "hidden", borderRadius: 1.5, border: `1px solid ${theme.palette.divider}`, backgroundColor: "#000" }}>
          <Box
            component="video"
            src={plugin.video}
            controls
            playsInline
            preload="metadata"
            aria-label={`${plugin.title} demonstration video`}
            sx={{ display: "block", width: "100%", height: "100%", objectFit: "contain", backgroundColor: "#000" }}
          />
        </Box>
      </Box>

      <Box sx={{ p: { xs: 2.2, sm: 3, md: 3.5 }, display: "flex", flexDirection: "column" }}>
        <Stack direction="row" alignItems="center" spacing={0.9} sx={{ mb: 1 }}>
          <MusicNote sx={{ fontSize: 17, color: theme.palette.tertiary.main }} />
          <Typography sx={{ color: theme.palette.tertiary.main, fontFamily: theme.typography.mono, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            JUCE Audio Plugin
          </Typography>
        </Stack>
        <Typography component="h2" sx={{ color: theme.palette.text.primary, fontSize: { xs: "1.25rem", md: "1.5rem" }, fontWeight: 750, letterSpacing: "-0.025em", lineHeight: 1.25 }}>
          {plugin.title}
        </Typography>
        <Typography sx={{ color: theme.palette.text.secondary, fontSize: "0.88rem", mt: 0.45 }}>{plugin.tagline}</Typography>

        <Box component="ul" sx={{ pl: 2.2, my: 1.8 }}>
          {plugin.bullets.map((bullet) => (
            <Typography
              component="li"
              key={bullet}
              sx={{
                color: theme.palette.text.secondary,
                fontSize: { xs: "0.9rem", md: "0.93rem" },
                lineHeight: 1.68,
                mb: 0.8,
                pl: 0.2,
                "&::marker": { color: theme.palette.tertiary.main },
              }}
            >
              {bullet}
            </Typography>
          ))}
        </Box>

        <Stack direction="row" useFlexGap flexWrap="wrap" gap={0.75} sx={{ mb: 2.2 }}>
          {plugin.stack.map((technology) => (
            <Chip
              key={technology}
              icon={<Code sx={{ fontSize: "14px !important", color: `${theme.palette.tertiary.main} !important` }} />}
              label={technology}
              size="small"
              sx={{
                fontFamily: theme.typography.mono,
                fontSize: "0.7rem",
                color: theme.palette.text.secondary,
                backgroundColor: `${theme.palette.tertiary.main}0A`,
                border: `1px solid ${theme.palette.tertiary.main}22`,
              }}
            />
          ))}
        </Stack>

        <Button
          href={plugin.github}
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<GitHub sx={{ fontSize: 17 }} />}
          sx={{
            alignSelf: "flex-start",
            mt: "auto",
            px: 1.6,
            py: 0.8,
            border: `1px solid ${theme.palette.divider}`,
            color: theme.palette.text.primary,
            backgroundColor: "rgba(255,255,255,0.035)",
            fontSize: "0.82rem",
            "&:hover": { backgroundColor: `${theme.palette.tertiary.main}12`, borderColor: `${theme.palette.tertiary.main}45` },
          }}
        >
          View Source
        </Button>
      </Box>
    </Box>
  );
};

const Plugins = () => {
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: theme.palette.background.default, color: theme.palette.text.primary, py: { xs: 2.5, md: 6 } }}>
      <Container maxWidth="lg" sx={{ px: { xs: 1.5, sm: 3 } }}>
        <Box component="main" sx={{ maxWidth: 1120, mx: "auto" }}>
          <Box
            component="header"
            sx={{
              position: "relative", overflow: "hidden", p: { xs: 2.5, sm: 4, md: 5 }, mb: { xs: 4, md: 6 },
              borderRadius: 3, border: `1px solid ${theme.palette.divider}`,
              background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.elevated} 100%)`,
              "&::after": { content: '""', position: "absolute", width: 320, height: 320, right: -110, top: -155, borderRadius: "50%", background: `radial-gradient(circle, ${theme.palette.tertiary.main}22 0%, transparent 72%)`, pointerEvents: "none" },
            }}
          >
            <Box sx={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) 260px" }, gap: { xs: 3, md: 5 }, alignItems: "end" }}>
              <Box>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2.2 }}>
                  <Box sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: theme.palette.tertiary.main, boxShadow: `0 0 12px ${theme.palette.tertiary.main}88` }} />
                  <Typography sx={{ color: theme.palette.text.secondary, fontFamily: theme.typography.mono, fontSize: "0.69rem", letterSpacing: "0.14em", textTransform: "uppercase" }}>Audio / DSP Portfolio</Typography>
                </Stack>
                <Typography component="h1" sx={{ fontSize: { xs: "2.65rem", sm: "3.7rem", md: "4.45rem" }, fontWeight: 800, letterSpacing: "-0.06em", lineHeight: 0.98 }}>
                  JUCE Audio <Box component="span" sx={{ color: theme.palette.tertiary.main }}>Plugins</Box>
                </Typography>
                <Typography sx={{ color: theme.palette.text.secondary, fontSize: { xs: "0.96rem", md: "1.04rem" }, lineHeight: 1.75, maxWidth: 610, mt: 2 }}>
                  C++ audio tools exploring real-time saturation, oversampling, mid/side processing, and stereo imaging.
                </Typography>
              </Box>
              <Box sx={{ p: 2.2, borderRadius: 2, backgroundColor: `${theme.palette.tertiary.main}0A`, border: `1px solid ${theme.palette.tertiary.main}28` }}>
                <Typography sx={{ color: theme.palette.tertiary.main, fontFamily: theme.typography.mono, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", mb: 0.8 }}>FOCUS AREAS</Typography>
                <Typography sx={{ color: theme.palette.text.primary, fontSize: "0.96rem", fontWeight: 700, lineHeight: 1.5 }}>C++ · JUCE · Real-Time DSP</Typography>
                <Typography sx={{ color: theme.palette.text.secondary, fontSize: "0.82rem", mt: 0.7 }}>{plugins.length} audio plugin projects</Typography>
              </Box>
            </Box>
          </Box>

          <Stack direction="row" alignItems="center" spacing={1.2} sx={{ mb: 2.4 }}>
            <PlayCircleOutline sx={{ color: theme.palette.tertiary.main, fontSize: 20 }} />
            <Typography component="h2" sx={{ color: theme.palette.text.primary, fontSize: "1.25rem", fontWeight: 750, letterSpacing: "-0.02em" }}>Featured plugins</Typography>
            <Box sx={{ height: "1px", flex: 1, ml: 1, background: `linear-gradient(90deg, ${theme.palette.divider}, transparent)` }} />
          </Stack>

          <Stack spacing={{ xs: 2, md: 2.5 }}>
            {plugins.map((plugin, index) => (
              <motion.div key={plugin.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: index * 0.08, duration: 0.45 }}>
                <PluginCard plugin={plugin} />
              </motion.div>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Plugins;
