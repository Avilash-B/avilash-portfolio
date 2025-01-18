import { Briefcase } from 'lucide-react'

const Experience = () => {
  const experiences = [
    {
      company: "Nagarro",
      position: "Associate Staff Engineer",
      duration: "Jan 2022 - Present",
      description: "",
    },
    {
      company: "Accolite Digital",
      position: "Senior Software Engineer",
      duration: "Nov 2020 - Jan 2022",
      description: "",
    },
    {
      company: "Fareportal",
      position: "Software Engineer",
      duration: "Jan 2019 - Nov 2020",
      description: "",
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

