import { ExternalLink, GitlabIcon as GitHub } from "lucide-react"
import { useScrollAnimation } from "../hooks/useScrollAnimation"

const Projects = () => {
  const projects = [
    {
      title: "Portfolio",
      description: "",
      image: "/images/project1.jpg",
      technologies: ["Next.js", "TypesScript", "Node.js", ".NET", "Postgres", "Docker"],
      githubLink: "https://github.com/Avilash-B/avilash-portfolio",
      liveLink: ""
    },
    {
      title: "SKY API - Unified API solution",
      description: "",
      image: "/placeholder.svg?height=200&width=300",
      technologies: [".NET 8", "C#", "Azure", "SQL server", "Xunit", "Angular"],
      githubLink: "",
      liveLink: "https://developer.blackbaud.com/skyapi/products/crm"
    },
    {
      title: "CRM for Non-Profit domain",
      description: "",
      image: "/placeholder.svg?height=200&width=300",
      technologies: [".NET", "C#", "VB.NET", "SQL server", "MsTest", ],
      githubLink: "",
      liveLink: "https://www.blackbaud.com/products/blackbaud-crm"
    },
    {
      title: "Remote meter middleware",
      description: "",
      image: "/placeholder.svg?height=200&width=300",
      technologies: [".NET Core", "C#", "Postgres", "Kafka", "Hangfire","Xunit"],
      githubLink: "",
      liveLink: "https://www.securemeters.com/"
    },
    {
      title: "CRM for OTA",
      description: "",
      image: "/placeholder.svg?height=200&width=300",
      technologies: [".NET Core", "C#", "Redis", "SQL server", "Nunit", "React"],
      githubLink: "",
      liveLink: "https://www.cheapoair.com/profiles/#/my-account/my-details"
    },
    {
      title: "Abandon Cart tracker",
      description: "",
      image: "/placeholder.svg?height=200&width=300",
      technologies: [".NET core", "C#", "Mongo DB", "Nunit"],
      githubLink: "",
      liveLink: "https://www.cheapoair.com/"
    },
    {
      title: "Loyalty Rewards",
      description: "",
      image: "/placeholder.svg?height=200&width=300",
      technologies: [".NET framework", "C#", "SQL server", "Windows Jobs","Nunit", "Backbone js"],
      githubLink: "",
      liveLink: "https://www.cheapoair.com/profiles/#/my-rewards/redeem"
    }
  ]

  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="projects" className="py-20 bg-gray-100 dark:bg-gray-900">      
    <div
        ref={ref}
        className={`transition-all duration-1000 ease-in-out ${
          isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-10"
        }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">Projects</h2>        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.title}
              ref={ref}
              className={`transition-all duration-1000 ease-in-out ${
                isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-10"
              }`}
            >
              <div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
              >
                {/* <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                /> */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className={`flex ${project.liveLink ? "justify-between" : "justify-end"}`}>
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Reference
                      </a>
                    )}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
                      >
                        <GitHub className="w-4 h-4 mr-1" />
                        GitHub
                      </a>
                    )}                  
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
        </div>
      
    </section>
  )
}

export default Projects

