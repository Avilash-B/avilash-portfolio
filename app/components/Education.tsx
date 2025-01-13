import { GraduationCap } from 'lucide-react'

const Education = () => {
  const educations = [
    {
      degree: "Master of Science in Computer Science",
      institution: "Tech University",
      duration: "2013 - 2015",
      description: "Specialized in Artificial Intelligence and Machine Learning. Completed thesis on 'Optimizing Neural Networks for Edge Computing'.",
    },
    {
      degree: "Bachelor of Science in Software Engineering",
      institution: "State University",
      duration: "2009 - 2013",
      description: "Graduated with honors. Participated in multiple hackathons and coding competitions.",
    },
  ]

  return (
    <section id="education" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">Education</h2>
        <div className="space-y-8">
          {educations.map((edu, index) => (
            <div key={index} className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <GraduationCap className="w-6 h-6 text-blue-500 mr-2" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{edu.degree}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">{edu.institution}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">{edu.duration}</p>
              <p className="text-gray-700 dark:text-gray-300">{edu.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education

