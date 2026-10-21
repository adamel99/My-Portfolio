import React, { useState } from "react";
import {
  Box, Button, Container, Dialog, DialogContent, DialogTitle, IconButton, Stack, Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import {
  Close, Email, GitHub, LinkedIn, NorthEast, Shield, VerifiedUser, ZoomIn,
} from "@mui/icons-material";
import { useHistory } from "react-router-dom";

const credentials = [
  {
    image: "/Images/njitcert.jpg",
    color: "accent",
    icon: <VerifiedUser sx={{ fontSize: 16 }} />,
    tag: "Certificate Program",
    title: "NJIT Cybersecurity Certificate",
    subtitle: "Applied cybersecurity coursework & training",
    desc: "Coursework and applied training in network defense, secure systems, incident response, and core security practices.",
    highlights: ["Network and systems security labs", "Security operations fundamentals", "Security documentation and remediation"],
  },
  {
    image: "/Images/Untitled.jpg",
    color: "tertiary",
    icon: <VerifiedUser sx={{ fontSize: 16 }} />,
    tag: "Certified",
    title: "CompTIA Security+",
    subtitle: "Industry-standard cybersecurity certification",
    desc: "Validates foundational cybersecurity knowledge across threat management, cryptography, identity and access management, and network security.",
    highlights: ["Threat detection and response", "Network security and risk management", "Cryptography and identity management"],
  },
  {
    image: "/Images/cert.jpg",
    color: "primary",
    icon: <Shield sx={{ fontSize: 16 }} />,
    tag: "Incident Response",
    title: "TDX Arena IR Expert",
    subtitle: "Hands-on incident response challenge",
    desc: "Incident-response simulations covering memory forensics, malware triage, PCAP analysis, and threat-detection workflows.",
    highlights: ["Forensics on compromised Windows systems", "Malware triage and static analysis", "PCAP review with Wireshark and Snort"],
  },
];

const SectionHeading = ({ eyebrow, title, action }) => {
  const theme = useTheme();
  return (
    <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "flex-end" }} spacing={1.5} sx={{ mb: 2.5 }}>
      <Box>
        <Typography sx={{ color: theme.palette.tertiary.main, fontFamily: theme.typography.mono, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", mb: 0.7 }}>
          {eyebrow}
        </Typography>
        <Typography component="h2" sx={{ color: theme.palette.text.primary, fontSize: { xs: "1.45rem", md: "1.7rem" }, fontWeight: 750, letterSpacing: "-0.025em" }}>
          {title}
        </Typography>
      </Box>
      {action}
    </Stack>
  );
};

const ZoomableImage = ({ src, alt, title, objectFit = "contain", imageSx = {} }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const dialogId = `image-dialog-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <>
      <Box
        component="button"
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Enlarge image: ${title}`}
        sx={{
          position: "relative", display: "block", width: "100%", height: "100%", overflow: "hidden",
          p: 0, border: 0, background: "transparent", cursor: "zoom-in", textAlign: "left",
          "&:hover .zoom-hint": { opacity: 1 },
          "&:focus-visible": { outline: `2px solid ${theme.palette.tertiary.main}`, outlineOffset: 3, zIndex: 1 },
        }}
      >
        <Box component="img" src={src} alt={alt} sx={{ display: "block", width: "100%", height: "100%", objectFit, transition: "transform 0.35s ease", "button:hover &": { transform: "scale(1.035)" }, ...imageSx }} />
        <Box className="zoom-hint" sx={{ position: "absolute", right: 10, bottom: 10, display: "flex", alignItems: "center", gap: 0.55, px: 1, py: 0.55, borderRadius: 1, color: "#fff", bgcolor: "rgba(8,8,11,0.76)", fontSize: "0.72rem", opacity: { xs: 1, sm: 0 }, transition: "opacity 0.2s ease", pointerEvents: "none" }}>
          <ZoomIn sx={{ fontSize: 16 }} /> Click to enlarge
        </Box>
      </Box>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="lg"
        fullWidth
        aria-labelledby={dialogId}
        PaperProps={{ sx: { bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: 2 } }}
      >
        <DialogTitle id={dialogId} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: theme.palette.text.primary, pr: 1.5 }}>
          <Typography component="span" sx={{ fontSize: "1rem", fontWeight: 700 }}>{title}</Typography>
          <IconButton onClick={() => setOpen(false)} aria-label="Close enlarged image" sx={{ color: theme.palette.text.secondary }}><Close /></IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: { xs: 1.5, sm: 3 }, borderColor: theme.palette.divider }}>
          <Box component="img" src={src} alt={alt} sx={{ display: "block", maxWidth: "100%", maxHeight: "78vh", objectFit: "contain" }} />
        </DialogContent>
      </Dialog>
    </>
  );
};

