"use client"

import { IconButton, Tooltip } from "@mui/material"
import type React from "react"

const SocialLink = ({
  href,
  icon,
  label,
  download = false,
}: {
  href: string
  icon: React.ReactNode
  label: string
  download?: boolean
}) => (
  <Tooltip title={label} arrow>
    <IconButton
      component="a"
      href={href}
      target={download ? '_self' : '_blank'}
      rel={download ? '' : 'noopener noreferrer'}
      download={download}
      sx={{
        color: 'inherit',
        transition: 'all 0.3s ease-in-out',
        '&:hover': { color: 'inherit', opacity: 0.7, transform: 'scale(1.5)' },
      }}
      aria-label={label}
    >
      {icon}
    </IconButton>
  </Tooltip>
)

export default SocialLink
