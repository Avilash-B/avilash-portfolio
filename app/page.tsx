'use client'

import { useState } from 'react'
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

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false)
  const scrollY = useScrollEffect();
  const scale = 1 + scrollY * 0.001; // Adjust the multiplier to control the zoom intensity

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <div className={`${darkMode ? 'dark' : ''} scroll-smooth`} style={{ height: '100vh', overflowY: 'auto' }}>
        <Header />
        <main className="flex-grow transition-all duration-300 ease-in-out pt-16" style={{ transform: `scale(${scale})` }}>
          <Home toggleDarkMode={toggleDarkMode} isDarkMode={darkMode} />
          <Projects />
          <Skills />
          <Experience />
          <Education />
          <Contact />
        </main>
        <DarkModeToggle toggleDarkMode={toggleDarkMode} isDarkMode={darkMode} />
        <Footer />
      </div>
    </div>
  )
}

