import React, { useState } from "react";
import {
  Box, Container, Dialog, DialogContent, DialogTitle, IconButton, Stack, Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { Code, Database, Shield, Music, Terminal, Palette } from "lucide-react";
import { Close, ZoomIn } from "@mui/icons-material";

const skillCategories = [
  {
    name: "Cybersecurity", icon: <Shield size={17} />, color: "tertiary",
    desc: "Defensive security across incident response, threat analysis, network security, and Windows and Linux environments.",
    skills: ["Incident Response", "Windows Security", "Linux Security", "Threat Analysis", "Network Security", "Vulnerability Assessment", "Security Auditing", "SIEM"],
    proficiency: [["Incident Response", 95], ["Threat Analysis", 90], ["Network Security", 87], ["Vulnerability Assessment", 82]],
  },
  {
    name: "Frontend", icon: <Code size={17} />, color: "secondary",
    desc: "Component-driven interfaces built with React, with secure authentication flows, XSS prevention, and OWASP practices in mind.",
    skills: ["React", "Redux", "Material UI", "CSS3", "Framer Motion", "JavaScript ES6+", "XSS Prevention", "Secure Auth"],
    proficiency: [["React / Redux", 85], ["JavaScript ES6+", 88], ["CSS / Material UI", 82], ["Secure Auth", 85]],
  },
  {
    name: "Backend", icon: <Database size={17} />, color: "primary",
    desc: "Node.js and Express APIs with relational databases, authentication, rate limiting, and secure API design.",
    skills: ["Node.js", "Express.js", "PostgreSQL", "MySQL", "REST APIs", "JWT Auth", "Rate Limiting", "API Security"],
    proficiency: [["Node.js / Express", 75], ["PostgreSQL", 70], ["JWT Auth", 82], ["Secure API Design", 85]],
  },
  {
    name: "Audio Engineering", icon: <Music size={17} />, color: "accent",
    desc: "C++ and JUCE plugin development, DSP pipelines, FFT analysis, and audio production tooling.",
    skills: ["JUCE Framework", "C++", "DSP", "FFT Analysis", "Plugin Development", "Audio Production", "Mixing & Mastering"],
    proficiency: [["C++ / JUCE", 78], ["DSP / FFT", 74], ["Plugin Development", 70], ["Audio Production", 88]],
  },
  {
    name: "Tools & DevOps", icon: <Terminal size={17} />, color: "tertiary",
    desc: "A CLI-first workflow across version control, cloud services, CI/CD pipelines, and environment security.",
    skills: ["Git", "VS Code", "Terminal / CLI", "AWS", "CI/CD", "Package Managers", "Environment Security"],
    proficiency: [["Git / Version Control", 88], ["Terminal / CLI", 85], ["AWS", 68], ["CI/CD", 72]],
  },
  {
    name: "Design", icon: <Palette size={17} />, color: "primary",
    desc: "UI/UX from concept to component, balancing visual design, prototyping, and usability.",
    skills: ["UI Design", "Component Architecture", "Visual Design", "User Experience", "Prototyping"],
    proficiency: [["UI Design", 82], ["Component Architecture", 80], ["User Experience", 75], ["Prototyping", 70]],
  },
];

const projectData = [
  {
    title: "CompTIA Security+",
    subtitle: "Industry-recognized cybersecurity certification",
    image: "/Images/Untitled.jpg",
    color: "tertiary",
    desc: "Validates cybersecurity knowledge across threat management, cryptography, identity management, and network security.",
    highlights: ["Coverage across all five exam domains", "DoD-approved baseline certification (8570/8140)", "Technical and operational security skills"],
    tech: ["Encryption", "Firewalls", "IDS/IPS", "VPN", "PKI", "Compliance"],
  },
  {
    title: "SOC Log Analyzer",
    subtitle: "Cross-platform Python threat detection tool",
    image: "/Images/eventlogger.jpg",
    color: "tertiary",
    desc: "A Python-based log analyzer for Linux authentication logs and Windows Event Log exports, with threat detection, brute-force correlation, and MITRE ATT&CK mapping.",
    highlights: ["Sliding-window brute-force correlation", "Detection rules for privilege escalation, RDP logins, account creation, and audit-log tampering", "Severity-ranked CSV and JSON triage reports"],
    tech: ["Python", "MITRE ATT&CK", "Windows Event Logs", "Linux Auth Logs", "Regex", "CSV / JSON"],
  },
  {
    title: "TDX Arena IR Expert",
    subtitle: "Hands-on incident response simulations",
    image: "/Images/cert.jpg",
    color: "primary",
    desc: "Incident-response training through scenarios involving memory forensics, malware triage, PCAP analysis, and threat detection.",
    highlights: ["Memory forensics on compromised Windows systems", "Malware triage with ClamAV and static-analysis tools", "Threat detection with Wireshark and Snort"],
    tech: ["Windows", "Linux", "ClamAV", "Snort", "Wireshark", "tcpdump", "Forensics"],
  },
];

const Section = ({ title, children }) => {
  const theme = useTheme();
  return (
    <Box component="section" sx={{ mb: { xs: 4, md: 5 } }}>
      <Stack direction="row" alignItems="center" spacing={1.35} sx={{ mb: 2 }}>
        <Typography component="h2" sx={{ color: theme.palette.text.primary, fontSize: "1.2rem", fontWeight: 750, letterSpacing: "-0.02em" }}>
          {title}
        </Typography>
        <Box sx={{ height: "1px", flex: 1, background: `linear-gradient(90deg, ${theme.palette.divider}, transparent)` }} />
      </Stack>
      {children}
    </Box>
  );
};

const SkillBar = ({ label, value, color }) => {
  const theme = useTheme();
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.65 }}>
        <Typography sx={{ color: theme.palette.text.secondary, fontSize: "0.86rem", fontWeight: 600 }}>{label}</Typography>
        <Typography sx={{ color, fontFamily: theme.typography.mono, fontSize: "0.76rem", fontWeight: 700 }}>{value}%</Typography>
      </Stack>
      <Box sx={{ height: 5, overflow: "hidden", borderRadius: 99, bgcolor: "rgba(255,255,255,0.07)" }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          style={{ height: "100%", borderRadius: 99, background: `linear-gradient(90deg, ${color}80, ${color})` }}
        />
      </Box>
    </Box>
  );
};

