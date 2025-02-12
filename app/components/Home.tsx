"use client"

import Image from "next/image"
import { Linkedin, GitlabIcon as GitHub, Instagram, FileDown } from "lucide-react"
import { useState, useEffect } from "react"
import VantaBackground from "./VantaBackground"
import { useScrollAnimation } from "../hooks/useScrollAnimation"
import { Card, CardContent } from "@/components/ui/card"
import type React from "react"

type HomeProps = {}

const Home: React.FC<HomeProps> = () => {
  const { ref, isVisible } = useScrollAnimation()
  const birthday = new Date("1995-08-27")
  const [age, setAge] = useState("")

  useEffect(() => {
    const calculateAge = () => {
      const now = new Date()
      const diff = now.getTime() - birthday.getTime()
      const ageInYears = diff / (1000 * 60 * 60 * 24 * 365.25)
      return ageInYears.toFixed(8)
    }

    const timer = setInterval(() => {
      setAge(calculateAge())
    }, 100) // Update every 100ms for better performance

    return () => clearInterval(timer)
  }, [birthday])

  return (
    <section id="home" className="min-h-screen pt-20 flex items-center justify-center relative overflow-hidden">
      <VantaBackground>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-500/20 dark:from-blue-800/20 dark:to-purple-900/20" />
      </VantaBackground>

      <div
        ref={ref}
        className={`transition-all duration-1000 ease-in-out ${
          isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <Image
              src="/images/avilash-home.jpg?height=200&width=200"
              alt="Avilash"
              width={210}
              height={210}
              className="rounded-full mx-auto mb-8 border-4 border-white dark:border-gray-800"
            />
            <Card className="max-w-lg mx-auto mb-8 bg-white/85 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl">
              <CardContent className="p-6 font-mono text-left">
                <div className="space-y-2">
                  <div>
                    <span className="text-purple-600 dark:text-purple-400">const</span>{" "}
                    <span className="text-yellow-600 dark:text-yellow-400">name</span>:{" "}
                    <span className="text-blue-600 dark:text-blue-400">string</span> ={" "}
                    <span className="text-green-600 dark:text-green-400">"Avilash"</span>;
                  </div>
                  <div className="text-gray-500">// working as an Associate Staff Engineer, @Nagarro</div>
                  <div>
                    <span className="text-purple-600 dark:text-purple-400">const</span>{" "}
                    <span className="text-yellow-600 dark:text-yellow-400">birthday</span>:{" "}
                    <span className="text-blue-600 dark:text-blue-400">Date</span> ={" "}
                    <span className="text-purple-600 dark:text-purple-400">new</span>{" "}
                    <span className="text-blue-600 dark:text-blue-400">Date</span>(
                    <span className="text-green-600 dark:text-green-400">'1995-08-27'</span>);
                  </div>
                  <div className="text-gray-500">// currently {age} years old.</div>
                </div>
              </CardContent>
            </Card>
            <div className="flex justify-center space-x-6 mb-8">
              <SocialLink href="https://www.linkedin.com/in/avilashbharti" icon={<Linkedin />} label="LinkedIn" />
              <SocialLink href="https://github.com/avilash-b" icon={<GitHub />} label="GitHub" />
              <SocialLink href="https://www.instagram.com/avilash_bharti" icon={<Instagram />} label="Instagram" />
              <SocialLink href="/docs/resume.pdf" icon={<FileDown />} label="Download Resume" download />
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const SocialLink = ({
  href,
  icon,
  label,
  download = false,
}: {
  href: string
  icon: React.ReactNode
  label: string
  download?: boolean
}) => {
  const [showLabel, setShowLabel] = useState(false)

  return (
    <div className="relative group">
      <a
        href={href}
        target={download ? "_self" : "_blank"}
        rel={download ? "" : "noopener noreferrer"}
        download={download}
        className="text-white hover:text-gray-200 transition duration-300 ease-in-out group-hover:scale-125 inline-block transform"
        aria-label={label}
        onMouseEnter={() => setShowLabel(true)}
        onMouseLeave={() => setShowLabel(false)}
      >
        {icon}
      </a>
      {showLabel && (
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-xs py-1 px-2 rounded shadow-lg whitespace-nowrap">
          {label}
        </div>
      )}
    </div>
  )
}

export default Home

