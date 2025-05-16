import { useState } from 'react'
import { 
  FaReact, FaAngular, FaNodeJs, FaDocker, FaHtml5, FaJs,FaGitAlt
} from 'react-icons/fa'  

import { 
  SiTypescript, SiNextdotjs, SiPostgresql, SiRedis, SiDotnet, SiApachekafka, SiRabbitmq
} from 'react-icons/si'

import{
  VscAzure, VscAzureDevops
} from 'react-icons/vsc'

import{
  TbBrandCSharp , TbSql
} from 'react-icons/tb'

import { useScrollAnimation } from "../hooks/useScrollAnimation"

interface Skill {
  name: string
  icon: React.ReactNode
}

const skillsData: Skill[] = [
  
  { name: '.Net', icon: <SiDotnet /> },
  { name: 'C#', icon: <TbBrandCSharp /> },
  { name: 'Azure', icon: <VscAzure /> },
  { name: 'Azure Dev Ops', icon: <VscAzureDevops /> },    
  { name: 'SQL Server', icon: <TbSql /> },
  { name: 'PostgreSQL', icon: <SiPostgresql /> },
  { name: 'Redis', icon: <SiRedis /> },
  { name: 'Kafka', icon: <SiApachekafka /> },    
  { name: 'RabbitMq', icon: <SiRabbitmq /> },
  { name: 'Docker', icon: <FaDocker /> },
  { name: 'Git', icon: <FaGitAlt /> },  
  { name: 'JavaScript', icon: <FaJs /> },  
  { name: 'TypeScript', icon: <SiTypescript /> },
  { name: 'Angular', icon: <FaAngular /> },
  { name: 'React', icon: <FaReact /> },
  { name: 'Next.js', icon: <SiNextdotjs /> },
  { name: 'HTML5', icon: <FaHtml5 /> },
]

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-500">
      <div
        ref={ref}
        className={`transition-all duration-1000 ease-in-out ${
          isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-10"
        }`}
      >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-black">Skills</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-8">
          {skillsData.map((skill) => (
            <div
              key={skill.name}
              ref={ref}
              className={`transition-all duration-1000 ease-in-out ${
                isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-10"
              }`}
            >
              <div
                className="flex flex-col items-center justify-center"
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div
                  className={`text-5xl mb-2 transition-all duration-300 ease-in-out ${
                    hoveredSkill === skill.name ? 'transform scale-150' : ''
                  }`}
                >
                  {skill.icon}
                </div>
                <span className="text-sm text-center text-gray-600 dark:text-black">{skill.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  )
}

export default Skills

