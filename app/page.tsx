"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Github, Linkedin, ExternalLink, ChevronDown } from "lucide-react"
import Typewriter from "typewriter-effect"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"

interface RippleButtonProps {
  children: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
}

const RippleButton = ({ children, onClick, className }: RippleButtonProps) => {
  const [coords, setCoords] = useState({ x: -1, y: -1 })
  const [isRippling, setIsRippling] = useState(false)

  useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true)
      setTimeout(() => setIsRippling(false), 500)
    } else {
      setIsRippling(false)
    }
  }, [coords])

  useEffect(() => {
    if (!isRippling) setCoords({ x: -1, y: -1 })
  }, [isRippling])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    onClick && onClick(e)
  }

  return (
    <button className={`relative overflow-hidden ${className}`} onClick={handleClick}>
      {isRippling && (
        <span
          className="absolute bg-white/30 rounded-full animate-[ripple_0.5s_ease-out]"
          style={{
            left: coords.x,
            top: coords.y,
            width: "100px",
            height: "100px",
            transform: "translate(-50%, -50%)",
            opacity: "0",
          }}
        />
      )}
      {children}
    </button>
  )
}

interface Project {
  title: string
  tech: string
  description: string
  image: string
  longDescription?: string
  link?: string
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [expandedProject, setExpandedProject] = useState<Project | null>(null)

  const projects: Project[] = [
    {
      title: "SAVR – Banking Application",
      tech: "JavaScript",
      description:
        "Developed a full-stack banking application with a finance management dashboard integrating Next.js 14 for real-time transaction tracking, account management, and money transfer functionality using Next.js, Plaid, and Dwolla. Implemented real-time updates across all pages, including transaction history with advanced pagination and filtering features, improving data accessibility and efficiency by 40%.",
      image: "/banking.jpeg?height=200&width=400",
      longDescription:
        "Developed a full-stack banking application with a finance management dashboard integrating Next.js 14 for real-time transaction tracking, account management, and money transfer functionality using Next.js, Plaid, and Dwolla.\n\nImplemented real-time updates across all pages, including transaction history with advanced pagination and filtering features, improving data accessibility and efficiency by 40%.\n",
      link: "https://github.com/lee-johnn/banking",
    },
    {
      title: "Canvas Clone",
      tech: "JavaScript",
      description:
        "Spearheading the development of a Canvas LMS clone using the MERN (MongoDB, Express.js, React.js, Node.js) stack, to create a scalable and responsive web application with course enrollment, content management, and user interaction features. Engineering RESTful APIs with Node.js and Express.js, and designing a MongoDB database schema for efficient data storage and retrieval to ensure seamless data flow and system reliability.",
      image: "/canvas.jpg?height=200&width=400",
      longDescription:
        "Spearheading the development of a Canvas LMS clone using the MERN (MongoDB, Express.js, React.js, Node.js) stack, to create a scalable and responsive web application with course enrollment, content management, and user interaction features.\n\nEngineering RESTful APIs with Node.js and Express.js, and designing a MongoDB database schema for efficient data storage and retrieval to ensure seamless data flow and system reliability.\n\nThe application includes features such as course creation and management, assignment submission and grading, discussion forums, and a comprehensive gradebook. The frontend is built with React and styled with Material-UI for a clean, intuitive interface.\n\nImplemented role-based access control for students, instructors, and administrators, with different permissions and views for each role.",
      link: "https://github.com/lee-johnn/kambaz-react-web-app",
    },
    {
      title: "Stocks and Investment Portfolio",
      tech: "Java",
      description:
        "Designed a virtual investing platform in Java through the MVC architecture, fetching real-time stock data from Alpha Vantage API, enabling accurate and up-to-date portfolio analysis for beginner investors without real financial risk. Implemented portfolio performance tracking with graphic visuals and data plots for stock value and potential monitoring. Built an investment strategy simulator providing x-day moving averages and crossovers, allowing optimized trading decisions.",
      image: "/stocks.jpeg?height=200&width=400",
      longDescription:
        "Designed a virtual investing platform in Java through the MVC architecture, fetching real-time stock data from Alpha Vantage API, enabling accurate and up-to-date portfolio analysis for beginner investors without real financial risk.\n\nImplemented portfolio performance tracking with graphic visuals and data plots for stock value and potential monitoring. Built an investment strategy simulator providing x-day moving averages and crossovers, allowing optimized trading decisions.\n\nThe application features a Java Swing GUI for desktop use, with interactive charts and graphs for visualizing stock performance and portfolio growth over time. Users can create multiple portfolios, track different investment strategies, and compare performance metrics.\n\nThe system includes automated backtesting capabilities to evaluate investment strategies against historical data, helping users refine their approach before committing real funds. Data persistence is handled through serialization and local storage, with options to export reports in PDF and CSV formats.",
      link: "https://github.com/vitoriomexas311/Assignment5",
    },
    {
      title: "Hungry Hunt",
      tech: "SQL, Python",
      description:
        "Collaborated efficiently with 4 partners and implemented a restaurant finder and rating platform using MySQL and Python Flask, enabling users to share reviews and rate restaurants and dishes. Designed and implemented a REST API with 15+ endpoints, optimizing database queries by 30% for efficient retrieval, review submission, and rating calculations. Built an interactive Appsmith front-end with 8+ dynamic UI screens, integrating RESTful queries, enhancing user experience.",
      image: "/restaurant.jpg?height=200&width=400",
      longDescription:
        "Collaborated efficiently with 4 partners and implemented a restaurant finder and rating platform using MySQL and Python Flask, enabling users to share reviews and rate restaurants and dishes.\n\nDesigned and implemented a REST API with 15+ endpoints, optimizing database queries by 30% for efficient retrieval, review submission, and rating calculations. Built an interactive Appsmith front-end with 8+ dynamic UI screens, integrating RESTful queries, enhancing user experience.\n\nThe platform includes features such as geolocation-based restaurant recommendations, personalized user profiles with favorite cuisines and dietary preferences, and a comprehensive search system with filters for price range, cuisine type, and distance.\n\nImplemented a recommendation engine using collaborative filtering to suggest restaurants based on user preferences and past ratings. The database design includes normalized tables for restaurants, dishes, users, reviews, and ratings, with optimized indexes for fast query performance.",
      link: "https://github.com/DataGrippers/hungry-hunt",
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "experience", "projects"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      })
    }
  }

  useEffect(() => {
    // Add ripple animation keyframes dynamically
    const style = document.createElement("style")
    style.innerHTML = `
    @keyframes ripple {
      0% {
        transform: translate(-50%, -50%) scale(0);
        opacity: 0.7;
      }
      100% {
        transform: translate(-50%, -50%) scale(4);
        opacity: 0;
      }
    }
  `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-blue-100">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold text-blue-600"
            >
              John Lee
            </motion.div>
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
              className="hidden md:flex space-x-8"
            >
              {["home", "about", "experience", "projects"].map((section) => (
                <li key={section}>
                  <RippleButton
                    onClick={() => scrollToSection(section)}
                    className={`text-sm font-medium transition-all duration-200 hover:text-blue-600 relative px-3 py-2 rounded-md ${
                      activeSection === section
                        ? "text-blue-600 after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-blue-600 after:bottom-0 after:left-0 hover:bg-blue-50/50"
                        : "text-gray-600 hover:bg-blue-50/50"
                    }`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </RippleButton>
                </li>
              ))}
            </motion.ul>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex space-x-4"
            >
              <Link href="https://github.com/lee-johnn" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 active:scale-90 transition-all duration-200"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>
              <Link href="https://www.linkedin.com/in/john-lee07/" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 active:scale-90 transition-all duration-200"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </Link>
            </motion.div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex-1 space-y-6"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">Hi, I&apos;m John Lee</h1>
              <div className="text-xl md:text-2xl lg:text-3xl font-medium text-blue-600 h-16">
                <Typewriter
                  options={{
                    strings: ["Student", "Developer", "Problem Solver"],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </div>
              <p className="text-lg text-gray-600 max-w-xl">
                Passionate about building innovative solutions and learning new technologies.
              </p>
              <div className="flex space-x-4 pt-4">
                <RippleButton
                  onClick={() => scrollToSection("projects")}
                  className="bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95 text-white transition-all duration-200 shadow-md hover:shadow-lg px-4 py-2 rounded-md font-medium"
                >
                  View My Work
                </RippleButton>
                <Button
                  onClick={() => scrollToSection("about")}
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  About Me
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-blue-200 shadow-lg"
            >
              <Image
                src="/circle.jpg?height=320&width=320"
                alt="John Lee"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex justify-center mt-16"
          >
            <button
              onClick={() => scrollToSection("about")}
              className="animate-bounce hover:animate-none hover:scale-110 active:scale-90 transition-transform p-2 rounded-full hover:bg-blue-50"
            >
              <ChevronDown className="h-8 w-8 text-blue-500" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About Me</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold text-gray-900">Who I Am</h3>
              <p className="text-gray-600">
                I&apos;m a Computer Science & Business Administration student at Northeastern University, passionate
                about developing innovative solutions to real-world problems. I enjoy working on projects that challenge
                me to learn new technologies and improve my skills.
              </p>
              <p className="text-gray-600">
                My interests span from full-stack development to data analysis, and I&apos;m always looking for
                opportunities to grow and contribute to meaningful projects.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold text-gray-900">Education</h3>
              <Card className="border-blue-200 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-blue-700">Northeastern University</CardTitle>
                  <CardDescription>Bachelor&apos;s in Computer Science & Business Administration</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">2023 - 2027</p>
                </CardContent>
                <CardFooter className="pt-0">
                  <div className="w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Work Experience</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </motion.div>
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <Card className="border-blue-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-1 bg-blue-50 p-6 flex items-center justify-center">
                    <div className="relative w-full h-40">
                      <Image
                        src="/northeastern.png?height=160&width=300"
                        alt="Northeastern University"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2 p-6">
                    <CardHeader className="px-0 pt-0">
                      <CardTitle className="text-xl text-blue-700">Office Assistant</CardTitle>
                      <CardDescription className="text-lg font-medium">
                        Northeastern University - College of Social Sciences and Humanities
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="px-0 py-4">
                      <ul className="space-y-2 list-disc list-inside text-gray-600">
                        <li>
                          Orchestrated comprehensive event logistics for department functions, including managing
                          invitations, scheduling, and catering services, ensuring the successful execution of faculty
                          and student events
                        </li>
                        <li>
                          Coordinated virtual meetings on Teams and Zoom for the Dean&apos;s Office, resulting in a 20%
                          increase in efficiency for communication and collaboration among faculty and staff members
                        </li>
                      </ul>
                    </CardContent>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Projects</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
              >
                <Card className="h-full border-blue-200 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="relative h-48 w-full">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl text-blue-700">{project.title}</CardTitle>
                        <CardDescription>{project.tech}</CardDescription>
                      </div>
                      <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                        Project
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="text-gray-600">
                    <p className="line-clamp-4">{project.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 active:scale-95 transition-all duration-200 hover:translate-x-1"
                        >
                          <span>Read More</span>
                          <ExternalLink className="ml-2 h-4 w-4 transition-transform" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[625px] max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-xl text-blue-700">{project.title}</DialogTitle>
                          <DialogDescription className="text-sm font-medium">{project.tech}</DialogDescription>
                        </DialogHeader>
                        <div className="relative h-48 w-full mt-4 mb-6">
                          <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                        <div className="space-y-4">
                          {project.longDescription?.split("\n\n").map((paragraph, i) => (
                            <p key={i} className="text-gray-600">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                        <div className="flex justify-end mt-6">
                          {project.link && (
                            <Link href={project.link} target="_blank" rel="noopener noreferrer">
                              <Button className="bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-200">
                                View Project
                                <ExternalLink className="ml-2 h-4 w-4" />
                              </Button>
                            </Link>
                          )}
                          <DialogClose asChild>
                            <Button variant="outline" className="ml-2">
                              Close
                            </Button>
                          </DialogClose>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-2xl font-bold text-blue-400 mb-4 md:mb-0"
            >
              John Lee
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex space-x-6"
            >
              <Link
                href="https://github.com/lee-johnn"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-300 transition-colors"
              >
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://www.linkedin.com/in/john-lee07/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-300 transition-colors"
              >
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 text-center text-gray-400 text-sm"
          >
            <p>&copy; {new Date().getFullYear()} John Lee. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}

