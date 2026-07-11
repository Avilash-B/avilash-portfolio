'use client'

import { useState, useMemo, useEffect } from 'react'
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material'
import Header from './components/Header'
import Home from './components/Home'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import DarkModeToggle from './components/DarkModeToggle'
import VantaBackground from './components/VantaBackground'
import { useTelemetry } from './hooks/useTelemetry'

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(true)

  const toggleDarkMode = () => setDarkMode(!darkMode)

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                scrollBehavior: 'smooth',
              },
            },
          },
        },
      }),
    [darkMode]
  )

  useTelemetry();

  useEffect(() => {
    const breadcrumbData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://avilashbharti.in" }]
    }
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(breadcrumbData)
    document.head.appendChild(script)
    return () => { document.head.removeChild(script) }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Fixed Vanta background — rendered once, sits behind everything */}
      <VantaBackground>
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: (theme) =>
              theme.palette.mode === 'dark'
                ? 'linear-gradient(to bottom right, rgba(30,58,138,0.2), rgba(88,28,135,0.2))'
                : 'linear-gradient(to bottom right, rgba(96,165,250,0.2), rgba(168,85,247,0.2))',
          }}
        />
      </VantaBackground>

      {/* Scroll-snap container — sections glide over the fixed Vanta */}
      <Box
        data-scroll-container
        sx={{
          position: 'relative',
          zIndex: 1,
          height: '100vh',
          overflowY: 'scroll',
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none',
        }}
      >
        <Header />

        {[Home, Projects, Skills, Experience, Education, Contact].map((Section, i) => (
          <Box key={i}>
            <Section />
          </Box>
        ))}

        <Footer />
      </Box>

      <DarkModeToggle toggleDarkMode={toggleDarkMode} isDarkMode={darkMode} />
    </ThemeProvider>
  )
}

