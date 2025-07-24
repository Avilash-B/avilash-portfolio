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
  SiTypescript, SiNextdotjs, SiPostgresql, SiRedis, SiDotnet, SiApachekafka, SiRabbitmq
} from 'react-icons/si'
import {
  VscAzure, VscAzureDevops
} from 'react-icons/vsc'
import {
  TbBrandCSharp, TbSql
} from 'react-icons/tb'
import { useScrollAnimation } from "../hooks/useScrollAnimation"

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
  const { ref, isVisible } = useScrollAnimation()

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
              {skillsData.map((skill, index) => (
                <Paper
                  key={skill.name}
                  elevation={hoveredSkill === skill.name ? 8 : 2}
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 120,
                    width: '100%',
                    maxWidth: 150,
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    transform: hoveredSkill === skill.name
                      ? 'scale(1.3) translate(0, -10px)'
                      : getTransform(index, hoveredIndex),
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
                      fontSize: hoveredSkill === skill.name ? '4rem' : '3rem',
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
                        ? 'rotate(5deg)'
                        : 'rotate(0deg)',
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
              ))}
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

