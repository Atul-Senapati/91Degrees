import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import AnimatedSection from "@/components/animated-section";
import { BlogHeader } from "@/components/blog-header";
import { BlogSidebar } from "@/components/blog-sidebar";
import { blogPosts } from "@/lib/blog-data";

export const metadata = {
  title: "Blog - 91 Degrees",
  description:
    "Read the latest articles, product stories, and health tips from 91 Degrees.",
};

export default function BlogPage() {
  // Get featured post (most recent)
  const featuredPost = blogPosts[0];

  // Group posts by category
  const productStories = blogPosts.filter(
    (post) => post.category === "Product Story"
  );
  const healthTips = blogPosts.filter(
    (post) => post.category === "Health Tips"
  );
  const sustainability = blogPosts.filter(
    (post) => post.category === "Sustainability"
  );

  return (
    <div className="flex flex-col min-h-screen">
      <BlogHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-8 md:py-16 bg-pink-50 dark:bg-pink-950/30 transition-colors duration-300">
          <div className="container px-4 md:px-6">
            <AnimatedSection>
              <div className="max-w-3xl mx-auto text-center space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter">
                  91 Degrees Blog
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-gray-500 dark:text-gray-400">
                  Discover product stories, health tips, and insights about
                  women's wellness and sustainable living.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Featured Post */}
        <section className="w-full py-8 md:py-12">
          <div className="container px-4 md:px-6">
            <AnimatedSection>
              <h2 className="text-2xl font-bold tracking-tight mb-6">
                Featured Article
              </h2>
              <div className="grid md:grid-cols-5 gap-6">
                <Card className="md:col-span-3 overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <div className="aspect-video relative">
                    <Image
                      src={featuredPost.coverImage || "/placeholder.svg"}
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        variant="outline"
                        className="bg-pink-100 dark:bg-pink-900/50 text-pink-800 dark:text-pink-300 hover:bg-pink-200 dark:hover:bg-pink-800/50"
                      >
                        {featuredPost.category}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {featuredPost.date}
                      </span>
                    </div>
                    <CardTitle className="text-2xl">
                      {featuredPost.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {featuredPost.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button
                      asChild
                      className="transition-all duration-300 hover:bg-pink-600 dark:hover:bg-pink-700"
                    >
                      <Link href={`/blog/${featuredPost.slug}`}>
                        Read More <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>

                <div className="md:col-span-2">
                  <BlogSidebar />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Blog Categories */}
        <section className="w-full py-8 md:py-12 bg-pink-50 dark:bg-pink-950/30 transition-colors duration-300">
          <div className="container px-4 md:px-6">
            <AnimatedSection>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-8 transition-all duration-300">
                  <TabsTrigger
                    value="all"
                    className="text-xs sm:text-sm transition-all duration-300 data-[state=active]:bg-pink-100 dark:data-[state=active]:bg-pink-900/50"
                  >
                    All Posts
                  </TabsTrigger>
                  <TabsTrigger
                    value="product-stories"
                    className="text-xs sm:text-sm transition-all duration-300 data-[state=active]:bg-pink-100 dark:data-[state=active]:bg-pink-900/50"
                  >
                    Product Stories
                  </TabsTrigger>
                  <TabsTrigger
                    value="health-tips"
                    className="text-xs sm:text-sm transition-all duration-300 data-[state=active]:bg-pink-100 dark:data-[state=active]:bg-pink-900/50"
                  >
                    Health Tips
                  </TabsTrigger>
                  <TabsTrigger
                    value="sustainability"
                    className="text-xs sm:text-sm transition-all duration-300 data-[state=active]:bg-pink-100 dark:data-[state=active]:bg-pink-900/50"
                  >
                    Sustainability
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-0">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogPosts.map((post) => (
                      <BlogPostCard key={post.slug} post={post} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="product-stories" className="mt-0">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {productStories.map((post) => (
                      <BlogPostCard key={post.slug} post={post} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="health-tips" className="mt-0">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {healthTips.map((post) => (
                      <BlogPostCard key={post.slug} post={post} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="sustainability" className="mt-0">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sustainability.map((post) => (
                      <BlogPostCard key={post.slug} post={post} />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </AnimatedSection>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="w-full py-8 md:py-16">
          <div className="container px-4 md:px-6">
            <AnimatedSection>
              <div className="max-w-3xl mx-auto text-center space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Stay Updated
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Subscribe to our newsletter for the latest articles, product
                  updates, and exclusive offers.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <Button className="transition-all duration-300 hover:bg-pink-600 dark:hover:bg-pink-700">
                    Subscribe
                  </Button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <footer className="w-full border-t py-6 transition-colors duration-300">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-gray-500 dark:text-gray-400 md:text-left">
            © 2025 91 Degrees. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <Link
              href="#"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-300"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function BlogPostCard({ post }: any) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="aspect-video relative">
        <Image
          src={post.coverImage || "/placeholder.svg"}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Badge
            variant="outline"
            className="bg-pink-100 dark:bg-pink-900/50 text-pink-800 dark:text-pink-300 hover:bg-pink-200 dark:hover:bg-pink-800/50"
          >
            {post.category}
          </Badge>
          <span className="text-sm text-muted-foreground">{post.date}</span>
        </div>
        <CardTitle className="line-clamp-2">{post.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {post.excerpt}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button
          variant="outline"
          asChild
          className="w-full transition-all duration-300 hover:bg-pink-100 dark:hover:bg-pink-900/30"
        >
          <Link href={`/blog/${post.slug}`}>Read Article</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
