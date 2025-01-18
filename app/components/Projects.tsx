import Image from 'next/image'
import { ExternalLink, GitlabIcon as GitHub } from 'lucide-react'

const Projects = () => {
  const projects = [
    {
      title: "Portfolio",
      description: "",
      image: "/placeholder.svg?height=200&width=300",
      technologies: ["React", "Node.js"],
      githubLink: "https://github.com/Avilash-B/avilash-portfolio",
      liveLink: "https://avilashbharti.com"
      }
    // {
    //   title: "Task Management App",
    //   description: "A Kanban-style task management application with real-time updates.",
    //   image: "/placeholder.svg?height=200&width=300",
    //   technologies: ["React", "Firebase", "Material-UI"],
    //   githubLink: "https://github.com/avilash/task-management-app",
    //   liveLink: "https://task-app-demo.com"
    // },
    // {
    //   title: "Weather Forecast Dashboard",
    //   description: "A responsive weather dashboard with data visualization.",
    //   image: "/placeholder.svg?height=200&width=300",
    //   technologies: ["React", "D3.js", "OpenWeatherMap API"],
    //   githubLink: "https://github.com/avilash/weather-dashboard",
    //   liveLink: "https://weather-dashboard-demo.com"
    // }
  ]

  return (
    <section id="projects" className="py-20 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.title} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl">
              <Image
                src={project.image}
                alt={project.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between">
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center">
                    <GitHub className="w-4 h-4 mr-1" />
                    GitHub
                  </a>
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects

