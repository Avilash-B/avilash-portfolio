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
import { useScrollEffect } from './hooks/useScrollEffect'
import DarkModeToggle from './components/DarkModeToggle'
import { useTelemetry } from './hooks/useTelemetry'

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false)
  const scrollY = useScrollEffect();
  const scale = 1 + scrollY * 0.001; // Adjust the multiplier to control the zoom intensity

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  // Create MUI theme based on dark mode state
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

  // Add structured data for better SEO
  useEffect(() => {
    // Add breadcrumb structured data
    const breadcrumbData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://avilashbharti.in"
        }
      ]
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(breadcrumbData)
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        component="div"
        role="main"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          overflowX: 'hidden',
        }}
      >
        <Box
          sx={{
            height: '100vh',
          }}
        >
          <Header />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              transition: 'all 0.3s ease-in-out',
              transform: `scale(${scale})`,
            }}
          >
            <Home />
            <Projects />
            <Skills />
            <Experience />
            <Education />
            <Contact />
          </Box>
          <DarkModeToggle toggleDarkMode={toggleDarkMode} isDarkMode={darkMode} />
          <Footer />
        </Box>
      </Box>
    </ThemeProvider>
  )
}

