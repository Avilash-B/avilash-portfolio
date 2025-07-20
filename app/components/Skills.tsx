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
  const { ref, isVisible } = useScrollAnimation()

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
              }}
            >
              {skillsData.map((skill) => (
                <Paper
                  key={skill.name}
                  elevation={hoveredSkill === skill.name ? 6 : 2}
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 120,
                    width: '100%',
                    maxWidth: 150,
                    transition: 'all 0.3s ease-in-out',
                    cursor: 'pointer',
                    transform: hoveredSkill === skill.name ? 'scale(1.5)' : 'scale(1)',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <Box
                    sx={{
                      fontSize: '3rem',
                      mb: 1,
                      transition: 'all 0.1s ease-in-out',
                      transform: hoveredSkill === skill.name ? 'scale(1.5)' : 'scale(1)',
                      color: 'primary.main',
                      fontFamily: 'monospace',
                    }}
                  >
                    {skill.icon}
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: 'center',
                      color: 'text.primary',
                      fontWeight: 500,
                      fontFamily: 'monospace'
                    }}
                  >
                    {skill.name}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Box>
        </Fade>
      </Container>
    </Box>
  )
}

export default Skills

