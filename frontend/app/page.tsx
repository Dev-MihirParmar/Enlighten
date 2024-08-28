'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Zap, Search, Bell, Menu, Home, Compass, PenTool, Lightbulb, Users, Sun, Moon, X, Github, Video, FileText, Code, Award, TrendingUp } from 'lucide-react';
import { Label } from "@/components/ui/label";

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

type LoginSignupModalProps = {
  isOpen: boolean;
  onClose: () => void;
  setIsLoggedIn: (value: boolean) => void;
};

const LoginSignupModal = ({ isOpen, onClose, setIsLoggedIn }: LoginSignupModalProps) => {
  const [activeTab, setActiveTab] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${backendUrl}/api/auth/${activeTab}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: activeTab === 'signup' ? name : undefined,
          email,
          password,
        }),
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        setIsLoggedIn(true);
        onClose();
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 50, opacity: 0 }}
            transition={{ type: "spring", damping: 15 }}
            className="bg-white dark:bg-gray-800 bg-opacity-90 rounded-lg shadow-xl w-full max-w-md relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="flex">
              <motion.button
                className={`flex-1 py-4 text-lg font-semibold ${activeTab === 'login' ? 'bg-primary text-primary-foreground' : 'bg-gray-100 dark:bg-gray-700'}`}
                onClick={() => setActiveTab('login')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.button>
              <motion.button
                className={`flex-1 py-4 text-lg font-semibold ${activeTab === 'signup' ? 'bg-primary text-primary-foreground' : 'bg-gray-100 dark:bg-gray-700'}`}
                onClick={() => setActiveTab('signup')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Up
              </motion.button>
            </div>

            <div className="p-8">
              <AnimatePresence mode="wait">
                <motion.form
                  key={activeTab}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                  onSubmit={handleSubmit}
                >
                  {activeTab === 'signup' && (
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Input id="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
                      </motion.div>
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Input id="email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </motion.div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Input id="password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </motion.div>
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="w-full" size="lg" type="submit">
                      {activeTab === 'login' ? 'Log In' : 'Sign Up'}
                    </Button>
                  </motion.div>
                </motion.form>
              </AnimatePresence>

              <div className="mt-6 space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white dark:bg-gray-800 px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" className="w-full" onClick={() => window.location.href = `${backendUrl}/api/auth/github`}>
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" className="w-full" onClick={() => window.location.href = `${backendUrl}/api/auth/google`}>
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                        <path d="M1 1h22v22H1z" fill="none" />
                      </svg>
                      Google
                    </Button>
                  </motion.div>
                </div>
              </div>

              <div className="mt-6 text-center text-sm text-gray-500">
                {activeTab === 'login' ? (
                  <p>Dont have an account? <button onClick={() => setActiveTab('signup')} className="text-primary hover:underline">Sign up</button></p>
                ) : (
                  <p>Already have an account? <button onClick={() => setActiveTab('login')} className="text-primary hover:underline">Log in</button></p>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  useEffect(() => {
    // Apply dark mode based on the state
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    // Check login status
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, [darkMode])

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

  return (
    <div className={`flex flex-col min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-700`}>
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 dark:bg-gray-800 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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

          <Link href="/creatorpage">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline" className="animate-pulse">
                Switch to Creator
              </Button>
            </motion.div>
            </Link>
            <Button size="icon" variant="ghost">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? (
                <Sun className="h-6 w-6" />
              ) : (
                <Moon className="h-6 w-6" />
              )}
            </Button>
            {isLoggedIn ? (
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@user" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            ) : (
              <Button onClick={() => setShowLoginModal(true)}>Sign In</Button>
            )}
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className={`w-64 border-r bg-background dark:bg-gray-800 ${sidebarOpen ? 'block' : 'hidden'} lg:block`}>
          <ScrollArea className="h-full py-4">
            <nav className="space-y-2 px-2">
              <Link href="/" passHref>
                <Button variant="ghost" className="w-full justify-start">
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Button>
              </Link>
              <Link href="/discoverpage" passHref>
                <Button variant="ghost" className="w-full justify-start">
                  <Compass className="mr-2 h-4 w-4" />
                  Discover
                </Button>
              </Link>
              <Link href="/create" passHref>
                <Button variant="ghost" className="w-full justify-start">
                  <PenTool className="mr-2 h-4 w-4" />
                  Create
                </Button>
              </Link>
              <Link href="/learn" passHref>
                <Button variant="ghost" className="w-full justify-start">
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Learn
                </Button>
              </Link>
              <Link href="/community" passHref>
                <Button variant="ghost" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Community
                </Button>
              </Link>
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
                  <Card className="bg-gradient-to-br from-purple-100 to-blue-100 dark:from-gray-800 dark:to-gray-900">
                    <CardHeader>
                      <CardTitle>Upload Content</CardTitle>
                      <CardDescription>Share your knowledge</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col space-y-2">
                        <Link href="/upload/video" passHref>
                          <Button variant="outline" size="sm">
                            <Video className="h-4 w-4 mr-2" />
                            Upload Video
                          </Button>
                        </Link>
                        <Link href="/upload/article" passHref>
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4 mr-2" />
                            Write Article
                          </Button>
                        </Link>
                        <Link href="/upload/code" passHref>
                          <Button variant="outline" size="sm">
                            <Code className="h-4 w-4 mr-2" />
                            Share Code
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Card className="bg-gradient-to-br from-green-100 to-teal-100 dark:from-gray-800 dark:to-teal-900">
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
                  <Card className="bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-gray-800 dark:to-orange-900">
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
                  <Card className="bg-gradient-to-br from-pink-100 to-red-100 dark:from-gray-800 dark:to-red-900">
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
      <footer className="border-t py-6 text-center text-sm text-muted-foreground dark:text-gray-400">
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
      <LoginSignupModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        setIsLoggedIn={setIsLoggedIn}
      />
    </div>
  )
}
