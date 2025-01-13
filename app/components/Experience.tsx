import { Briefcase } from 'lucide-react'

const Experience = () => {
  const experiences = [
    {
      company: "Tech Innovators Inc.",
      position: "Senior Software Engineer",
      duration: "Jan 2020 - Present",
      description: "Lead development of scalable web applications using React and Node.js. Implemented microservices architecture and improved system performance by 40%.",
    },
    {
      company: "DataDriven Solutions",
      position: "Full Stack Developer",
      duration: "Mar 2017 - Dec 2019",
      description: "Developed and maintained multiple client projects using React, Node.js, and PostgreSQL. Collaborated with cross-functional teams to deliver high-quality software solutions.",
    },
    {
      company: "WebTech Startups",
      position: "Junior Developer",
      duration: "Jun 2015 - Feb 2017",
      description: "Assisted in the development of web applications using JavaScript and PHP. Gained experience in agile methodologies and version control systems.",
    },
  ]

  return (
    <section id="experience" className="py-20 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">Experience</h2>
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Briefcase className="w-6 h-6 text-blue-500 mr-2" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{exp.position}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">{exp.company}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">{exp.duration}</p>
              <p className="text-gray-700 dark:text-gray-300">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience

