"use client"

import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Stack,
  IconButton,
  Tooltip,
  Fade
} from "@mui/material"
import {
  LinkedIn,
  GitHub,
  Instagram,
  FileDownload,
  Height
} from "@mui/icons-material"
import { useScrollAnimation } from "../hooks/useScrollAnimation"
import type React from "react"

const paperSx = {
  backgroundColor: (theme: any) =>
    theme.palette.mode === 'dark' ? 'hsl(50 50% 1% / 50%)' : 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(8px)',
  borderRadius: 3,
  p: 2.5,
  width: '100%',
} as const

// Draggable wrapper — free-drag on desktop, static on mobile
const DraggablePaper = ({
  children,
  sx = {},
}: {
  children: React.ReactNode
  sx?: object
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
        ...sx,
      }}
    >
      {children}
    </Paper>
  )
}

const Home: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation()
  const carrerKickOff = new Date("2019-07-01")
  const birthday = new Date("1995-08-27")
  const [age, setAge] = useState("")
  const [experience, setExperience] = useState("")

  useEffect(() => {
    const calculateAge = () => {
      const now = new Date()
      const diff = now.getTime() - birthday.getTime()
      return (diff / (1000 * 60 * 60 * 24 * 365.25)).toFixed(8)
    }
    const calculateExperience = () => {
      const now = new Date()
      const diff = now.getTime() - carrerKickOff.getTime()
      return (diff / (1000 * 60 * 60 * 24 * 365.25)).toFixed()
    }
    const timer = setInterval(() => {
      setAge(calculateAge())
      setExperience(calculateExperience())
    }, 100)
    return () => clearInterval(timer)
  }, [])

  return (
    <Box
      id="home"
      component="section"
      sx={{
        minHeight: '100vh',
        pt: 10,
        pb: 6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10 }}>
        <Fade in={isVisible} timeout={1000}>
          <Box ref={ref}>
            {/* 3-column grid */}
            <Grid container spacing={2} alignItems="stretch">

              {/* ── COL 1: Profile card ── */}
              <Grid size={{ xs: 12, md: 3.3 }}>
                <Stack spacing={2} sx={{ height: '100%', justifyContent: 'center' }}>
                  {/* Profile image */}
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box
                      sx={{
                        borderRadius: '50%',
                        border: (theme) =>
                          `4px solid ${theme.palette.mode === 'dark' ? theme.palette.grey[800] : 'white'}`,
                        overflow: 'hidden',
                        flexShrink: 0,
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': { transform: 'scale(1.2)' },
                      }}
                    >
                      <Image
                        src="/images/avilash-home.jpg"
                        alt="Avilash"
                        width={200}
                        height={200}
                        style={{ display: 'block', borderRadius: '10%' }}
                      />
                    </Box>
                  </Box>

                  {/* Social links */}
                  <Stack direction="row" spacing={1.2} alignItems="center" justifyContent="center">
                    <SocialLink href="https://www.linkedin.com/in/avilashbharti" icon={<LinkedIn />} label="LinkedIn" />
                    <SocialLink href="https://github.com/avilash-b" icon={<GitHub />} label="GitHub" />
                    <SocialLink href="https://www.instagram.com/avilash_bharti" icon={<Instagram />} label="Instagram" />
                    <SocialLink href="/docs/resume.pdf" icon={<FileDownload />} label="Download Resume" download />
                  </Stack>
                </Stack>
              </Grid>

              {/* ── COL 2: Stats cards ── */}
              <Grid size={{ xs: 12, md: 2 }}>
                <Stack spacing={2}>
                  {/* Years of experience */}
                  <DraggablePaper>
                    <Typography variant="body1" sx={{
                      color: 'secondary.main', fontFamily: 'monospace', fontSize: '0.95rem'
                    }}>
                      Experience
                    </Typography>
                    <Typography variant="h3" sx={{ fontFamily: 'monospace', fontWeight: 700, color: 'warning.main' }}>
                      {experience}+
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontFamily: 'monospace', fontSize: '0.95rem' }}>
                      years
                    </Typography>
                  </DraggablePaper>

                  {/* No. of projects */}
                  <DraggablePaper>
                    <Typography variant="body1" sx={{ color: 'secondary.main', fontFamily: 'monospace', fontSize: '0.95rem' }}>
                      Projects
                    </Typography>
                    <Typography variant="h3" sx={{ fontFamily: 'monospace', fontWeight: 700, color: 'warning.main' }}>
                      20+
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontFamily: 'monospace', fontSize: '0.95rem' }}>
                      delivered
                    </Typography>
                  </DraggablePaper>

                  {/* No. of clients */}
                  <DraggablePaper>
                    <Typography variant="body1" sx={{ color: 'secondary.main', fontFamily: 'monospace', fontSize: '0.95rem' }}>
                      Clients
                    </Typography>
                    <Typography variant="h3" sx={{ fontFamily: 'monospace', fontWeight: 700, color: 'warning.main' }}>
                      10+
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontFamily: 'monospace', fontSize: '0.95rem' }}>
                      worked with
                    </Typography>
                  </DraggablePaper>
                </Stack>
              </Grid>

              {/* ── COL 3: Bio cards ── */}
              <Grid size={{ xs: 12, md: 6.7 }}>
                <Stack spacing={2} sx={{ width: '100%', height: '100%' }} alignItems="stretch">
                  {/* Bio 1 — code style */}
                  <DraggablePaper sx={{ flex: 1 }}>
                    <Box
                      component="pre"
                      sx={{
                        fontFamily: 'monospace',
                        fontSize: '0.95rem',
                        lineHeight: 1.8,
                        margin: 0,
                        whiteSpace: 'pre-wrap',
                      }}
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

                  {/* Bio 2 — description */}
                  <DraggablePaper sx={{ flex: 1 }}>
                    <Typography
                      sx={{ fontFamily: 'monospace', fontSize: '0.95rem', lineHeight: 1.6, color: 'text.secondary' }}
                    >
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
              </Grid>

            </Grid>
          </Box>
        </Fade>
      </Container>
    </Box>
  )
}

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
        color: 'text.primary',
        transition: 'all 0.3s ease-in-out',
        '&:hover': { color: 'text.secondary', transform: 'scale(1.5)' },
      }}
      aria-label={label}
    >
      {icon}
    </IconButton>
  </Tooltip>
)

export default Home
