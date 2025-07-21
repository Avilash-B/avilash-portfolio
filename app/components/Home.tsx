"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import {
  Box,
  Container,
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
  FileDownload
} from "@mui/icons-material"
import VantaBackground from "./VantaBackground"
import { useScrollAnimation } from "../hooks/useScrollAnimation"
import type React from "react"

type HomeProps = {}

const Home: React.FC<HomeProps> = () => {
  const { ref, isVisible } = useScrollAnimation()
  const birthday = new Date("1995-08-27")
  const [age, setAge] = useState("")

  useEffect(() => {
    const calculateAge = () => {
      const now = new Date()
      const diff = now.getTime() - birthday.getTime()
      const ageInYears = diff / (1000 * 60 * 60 * 24 * 365.25)
      return ageInYears.toFixed(8)
    }

    const timer = setInterval(() => {
      setAge(calculateAge())
    }, 100) // Update every 100ms for better performance

    return () => clearInterval(timer)
  }, [birthday])

  return (
    <Box
      id="home"
      component="section"
      sx={{
        minHeight: '100vh',
        pt: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <VantaBackground>
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: (theme) => theme.palette.mode === 'dark'
              ? 'linear-gradient(to bottom right, rgba(30, 58, 138, 0.2), rgba(88, 28, 135, 0.2))'
              : 'linear-gradient(to bottom right, rgba(96, 165, 250, 0.2), rgba(168, 85, 247, 0.2))'
          }}
        />
      </VantaBackground>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10 }}>
        <Fade in={isVisible} timeout={1000}>
          <Box ref={ref} sx={{ textAlign: 'center' }}>
            <Box
              sx={{
                mb: 4,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Box
                sx={{
                  borderRadius: '50%',
                  border: (theme) => `4px solid ${theme.palette.mode === 'dark' ? theme.palette.grey[800] : 'white'}`,
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <Image
                  src="/images/avilash-home.jpg?height=200&width=200"
                  alt="Avilash"
                  width={210}
                  height={220}
                  style={{
                    display: 'block',
                    borderRadius: '50%',
                  }}
                />
              </Box>
            </Box>

            <Paper
              elevation={3}
              sx={{
                maxWidth: 512,
                mx: 'auto',
                mb: 4,
                backgroundColor: (theme) => theme.palette.mode === 'dark'?'hsl(50 50% 1% / 50%)':'background.paper',
                backdropFilter: 'blur(8px)',
                borderRadius: 4,
                p: 3,
              }}
            >
              <Box
                component="pre"
                sx={{
                  fontFamily: 'monospace',
                  textAlign: 'left',
                  fontSize: '1rem',
                  lineHeight: 1.5,
                  margin: 0,
                  whiteSpace: 'pre-wrap'
                }}
              >
                <Box component="span" sx={{ color: 'purple.main' }}>const</Box>{" "}
                <Box component="span" sx={{ color: 'warning.main' }}>name</Box>:{" "}
                <Box component="span" sx={{ color: 'primary.main' }}>string</Box> ={" "}
                <Box component="span" sx={{ color: 'success.main' }}>"Avilash"</Box>;
                {"\n"}
                <Box component="span" sx={{ color: 'text.secondary' }}>// working as Technical Consultant, @Ahead</Box>
                {"\n"}
                <Box component="span" sx={{ color: 'purple.main' }}>const</Box>{" "}
                <Box component="span" sx={{ color: 'warning.main' }}>birthday</Box>:{" "}
                <Box component="span" sx={{ color: 'primary.main' }}>Date</Box> ={" "}
                <Box component="span" sx={{ color: 'purple.main' }}>new</Box>{" "}
                <Box component="span" sx={{ color: 'primary.main' }}>Date</Box>(
                <Box component="span" sx={{ color: 'success.main' }}>'1995-08-27'</Box>);
                {"\n"}
                <Box component="span" sx={{ color: 'text.secondary' }}>// currently {age} years old.</Box>
              </Box>
            </Paper>

            <Stack direction="row" spacing={3} justifyContent="center" sx={{ mb: 4, fontFamily: 'monospace' }}>
              <SocialLink
                href="https://www.linkedin.com/in/avilashbharti"
                icon={<LinkedIn />}
                label="LinkedIn"
              />
              <SocialLink
                href="https://github.com/avilash-b"
                icon={<GitHub />}
                label="GitHub"
              />
              <SocialLink
                href="https://www.instagram.com/avilash_bharti"
                icon={<Instagram />}
                label="Instagram"
              />
              <SocialLink
                href="/docs/resume.pdf"
                icon={<FileDownload />}
                label="Download Resume"
                download
              />
            </Stack>
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
}) => {
  return (
    <Tooltip title={label} arrow>
      <IconButton
        component="a"
        href={href}
        target={download ? "_self" : "_blank"}
        rel={download ? "" : "noopener noreferrer"}
        download={download}
        sx={{
          color: 'white',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            color: 'grey.300',
            transform: 'scale(1.75)',
          },
        }}
        aria-label={label}
      >
        {icon}
      </IconButton>
    </Tooltip>
  )
}

export default Home