const CredentialCard = ({ credential }) => {
  const theme = useTheme();
  const color = theme.palette[credential.color].main;

  return (
    <Box
      component="article"
      sx={{
        height: "100%", overflow: "hidden", borderRadius: 2.5,
        border: `1px solid ${theme.palette.divider}`,
        background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.background.elevated})`,
        transition: "border-color 0.22s ease, transform 0.22s ease, box-shadow 0.22s ease",
        "&:hover": { borderColor: `${color}45`, transform: "translateY(-3px)", boxShadow: "0 18px 44px rgba(0,0,0,0.28)" },
      }}
    >
      <Box sx={{ p: { xs: 1.5, sm: 2 }, pb: 0 }}>
        <Box sx={{ position: "relative", aspectRatio: "16 / 10", overflow: "hidden", borderRadius: 1.5, border: `1px solid ${theme.palette.divider}`, backgroundColor: theme.palette.background.terminal }}>
          <ZoomableImage src={credential.image} alt={credential.title} title={credential.title} imageSx={{ p: 1.2 }} />
          <Box sx={{ position: "absolute", top: 10, left: 10, zIndex: 2, display: "flex", alignItems: "center", gap: 0.7, px: 1, py: 0.5, borderRadius: 1, bgcolor: "rgba(8,8,11,0.78)", border: `1px solid ${color}35`, color }}>
            {credential.icon}
            <Typography sx={{ color: "inherit", fontFamily: theme.typography.mono, fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.06em" }}>{credential.tag}</Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
        <Typography component="h3" sx={{ color, fontSize: "1.08rem", fontWeight: 750, letterSpacing: "-0.02em" }}>{credential.title}</Typography>
        <Typography sx={{ color: theme.palette.text.secondary, fontSize: "0.82rem", mt: 0.35 }}>{credential.subtitle}</Typography>
        <Typography sx={{ color: theme.palette.text.secondary, fontSize: "0.88rem", lineHeight: 1.7, mt: 1 }}>{credential.desc}</Typography>
        <Stack spacing={0.6} sx={{ mt: 1.4 }}>
          {credential.highlights.map((highlight) => (
            <Stack key={highlight} direction="row" alignItems="flex-start" spacing={0.9}>
              <Box sx={{ width: 5, height: 5, mt: "8px", flexShrink: 0, borderRadius: "50%", bgcolor: color }} />
              <Typography sx={{ color: theme.palette.text.secondary, fontSize: "0.82rem", lineHeight: 1.55 }}>{highlight}</Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

const LandingPage = () => {
  const theme = useTheme();
  const history = useHistory();

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: theme.palette.background.default, color: theme.palette.text.primary, py: { xs: 2.5, md: 6 } }}>
      <Container maxWidth="lg" sx={{ px: { xs: 1.5, sm: 3 } }}>
        <Box component="main" sx={{ maxWidth: 1120, mx: "auto" }}>
          <Box
            component="header"
            sx={{
              position: "relative", overflow: "hidden", p: { xs: 2.5, sm: 4, md: 5 }, mb: { xs: 3, md: 4 },
              borderRadius: 3, border: `1px solid ${theme.palette.divider}`,
              background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.elevated} 100%)`,
              "&::after": { content: '""', position: "absolute", width: 360, height: 360, right: -125, top: -185, borderRadius: "50%", background: `radial-gradient(circle, ${theme.palette.tertiary.main}24 0%, transparent 72%)`, pointerEvents: "none" },
            }}
          >
            <Box sx={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) 290px" }, gap: { xs: 3, md: 5 }, alignItems: "center" }}>
              <Box>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2.2 }}>
                  <Box sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: theme.palette.success.main, boxShadow: `0 0 12px ${theme.palette.success.main}88` }} />
                  <Typography sx={{ color: theme.palette.success.main, fontFamily: theme.typography.mono, fontSize: "0.69rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>Open to work · NJ / Remote</Typography>
                </Stack>
                <Typography component="h1" sx={{ fontSize: { xs: "2.8rem", sm: "3.8rem", md: "4.55rem" }, fontWeight: 800, letterSpacing: "-0.06em", lineHeight: 0.98 }}>
                  Adam <Box component="span" sx={{ color: theme.palette.tertiary.main }}>Elhamami</Box>
                </Typography>
                <Typography sx={{ color: theme.palette.text.primary, fontSize: { xs: "1rem", md: "1.13rem" }, fontWeight: 650, mt: 1.6 }}>
                  Cybersecurity <Box component="span" sx={{ color: theme.palette.text.disabled }}>/</Box> Full-Stack Development <Box component="span" sx={{ color: theme.palette.text.disabled }}>/</Box> Audio DSP
                </Typography>
                <Typography sx={{ color: theme.palette.text.secondary, fontSize: { xs: "0.94rem", md: "1rem" }, lineHeight: 1.78, maxWidth: 640, mt: 1.7 }}>
                  Security+ certified SOC and security analyst building detection tools, secure web applications, and real-time C++ audio plugins.
                </Typography>
                <Stack direction="row" useFlexGap flexWrap="wrap" gap={1.1} sx={{ mt: 2.6 }}>
                  <Button onClick={() => history.push("/skills")} endIcon={<NorthEast sx={{ fontSize: 16 }} />} sx={{ px: 1.8, py: 0.95, bgcolor: theme.palette.tertiary.main, color: "#050507", fontWeight: 750, "&:hover": { bgcolor: theme.palette.tertiary.light } }}>
                    Explore Skills
                  </Button>
                  <Button onClick={() => history.push("/resume")} sx={{ px: 1.8, py: 0.95, color: theme.palette.text.primary, border: `1px solid ${theme.palette.divider}`, bgcolor: "rgba(255,255,255,0.025)", "&:hover": { borderColor: `${theme.palette.tertiary.main}50`, bgcolor: `${theme.palette.tertiary.main}0B` } }}>
                    View Resume
                  </Button>
                  <Button component="a" href="mailto:adamelh1999@gmail.com" startIcon={<Email sx={{ fontSize: 17 }} />} sx={{ px: 1.5, py: 0.95, color: theme.palette.text.secondary, "&:hover": { color: theme.palette.tertiary.main } }}>
                    Contact
                  </Button>
                </Stack>
                <Stack direction="row" spacing={1} sx={{ mt: 2.1 }}>
                  {[
                    { label: "GitHub", href: "https://github.com/adamel99", icon: <GitHub sx={{ fontSize: 18 }} /> },
                    { label: "LinkedIn", href: "https://www.linkedin.com/in/adam-elhamami-33767029a/", icon: <LinkedIn sx={{ fontSize: 18 }} /> },
                  ].map((social) => (
                    <IconButton key={social.label} component="a" href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} sx={{ width: 38, height: 38, color: theme.palette.text.secondary, border: `1px solid ${theme.palette.divider}`, borderRadius: 1.3, "&:hover": { color: theme.palette.tertiary.main, borderColor: `${theme.palette.tertiary.main}50` } }}>
                      {social.icon}
                    </IconButton>
                  ))}
                </Stack>
              </Box>

              <Box sx={{ width: "100%", maxWidth: 290, justifySelf: { xs: "center", md: "end" } }}>
                <Box sx={{ p: 1.2, borderRadius: 2.2, border: `1px solid ${theme.palette.tertiary.main}35`, background: `linear-gradient(145deg, ${theme.palette.tertiary.main}13, ${theme.palette.accent.main}0A)`, boxShadow: `0 20px 55px rgba(0,0,0,0.3)` }}>
                  <Box sx={{ height: { xs: 250, md: 335 }, overflow: "hidden", borderRadius: 1.5, backgroundColor: theme.palette.background.terminal }}>
                    <ZoomableImage src="/Images/selfie.jpg" alt="Adam Elhamami" title="Adam Elhamami" objectFit="cover" />
                  </Box>
                  <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, pt: 1.15 }}>
                    <Typography sx={{ color: theme.palette.text.primary, fontSize: "0.83rem", fontWeight: 700 }}>Profile</Typography>
                    <Stack direction="row" alignItems="center" spacing={0.7}>
                      <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: theme.palette.success.main }} />
                      <Typography sx={{ color: theme.palette.success.main, fontFamily: theme.typography.mono, fontSize: "0.64rem", fontWeight: 700, letterSpacing: "0.06em" }}>AVAILABLE</Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(4, 1fr)" }, gap: 1.2, mb: { xs: 5, md: 7 } }}>
            {[
              ["Security+", "CompTIA Certified", theme.palette.tertiary.main],
              ["TDX Arena", "IR Expert Challenge", theme.palette.primary.main],
              ["NJIT", "Cybersecurity Certificate", theme.palette.accent.main],
              ["4+", "Projects Shipped", theme.palette.success.main],
            ].map(([value, label, color]) => (
              <Box key={label} sx={{ p: { xs: 1.6, sm: 2 }, borderRadius: 1.8, border: `1px solid ${theme.palette.divider}`, background: theme.palette.background.paper }}>
                <Box sx={{ width: 22, height: 2, borderRadius: 2, bgcolor: color, mb: 1.3 }} />
                <Typography sx={{ color: theme.palette.text.primary, fontSize: "1.02rem", fontWeight: 750 }}>{value}</Typography>
                <Typography sx={{ color: theme.palette.text.secondary, fontSize: "0.74rem", lineHeight: 1.45, mt: 0.35 }}>{label}</Typography>
              </Box>
            ))}
          </Box>

          <Box component="section" sx={{ mb: { xs: 5, md: 7 } }}>
            <SectionHeading
              eyebrow="Credentials"
              title="Certifications & Training"
              action={(
                <Button onClick={() => history.push("/skills")} endIcon={<NorthEast sx={{ fontSize: 15 }} />} sx={{ color: theme.palette.text.secondary, fontSize: "0.84rem", "&:hover": { color: theme.palette.tertiary.main } }}>
                  Explore skills
                </Button>
              )}
            />
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: { xs: 1.7, md: 2.2 }, alignItems: "stretch" }}>
              {credentials.map((credential, index) => (
                <motion.div key={credential.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-35px" }} transition={{ delay: index * 0.07, duration: 0.4 }} style={{ height: "100%" }}>
                  <CredentialCard credential={credential} />
                </motion.div>
              ))}
            </Box>
          </Box>

          <Box component="section" sx={{ p: { xs: 2.5, sm: 3.5, md: 4 }, borderRadius: 2.5, border: `1px solid ${theme.palette.divider}`, background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.background.elevated})`, display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) auto" }, gap: 2.5, alignItems: "center" }}>
            <Box>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                <Email sx={{ color: theme.palette.tertiary.main, fontSize: 18 }} />
                <Typography sx={{ color: theme.palette.tertiary.main, fontFamily: theme.typography.mono, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em" }}>LET’S CONNECT</Typography>
              </Stack>
              <Typography component="h2" sx={{ color: theme.palette.text.primary, fontSize: { xs: "1.55rem", md: "1.9rem" }, fontWeight: 800, letterSpacing: "-0.03em" }}>Let’s work together.</Typography>
              <Typography sx={{ color: theme.palette.text.secondary, fontSize: "0.93rem", lineHeight: 1.7, mt: 0.7 }}>Targeting internships and junior roles. Based in New Jersey; open to remote or hybrid.</Typography>
            </Box>
            <Stack direction={{ xs: "column", sm: "row", md: "column" }} spacing={1}>
              <Button component="a" href="mailto:adamelh1999@gmail.com" endIcon={<NorthEast sx={{ fontSize: 15 }} />} sx={{ justifyContent: "center", color: "#050507", bgcolor: theme.palette.tertiary.main, fontWeight: 750, px: 2, "&:hover": { bgcolor: theme.palette.tertiary.light } }}>Get in touch</Button>
              <Button onClick={() => history.push("/resume")} endIcon={<NorthEast sx={{ fontSize: 15 }} />} sx={{ justifyContent: "center", color: theme.palette.text.primary, border: `1px solid ${theme.palette.divider}`, px: 2 }}>View resume</Button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;
