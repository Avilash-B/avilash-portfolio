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
import { glassSx } from "../styles/glass"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
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
    if (isMobile) return
    const container = document.querySelector('[data-scroll-container]') as HTMLElement | null
    if (!container) return
    const handleScroll = () => setIsScrolled(container.scrollTop >= 100)
    handleScroll()
    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
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
    { label: 'Skills', href: '#knowledge-tree' },    
    { label: 'Projects', href: '#projects' },
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
          sx={(theme) => ({
            ...glassSx(theme),
            position: 'fixed',
            top: 16,
            left: 16,
            zIndex: 1300,
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          })}
        >
          {isMenuOpen ? <Close /> : <Menu />}
        </IconButton>
      )}

      {!isMobile && (
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            top: isScrolled ? 0 : 16,
            left: isScrolled ? 0 : '50%',
            transform: isScrolled ? 'none' : 'translateX(-50%)',
            width: '100%',
            maxWidth: isScrolled ? '100%' : (theme) => theme.breakpoints.values.lg,
            backgroundColor: 'transparent',
            zIndex: 1100,
            px: isScrolled ? 0 : 2,
            transition: 'all 0.3s ease-in-out',
          }}
        >
          <Paper
            elevation={isScrolled ? 0 : 3}
            sx={(theme) => ({
              ...glassSx(theme),
              borderRadius: isScrolled ? 0 : 8,
              borderColor: isScrolled ? 'transparent' : glassSx(theme).borderColor,
              px: 3,
              py: isScrolled ? 0.5 : 1.5,
              transition: 'all 0.3s ease-in-out',
            })}
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