const ProjectShowcase = ({ project }) => {
  const theme = useTheme();
  const [imageOpen, setImageOpen] = useState(false);
  const color = theme.palette[project.color].main;

  return (
    <Box
      component="article"
      sx={{
        overflow: "hidden",
        borderRadius: 2.5,
        border: `1px solid ${theme.palette.divider}`,
        background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.background.elevated})`,
        transition: "border-color 0.22s ease, transform 0.22s ease, box-shadow 0.22s ease",
        "&:hover": { borderColor: `${color}50`, transform: "translateY(-3px)", boxShadow: "0 18px 44px rgba(0,0,0,0.28)" },
      }}
    >
      <Box sx={{ position: "relative", p: { xs: 1.5, sm: 2 }, pb: 0 }}>
        <Box
          component="button"
          type="button"
          onClick={() => setImageOpen(true)}
          aria-label={`Enlarge image for ${project.title}`}
          sx={{
            position: "relative", display: "block", width: "100%", aspectRatio: "16 / 10", overflow: "hidden",
            border: `1px solid ${theme.palette.divider}`, borderRadius: 1.5, p: 0,
            backgroundColor: theme.palette.background.terminal, cursor: "zoom-in",
            "&:hover .zoom-overlay": { opacity: 1 },
            "&:focus-visible": { outline: `2px solid ${color}`, outlineOffset: 3 },
          }}
        >
          <Box component="img" src={project.image} alt={project.title} sx={{ display: "block", width: "100%", height: "100%", objectFit: "contain", p: 1.2, transition: "transform 0.35s ease", "button:hover &": { transform: "scale(1.035)" } }} />
          <Box className="zoom-overlay" sx={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", justifyContent: "flex-end", p: 1.1, background: "linear-gradient(transparent 55%, rgba(0,0,0,0.55))", opacity: { xs: 1, sm: 0 }, transition: "opacity 0.2s ease", pointerEvents: "none" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.55, px: 1, py: 0.55, borderRadius: 1, color: "#fff", bgcolor: "rgba(8,8,11,0.72)", fontSize: "0.72rem" }}>
              <ZoomIn sx={{ fontSize: 16 }} /> Click to enlarge
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
        <Typography sx={{ color, fontFamily: theme.typography.mono, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", mb: 0.7 }}>
          Featured Work
        </Typography>
        <Typography component="h3" sx={{ color: theme.palette.text.primary, fontSize: "1.14rem", fontWeight: 750, letterSpacing: "-0.02em" }}>
          {project.title}
        </Typography>
        <Typography sx={{ color: theme.palette.text.secondary, fontSize: "0.82rem", mt: 0.35 }}>{project.subtitle}</Typography>
        <Typography sx={{ color: theme.palette.text.secondary, fontSize: "0.9rem", lineHeight: 1.7, mt: 1.1 }}>{project.desc}</Typography>

        <Box sx={{ mt: 1.7 }}>
          <Typography sx={{ color: theme.palette.text.primary, fontSize: "0.82rem", fontWeight: 700, mb: 0.7 }}>Highlights</Typography>
          <Stack spacing={0.65}>
            {project.highlights.map((highlight) => (
              <Stack key={highlight} direction="row" alignItems="flex-start" spacing={1}>
                <Box sx={{ width: 5, height: 5, borderRadius: "50%", bgcolor: color, mt: "8px", flexShrink: 0 }} />
                <Typography sx={{ color: theme.palette.text.secondary, fontSize: "0.85rem", lineHeight: 1.6 }}>{highlight}</Typography>
              </Stack>
            ))}
          </Stack>
        </Box>

        <Stack direction="row" useFlexGap flexWrap="wrap" gap={0.7} sx={{ mt: 1.8, pt: 1.4, borderTop: `1px solid ${theme.palette.divider}` }}>
          {project.tech.map((technology) => (
            <Box key={technology} sx={{ px: 1, py: 0.45, color, bgcolor: `${color}0D`, border: `1px solid ${color}22`, borderRadius: 1, fontFamily: theme.typography.mono, fontSize: "0.67rem" }}>
              {technology}
            </Box>
          ))}
        </Stack>
      </Box>

      <Dialog
        open={imageOpen}
        onClose={() => setImageOpen(false)}
        maxWidth="lg"
        fullWidth
        aria-labelledby={`skills-project-image-${project.title.replace(/\s+/g, "-")}`}
        PaperProps={{ sx: { bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: 2 } }}
      >
        <DialogTitle id={`skills-project-image-${project.title.replace(/\s+/g, "-")}`} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: theme.palette.text.primary, pr: 1.5 }}>
          <Typography component="span" sx={{ fontSize: "1rem", fontWeight: 700 }}>{project.title}</Typography>
          <IconButton onClick={() => setImageOpen(false)} aria-label="Close enlarged image" sx={{ color: theme.palette.text.secondary }}><Close /></IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: { xs: 1.5, sm: 3 }, borderColor: theme.palette.divider }}>
          <Box component="img" src={project.image} alt={project.title} sx={{ display: "block", maxWidth: "100%", maxHeight: "75vh", objectFit: "contain" }} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

const Skills = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(skillCategories[0].name);
  const activeCategory = skillCategories.find((category) => category.name === activeTab) || skillCategories[0];
  const categoryColor = theme.palette[activeCategory.color].main;

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
                  <Typography sx={{ color: theme.palette.text.secondary, fontFamily: theme.typography.mono, fontSize: "0.69rem", letterSpacing: "0.14em", textTransform: "uppercase" }}>Career Profile · Skills</Typography>
                </Stack>
                <Typography component="h1" sx={{ fontSize: { xs: "2.65rem", sm: "3.7rem", md: "4.45rem" }, fontWeight: 800, letterSpacing: "-0.06em", lineHeight: 0.98 }}>
                  Technical <Box component="span" sx={{ color: theme.palette.tertiary.main }}>Skills</Box>
                </Typography>
                <Typography sx={{ color: theme.palette.text.secondary, fontSize: { xs: "0.96rem", md: "1.04rem" }, lineHeight: 1.75, maxWidth: 610, mt: 2 }}>
                  A multi-domain skill set spanning cybersecurity, full-stack development, and audio engineering, with a security-first approach throughout.
                </Typography>
              </Box>
              <Box sx={{ p: 2.2, borderRadius: 2, backgroundColor: `${theme.palette.tertiary.main}0A`, border: `1px solid ${theme.palette.tertiary.main}28` }}>
                <Typography sx={{ color: theme.palette.tertiary.main, fontFamily: theme.typography.mono, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", mb: 0.8 }}>AREAS OF PRACTICE</Typography>
                <Typography sx={{ color: theme.palette.text.primary, fontSize: "0.96rem", fontWeight: 700, lineHeight: 1.5 }}>Security · Software · Audio</Typography>
                <Typography sx={{ color: theme.palette.text.secondary, fontSize: "0.82rem", mt: 0.7 }}>{skillCategories.length} skill domains</Typography>
              </Box>
            </Box>
          </Box>

          <Section title="Skills Overview">
            <Box role="tablist" aria-label="Skill categories" sx={{ display: "flex", gap: 0.8, flexWrap: "wrap", mb: 2.2 }}>
              {skillCategories.map((category) => {
                const color = theme.palette[category.color].main;
                const selected = activeTab === category.name;
                return (
                  <Box
                    component="button"
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    key={category.name}
                    onClick={() => setActiveTab(category.name)}
                    sx={{
                      display: "flex", alignItems: "center", gap: 0.9, px: 1.35, py: 0.85,
                      borderRadius: 1.4, border: `1px solid ${selected ? `${color}55` : theme.palette.divider}`,
                      backgroundColor: selected ? `${color}12` : "transparent",
                      color: selected ? theme.palette.text.primary : theme.palette.text.secondary,
                      cursor: "pointer", fontFamily: theme.typography.fontFamily, fontSize: "0.85rem", fontWeight: selected ? 650 : 500,
                      transition: "all 0.18s ease", "&:hover": { borderColor: `${color}50`, backgroundColor: `${color}0D` },
                      "&:focus-visible": { outline: `2px solid ${color}`, outlineOffset: 2 },
                    }}
                  >
                    <Box sx={{ display: "flex", color: selected ? color : "inherit" }}>{category.icon}</Box>
                    {category.name}
                  </Box>
                );
              })}
            </Box>

            <motion.div key={activeCategory.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.1fr) minmax(300px, 0.9fr)" }, borderRadius: 2.5, overflow: "hidden", border: `1px solid ${theme.palette.divider}`, background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.background.elevated})` }}>
                <Box sx={{ p: { xs: 2.2, sm: 3, md: 3.5 }, borderRight: { md: `1px solid ${theme.palette.divider}` }, borderBottom: { xs: `1px solid ${theme.palette.divider}`, md: 0 } }}>
                  <Stack direction="row" spacing={1.2} alignItems="center" sx={{ mb: 1.3 }}>
                    <Box sx={{ display: "flex", p: 1, color: categoryColor, bgcolor: `${categoryColor}12`, border: `1px solid ${categoryColor}30`, borderRadius: 1.3 }}>{activeCategory.icon}</Box>
                    <Typography component="h3" sx={{ color: theme.palette.text.primary, fontSize: "1.25rem", fontWeight: 750 }}>{activeCategory.name}</Typography>
                  </Stack>
                  <Typography sx={{ color: theme.palette.text.secondary, fontSize: "0.94rem", lineHeight: 1.75 }}>{activeCategory.desc}</Typography>
                  <Typography sx={{ color: theme.palette.text.primary, fontSize: "0.83rem", fontWeight: 700, mt: 2.5, mb: 1 }}>Skills & technologies</Typography>
                  <Stack direction="row" useFlexGap flexWrap="wrap" gap={0.7}>
                    {activeCategory.skills.map((skill) => (
                      <Box key={skill} sx={{ px: 1, py: 0.5, color: theme.palette.text.secondary, bgcolor: "rgba(255,255,255,0.035)", border: `1px solid ${theme.palette.divider}`, borderRadius: 1, fontSize: "0.77rem" }}>{skill}</Box>
                    ))}
                  </Stack>
                </Box>
                <Box sx={{ p: { xs: 2.2, sm: 3, md: 3.5 } }}>
                  <Typography sx={{ color: theme.palette.text.primary, fontSize: "0.83rem", fontWeight: 700, mb: 2 }}>Areas of experience</Typography>
                  <Stack spacing={2}>
                    {activeCategory.proficiency.map(([label, value]) => (
                      <SkillBar key={label} label={label} value={value} color={categoryColor} />
                    ))}
                  </Stack>
                </Box>
              </Box>
            </motion.div>
          </Section>

          <Section title="Technical Showcase">
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 330px), 1fr))", gap: { xs: 2, md: 2.5 }, alignItems: "stretch" }}>
              {projectData.map((project, index) => (
                <motion.div key={project.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: index * 0.07, duration: 0.4 }} style={{ height: "100%" }}>
                  <ProjectShowcase project={project} />
                </motion.div>
              ))}
            </Box>
          </Section>
        </Box>
      </Container>
    </Box>
  );
};

export default Skills;
