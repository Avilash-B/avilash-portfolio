import Image from 'next/image'

const Introduction = () => {
  return (
    <section id="about" className="mb-16">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <Image
            src="/placeholder.svg?height=300&width=300"
            alt="Avilash"
            width={300}
            height={300}
            className="rounded-full shadow-lg"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">Avilash</h1>
          <h2 className="text-2xl font-semibold mb-4 text-gray-600 dark:text-gray-300">Senior Software Engineer</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            With over 8 years of experience in software development, I specialize in building scalable and efficient web applications. My expertise includes React, Node.js, and cloud technologies. I'm passionate about creating user-friendly interfaces and optimizing backend systems.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Introduction

