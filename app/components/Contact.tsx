import { useState } from "react"
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  Fade
} from "@mui/material"
import { Email, LocationOn } from "@mui/icons-material"
import { useScrollAnimation } from "../hooks/useScrollAnimation"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await fetch("https://api.avilashbharti.in/anonymous/addContactMe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setFormData({ name: "", email: "", message: "" })
      } else {
        console.error("Form submission failed")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    }
  }

  const { ref, isVisible } = useScrollAnimation()

  return (
    <Box
      id="contact"
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
              Contact Me
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  md: '1fr 1fr',
                },
                gap: 4,
                alignItems: 'start',
              }}
            >
              <Box>
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    fontFamily: 'monospace'
                  }}
                >
                  Get in Touch
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    mb: 3,
                    fontFamily: 'monospace'
                  }}
                >
                  I'm always open to new opportunities and collaborations. Feel free to reach out!
                </Typography>

                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Email sx={{ color: 'primary.main', mr: 1 }} />
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'text.secondary',
                        fontFamily: 'monospace'
                      }}
                    >
                      avilash.bharti@outlook.com
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOn sx={{ color: 'primary.main', mr: 1 }} />
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'text.secondary',
                        fontFamily: 'monospace',
                      }}
                    >
                      Delhi, IND
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  backgroundColor: 'background.paper',
                  backdropFilter: 'blur(8px)',
                  borderRadius: 4,
                  transition: 'all 0.3s ease-in-out',
                  width: '100%',
                  height: 'fit-content',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 4,
                  },
                }}
              >
                <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                  <Stack spacing={3} sx={{ width: '100%' }}>
                    <TextField
                      fullWidth
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      sx={{ py: 1.5, fontFamily: 'monospace' }}
                    >
                      Send Message
                    </Button>
                  </Stack>
                </Box>
              </Paper>
            </Box>
          </Box>
        </Fade>
      </Container>
    </Box>
  )
}

export default Contact

