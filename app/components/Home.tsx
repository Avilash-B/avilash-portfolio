import Image from 'next/image'
import { Linkedin, GitlabIcon as GitHub, Instagram, FileDown } from 'lucide-react'
import { useState, useEffect } from 'react'

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 dark:from-blue-800 dark:to-purple-900 animate-gradient-xy"></div>
        <div className="absolute inset-0 opacity-50 dark:opacity-30">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white dark:bg-gray-300"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                animation: `float ${Math.random() * 10 + 5}s linear infinite`,
              }}
            ></div>
          ))}
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <Image
            src="/placeholder.svg?height=200&width=200"
            alt="Avilash"
            width={200}
            height={200}
            className="rounded-full mx-auto mb-8 border-4 border-white dark:border-gray-800"
          />
          <h1 className="text-4xl font-bold mb-4 text-white">Avilash</h1>
          <h2 className="text-2xl font-semibold mb-8 text-gray-200">Senior Software Engineer</h2>
          <div className="flex justify-center space-x-6 mb-8">
            <SocialLink href="https://www.linkedin.com/in/avilash" icon={<Linkedin />} label="LinkedIn" />
            <SocialLink href="https://github.com/avilash" icon={<GitHub />} label="GitHub" />
            <SocialLink href="https://www.instagram.com/avilash" icon={<Instagram />} label="Instagram" />
          </div>
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition duration-150 ease-in-out"
          >
            <FileDown className="w-5 h-5 mr-2" />
            Download Resume
          </a>
        </div>
      </div>
    </section>
  )
}

const SocialLink = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-white hover:text-gray-200 transition duration-150 ease-in-out"
    aria-label={label}
  >
    {icon}
  </a>
)

export default Home

