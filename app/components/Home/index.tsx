"use client"

import { useState, useEffect, useCallback, useLayoutEffect, useRef } from "react"
import { Box, Container, Fade, Grid, Stack } from "@mui/material"
import { useScrollAnimation } from "../../hooks/useScrollAnimation"
import ProfileCard from "./ProfileCard"
import StatCard from "./StatCard"
import BioCards from "./BioCards"

const Home: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation()
  const carrerKickOff = new Date("2019-07-01")
  const birthday = new Date("1995-08-27")
  const [age, setAge] = useState("")
  const [experience, setExperience] = useState("")
  const [showSides, setShowSides] = useState(false)
  const handleSignatureComplete = useCallback(() => setShowSides(true), [])

  const gridContainerRef = useRef<HTMLDivElement>(null)
  const profileItemRef = useRef<HTMLDivElement>(null)
  const [centerOffset, setCenterOffset] = useState(0)

  useLayoutEffect(() => {
    const container = gridContainerRef.current
    const item = profileItemRef.current
    if (!container || !item) return
    const containerCenter = container.offsetWidth / 2
    const itemCenter = item.offsetLeft + item.offsetWidth / 2
    setCenterOffset(containerCenter - itemCenter)
  }, [])

  useEffect(() => {
    const calculateAge = () => {
      const now = new Date()
      return (( now.getTime() - birthday.getTime()) / (1000 * 60 * 60 * 24 * 365.25)).toFixed(8)
    }
    const calculateExperience = () => {
      const now = new Date()
      return ((now.getTime() - carrerKickOff.getTime()) / (1000 * 60 * 60 * 24 * 365.25)).toFixed()
    }
    const timer = setInterval(() => {
      setAge(calculateAge())
      setExperience(calculateExperience())
    }, 100)
    return () => clearInterval(timer)
  }, [])

  const slideStyle = (direction: "left" | "right"): React.CSSProperties => ({
    opacity: showSides ? 1 : 0,
    transform: showSides
      ? "translateX(0)"
      : direction === "left" ? "translateX(-60px)" : "translateX(60px)",
    transition: "opacity 0.7s ease, transform 0.7s ease",
  })

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
            <Grid
              container
              spacing={2}
              alignItems="stretch"
              ref={gridContainerRef}
              sx={{ flexWrap: { xs: "wrap", md: "nowrap" } }}
            >
              <Grid
                size={{ xs: 12, md: 3.3 }}
                ref={profileItemRef}
                style={{
                  transform: showSides ? "translateX(0)" : `translateX(${centerOffset}px)`,
                  transition: showSides ? "transform 0.7s ease" : "none",
                }}
              >
                <ProfileCard onComplete={handleSignatureComplete} />
              </Grid>

              <Grid size={{ xs: 12, md: 2 }} style={slideStyle("left")}>
                <Stack spacing={2}>
                  <StatCard label="Experience" value={experience} unit="years" />
                  <StatCard label="Projects" value="20" unit="delivered" />
                  <StatCard label="Clients" value="10" unit="worked with" />
                </Stack>
              </Grid>

              <Grid size={{ xs: 12, md: 6.7 }} style={slideStyle("right")}>
                <BioCards age={age} />
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Container>
    </Box>
  )
}

export default Home
