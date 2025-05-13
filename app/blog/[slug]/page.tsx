import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AnimatedSection from "@/components/animated-section";
import { BlogHeader } from "@/components/blog-header";
import { blogPosts } from "@/lib/blog-data";

export async function generateMetadata({ params }: any) {
  const post = blogPosts.find((post) => post.slug === params.slug);

  if (!post) {
    return {
      title: "Blog Post Not Found - 91 Degrees",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${post.title} - 91 Degrees Blog`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: any) {
  const post = blogPosts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Get related posts (same category, excluding current post)
  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <BlogHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-8 md:py-16 bg-pink-50 dark:bg-pink-950/30 transition-colors duration-300">
          <div className="container px-4 md:px-6">
            <Button variant="ghost" asChild className="mb-6 group">
              <Link href="/blog" className="flex items-center text-sm">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Blog
              </Link>
            </Button>

            <AnimatedSection>
              <div className="max-w-3xl mx-auto space-y-4">
                <Badge className="bg-pink-100 dark:bg-pink-900/50 text-pink-800 dark:text-pink-300 hover:bg-pink-200 dark:hover:bg-pink-800/50">
                  {post.category}
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <User className="mr-1 h-4 w-4" />
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    {post.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    {post.readTime} min read
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Featured Image */}
        <section className="w-full py-8">
          <div className="container px-4 md:px-6">
            <AnimatedSection>
              <div className="max-w-4xl mx-auto aspect-video relative rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={post.coverImage || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Blog Content */}
        <section className="w-full py-8">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Social Share Sidebar */}
              <AnimatedSection className="hidden md:block">
                <div className="sticky top-24 space-y-4">
                  <h3 className="text-sm font-medium">Share this article</h3>
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full transition-colors duration-300 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400"
                    >
                      <Facebook className="h-4 w-4" />
                      <span className="sr-only">Share on Facebook</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full transition-colors duration-300 hover:bg-sky-100 hover:text-sky-600 dark:hover:bg-sky-900/30 dark:hover:text-sky-400"
                    >
                      <Twitter className="h-4 w-4" />
                      <span className="sr-only">Share on Twitter</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full transition-colors duration-300 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400"
                    >
                      <Linkedin className="h-4 w-4" />
                      <span className="sr-only">Share on LinkedIn</span>
                    </Button>
                  </div>
                </div>
              </AnimatedSection>

              {/* Main Content */}
              <AnimatedSection className="md:col-span-3">
                <article className="max-w-3xl prose dark:prose-invert prose-pink prose-img:rounded-lg prose-headings:font-bold prose-p:text-gray-700 dark:prose-p:text-gray-300">
                  <p className="lead">{post.excerpt}</p>

                  {post.content.map((section, index) => (
                    <div key={index}>
                      {section.type === "paragraph" && <p>{section.content}</p>}
                      {section.type === "heading" && <h2>{section.content}</h2>}
                      {section.type === "subheading" && (
                        <h3>{section.content}</h3>
                      )}
                      {section.type === "image" && (
                        <figure>
                          <div className="aspect-video relative rounded-lg overflow-hidden">
                            <Image
                              src={section.src || "/placeholder.svg"}
                              alt={section.alt || "Blog image"}
                              fill
                              className="object-cover"
                            />
                          </div>
                          {section.caption && (
                            <figcaption className="text-center">
                              {section.caption}
                            </figcaption>
                          )}
                        </figure>
                      )}
                      {section &&
                        section?.items &&
                        section?.type === "list" && (
                          <ul>
                            {section?.items?.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        )}
                      {section.type === "quote" && (
                        <blockquote>
                          <p>{section.content}</p>
                          {section.author && <cite>— {section.author}</cite>}
                        </blockquote>
                      )}
                    </div>
                  ))}
                </article>

                {/* Mobile Share Buttons */}
                <div className="md:hidden mt-8">
                  <h3 className="text-sm font-medium mb-2">
                    Share this article
                  </h3>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full transition-colors duration-300 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400"
                    >
                      <Facebook className="h-4 w-4" />
                      <span className="sr-only">Share on Facebook</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full transition-colors duration-300 hover:bg-sky-100 hover:text-sky-600 dark:hover:bg-sky-900/30 dark:hover:text-sky-400"
                    >
                      <Twitter className="h-4 w-4" />
                      <span className="sr-only">Share on Twitter</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full transition-colors duration-300 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400"
                    >
                      <Linkedin className="h-4 w-4" />
                      <span className="sr-only">Share on LinkedIn</span>
                    </Button>
                  </div>
                </div>

                {/* Author Bio */}
                <div className="mt-12 p-6 bg-pink-50 dark:bg-pink-950/30 rounded-lg transition-colors duration-300">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden relative">
                      <Image
                        src="/placeholder.svg?height=48&width=48"
                        alt={post.author}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{post.author}</h3>
                      <p className="text-sm text-muted-foreground">
                        Content Writer at 91 Degrees
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                    Passionate about women's health and sustainable living.
                    Dedicated to creating informative content that empowers
                    women to make informed choices about their well-being.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        <section className="w-full py-8 md:py-16 bg-pink-50 dark:bg-pink-950/30 transition-colors duration-300">
          <div className="container px-4 md:px-6">
            <AnimatedSection>
              <h2 className="text-2xl font-bold tracking-tight mb-8">
                Related Articles
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Card
                    key={relatedPost.slug}
                    className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="aspect-video relative">
                      <Image
                        src={relatedPost.coverImage || "/placeholder.svg"}
                        alt={relatedPost.title}
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
                          {relatedPost.category}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {relatedPost.date}
                        </span>
                      </div>
                      <CardTitle className="line-clamp-2">
                        {relatedPost.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {relatedPost.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button
                        variant="outline"
                        asChild
                        className="w-full transition-all duration-300 hover:bg-pink-100 dark:hover:bg-pink-900/30"
                      >
                        <Link href={`/blog/${relatedPost.slug}`}>
                          Read Article
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
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
