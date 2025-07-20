import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Stack,
  Link,
  Fade
} from "@mui/material"
import { Launch, GitHub } from "@mui/icons-material"
import { useScrollAnimation } from "../hooks/useScrollAnimation"

const Projects = () => {
  const projects = [
    {
      title: "Portfolio",
      description: "",
      image: "/images/project1.jpg",
      technologies: ["Next.js", "TypeScript", "Node.js", ".NET", "Postgres", "Docker"],
      githubLink: "https://github.com/Avilash-B/avilash-portfolio",
      liveLink: ""
    },
    {
      title: "SKY API - Unified API solution",
      description: "",
      image: "/placeholder.svg?height=200&width=300",
      technologies: [".NET 8", "C#", "Azure", "SQL server", "Xunit", "Angular"],
      githubLink: "",
      liveLink: "https://developer.blackbaud.com/skyapi/products/crm"
    },
    {
      title: "CRM for Non-Profit domain",
      description: "",
      image: "/placeholder.svg?height=200&width=300",
      technologies: [".NET", "C#", "VB.NET", "SQL server", "MsTest"],
      githubLink: "",
      liveLink: "https://www.blackbaud.com/products/blackbaud-crm"
    },
    {
      title: "Remote meter middleware",
      description: "",
      image: "/placeholder.svg?height=200&width=300",
      technologies: [".NET Core", "C#", "Postgres", "Kafka", "Hangfire", "Xunit"],
      githubLink: "",
      liveLink: "https://www.securemeters.com/"
    },
    {
      title: "CRM for OTA",
      description: "",
      image: "/placeholder.svg?height=200&width=300",
      technologies: [".NET Core", "C#", "Redis", "SQL server", "Nunit", "React"],
      githubLink: "",
      liveLink: "https://www.cheapoair.com/profiles/#/my-account/my-details"
    },
    {
      title: "Abandon Cart tracker",
      description: "",
      image: "/placeholder.svg?height=200&width=300",
      technologies: [".NET core", "C#", "Mongo DB", "Nunit"],
      githubLink: "",
      liveLink: "https://www.cheapoair.com/"
    },
    {
      title: "Loyalty Rewards",
      description: "",
      image: "/placeholder.svg?height=200&width=300",
      technologies: [".NET framework", "C#", "SQL server", "Windows Jobs", "Nunit", "Backbone js"],
      githubLink: "",
      liveLink: "https://www.cheapoair.com/profiles/#/my-rewards/redeem"
    }
  ]

  const { ref, isVisible } = useScrollAnimation()

  return (
    <Box
      id="projects"
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
              Projects
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  md: 'repeat(2, 1fr)',
                  lg: 'repeat(3, 1fr)',
                },
                gap: 4,
                justifyItems: 'center',
              }}
            >
              {projects.map((project) => (
                <Card
                  key={project.title}
                  elevation={3}
                  sx={{
                    height: 'auto',
                    width: '100%',
                    maxWidth: 400,
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: (theme) => 
                      theme.palette.mode === 'dark' 
                        ? 'rgba(18, 18, 18, 0.8)' 
                        : 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: 4,
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6,
                      backgroundColor: (theme) => 
                        theme.palette.mode === 'dark' 
                          ? 'rgba(18, 18, 18, 0.9)' 
                          : 'rgba(255, 255, 255, 0.9)',
                    },
                  }}
                >
                  <CardContent 
                    sx={{ 
                      p: 3, 
                      display: 'flex', 
                      flexDirection: 'column', 
                      height: '100%',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h6"
                        component="h3"
                        sx={{ 
                          fontWeight: 600, 
                          mb: 1,
                          minHeight: '3rem',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          fontFamily: 'monospace'
                        }}
                      >
                        {project.title}
                      </Typography>

                      {project.description && (
                        <Typography
                          variant="body2"
                          sx={{ 
                            color: 'text.secondary', 
                            mb: 2,
                            minHeight: '2.5rem',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            fontFamily: 'monospace'
                          }}
                        >
                          {project.description}
                        </Typography>
                      )}

                      <Box sx={{ minHeight: '120px', mb: 2 }}>
                        <Stack direction="row" flexWrap="wrap" gap={1}>
                          {project.technologies.map((tech) => (
                            <Chip
                              key={tech}
                              label={tech}
                              size="small"
                              variant="outlined"
                              sx={{ fontSize: '0.75rem', fontFamily: 'monospace' }}
                            />
                          ))}
                        </Stack>
                      </Box>
                    </Box>

                    <Stack
                      direction="row"
                      justifyContent={project.liveLink ? "space-between" : "flex-end"}
                      alignItems="center"
                      sx={{ mt: 'auto' }}
                    >
                      {project.liveLink && (
                        <Link
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            textDecoration: 'none',
                            color: 'primary.main',
                            fontFamily: 'monospace',
                            '&:hover': {
                              color: 'primary.dark',
                            },
                          }}
                        >
                          <Launch sx={{ fontSize: 16, mr: 0.5 }} />
                          Reference
                        </Link>
                      )}

                      {project.githubLink && (
                        <Link
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            textDecoration: 'none',
                            color: 'primary.main',
                            fontFamily: 'monospace',
                            '&:hover': {
                              color: 'primary.dark',
                            },
                          }}
                        >
                          <GitHub sx={{ fontSize: 16, mr: 0.5 }} />
                          GitHub
                        </Link>
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        </Fade>
      </Container>
    </Box>
  )
}

export default Projects

