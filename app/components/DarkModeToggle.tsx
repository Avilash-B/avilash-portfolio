import React from 'react'
import { Fab, useTheme } from '@mui/material'
import { DarkMode, LightMode } from '@mui/icons-material'

interface DarkModeToggleProps {
  toggleDarkMode: () => void
  isDarkMode: boolean
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ toggleDarkMode, isDarkMode }) => {
  const theme = useTheme()

  return (
    <Fab
      onClick={toggleDarkMode}
      aria-label="Toggle dark mode"
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 26,
        zIndex: 1400,
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.1)',
        },
        backgroundColor: theme.palette.mode === 'dark' ? 'grey.700' : 'grey.200',
        color: theme.palette.mode === 'dark' ? 'white' : 'grey.800',
        boxShadow: 3,
        '@media (max-width: 600px)': {
          bottom: 20,
          right: 20,
          transform: 'scale(0.9)',
        },
      }}
    >
      {isDarkMode ? <LightMode /> : <DarkMode />}
    </Fab>
  )
}

export default DarkModeToggle

