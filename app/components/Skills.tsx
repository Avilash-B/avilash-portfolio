import { useState } from 'react'
import { 
  FaReact, FaNodeJs, FaPython, FaDocker, FaAws, 
  FaHtml5, FaCss3Alt, FaJs, FaVuejs, FaAngular,
  FaGitAlt, FaJira, FaTrello
} from 'react-icons/fa'
import { 
  SiTypescript, SiNextdotjs, SiExpress, SiDjango, SiGraphql,
  SiMongodb, SiPostgresql, SiRedis, SiKubernetes, SiTerraform,
  SiJenkins, SiTailwindcss, SiSass
} from 'react-icons/si'

interface Skill {
  name: string
  icon: React.ReactNode
}

const skillsData: Skill[] = [
  { name: 'React', icon: <FaReact /> },
  { name: 'TypeScript', icon: <SiTypescript /> },
  { name: 'Next.js', icon: <SiNextdotjs /> },
  { name: 'Node.js', icon: <FaNodeJs /> },
  { name: 'Express', icon: <SiExpress /> },
  { name: 'Python', icon: <FaPython /> },
  { name: 'Django', icon: <SiDjango /> },
  { name: 'GraphQL', icon: <SiGraphql /> },
  { name: 'MongoDB', icon: <SiMongodb /> },
  { name: 'PostgreSQL', icon: <SiPostgresql /> },
  { name: 'Redis', icon: <SiRedis /> },
  { name: 'Docker', icon: <FaDocker /> },
  { name: 'Kubernetes', icon: <SiKubernetes /> },
  { name: 'AWS', icon: <FaAws /> },
  { name: 'Terraform', icon: <SiTerraform /> },
  { name: 'Jenkins', icon: <SiJenkins /> },
  { name: 'Git', icon: <FaGitAlt /> },
  { name: 'HTML5', icon: <FaHtml5 /> },
  { name: 'CSS3', icon: <FaCss3Alt /> },
  { name: 'JavaScript', icon: <FaJs /> },
  { name: 'Vue.js', icon: <FaVuejs /> },
  { name: 'Angular', icon: <FaAngular /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
  { name: 'Sass', icon: <SiSass /> },
  { name: 'Jira', icon: <FaJira /> },
  { name: 'Trello', icon: <FaTrello /> },
]

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">Skills</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-8">
          {skillsData.map((skill) => (
            <div
              key={skill.name}
              className="flex flex-col items-center justify-center"
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div
                className={`text-4xl mb-2 transition-all duration-300 ease-in-out ${
                  hoveredSkill === skill.name ? 'transform scale-125' : ''
                }`}
              >
                {skill.icon}
              </div>
              <span className="text-sm text-center text-gray-600 dark:text-gray-400">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills

