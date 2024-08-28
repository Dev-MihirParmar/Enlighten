'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Confetti from 'react-confetti'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Zap, Search, Bell, Menu, Home, Compass, PenTool, Lightbulb, Users, PlayCircle, Code, Video, FileText, Folder, TrendingUp, Award } from 'lucide-react'

const TypeWriter = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('')
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[index])
        setIndex(index + 1)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [index, text])

  return <span>{displayText}</span>
}

const AnimatedLogo = () => {
  const [color, setColor] = useState('#000000')

  useEffect(() => {
    const interval = setInterval(() => {
      setColor(`hsl(${Math.random() * 360}, 100%, 50%)`)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return <Zap className="h-6 w-6" style={{ color }} />
}

const LiveUserCount = () => {
  const [count, setCount] = useState(1000)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 10))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center space-x-2 text-sm">
      <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
      <span>{count.toLocaleString()} users online</span>
    </div>
  )
}

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  useEffect(() => {
    // Simulating a check for user login status
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
      setIsLoggedIn(loggedIn)
    }
    checkLoginStatus()
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Button variant="ghost" size="icon" className="mr-2 lg:hidden" onClick={toggleSidebar}>
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex items-center space-x-2">
            <AnimatedLogo />
            <h1 className="text-xl font-bold">Enlighten</h1>
          </div>
          <div className="flex-1 px-4">
            <form className="flex items-center space-x-2">
              <div className="relative w-full">
                <Input
                  type="search"
                  placeholder="Search content, creators, courses..."
                  className="w-full pr-10"
                />
                <Button type="submit" size="sm" className="absolute right-0 top-0 h-full">
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Search</span>
                </Button>
              </div>
            </form>
          </div>
          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline" className="animate-pulse">
                Switch to Creator
              </Button>
            </motion.div>
            <Button size="icon" variant="ghost">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
            </Button>
            {isLoggedIn ? (
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@user" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            ) : (
              <Link href="/signin">
                <Button>Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className={`w-64 border-r bg-background ${sidebarOpen ? 'block' : 'hidden'} lg:block`}>
          <ScrollArea className="h-full py-4">
            <nav className="space-y-2 px-2">
              <Button variant="ghost" className="w-full justify-start">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Compass className="mr-2 h-4 w-4" />
                Discover
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <PenTool className="mr-2 h-4 w-4" />
                Create
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Lightbulb className="mr-2 h-4 w-4" />
                Learn
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Community
              </Button>
            </nav>
          </ScrollArea>
        </aside>
        <main className="flex-1 overflow-y-auto">
          <div className="container py-6">
            <section className="mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                  <TypeWriter text="Welcome to Enlighten" />
                </h2>
              </motion.div>
              <LiveUserCount />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Card className="bg-gradient-to-br from-purple-100 to-blue-100">
                    <CardHeader>
                      <CardTitle>Upload Content</CardTitle>
                      <CardDescription>Share your knowledge</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col space-y-2">
                        <Button variant="outline" size="sm">
                          <Video className="h-4 w-4 mr-2" />
                          Upload Video
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          Write Article
                        </Button>
                        <Button variant="outline" size="sm">
                          <Code className="h-4 w-4 mr-2" />
                          Share Code
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Card className="bg-gradient-to-br from-green-100 to-teal-100">
                    <CardHeader>
                      <CardTitle>Interactive Learning</CardTitle>
                      <CardDescription>Engage with content</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Button size="sm" className="w-full" onClick={() => setShowConfetti(true)}>Join Live Session</Button>
                        <Button variant="outline" size="sm" className="w-full">Code Playground</Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Card className="bg-gradient-to-br from-yellow-100 to-orange-100">
                    <CardHeader>
                      <CardTitle>Your Journey</CardTitle>
                      <CardDescription>Track progress</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span>Courses</span>
                          <Badge>5</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Badges</span>
                          <Badge>12</Badge>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          <Award className="h-4 w-4 mr-2" />
                          Certifications
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Card className="bg-gradient-to-br from-pink-100 to-red-100">
                    <CardHeader>
                      <CardTitle>Collaboration</CardTitle>
                      <CardDescription>Work together</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Button size="sm" className="w-full">Create Workspace</Button>
                        <Button variant="outline" size="sm" className="w-full">Join Workspace</Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Trending Now</h2>
              <Tabs defaultValue="all" className="w-full">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="videos">Videos</TabsTrigger>
                  <TabsTrigger value="articles">Articles</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <AnimatePresence mode="wait">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TabsContent value="all">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                          { type: "video", title: "Intro to Machine Learning", author: "AI Expert", views: "100K" },
                          { type: "article", title: "Clean Code Practices", author: "Code Guru", reads: "50K" },
                          { type: "code", title: "Efficient Sorting Algorithm", author: "Algorithm Master", stars: "2K" },
                          { type: "video", title: "Advanced React Hooks", author: "Frontend Pro", views: "75K" },
                        ].map((content, index) => (
                          <motion.div key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link href={`/content/${content.type}/${index}`}>
                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-sm flex items-center">
                                    {content.type === "video" && <Video className="h-4 w-4 mr-2" />}
                                    {content.type === "article" && <FileText className="h-4 w-4 mr-2" />}
                                    {content.type === "code" && <Code className="h-4 w-4 mr-2" />}
                                    {content.title}
                                  </CardTitle>
                                  <CardDescription className="text-xs">{content.author}</CardDescription>
                                </CardHeader>
                                <CardFooter>
                                  <div className="flex items-center text-xs text-muted-foreground">
                                    <TrendingUp className="h-3 w-3 mr-1" />
                                    {content.views || content.reads || `${content.stars} stars`}
                                  </div>
                                </CardFooter>
                              </Card>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </TabsContent>
                  </motion.div>
                </AnimatePresence>
              </Tabs>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Explore Topics</h2>
              <div className="flex flex-wrap gap-2">
                {["Web Dev", "Data Science", "Mobile Apps", "AI & ML", "DevOps", "Cybersecurity", "Blockchain", "UX/UI", "Game Dev", "Cloud"].map((topic) => (
                  <motion.div key={topic} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button variant="outline" size="sm">
                      {topic}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-6">Community Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Contributors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[200px]">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <motion.div key={i} whileHover={{ scale: 1.05 }} className="flex items-center space-x-4 mb-4">
                          <Avatar>
                            <AvatarImage src={`/placeholder.svg?height=40&width=40&text=TC${i}`} alt={`Top contributor ${i}`} />
                            <AvatarFallback>TC</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">Contributor {i}</p>
                            <p className="text-xs text-muted-foreground">1{i}0 contributions this week</p>
                          </div>
                        </motion.div>
                      ))}
                    </ScrollArea>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[200px]">
                      {[
                        "AI Hackathon - June 15",
                        "Web Dev Workshops - Every Tuesday",
                        "Code Review Challenge - July 1-7",
                        "Data Science Webinar - June 20",
                        "Open Source Day - Last Saturday"
                      ].map((event, index) => (
                        <motion.div key={index} whileHover={{ scale: 1.05 }} className="mb-4">
                          <p className="text-sm font-semibold">{event}</p>
                        </motion.div>
                      ))}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
        </main>
      </div>
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        <div className="container">
          <div className="flex justify-center space-x-4 mb-4">
            <Button variant="ghost" size="sm">About Us</Button>
            <Button variant="ghost" size="sm">Terms of Service</Button>
            <Button variant="ghost" size="sm">Privacy Policy</Button>
            <Button variant="ghost" size="sm">Contact</Button>
          </div>
          <p>© 2023 Enlighten. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}