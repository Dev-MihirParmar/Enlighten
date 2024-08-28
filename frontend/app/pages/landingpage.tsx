'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Zap, Search, Bell, ThumbsUp, MessageSquare, Share2, Bookmark, PlayCircle, Code, FileText, ChevronUp, ChevronDown, Menu } from 'lucide-react'

export default function ContentPage() {
  const params = useParams()
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState('article')
  const [likeCount, setLikeCount] = useState(42)
  const [isLiked, setIsLiked] = useState(false)

  const toggleExpand = () => setIsExpanded(!isExpanded)

  const handleLike = () => {
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)
    setIsLiked(!isLiked)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="container flex h-16 items-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex items-center space-x-4"
          >
            <Zap className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-primary">Enlighten</h1>
          </motion.div>
          <div className="flex-1 px-4">
            <form className="flex items-center space-x-2">
              <Input
                type="search"
                placeholder="Search content, creators, courses..."
                className="w-full bg-muted"
              />
              <Button type="submit" size="icon" variant="ghost">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </form>
          </div>
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Discover</DropdownMenuItem>
                <DropdownMenuItem>Create</DropdownMenuItem>
                <DropdownMenuItem>Learn</DropdownMenuItem>
                <DropdownMenuItem>Community</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <motion.div whileHover={{ rotate: 20 }}>
              <Button size="icon" variant="ghost">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Notifications</span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@user" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <main className="flex-1 container py-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video bg-muted">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="Video: Advanced React Hooks and Performance Optimization"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </CardContent>
            </Card>
            <motion.div
              layout
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl">Advanced React Hooks and Performance Optimization</CardTitle>
                      <CardDescription>Published on June 15, 2023 by React Master</CardDescription>
                    </div>
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@reactmaster" />
                        <AvatarFallback>RM</AvatarFallback>
                      </Avatar>
                    </motion.div>
                  </div>
                </CardHeader>
                <CardContent>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex space-x-4 mb-4"
                  >
                    <Badge variant="secondary">React</Badge>
                    <Badge variant="secondary">JavaScript</Badge>
                    <Badge variant="secondary">Web Development</Badge>
                  </motion.div>
                  <Tabs defaultValue="article" className="w-full" onValueChange={setActiveTab}>
                    <TabsList>
                      <TabsTrigger value="article">
                        <FileText className="h-4 w-4 mr-2" />
                        Article
                      </TabsTrigger>
                      <TabsTrigger value="code">
                        <Code className="h-4 w-4 mr-2" />
                        Code
                      </TabsTrigger>
                      <TabsTrigger value="comments">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Comments
                      </TabsTrigger>
                    </TabsList>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                      >
                        <TabsContent value="article">
                          <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                            <h2 className="text-xl font-semibold mb-2">Introduction</h2>
                            <p className="mb-4">
                              React Hooks have revolutionized the way we write React components, allowing us to use state and other React features without writing a class. In this article, well dive deep into advanced hooks and explore techniques for optimizing performance in React applications.
                            </p>
                            <h2 className="text-xl font-semibold mb-2">useCallback and useMemo</h2>
                            <p className="mb-4">
                              Two powerful hooks for performance optimization are useCallback and useMemo. These hooks help prevent unnecessary re-renders by memoizing functions and values.
                            </p>
                            <h2 className="text-xl font-semibold mb-2">Custom Hooks</h2>
                            <p className="mb-4">
                              Creating custom hooks allows you to extract component logic into reusable functions. This not only makes your code more modular but can also lead to performance improvements when used correctly.
                            </p>
                            <h2 className="text-xl font-semibold mb-2">Performance Optimization Techniques</h2>
                            <p className="mb-4">
                              Beyond hooks, there are several other techniques you can use to optimize your React applications:
                            </p>
                            <ul className="list-disc pl-6 mb-4">
                              <li>Code splitting with React.lazy and Suspense</li>
                              <li>Virtualization for long lists</li>
                              <li>Memoization with React.memo</li>
                              <li>Optimizing context usage</li>
                            </ul>
                            <p>
                              By applying these techniques and understanding the intricacies of Reacts rendering behavior, you can create highly performant and scalable React applications.
                            </p>
                          </ScrollArea>
                        </TabsContent>
                        <TabsContent value="code">
                          <ScrollArea className="h-[400px] w-full rounded-md border">
                            <pre className="p-4 bg-muted">
                              <code>{`import React, { useState, useCallback, useMemo } from 'react';

function ExpensiveComponent({ data }) {
  return (
    <div>
      {/* Expensive rendering logic */}
    </div>
  );
}

function OptimizedComponent({ data }) {
  const [count, setCount] = useState(0);

  const expensiveCalculation = useMemo(() => {
    // Expensive calculation based on data
    return data.reduce((acc, item) => acc + item, 0);
  }, [data]);

  const handleClick = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <p>Expensive Calculation Result: {expensiveCalculation}</p>
      <button onClick={handleClick}>Increment</button>
      <ExpensiveComponent data={data} />
    </div>
  );
}

export default OptimizedComponent;`}</code>
                            </pre>
                          </ScrollArea>
                        </TabsContent>
                        <TabsContent value="comments">
                          <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                            <div className="space-y-4">
                              <div className="flex items-start space-x-4">
                                <Avatar>
                                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@user1" />
                                  <AvatarFallback>U1</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-semibold">User1</p>
                                  <p>Great video! The explanation of useCallback really cleared things up for me.</p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-4">
                                <Avatar>
                                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@user2" />
                                  <AvatarFallback>U2</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-semibold">User2</p>
                                  <p>Could you do a follow-up on custom hooks? Id love to see more examples of practical use cases.</p>
                                </div>
                              </div>
                            </div>
                          </ScrollArea>
                        </TabsContent>
                      </motion.div>
                    </AnimatePresence>
                  </Tabs>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center justify-between mt-4"
                  >
                    <div className="flex items-center space-x-4">
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button variant="ghost" size="sm" onClick={handleLike}>
                          <ThumbsUp className={`h-4 w-4 mr-2 ${isLiked ? 'text-blue-500' : ''}`} />
                          Like ({likeCount})
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Comment
                        </Button>
                      </motion.div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button variant="ghost" size="sm">
                          <Bookmark className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button variant="ghost" size="sm">
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card className="mt-6">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Related Content</CardTitle>
              <Button variant="ghost" size="sm" onClick={toggleExpand}>
                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CardHeader>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardContent>
                    <ScrollArea className="w-full">
                      <div className="flex space-x-4 pb-4 overflow-x-auto">
                        {[
                          { title: "React Performance Optimization Techniques", type: "video" },
                          { title: "Building Custom Hooks in React", type: "article" },
                          { title: "Advanced State Management with useReducer", type: "video" },
                          { title: "Mastering React's useEffect Hook", type: "article" },
                          { title: "React Server Components Explained", type: "video" },
                          { title: "Optimizing React Context", type: "article" }
                        ].map((content, index) => (
                          <motion.div
                            key={index}
                            className="flex-shrink-0 w-64"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Card>
                              <CardContent className="p-4">
                                <div className="relative w-full h-36 mb-2">
                                  <img
                                    src={`/placeholder.svg?height=150&width=250&text=${content.type}`}
                                    alt={`${content.title} thumbnail`}
                                    className="object-cover w-full h-full rounded"
                                  />
                                  {content.type === "video" && (
                                    <PlayCircle className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white/80" />
                                  )}
                                </div>
                                <h3 className="font-semibold text-sm mb-1">{content.title}</h3>
                                <p className="text-xs text-muted-foreground capitalize">{content.type}</p>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </main>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="border-t py-6 text-center text-sm text-muted-foreground"
      >
        <div className="container">
          <div className="flex justify-center space-x-4 mb-4">
            <Button variant="ghost" size="sm">About Us</Button>
            <Button variant="ghost" size="sm">Terms of Service</Button>
            <Button variant="ghost" size="sm">Privacy Policy</Button>
            <Button variant="ghost" size="sm">Contact</Button>
          </div>
          <p>© 2023 Enlighten. All rights reserved.</p>
        </div>
      </motion.footer>
    </div>
  )
}