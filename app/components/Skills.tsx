import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Paper,
  Fade
} from "@mui/material"
import {
  FaReact, FaAngular, FaNodeJs, FaDocker, FaHtml5, FaJs, FaGitAlt
} from 'react-icons/fa'
import {
  SiTypescript, SiNextdotjs, SiPostgresql, SiRedis, SiDotnet, SiApachekafka, SiRabbitmq, SiMongodb
} from 'react-icons/si'
import {
  VscAzure, VscAzureDevops
} from 'react-icons/vsc'
import {
  TbBrandCSharp, TbSql
} from 'react-icons/tb'
import { useScrollAnimation } from "../hooks/useScrollAnimation"
import React from 'react'

interface Skill {
  name: string
  icon: React.ReactNode
}

const skillsData: Skill[] = [
  { name: '.Net', icon: <SiDotnet /> },
  { name: 'C#', icon: <TbBrandCSharp /> },
  { name: 'Azure', icon: <VscAzure /> },
  { name: 'Azure Dev Ops', icon: <VscAzureDevops /> },
  { name: 'SQL Server', icon: <TbSql /> },
  { name: 'PostgreSQL', icon: <SiPostgresql /> },
  { name: 'MongoDB', icon: <SiMongodb /> },
  { name: 'Redis', icon: <SiRedis /> },
  { name: 'Kafka', icon: <SiApachekafka /> },
  { name: 'RabbitMq', icon: <SiRabbitmq /> },
  { name: 'Docker', icon: <FaDocker /> },
  { name: 'Git', icon: <FaGitAlt /> },
  { name: 'JavaScript', icon: <FaJs /> },
  { name: 'TypeScript', icon: <SiTypescript /> },
  { name: 'Angular', icon: <FaAngular /> },
  { name: 'React', icon: <FaReact /> },
  { name: 'Next.js', icon: <SiNextdotjs /> },
  { name: 'HTML5', icon: <FaHtml5 /> },
]

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [skillsVisible, setSkillsVisible] = useState<boolean[]>([])
  const { ref, isVisible } = useScrollAnimation()

  // Generate random initial positions for each skill
  const getRandomInitialPosition = (index: number) => {
    // Use index as seed for consistent random positions
    const seed = index * 123456789
    const random1 = (seed % 1000) / 1000
    const random2 = ((seed * 7) % 1000) / 1000
    const random3 = ((seed * 13) % 1000) / 1000
    const random4 = ((seed * 17) % 1000) / 1000

    // More directions: 0=top, 1=top-right, 2=right, 3=bottom-right, 4=bottom, 5=bottom-left, 6=left, 7=top-left
    const direction = Math.floor(random1 * 8)

    const baseDistance = 300 + (random3 * 200) // 300-500px from screen edge
    const variance = (random2 - 0.5) * 400 // ±200px variance

    switch (direction) {
      case 0: // From top
        return {
          x: variance,
          y: -baseDistance,
          rotate: (random4 - 0.5) * 720 // More rotation
        }
      case 1: // From top-right diagonal
        return {
          x: baseDistance,
          y: -baseDistance + variance,
          rotate: (random4 - 0.5) * 720
        }
      case 2: // From right
        return {
          x: baseDistance,
          y: variance,
          rotate: (random4 - 0.5) * 720
        }
      case 3: // From bottom-right diagonal
        return {
          x: baseDistance,
          y: baseDistance + variance,
          rotate: (random4 - 0.5) * 720
        }
      case 4: // From bottom
        return {
          x: variance,
          y: baseDistance,
          rotate: (random4 - 0.5) * 720
        }
      case 5: // From bottom-left diagonal
        return {
          x: -baseDistance,
          y: baseDistance + variance,
          rotate: (random4 - 0.5) * 720
        }
      case 6: // From left
        return {
          x: -baseDistance,
          y: variance,
          rotate: (random4 - 0.5) * 720
        }
      case 7: // From top-left diagonal
        return {
          x: -baseDistance,
          y: -baseDistance + variance,
          rotate: (random4 - 0.5) * 720
        }
      default:
        return { x: 0, y: 0, rotate: 0 }
    }
  }

  // Initialize skills visibility when component becomes visible
  React.useEffect(() => {
    if (isVisible) {
      // Initialize all skills as invisible first
      if (skillsVisible.length === 0) {
        setSkillsVisible(new Array(skillsData.length).fill(false))
      }

      // Animate skills in with staggered timing
      skillsData.forEach((_, index) => {
        setTimeout(() => {
          setSkillsVisible(prev => {
            const newVisible = [...prev]
            newVisible[index] = true
            return newVisible
          })
        }, 20 + index * 10) // Start after 200ms, then 80ms delay between each skill
      })
    }
  }, [isVisible])

  // Function to calculate transform based on position relative to hovered item
  const getTransform = (currentIndex: number, hoveredIdx: number | null) => {
    if (hoveredIdx === null || currentIndex === hoveredIdx) {
      return 'scale(1) translate(0, 0)'
    }

    // Calculate grid position (assuming 6 columns on large screens)
    const cols = 6
    const hoveredRow = Math.floor(hoveredIdx / cols)
    const hoveredCol = hoveredIdx % cols
    const currentRow = Math.floor(currentIndex / cols)
    const currentCol = currentIndex % cols

    // Calculate distance and direction
    const rowDiff = currentRow - hoveredRow
    const colDiff = currentCol - hoveredCol

    // Scale down non-hovered items
    let scale = 0.85
    let translateX = 0
    let translateY = 0

    // Push items away from hovered item
    if (Math.abs(rowDiff) <= 1 && Math.abs(colDiff) <= 1) {
      // Adjacent items - push further away
      translateX = colDiff * 15
      translateY = rowDiff * 15
      scale = 0.8
    } else {
      // Distant items - subtle movement
      translateX = colDiff * 5
      translateY = rowDiff * 5
      scale = 0.9
    }

    return `scale(${scale}) translate(${translateX}px, ${translateY}px)`
  }

  const handleMouseEnter = (skillName: string, index: number) => {
    setHoveredSkill(skillName)
    setHoveredIndex(index)
  }

  const handleMouseLeave = () => {
    setHoveredSkill(null)
    setHoveredIndex(null)
  }

  return (
    <Box
      id="skills"
      component="section"
      sx={{
        py: 10,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark'
            ? 'grey.900'
            : 'grey.100'
      }}
    >
      <Container maxWidth="lg">
        <Fade in={isVisible} timeout={1000}>
          <Box ref={ref}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 'bold',
                mb: 4,
                textAlign: 'center',
                color: 'text.primary',
                fontFamily: 'monospace',
              }}
            >
              Skills
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(2, 1fr)',
                  sm: 'repeat(3, 1fr)',
                  md: 'repeat(4, 1fr)',
                  lg: 'repeat(6, 1fr)',
                },
                gap: 4,
                justifyItems: 'center',
                position: 'relative',
                padding: '20px', // Extra padding to accommodate movement
              }}
            >
              {skillsData.map((skill, index) => {
                const initialPos = getRandomInitialPosition(index)
                const isSkillVisible = skillsVisible[index] || false

                return (
                  <Box
                    key={skill.name}
                    sx={{
                      // Entry animation - start from off-screen positions
                      transform: !isSkillVisible
                        ? `translate(${initialPos.x}px, ${initialPos.y}px) rotate(${initialPos.rotate}deg) scale(0.3)`
                        : 'translate(0px, 0px) rotate(0deg) scale(1)',
                      opacity: isSkillVisible ? 1 : 0,
                      transition: 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    }}
                  >
                    <Paper
                      elevation={hoveredSkill === skill.name ? 8 : 2}
                      sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 120,
                        width: 120,
                        cursor: 'pointer',
                        zIndex: hoveredSkill === skill.name ? 10 : 1,
                        position: 'relative',
                        backgroundColor: hoveredSkill === skill.name
                          ? 'primary.main'
                          : 'background.paper',
                        color: hoveredSkill === skill.name
                          ? 'primary.contrastText'
                          : 'text.primary',
                        boxShadow: hoveredSkill === skill.name
                          ? '0 20px 40px rgba(0,0,0,0.3)'
                          : undefined,

                        // Hover animation - separate from entry animation
                        transform: hoveredSkill === skill.name
                          ? 'scale(1.3) translate(0, -10px)'
                          : getTransform(index, hoveredIndex),

                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', // Normal hover animation

                        '&:hover': {
                          backgroundColor: hoveredSkill === skill.name
                            ? 'primary.dark'
                            : 'action.hover',
                        },

                        // Add a subtle glow effect for hovered item
                        ...(hoveredSkill === skill.name && {
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: -2,
                            left: -2,
                            right: -2,
                            bottom: -2,
                            background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)',
                            borderRadius: 'inherit',
                            zIndex: -1,
                            filter: 'blur(6px)',
                            opacity: 0.7,
                            animation: 'pulse 2s infinite',
                          },
                        }),
                      }}
                      onMouseEnter={() => handleMouseEnter(skill.name, index)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '64px',
                          height: '64px',
                          mb: 1,
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          color: hoveredSkill === skill.name
                            ? 'inherit'
                            : 'primary.main',
                          fontFamily: 'monospace',
                          filter: hoveredSkill === skill.name
                            ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
                            : 'none',
                          transform: hoveredSkill === skill.name
                            ? 'rotate(5deg) scale(1.2)'
                            : 'rotate(0deg) scale(1)',
                          fontSize: '48px',
                          '& svg': {
                            width: '48px !important',
                            height: '48px !important',
                            fontSize: '48px !important',
                          },
                          '& *': {
                            width: '48px !important',
                            height: '48px !important',
                            fontSize: '48px !important',
                          },
                        }}
                      >
                        {skill.icon}
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          textAlign: 'center',
                          color: 'inherit',
                          fontWeight: hoveredSkill === skill.name ? 600 : 500,
                          fontFamily: 'monospace',
                          fontSize: hoveredSkill === skill.name ? '0.9rem' : '0.875rem',
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          textShadow: hoveredSkill === skill.name
                            ? '0 2px 4px rgba(0,0,0,0.3)'
                            : 'none',
                        }}
                      >
                        {skill.name}
                      </Typography>
                    </Paper>
                  </Box>
                )
              })}
            </Box>

            {/* Add keyframes for pulse animation */}
            <style jsx>{`
              @keyframes pulse {
                0%, 100% {
                  opacity: 0.7;
                  transform: scale(1);
                }
                50% {
                  opacity: 1;
                  transform: scale(1.05);
                }
              }
            `}</style>
          </Box>
        </Fade>
      </Container>
    </Box>
  )
}

export default Skills

