import React from 'react'
import { Moon, Sun } from 'lucide-react'

interface DarkModeToggleProps {
  toggleDarkMode: () => void
  isDarkMode: boolean
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ toggleDarkMode, isDarkMode }) => {
  return (
    <button
      onClick={toggleDarkMode}
      className="fixed bottom-4 right-6 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-300 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label="Toggle dark mode"
    >
      <div className="w-6 h-6 relative">
        <Moon className={`w-full h-full absolute transition-opacity duration-300 ease-in-out ${isDarkMode ? 'opacity-0' : 'opacity-100'}`} />
        <Sun className={`w-full h-full absolute transition-opacity duration-300 ease-in-out ${isDarkMode ? 'opacity-100' : 'opacity-0'}`} />
      </div>
    </button>
  )
}

export default DarkModeToggle

