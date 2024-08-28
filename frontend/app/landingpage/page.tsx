'use client'

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Zap, Sun, Moon, Search, Video, FileText, Code, ThumbsUp, MessageSquare, Share2, Bell, PlayCircle, ChevronUp, ChevronDown, Menu } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Author {
  name: string;
  initials: string;
}

interface RelatedContent {
  title: string;
  thumbnailUrl: string;
  type: string;
}

interface Content {
  title: string;
  description: string;
  type: string;
  category: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  content?: string;
  codeSnippet?: string;
  details?: string;
  author: Author;
  postedAt: string;
  relatedContent: RelatedContent[];
}

const TypeWriter = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [index, text]);

  return <span>{displayText}</span>;
};

const AnimatedLogo = () => {
  const [color, setColor] = useState('#000000');

  useEffect(() => {
    const interval = setInterval(() => {
      setColor(`hsl(${Math.random() * 360}, 100%, 50%)`);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return <Zap className="h-6 w-6" style={{ color }} />;
};

const LiveUserCount = () => {
  const [count, setCount] = useState(1000);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 10));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div className="flex items-center space-x-2 text-sm" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
      <span>{count.toLocaleString()} users online</span>
    </motion.div>
  );
};

export default function Component() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('video');
  const [likeCount, setLikeCount] = useState(42);
  const [isLiked, setIsLiked] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`/api/content/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch content');
        }
        const data: Content = await response.json();
        setContent(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [id]);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const handleLike = () => {
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    setIsLiked(!isLiked);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!content) {
    return <div>No content available</div>;
  }

  return (
    <motion.div initial="initial" animate="in" exit="out" className={`flex flex-col min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-700`}>
      <motion.header initial={{ y: -100 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 100 }} className="sticky top-0 z-50 w-full border-b bg-background/95 dark:bg-gray-800 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <motion.div whileHover={{ scale: 1.1 }} className="flex items-center space-x-4">
            <AnimatedLogo />
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">Enlighten</h1>
          </motion.div>
          <div className="flex-1 px-4">
            <form className="flex items-center space-x-2">
              <Input type="search" placeholder="Search content, creators, courses..." className="w-full bg-muted" />
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
              <Button variant="ghost" size="icon" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@user" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <main className="flex-1 container py-6">
        <section className="mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
              <TypeWriter text={content.title} />
            </h2>
          </motion.div>
          <LiveUserCount />
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="mt-4 text-lg text-muted-foreground">
            {content.description}
          </motion.p>
        </section>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>{content.type === 'video' ? 'Featured Video' : content.type === 'article' ? 'Featured Article' : 'Featured Code'}</CardTitle>
              <CardDescription>{content.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  {content.type === 'video' && (
                    <TabsTrigger value="video">
                      <Video className="mr-2 h-4 w-4" />
                      Video
                    </TabsTrigger>
                  )}
                  {content.type === 'article' && (
                    <TabsTrigger value="article">
                      <FileText className="mr-2 h-4 w-4" />
                      Article
                    </TabsTrigger>
                  )}
                  {content.type === 'code' && (
                    <TabsTrigger value="code">
                      <Code className="mr-2 h-4 w-4" />
                      Code
                    </TabsTrigger>
                  )}
                </TabsList>
                <AnimatePresence mode="wait">
                  <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.2 }}>
                    <TabsContent value="video" className="space-y-4">
                      <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                        <video controls className="w-full h-full">
                          <source src={content.videoUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                      <h3 className="text-2xl font-semibold">{content.title}</h3>
                      <p className="text-muted-foreground">{content.details}</p>
                    </TabsContent>
                    <TabsContent value="article" className="space-y-4">
                      <img src={content.thumbnailUrl} alt="Article thumbnail" className="w-full rounded-lg" />
                      <h3 className="text-2xl font-semibold">{content.title}</h3>
                      <p className="text-muted-foreground">{content.content}</p>
                    </TabsContent>
                    <TabsContent value="code" className="space-y-4">
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                        <code>{content.codeSnippet}</code>
                      </pre>
                      <h3 className="text-2xl font-semibold">{content.title}</h3>
                      <p className="text-muted-foreground">{content.details}</p>
                    </TabsContent>
                  </motion.div>
                </AnimatePresence>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt={content.author.name} />
                      <AvatarFallback>{content.author.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{content.author.name}</p>
                      <p className="text-sm text-muted-foreground">Posted {content.postedAt}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" onClick={handleLike}>
                      <ThumbsUp className={`mr-2 h-4 w-4 ${isLiked ? 'text-blue-500' : ''}`} />
                      {likeCount}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      180
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
          <Card className="mt-6">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Related Content</CardTitle>
              <Button variant="ghost" size="sm" onClick={toggleExpand}>
                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CardHeader>
            <AnimatePresence>
              {isExpanded && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                  <CardContent>
  <ScrollArea className="w-full overflow-x-auto">
    <div className="flex space-x-4 pb-4">
      {content.relatedContent.map((related, index) => (
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
                  src={related.thumbnailUrl}
                  alt={`${related.title} thumbnail`}
                  className="object-cover w-full h-full rounded"
                />
                {related.type === "video" && (
                  <PlayCircle className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white/80" />
                )}
              </div>
              <h3 className="font-semibold text-sm mb-1">{related.title}</h3>
              <p className="text-xs text-muted-foreground capitalize">{related.type}</p>
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

      <motion.footer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="border-t py-6 text-center text-sm text-muted-foreground dark:text-gray-400">
        <div className="container">
          <div className="flex justify-center space-x-4 mb-4">
            {['About Us', 'Terms of Service', 'Privacy Policy', 'Contact'].map((item) => (
              <motion.div key={item} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="sm">{item}</Button>
              </motion.div>
            ))}
          </div>
          <p>© 2023 Enlighten. All rights reserved.</p>
        </div>
      </motion.footer>
    </motion.div>
  );
}
