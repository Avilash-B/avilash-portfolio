"use client"

import { useState, useEffect } from "react"
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  useTheme,
  useMediaQuery,
  Backdrop
} from "@mui/material"
import { Menu, Close } from "@mui/icons-material"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isMobile) {
      setIsMenuOpen(false)
    }
  }, [isMobile])

  useEffect(() => {
    if (mounted) {
      if (isMobile) {
        document.body.style.overflow = isMenuOpen ? "hidden" : "visible"
      } else {
        document.body.style.overflow = "visible"
      }
    }
  }, [isMenuOpen, isMobile, mounted])

  // Don't render anything until component is mounted to prevent hydration mismatch
  if (!mounted) {
    return null
  }

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <>
      {isMobile && (
        <IconButton
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          sx={{
            position: 'fixed',
            top: 16,
            left: 16,
            zIndex: 1300,
            backgroundColor: 'background.paper',
            backdropFilter: 'blur(8px)',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          {isMenuOpen ? <Close /> : <Menu />}
        </IconButton>
      )}

      {!isMobile && (
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            top: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'auto',
            backgroundColor: 'transparent',
            zIndex: 1100,
          }}
        >
          <Paper
            elevation={3}
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.9)'
                  : 'rgba(18, 18, 18, 0.8)',
              backdropFilter: 'blur(12px)',
              borderRadius: '24px',
              px: 3,
              py: 1.5,
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light'
                    ? 'rgba(255, 255, 255, 0.95)'
                    : 'rgba(18, 18, 18, 0.9)',
              },
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" fontFamily="monospace">
              {navItems.map((item) => (
                <NavLink key={item.href} href={item.href}>
                  {item.label}
                </NavLink>
              ))}
            </Stack>
          </Paper>
        </AppBar>
      )}

      <Drawer
        anchor="left"
        open={isMenuOpen}
        onClose={toggleMenu}
        sx={{
          '& .MuiDrawer-paper': {
            width: 256,
            backgroundColor: 'background.paper',
          },
        }}
      >
        <Box sx={{ pt: 8 }}>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.href} disablePadding>
                <ListItemButton
                  onClick={() => {
                    const target = document.querySelector(item.href)
                    if (target) {
                      target.scrollIntoView({ behavior: "smooth" })
                    }
                    toggleMenu()
                  }}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {isMobile && isMenuOpen && (
        <Backdrop
          open={isMenuOpen}
          onClick={toggleMenu}
          sx={{ zIndex: 1200 }}
        />
      )}
    </>
  )
}

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Box
    component="a"
    href={href}
    onClick={(e: React.MouseEvent) => {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: "smooth" })
      }
    }}
    sx={{
      display: 'block',
      fontSize: '0.875rem',
      color: 'text.secondary',
      textDecoration: 'none',
      px: 1,
      py: 0.5,
      borderRadius: 1,
      transition: 'all 0.3s ease-in-out',
      '&:hover': {
        color: 'text.primary',
        backgroundColor: 'action.hover',
      },
    }}
  >
    {children}
  </Box>
)

export default Header

