"use client"

import { Button } from "@mui/material"
import { LocalCafe } from "@mui/icons-material"
import type { Theme } from "@mui/material/styles"

// Ko-fi page handle - update to your own Ko-fi username.
const KOFI_USERNAME = "avilashbharti"

const KoFiButton = () => (
  <Button
    component="a"
    href={`https://ko-fi.com/${KOFI_USERNAME}`}
    target="_blank"
    rel="noopener noreferrer"
    startIcon={<LocalCafe />}
    aria-label="Support me on Ko-fi"
    sx={(theme: Theme) => ({
      textTransform: 'none',
      fontWeight: 600,
      borderRadius: 999,
      px: 2.5,
      py: 0.75,
      color: '#fff',
      background: 'linear-gradient(135deg, #ff5e5b, #ff8a5b)',
      boxShadow:
        theme.palette.mode === 'dark'
          ? '0 6px 20px rgba(255, 94, 91, 0.35)'
          : '0 6px 20px rgba(255, 138, 91, 0.35)',
      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      '&:hover': {
        transform: 'scale(1.05)',
        background: 'linear-gradient(135deg, #ff5e5b, #ff8a5b)',
        boxShadow:
          theme.palette.mode === 'dark'
            ? '0 8px 26px rgba(255, 94, 91, 0.5)'
            : '0 8px 26px rgba(255, 138, 91, 0.5)',
      },
    })}
  >
    Buy me a coffee
  </Button>
)

export default KoFiButton
