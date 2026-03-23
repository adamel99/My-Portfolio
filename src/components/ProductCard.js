import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";

const ProductCard = ({ project }) => {
  const theme = useTheme();

  if (!project) return null;
  const { id, productName, description, filePath } = project;

  return (
    <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }} style={{ height: "100%" }}>
      <Box sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "10px",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.06)",
        background: "linear-gradient(135deg, rgba(255,255,255,0.02), rgba(0,187,249,0.02))",
        transition: "all 0.25s ease",
        "&:hover": {
          border: `1px solid ${theme.palette.tertiary.main}35`,
          boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 16px ${theme.palette.tertiary.main}08`,
        },
      }}>

        {/* Terminal titlebar */}
        <Box sx={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          px: 1.5, py: 0.75,
          background: "rgba(0,0,0,0.35)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
          flexShrink: 0,
        }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
            <Box sx={{ display: "flex", gap: 0.5 }}>
              {["#FF5F56", "#FFBD2E", "#27C93F"].map((c) => (
                <Box key={c} sx={{ width: 6, height: 6, borderRadius: "50%", background: c, opacity: 0.7 }} />
              ))}
            </Box>
            <Typography sx={{ fontFamily: "monospace", fontSize: "0.7rem", color: "rgba(255,255,255,0.18)", ml: 0.5, letterSpacing: "0.2em" }}>
              proj_{String(id).padStart(3, "0")}.exe
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Box
              component={motion.div}
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              sx={{ width: 4, height: 4, borderRadius: "50%", background: "#27C93F", boxShadow: "0 0 4px #27C93F" }}
            />
            <Typography sx={{ fontFamily: "monospace", fontSize: "0.7rem", color: "rgba(255,255,255,0.18)", letterSpacing: "0.06em" }}>
              ACTIVE
            </Typography>
          </Box>
        </Box>

        {/* Image */}
        {filePath && (
          <Box sx={{
            position: "relative",
            paddingTop: "58%",
            background: "rgba(0,0,0,0.5)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <Box
              component="img"
              src={filePath}
              alt={productName}
              sx={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                objectFit: "contain",
                p: 1.5,
                filter: "brightness(0.9)",
                transition: "transform 0.4s ease",
                "&:hover": { transform: "scale(1.03)" },
              }}
            />
            <Box
              component={motion.div}
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              sx={{
                position: "absolute", left: 0, right: 0, height: "1px",
                background: `linear-gradient(90deg, transparent, ${theme.palette.tertiary.main}80, transparent)`,
                opacity: 0.25, pointerEvents: "none",
              }}
            />
          </Box>
        )}

        {/* Content */}
        <Box sx={{
          p: 2,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}>
          <Box>
            <Typography sx={{
              fontFamily: "monospace", fontSize: "0.75rem",
              color: theme.palette.tertiary.main,
              letterSpacing: "0.12em", mb: 0.4, opacity: 0.6,
            }}>
              0x{id?.toString(16).padStart(4, "0").toUpperCase()}
            </Typography>
            <Typography sx={{
              fontWeight: 700,
              fontSize: "1.2rem",
              color: "#fff",
              lineHeight: 1.3,
            }}>
              {productName}
            </Typography>
          </Box>

          <Typography sx={{
            fontSize: "1rem",
            color: "rgba(255,255,255,0.4)",
            lineHeight: 1.65,
            flex: 1,
          }}>
            {description}
          </Typography>

          {/* Status tags */}
          <Box sx={{
            display: "flex",
            gap: 0.75,
            flexWrap: "wrap",
            pt: 1,
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}>
            {[
              { label: "VULN: LOW", color: theme.palette.tertiary.main },
              { label: "STABLE", color: "#27C93F" },
            ].map((tag) => (
              <Box key={tag.label} sx={{
                px: 1, py: 0.25,
                fontFamily: "monospace", fontSize: "0.5rem",
                color: tag.color,
                background: `${tag.color}0D`,
                border: `1px solid ${tag.color}20`,
                borderRadius: "3px",
                letterSpacing: "0.05em",
              }}>
                {tag.label}
              </Box>
            ))}
            <Box
              component={motion.div}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              sx={{
                px: 1, py: 0.25,
                fontFamily: "monospace", fontSize: "0.5rem",
                color: theme.palette.primary.main,
                background: `${theme.palette.primary.main}0D`,
                border: `1px solid ${theme.palette.primary.main}20`,
                borderRadius: "3px",
                letterSpacing: "0.05em",
              }}
            >
              MONITORING
            </Box>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

export default ProductCard;
