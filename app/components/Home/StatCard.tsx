"use client"

import { useRef } from "react"
import { Paper, Typography } from "@mui/material"
import type React from "react"

const paperSx = {
  backgroundColor: (theme: any) =>
    theme.palette.mode === 'dark' ? 'hsl(50 50% 1% / 50%)' : 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(8px)',
  borderRadius: 3,
  p: 2.5,
  width: '100%',
} as const

const StatCard = ({
  label,
  value,
  unit,
}: {
  label: string
  value: string
  unit: string
}) => {
  const paperRef = useRef<HTMLDivElement>(null)
  const offset = useRef({ x: 0, y: 0 })
  const pos = useRef({ x: 0, y: 0 })
  const dragging = useRef(false)

  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true
    offset.current = { x: e.clientX - pos.current.x, y: e.clientY - pos.current.y }
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  const onMouseMove = (e: MouseEvent) => {
    if (!dragging.current || !paperRef.current) return
    pos.current = { x: e.clientX - offset.current.x, y: e.clientY - offset.current.y }
    paperRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`
  }

  const onMouseUp = () => {
    dragging.current = false
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }

  return (
    <Paper
      ref={paperRef}
      elevation={3}
      onMouseDown={onMouseDown}
      sx={{
        ...paperSx,
        cursor: 'grab',
        userSelect: 'none',
        '&:active': { cursor: 'grabbing' },
      }}
    >
      <Typography variant="body1" sx={{ color: 'secondary.main', fontFamily: 'monospace', fontSize: '0.95rem' }}>
        {label}
      </Typography>
      <Typography variant="h3" sx={{ fontFamily: 'monospace', fontWeight: 700, color: 'warning.main' }}>
        {value}+
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', fontFamily: 'monospace', fontSize: '0.95rem' }}>
        {unit}
      </Typography>
    </Paper>
  )
}

export default StatCard
