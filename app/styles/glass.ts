import type { Theme } from "@mui/material/styles"

/**
 * Shared liquid-glass surface treatment for card/paper elements.
 * Tuned separately for dark/light so the frosted effect reads correctly
 * against the animated shader background in both themes.
 */
export const glassSx = (theme: Theme) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(24, 24, 32, 0.45)"
      : "rgba(255, 255, 255, 0.45)",
  backdropFilter: "blur(20px) saturate(180%)",
  WebkitBackdropFilter: "blur(20px) saturate(180%)",
  border: "1px solid",
  borderColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, 0.12)"
      : "rgba(255, 255, 255, 0.6)",
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 8px 32px rgba(0, 0, 0, 0.37)"
      : "0 8px 32px rgba(31, 38, 135, 0.15)",
})

export const glassHoverSx = (theme: Theme) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(24, 24, 32, 0.6)"
      : "rgba(255, 255, 255, 0.65)",
})
