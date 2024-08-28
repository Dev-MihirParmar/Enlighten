'use client';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Zap, Video, FileText, Code, Sun, Moon, Menu, Home, Compass, PenTool, Lightbulb, Users, X, Upload, ArrowLeft } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";




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

  return (
    <Link href="/">
      <Zap className="h-6 w-6" style={{ color }} />
    </Link>
  );
};

const LiveUserCount = () => {
  const [count, setCount] = useState(1000);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + Math.floor(Math.random() * 10));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="flex items-center space-x-2 text-sm"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
      <span>{count.toLocaleString()} users online</span>
    </motion.div>
  );
};

export default function CreateContent() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [codeSnippet, setCodeSnippet] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [contentType, setContentType] = useState<'article' | 'video' | 'code'>('article');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const handleAddTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', contentType === 'article' ? content : codeSnippet);
      formData.append('contentType', contentType);
      formData.append('tags', JSON.stringify(tags));
      if (videoFile) {
        formData.append('file', videoFile);
      }

      const response = await fetch(`${backendUrl}/api/creator/upload`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        toast.success('Content uploaded successfully!');
        router.push(`/content/${data.id}`);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to upload content.');
      }
    } catch (error) {
      console.error('Error uploading content:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="flex flex-col min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-700"
    >
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 dark:bg-gray-800 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <motion.div
          className="container flex h-14 items-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Button variant="ghost" size="icon" className="mr-2 lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex items-center space-x-2">
            <AnimatedLogo />
            <Link href="/">
              <h1 className="text-xl font-bold">Enlighten</h1>
            </Link>
          </div>
          <div className="flex-1 px-4"></div>
          <div className="flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
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
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@user" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link href="/">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </header>
      <div className="flex flex-1">
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-64 border-r bg-background dark:bg-gray-800 lg:block"
            >
              <ScrollArea className="h-full py-4">
                <nav className="space-y-2 px-2">
                  {[
                    { href: '/', icon: Home, label: 'Home' },
                    { href: '/discover', icon: Compass, label: 'Discover' },
                    { href: '/create', icon: PenTool, label: 'Create' },
                    { href: '/learn', icon: Lightbulb, label: 'Learn' },
                    { href: '/community', icon: Users, label: 'Community' },
                  ].map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link href={item.href} passHref>
                        <Button variant="ghost" className="w-full justify-start">
                          <item.icon className="mr-2 h-4 w-4" />
                          {item.label}
                        </Button>
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </ScrollArea>
            </motion.aside>
          )}
        </AnimatePresence>
        <main className="flex-1 overflow-y-auto">
          <div className="container py-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                <TypeWriter text="Create Your Content" />
              </h2>
            </motion.div>
            <LiveUserCount />
            <form onSubmit={handleSubmit} className="space-y-6 mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Content Details</CardTitle>
                    <CardDescription>Fill in the details of your content</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter your content title"
                        required
                      />
                    </motion.div>

                    <Tabs value={contentType} onValueChange={(value) => setContentType(value as 'article' | 'video' | 'code')}>
                      <TabsList>
                        {[
                          { value: 'article', icon: FileText, label: 'Article' },
                          { value: 'video', icon: Video, label: 'Video' },
                          { value: 'code', icon: Code, label: 'Code' },
                        ].map((tab) => (
                          <motion.div
                            key={tab.value}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <TabsTrigger value={tab.value}>
                              <tab.icon className="mr-2 h-4 w-4" />
                              {tab.label}
                            </TabsTrigger>
                          </motion.div>
                        ))}
                      </TabsList>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={contentType}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.2 }}
                        >
                          <TabsContent value="article">
                            <Label htmlFor="article-content">Article Content</Label>
                            <Textarea
                              id="article-content"
                              value={content}
                              onChange={(e) => setContent(e.target.value)}
                              placeholder="Write your article here..."
                              className="min-h-[200px]"
                              required
                            />
                          </TabsContent>
                          <TabsContent value="video">
                            <Label htmlFor="video-upload">Upload Video</Label>
                            <div className="mt-2">
                              <motion.label
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
                              >
                                <span className="flex items-center space-x-2">
                                  <Upload className="w-6 h-6 text-gray-600" />
                                  <span className="font-medium text-gray-600">
                                    {videoFile ? videoFile.name : 'Drop files to Attach, or browse'}
                                  </span>
                                </span>
                                <input
                                  id="video-upload"
                                  type="file"
                                  accept="video/*"
                                  onChange={handleVideoUpload}
                                  className="hidden"
                                  required
                                />
                              </motion.label>
                            </div>
                          </TabsContent>
                          <TabsContent value="code">
                            <Label htmlFor="code-snippet">Code Snippet</Label>
                            <Textarea
                              id="code-snippet"
                              value={codeSnippet}
                              onChange={(e) => setCodeSnippet(e.target.value)}
                              placeholder="Paste your code snippet here..."
                              className="font-mono min-h-[200px]"
                              required
                            />
                          </TabsContent>
                        </motion.div>
                      </AnimatePresence>
                    </Tabs>

                    <div>
                      <Label htmlFor="tags">Tags</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="tags"
                          value={currentTag}
                          onChange={(e) => setCurrentTag(e.target.value)}
                          placeholder="Add tags..."
                        />
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button type="button" onClick={handleAddTag}>Add Tag</Button>
                        </motion.div>
                      </div>
                      <motion.div layout className="flex flex-wrap gap-2 mt-2">
                        <AnimatePresence>
                          {tags.map((tag) => (
                            <motion.div
                              key={tag}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Badge variant="secondary" className="flex items-center">
                                {tag}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-4 w-4 p-0 ml-2"
                                  onClick={() => handleRemoveTag(tag)}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </Badge>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </motion.div>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          >
                            <Zap className="mr-2 h-4 w-4" />
                          </motion.div>
                        ) : (
                          'Publish Content'
                        )}
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </form>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px] w-full rounded-md border p-4">
                    {content && videoFile ? (
                      <div className="space-y-8">
                        <motion.h2
                          className="text-3xl font-bold mb-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          {title || 'Your Title Here'}
                        </motion.h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            <h3 className="text-xl font-semibold mb-2">Video Content</h3>
                            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                              <video controls className="w-full h-full">
                                <source src={URL.createObjectURL(videoFile)} type={videoFile.type} />
                                Your browser does not support the video tag.
                              </video>
                            </div>
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                          >
                            <h3 className="text-xl font-semibold mb-2">Article Content</h3>
                            <div className="prose max-w-none">
                              {content}
                            </div>
                          </motion.div>
                        </div>
                        {codeSnippet && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                          >
                            <h3 className="text-xl font-semibold mb-2">Code Snippet</h3>
                            <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                              <code>{codeSnippet}</code>
                            </pre>
                          </motion.div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <motion.h2
                          className="text-2xl font-bold mb-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          {title || 'Your Title Here'}
                        </motion.h2>
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={contentType}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                          >
                            {contentType === 'article' && (
                              <div className="prose max-w-none">
                                {content || 'Your article content will appear here...'}
                              </div>
                            )}
                            {contentType === 'video' && (
                              <div className="aspect-video bg-muted flex items-center justify-center rounded-lg">
                                {videoFile ? (
                                  <video controls className="w-full h-full">
                                    <source src={URL.createObjectURL(videoFile)} type={videoFile.type} />
                                    Your browser does not support the video tag.
                                  </video>
                                ) : (
                                  <p className="text-muted-foreground">Video preview will appear here</p>
                                )}
                              </div>
                            )}
                            {contentType === 'code' && (
                              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                                <code>{codeSnippet || 'Your code snippet will appear here...'}</code>
                              </pre>
                            )}
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    )}
                    <motion.div layout className="mt-4 flex flex-wrap gap-2">
                      <AnimatePresence>
                        {tags.map((tag) => (
                          <motion.div
                            key={tag}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Badge variant="secondary">{tag}</Badge>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
      </div>
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="border-t py-6 text-center text-sm text-muted-foreground dark:text-gray-400"
      >
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
