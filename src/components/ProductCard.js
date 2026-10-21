import React, { useState } from "react";
import {
  Box, Dialog, DialogContent, DialogTitle, IconButton, Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Close, ZoomIn } from "@mui/icons-material";

const ProductCard = ({ project }) => {
  const theme = useTheme();
  const [imageOpen, setImageOpen] = useState(false);

  if (!project) return null;
  const { id, productName, description, filePath } = project;

  return (
    <Box
      component="article"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        borderRadius: 2.5,
        border: `1px solid ${theme.palette.divider}`,
        background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.background.elevated})`,
        transition: "border-color 0.22s ease, transform 0.22s ease, box-shadow 0.22s ease",
        "&:hover": {
          borderColor: `${theme.palette.tertiary.main}50`,
          transform: "translateY(-3px)",
          boxShadow: `0 18px 44px rgba(0,0,0,0.28), 0 0 28px ${theme.palette.tertiary.main}0C`,
        },
      }}
    >
      {filePath && (
        <Box sx={{ position: "relative", p: { xs: 1.5, sm: 2 }, pb: 0 }}>
          <Box
            component="button"
            type="button"
            onClick={() => setImageOpen(true)}
            aria-label={`Enlarge image for ${productName}`}
            sx={{
              position: "relative",
              display: "block",
              width: "100%",
              aspectRatio: "16 / 10",
              overflow: "hidden",
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 1.5,
              p: 0,
              backgroundColor: theme.palette.background.terminal,
              cursor: "zoom-in",
              textAlign: "left",
              "&:hover .image-zoom-overlay": { opacity: 1 },
              "&:focus-visible": { outline: `2px solid ${theme.palette.tertiary.main}`, outlineOffset: 3 },
            }}
          >
            <Box
              component="img"
              src={filePath}
              alt={productName}
              sx={{
                display: "block",
                width: "100%",
                height: "100%",
                objectFit: "contain",
                p: 1.3,
                transition: "transform 0.35s ease",
                "button:hover &": { transform: "scale(1.035)" },
              }}
            />
            <Box
              className="image-zoom-overlay"
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                p: 1.1,
                background: "linear-gradient(transparent 55%, rgba(0,0,0,0.55))",
                opacity: { xs: 1, sm: 0 },
                transition: "opacity 0.2s ease",
                pointerEvents: "none",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.55, px: 1, py: 0.55, borderRadius: 1, color: "#fff", bgcolor: "rgba(8,8,11,0.72)", fontSize: "0.72rem" }}>
                <ZoomIn sx={{ fontSize: 16 }} /> Click to enlarge
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      <Box sx={{ p: { xs: 2, sm: 2.5 }, display: "flex", flexDirection: "column", flex: 1 }}>
        <Typography sx={{ color: theme.palette.tertiary.main, fontFamily: theme.typography.mono, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", mb: 0.75 }}>
          Security Project
        </Typography>
        <Typography component="h3" sx={{ color: theme.palette.text.primary, fontSize: "1.15rem", fontWeight: 750, letterSpacing: "-0.02em", lineHeight: 1.35 }}>
          {productName}
        </Typography>
        <Typography sx={{ color: theme.palette.text.secondary, fontSize: "0.91rem", lineHeight: 1.72, mt: 1.1, flex: 1 }}>
          {description}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mt: 2, pt: 1.25, borderTop: `1px solid ${theme.palette.divider}` }}>
          <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: theme.palette.success.main }} />
          <Typography sx={{ color: theme.palette.text.disabled, fontFamily: theme.typography.mono, fontSize: "0.67rem", letterSpacing: "0.07em" }}>
            FEATURED WORK
          </Typography>
        </Box>
      </Box>

      {filePath && (
        <Dialog
          open={imageOpen}
          onClose={() => setImageOpen(false)}
          maxWidth="lg"
          fullWidth
          aria-labelledby={`project-image-title-${id}`}
          PaperProps={{ sx: { bgcolor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, borderRadius: 2 } }}
        >
          <DialogTitle id={`project-image-title-${id}`} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: theme.palette.text.primary, pr: 1.5 }}>
            <Typography component="span" sx={{ fontSize: "1rem", fontWeight: 700 }}>{productName}</Typography>
            <IconButton onClick={() => setImageOpen(false)} aria-label="Close enlarged image" sx={{ color: theme.palette.text.secondary }}>
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: { xs: 1.5, sm: 3 }, borderColor: theme.palette.divider }}>
            <Box component="img" src={filePath} alt={productName} sx={{ display: "block", maxWidth: "100%", maxHeight: "75vh", objectFit: "contain" }} />
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
};

export default ProductCard;
