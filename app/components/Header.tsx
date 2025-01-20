"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768)
    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    if (!isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "visible"
    }
  }

  return (
    <>
      {isMobile && (
        <button
          className="fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-md shadow-md"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      )}
      <header
        className={`fixed z-40 transition-all duration-300 ease-in-out
        ${
          isMobile
            ? `top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`
            : "top-4 left-1/2 -translate-x-1/2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-full shadow-lg hover:bg-white/90 dark:hover:bg-gray-800/90"
        }`}
      >
        <nav className={`container mx-auto ${isMobile ? "px-4 py-6" : "px-6 py-3"}`}>
          <div className="flex items-center justify-between md:justify-center">
            <div
              className={`${isMobile ? "flex flex-col space-y-4 mt-12 items-start" : "hidden md:flex md:space-x-2"}`}
            >
              <NavLink href="#home" onClick={isMobile ? toggleMenu : undefined}>
                Home
              </NavLink>
              <NavLink href="#projects" onClick={isMobile ? toggleMenu : undefined}>
                Projects
              </NavLink>
              <NavLink href="#skills" onClick={isMobile ? toggleMenu : undefined}>
                Skills
              </NavLink>
              <NavLink href="#experience" onClick={isMobile ? toggleMenu : undefined}>
                Experience
              </NavLink>
              <NavLink href="#education" onClick={isMobile ? toggleMenu : undefined}>
                Education
              </NavLink>
              <NavLink href="#contact" onClick={isMobile ? toggleMenu : undefined}>
                Contact
              </NavLink>
            </div>
          </div>
        </nav>
      </header>
      {isMobile && isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30" onClick={toggleMenu} aria-hidden="true"></div>
      )}
    </>
  )
}

const NavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) => (
  <a
    href={href}
    className="block text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-2 py-1"
    onClick={(e) => {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: "smooth" })
      }
      if (onClick) onClick()
    }}
  >
    {children}
  </a>
)

export default Header

