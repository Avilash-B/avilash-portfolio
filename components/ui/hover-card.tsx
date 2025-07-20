"use client"

import * as React from "react"
import { Popover, Paper, PaperProps } from '@mui/material'

interface HoverCardProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const HoverCard: React.FC<HoverCardProps> = ({ children, open, onOpenChange }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)
  const [isOpen, setIsOpen] = React.useState(false)

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
    setIsOpen(true)
    onOpenChange?.(true)
  }

  const handleMouseLeave = () => {
    setAnchorEl(null)
    setIsOpen(false)
    onOpenChange?.(false)
  }

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      <Popover
        open={open ?? isOpen}
        anchorEl={anchorEl}
        onClose={handleMouseLeave}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        disableRestoreFocus
        sx={{
          pointerEvents: 'none',
          '& .MuiPopover-paper': {
            pointerEvents: 'auto',
          },
        }}
      />
    </div>
  )
}

interface HoverCardTriggerProps {
  children: React.ReactNode
  asChild?: boolean
}

const HoverCardTrigger: React.FC<HoverCardTriggerProps> = ({ children }) => {
  return <>{children}</>
}

interface HoverCardContentProps extends PaperProps {
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
}

const HoverCardContent = React.forwardRef<HTMLDivElement, HoverCardContentProps>(
  ({ align = "center", sideOffset = 4, children, ...props }, ref) => (
    <Paper
      ref={ref}
      elevation={3}
      sx={{
        width: 256,
        padding: 2,
        zIndex: 50,
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </Paper>
  )
)
HoverCardContent.displayName = "HoverCardContent"

export { HoverCard, HoverCardTrigger, HoverCardContent }
