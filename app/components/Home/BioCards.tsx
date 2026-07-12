"use client"

import { useRef } from "react"
import { Box, Paper, Stack, Typography } from "@mui/material"
import type { Theme } from "@mui/material/styles"
import type React from "react"
import { glassSx } from "../../styles/glass"

const paperSx = (theme: Theme) => ({
  ...glassSx(theme),
  borderRadius: 3,
  p: 2.5,
  width: '100%',
})

const DraggablePaper = ({ children, sx = {} }: { children: React.ReactNode; sx?: object }) => {
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
      sx={(theme: Theme) => ({ ...paperSx(theme), cursor: 'grab', userSelect: 'none', '&:active': { cursor: 'grabbing' }, ...sx })}
    >
      {children}
    </Paper>
  )
}

const BioCards = ({ age }: { age: string }) => (
  <Stack spacing={2} sx={{ width: '100%', height: '100%' }} alignItems="stretch">
    <DraggablePaper sx={{ flex: 1 }}>
      <Box
        component="pre"
        sx={{ fontFamily: 'monospace', fontSize: '0.95rem', lineHeight: 1.8, margin: 0, whiteSpace: 'pre-wrap' }}
      >
        <Box component="span" sx={{ color: 'secondary.main' }}>const</Box>{' '}
        <Box component="span" sx={{ color: 'warning.main' }}>name</Box>
        {': '}
        <Box component="span" sx={{ color: 'primary.main' }}>string</Box>
        {' = '}
        <Box component="span" sx={{ color: 'success.main' }}>"Avilash"</Box>;
        {'\n'}
        <Box component="span" sx={{ color: 'text.secondary' }}>
          {'// working as Technical Consultant, @Ahead'}
        </Box>
        {'\n'}
        <Box component="span" sx={{ color: 'secondary.main' }}>const</Box>{' '}
        <Box component="span" sx={{ color: 'warning.main' }}>birthday</Box>
        {': '}
        <Box component="span" sx={{ color: 'primary.main' }}>Date</Box>
        {' = '}
        <Box component="span" sx={{ color: 'secondary.main' }}>new </Box>
        <Box component="span" sx={{ color: 'primary.main' }}>Date</Box>
        {'('}
        <Box component="span" sx={{ color: 'success.main' }}>'1995-08-27'</Box>
        {');'}
        {'\n'}
        <Box component="span" sx={{ color: 'text.secondary' }}>
          {`// currently ${age} years old.`}
        </Box>
      </Box>
    </DraggablePaper>

    <DraggablePaper sx={{ flex: 1 }}>
      <Typography sx={{ fontFamily: 'monospace', fontSize: '0.95rem', lineHeight: 1.6, color: 'text.secondary' }}>
        <Box component="span" sx={{ color: 'success.main', display: 'block', mb: 0.5 }}>
          {'// about me'}
        </Box>
        I&apos;m a software engineer passionate about building clean, scalable systems.
        I enjoy working across the full stack — from crafting thoughtful UIs to designing
        robust back-end services. When I&apos;m not coding, you&apos;ll find me exploring
        new technologies or thinking about elegant solutions to complex problems.
      </Typography>
    </DraggablePaper>
  </Stack>
)

export default BioCards
