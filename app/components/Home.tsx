import Image from "next/image"
import { Linkedin, GitlabIcon as GitHub, Instagram, FileDown } from "lucide-react"
import { useState } from "react"
import VantaBackground from "./VantaBackground"

type HomeProps = {}

const Home: React.FC<HomeProps> = () => {
  return (
    <section id="home" className="min-h-screen pt-20 flex items-center justify-center relative overflow-hidden">
      <VantaBackground>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-500/20 dark:from-blue-800/20 dark:to-purple-900/20" />
      </VantaBackground>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          
          
          <Image
            src="/images/avilash-home.jpg?height=200&width=200"
            alt="Avilash"
            width={200}
            height={200}
            className="rounded-full mx-auto mb-8 border-4 border-white dark:border-gray-800"
          />      
          <h1 className="text-3xl font-bold mb-4 text-gray-100"> Hello, I'm Avilash. 
            I'm an Associate Staff Engineer at Nagarro in Gurugram, India. 
            I'm currently working with .NET, SQL, Azure, and Angular.</h1>  
          <h2 className="text-2xl font-semibold mb-8 text-gray-300">
          </h2>
          <div className="flex justify-center space-x-6 mb-8">
            <SocialLink href="https://www.linkedin.com/in/avilashbharti" icon={<Linkedin />} label="LinkedIn" />
            <SocialLink href="https://github.com/avilash-b" icon={<GitHub />} label="GitHub" />
            <SocialLink href="https://www.instagram.com/avilash_bharti" icon={<Instagram />} label="Instagram" />
            <SocialLink href="/docs/resume.pdf" icon={<FileDown />} label="Download Resume" download />
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
}: { href: string; icon: React.ReactNode; label: string; download?: boolean }) => {
  const [showLabel, setShowLabel] = useState(false)

  return (
    <div className="relative">
      <a
        href={href}
        target={download ? "_self" : "_blank"}
        rel={download ? "" : "noopener noreferrer"}
        download={download}
        className="text-white hover:text-gray-200 transition duration-150 ease-in-out p-2 rounded-full bg-white/10 hover:bg-white/20"
        aria-label={label}
        onMouseEnter={() => setShowLabel(true)}
        onMouseLeave={() => setShowLabel(false)}
      >
        {icon}
      </a>
      {showLabel && (
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-xs py-1 px-2 rounded shadow-lg whitespace-nowrap">
          {label}
        </div>
      )}
    </div>
  )
}

export default Home

