import { GraduationCap } from "lucide-react"
import { useScrollAnimation } from "../hooks/useScrollAnimation"

const Education = () => {
  const educations = [
    {
      degree: "Master of Computer Application",
      institution: "Centre for Development of Advanced Computing, India",
      duration: "2016 - 2019",
      description: "",
    },
    {
      degree: "Bachelor of Computer Application",
      institution: "Maharaja Surajmal Institue, India",
      duration: "2013 - 2016",
      description: "",
    },
  ]

  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="education" className="py-20 bg-white dark:bg-gray-800">
      <div
        ref={ref}
        className={`transition-all duration-1000 ease-in-out ${
          isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-10"
        }`}
      >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">Education</h2>
        <div
        ref={ref}
        className={`transition-all duration-1000 ease-in-out ${
          isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-10"
        }`}
      >
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
      </div>
      </div>
    </section>
  )
}

export default Education

