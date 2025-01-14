'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-full shadow-lg transition-all duration-300 ease-in-out hover:bg-white/90 dark:hover:bg-gray-800/90">
      <nav className="container mx-auto px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="hidden md:flex space-x-4">
            <NavLink href="#home">Home</NavLink>
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#skills">Skills</NavLink>
            <NavLink href="#experience">Experience</NavLink>
            <NavLink href="#education">Education</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </div>
          <button
            className="md:hidden text-gray-800 dark:text-white"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2 bg-white dark:bg-gray-800 rounded-3xl p-4 shadow-lg">
            <NavLink href="#home" onClick={toggleMenu}>Home</NavLink>
            <NavLink href="#projects" onClick={toggleMenu}>Projects</NavLink>
            <NavLink href="#skills" onClick={toggleMenu}>Skills</NavLink>
            <NavLink href="#experience" onClick={toggleMenu}>Experience</NavLink>
            <NavLink href="#education" onClick={toggleMenu}>Education</NavLink>
            <NavLink href="#contact" onClick={toggleMenu}>Contact</NavLink>
          </div>
        )}
      </nav>
    </header>
  )
}

const NavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) => (
  <a
    href={href}
    className="block text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
    onClick={(e) => {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      if (onClick) onClick();
    }}
  >
    {children}
  </a>
)

export default Header

