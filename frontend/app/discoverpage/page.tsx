'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Zap, Search, Bell, Menu, Home, Compass, PenTool, Lightbulb, Users } from 'lucide-react';

// Define the type for content items
interface ContentItem {
  id: string;
  title: string;
  thumbnailUrl: string;
  channelName: string;
  views: string;
  timeAgo: string;
  type: string; // 'article', 'video', etc.
}

export default function Component() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [trendingContent, setTrendingContent] = useState<ContentItem[]>([]);
  const [recommendedContent, setRecommendedContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [trendingRes, recommendedRes] = await Promise.all([
          fetch('/api/content/trending'),
          fetch('/api/content/recommended'),
        ]);

        if (!trendingRes.ok || !recommendedRes.ok) {
          throw new Error('Failed to fetch content');
        }

        const [trendingData, recommendedData] = await Promise.all([
          trendingRes.json(),
          recommendedRes.json(),
        ]);

        setTrendingContent(trendingData);
        setRecommendedContent(recommendedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Button variant="ghost" size="icon" className="mr-2" onClick={toggleSidebar}>
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex items-center space-x-2">
            <Zap className="h-6 w-6" />
            <h1 className="text-xl font-bold">Enlighten</h1>
          </div>
          <div className="flex items-center space-x-4 ml-auto">
            <form className="flex items-center space-x-2">
              <Input
                type="search"
                placeholder="Search..."
                className="w-[300px] bg-muted"
              />
              <Button type="submit" size="icon" variant="ghost">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </form>
            <Button size="icon" variant="ghost">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@user" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
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
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Welcome to Enlighten
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                    Discover, learn, and create with our innovative platform combining the best of video content and in-depth articles.
                  </p>
                </div>
                <div className="space-x-4">
                  <Button>Get Started</Button>
                  <Button variant="outline">Learn More</Button>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-12">
            <div className="container px-4 md:px-6">
              <h2 className="text-2xl font-bold tracking-tighter mb-4">Trending</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {trendingContent.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <Link href={`/content/${item.type}/${item.id}`}>
                        <img
                          alt={item.title}
                          className="object-cover w-full h-[180px]"
                          height="180"
                          src={item.thumbnailUrl}
                        />
                      </Link>
                      <div className="p-4">
                        <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{item.channelName}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{item.views} views • {item.timeAgo}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
          <section className="w-full py-12">
            <div className="container px-4 md:px-6">
              <h2 className="text-2xl font-bold tracking-tighter mb-4">Recommended</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {recommendedContent.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <Link href={`/content/${item.type}/${item.id}`}>
                        <img
                          alt={item.title}
                          className="object-cover w-full h-[180px]"
                          height="180"
                          src={item.thumbnailUrl}
                        />
                      </Link>
                      <div className="p-4">
                        <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{item.channelName}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{item.views} views • {item.timeAgo}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Explore Our Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="flex flex-col items-center p-6">
                    <Compass className="h-12 w-12 mb-4 text-primary" />
                    <h3 className="text-lg font-semibold mb-2">Discover</h3>
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                      Explore a wide range of content from various creators and topics.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex flex-col items-center p-6">
                    <PenTool className="h-12 w-12 mb-4 text-primary" />
                    <h3 className="text-lg font-semibold mb-2">Create</h3>
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                      Share your knowledge by creating videos or writing articles.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex flex-col items-center p-6">
                    <Lightbulb className="h-12 w-12 mb-4 text-primary" />
                    <h3 className="text-lg font-semibold mb-2">Learn</h3>
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                      Access courses and tutorials to enhance your skills.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex flex-col items-center p-6">
                    <Users className="h-12 w-12 mb-4 text-primary" />
                    <h3 className="text-lg font-semibold mb-2">Community</h3>
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                      Connect with like-minded individuals and collaborate on projects.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </main>
      </div>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <Zap className="h-6 w-6" />
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Built by Enlighten. The source code is available on GitHub.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Link className="text-sm text-muted-foreground hover:underline" href="#">
              Terms of Service
            </Link>
            <Link className="text-sm text-muted-foreground hover:underline" href="#">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
