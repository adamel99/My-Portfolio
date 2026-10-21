import React from "react";
import { Box, Container, Link, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const projects = [
  {
    name: "SOC Log Analyzer",
    subtitle: "Python · MITRE ATT&CK · HTML",
    link: "https://github.com/adamel99/Event-Logger",
    bullets: [
      "Created a cross-platform log analyzer for Linux authentication logs and Windows Event Log CSV exports, detecting threats across 24 scenarios and mapping findings to MITRE ATT&CK.",
      "Built sliding-window brute-force correlation, multi-source SSH detection, and Windows lateral-movement detections for techniques including Pass-the-Hash, PsExec, and WMI/DCOM execution.",
      "Generated an interactive triage dashboard with severity filters and exportable HTML, CSV, and JSON results.",
    ],
  },
  {
    name: "TDX Arena Incident Response Challenge",
    subtitle: "Incident Response · Digital Forensics · Network Analysis",
    bullets: [
      "Performed memory forensics, malware triage, static analysis, and PCAP review across incident-response simulations.",
      "Documented indicators of compromise and remediation steps; used Wireshark, tcpdump, Snort, Snorby, and ClamAV.",
    ],
  },
  {
    name: "Soft Clipper VST Plugin",
    subtitle: "C++ · JUCE · Real-Time DSP · 4x Oversampling",
    link: "https://github.com/adamel99/Soft-Clipper",
    bullets: [
      "Built a real-time saturation plugin with five nonlinear waveshaping modes and matched makeup-gain compensation.",
      "Implemented 4x polyphase oversampling to reduce aliasing and host latency reporting to keep the DAW in sync.",
      "Added per-sample parameter smoothing and lock-free metering between the audio and UI threads.",
    ],
  },
  {
    name: "Stereo Imager VST Plugin",
    subtitle: "C++ · JUCE · Mid/Side Processing",
    link: "https://github.com/adamel99/Stereo-Imager-",
    bullets: [
      "Developed a stereo-width plugin with mid/side encoding, crossfeed, and harmonic-exciter stages.",
      "Built a real-time phase-correlation meter and vectorscope visualizer designed for low CPU use.",
    ],
  },
  {
    name: "Portfolio Website",
    subtitle: "React · JavaScript · Component-Based UI",
    link: "https://lively-meerkat-2d2686.netlify.app/",
    bullets: [
      "Built a multi-page React portfolio with reusable components, client-side navigation, and a consistent design system.",
      "Applied input-sanitization and error-handling practices throughout the application.",
    ],
  },
];

const Section = ({ title, children }) => {
  const theme = useTheme();
  return (
    <Box component="section" sx={{ mb: { xs: 3.5, md: 4.5 } }}>
      <Stack direction="row" alignItems="center" spacing={1.35} sx={{ mb: 1.8 }}>
        <Typography component="h2" sx={{ color: theme.palette.text.primary, fontSize: "1.18rem", fontWeight: 750, letterSpacing: "-0.02em" }}>
          {title}
        </Typography>
        <Box sx={{ height: "1px", flex: 1, background: `linear-gradient(90deg, ${theme.palette.divider}, transparent)` }} />
      </Stack>
      {children}
    </Box>
  );
};

const Bullets = ({ items }) => {
  const theme = useTheme();
  return (
    <Box component="ul" sx={{ pl: 2.2, my: 1, color: theme.palette.text.secondary }}>
      {items.map((item) => (
        <Typography
          component="li"
          key={item}
          sx={{
            color: theme.palette.text.secondary,
            fontSize: { xs: "0.92rem", md: "0.95rem" },
            lineHeight: 1.72,
            mb: 0.7,
            pl: 0.25,
            "&::marker": { color: theme.palette.tertiary.main },
          }}
        >
          {item}
        </Typography>
      ))}
    </Box>
  );
};

const EntryHeading = ({ title, subtitle, href, status }) => {
  const theme = useTheme();
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
      alignItems={{ xs: "flex-start", sm: "baseline" }}
      spacing={0.35}
      sx={{ mb: 0.35 }}
    >
      <Box>
        {href ? (
            <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            sx={{ color: theme.palette.text.primary, fontSize: "1rem", fontWeight: 750 }}
          >
            {title}
          </Link>
        ) : (
          <Typography sx={{ color: theme.palette.text.primary, fontSize: "1rem", fontWeight: 750 }}>
            {title}
          </Typography>
        )}
        {subtitle && (
          <Typography sx={{ color: theme.palette.text.secondary, fontSize: "0.83rem", lineHeight: 1.55, mt: 0.25 }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      {status && (
        <Typography
          sx={{
            color: theme.palette.success.main,
            flexShrink: 0,
            fontFamily: theme.typography.mono,
            fontSize: "0.67rem",
            fontWeight: 800,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {status}
        </Typography>
      )}
    </Stack>
  );
};

const Resume = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        py: { xs: 2.5, md: 6 },
        "@media print": { backgroundColor: "#fff", color: "#000", py: 0 },
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 1.5, sm: 3 } }}>
        <Box component="main" sx={{ maxWidth: 1120, mx: "auto", "@media print": { maxWidth: "none" } }}>
          <Box
            component="header"
            sx={{
              position: "relative",
              overflow: "hidden",
              p: { xs: 2.5, sm: 4, md: 5 },
              mb: { xs: 3.5, md: 5 },
              borderRadius: 3,
              border: `1px solid ${theme.palette.divider}`,
              background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.elevated} 100%)`,
              "&::after": {
                content: '""',
                position: "absolute",
                width: 260,
                height: 260,
                right: -95,
                top: -130,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${theme.palette.tertiary.main}20 0%, transparent 72%)`,
                pointerEvents: "none",
              },
            }}
          >
            <Box sx={{ position: "relative", zIndex: 1 }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2.3 }}>
                <Box sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: theme.palette.success.main, boxShadow: `0 0 12px ${theme.palette.success.main}88` }} />
                <Typography sx={{ color: theme.palette.text.secondary, fontFamily: theme.typography.mono, fontSize: "0.69rem", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                  Career Profile · Security + Engineering
                </Typography>
              </Stack>
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) 250px" }, gap: { xs: 3, md: 5 }, alignItems: "end" }}>
                <Box>
                  <Typography component="h1" sx={{ fontSize: { xs: "2.75rem", sm: "3.8rem", md: "4.5rem" }, fontWeight: 800, letterSpacing: "-0.06em", lineHeight: 0.98 }}>
                    Adam <Box component="span" sx={{ color: theme.palette.tertiary.main }}>Elhamami</Box>
                  </Typography>
                  <Typography sx={{ color: theme.palette.text.primary, fontSize: { xs: "1rem", md: "1.12rem" }, fontWeight: 600, mt: 1.6 }}>
                    SOC & Security Analyst <Box component="span" sx={{ color: theme.palette.text.disabled }}> / </Box> Full-Stack Developer
                  </Typography>
                  <Stack direction="row" useFlexGap flexWrap="wrap" columnGap={2.2} rowGap={1} sx={{ mt: 2.5 }}>
                    <Link href="mailto:adamelh1999@gmail.com" sx={{ color: theme.palette.text.secondary, fontSize: "0.88rem", "&:hover": { color: theme.palette.tertiary.main } }}>adamelh1999@gmail.com</Link>
                    <Typography sx={{ color: theme.palette.text.secondary, fontSize: "0.88rem" }}>(201) 234-2766</Typography>
                    <Link href="https://github.com/adamel99" target="_blank" rel="noopener noreferrer" sx={{ color: theme.palette.text.secondary, fontSize: "0.88rem", "&:hover": { color: theme.palette.tertiary.main } }}>github.com/adamel99</Link>
                  </Stack>
                </Box>
                <Box sx={{ p: 2.2, borderRadius: 2, backgroundColor: `${theme.palette.tertiary.main}0A`, border: `1px solid ${theme.palette.tertiary.main}28` }}>
                  <Typography sx={{ color: theme.palette.tertiary.main, fontFamily: theme.typography.mono, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", mb: 0.8 }}>CURRENT FOCUS</Typography>
                  <Typography sx={{ color: theme.palette.text.primary, fontSize: "0.96rem", fontWeight: 700, lineHeight: 1.4 }}>Building and securing real-world applications</Typography>
                  <Typography sx={{ color: theme.palette.text.secondary, fontSize: "0.82rem", mt: 0.8 }}>CompTIA Security+ certified</Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.8fr) minmax(280px, 0.9fr)" }, gap: { xs: 3, md: 5 } }}>
            <Box>
              <Section title="Professional Summary">
                <Typography sx={{ color: theme.palette.text.secondary, fontSize: { xs: "0.94rem", md: "0.98rem" }, lineHeight: 1.78, maxWidth: 720 }}>
                  Entry-level SOC and security analyst with CompTIA Security+, hands-on detection-engineering projects,
                  Windows and Linux log analysis, incident-response labs, and secure application-development experience.
                  Comfortable triaging events, mapping activity to MITRE ATT&CK, documenting indicators of compromise,
                  and communicating findings clearly for analyst handoff.
                </Typography>
              </Section>

              <Section title="Work Experience">
                <Box sx={{ p: { xs: 2, sm: 2.6 }, borderRadius: 2, border: `1px solid ${theme.palette.tertiary.main}30`, borderLeft: `3px solid ${theme.palette.tertiary.main}`, background: `linear-gradient(110deg, ${theme.palette.tertiary.main}0B, ${theme.palette.background.paper} 55%)`, mb: 2 }}>
                  <EntryHeading
                    title="Sole Developer & Security Engineer"
                    subtitle="Dooma Studio · Full-Stack E-Commerce Website"
                    href="https://dooma.studio"
                    status="Ongoing"
                  />
                  <Bullets
                    items={[
                      "Serve as the sole developer and security engineer for a full-stack marketplace for beats and music kits, building and maintaining its React frontend, Express APIs, and Sequelize data layer across PostgreSQL and SQLite.",
                      "Secure authentication and access with JWTs in HTTP-only cookies, CSRF protection, role-based access control, CORS allowlisting, and Helmet security headers.",
                      "Harden payment and file delivery with Stripe webhook verification and duplicate-event prevention, private AWS S3 storage, file validation, and signed download URLs.",
                      "Run continuous security checks, maintain rate limiting and security-event logging, and regularly update the site and its security controls.",
                    ]}
                  />
                </Box>
                <Box sx={{ pl: 2.6, borderLeft: `1px solid ${theme.palette.divider}` }}>
                  <EntryHeading title="Delivery Driver" subtitle="Uber Eats · Jersey City, NJ" />
                  <Bullets
                    items={[
                      "Managed an independent workload while maintaining strong customer service in a fast-paced, customer-facing role.",
                      "Resolved delivery issues and route conflicts in real time, communicating clearly with customers and support teams.",
                    ]}
                  />
                </Box>
              </Section>

              <Section title="Selected Projects & Labs">
                <Stack spacing={0}>
                  {projects.map((project) => (
                    <Box
                      component="article"
                      key={project.name}
                      sx={{
                        display: "grid",
                      gridTemplateColumns: "1fr",
                        gap: { xs: 1.2, sm: 2 },
                        py: 2.1,
                        borderBottom: `1px solid ${theme.palette.divider}`,
                      }}
                    >
                      <Box>
                        <EntryHeading title={project.name} subtitle={project.subtitle} href={project.link} />
                        <Bullets items={project.bullets} />
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </Section>
            </Box>

            <Box>
              <Section title="Certifications">
                <Stack spacing={1}>
                  {[
                    ["CompTIA Security+", "Security certification"],
                    ["TDX Arena IR Expert", "Incident response"],
                    ["NJIT Cybersecurity Program", "Certificate program"],
                  ].map(([name, detail]) => (
                    <Box key={name} sx={{ p: 1.55, borderRadius: 1.5, backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
                      <Typography sx={{ color: theme.palette.text.primary, fontSize: "0.9rem", fontWeight: 700 }}>{name}</Typography>
                      <Typography sx={{ color: theme.palette.text.secondary, fontSize: "0.78rem", mt: 0.3 }}>{detail}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Section>

              <Section title="Education">
                <Box sx={{ p: 2, borderRadius: 1.5, backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
                  <Typography sx={{ color: theme.palette.text.primary, fontSize: "0.93rem", fontWeight: 700 }}>New Jersey Institute of Technology</Typography>
                  <Typography sx={{ color: theme.palette.text.secondary, fontSize: "0.82rem", mt: 0.4 }}>CompTIA Security+ Cybersecurity Certificate Program · Newark, NJ</Typography>
                  <Typography sx={{ color: theme.palette.text.secondary, fontSize: "0.84rem", lineHeight: 1.65, mt: 1.2 }}>
                    Training in incident response, digital forensics, malware analysis, threat hunting, SIEM investigation, log and packet analysis, security documentation, and remediation planning.
                  </Typography>
                </Box>
              </Section>

              <Section title="Technical Toolkit">
                <Stack spacing={1.5}>
                  {[
                    ["Security Operations", "SIEM event correlation, alert triage, incident response, threat hunting, IOC analysis, MITRE ATT&CK mapping"],
                    ["Tools", "Splunk, Wireshark, tcpdump, Nmap, Snort, Snorby, ClamAV, Active Directory/GPO"],
                    ["Web / Cloud", "React, Express.js, Sequelize, PostgreSQL, SQLite, Stripe, AWS S3, REST APIs"],
                    ["Languages", "C++17, Python, JavaScript, SQL, Bash"],
                    ["Audio / Systems", "JUCE, DSP, VST3/AU, multithreading, synchronization, memory management, Windows/Linux/macOS"],
                  ].map(([label, value]) => (
                    <Box key={label}>
                      <Typography sx={{ color: theme.palette.tertiary.main, fontFamily: theme.typography.mono, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", mb: 0.35 }}>{label}</Typography>
                      <Typography sx={{ color: theme.palette.text.secondary, fontSize: "0.87rem", lineHeight: 1.65 }}>{value}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Section>
            </Box>
          </Box>
        </Box>
      </Container>
      <Box
        component="style"
        dangerouslySetInnerHTML={{
          __html: "@media print { @page { margin: 0.55in; } body { background: #fff !important; } header.MuiAppBar-root { display: none !important; } a { color: inherit !important; text-decoration: none !important; } }",
        }}
      />
    </Box>
  );
};

export default Resume;
