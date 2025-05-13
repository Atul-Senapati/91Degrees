import Link from "next/link"
import Image from "next/image"
import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { blogPosts } from "@/lib/blog-data"

export function BlogSidebar() {
  // Get popular posts (first 3)
  const popularPosts = blogPosts.slice(0, 3)

  // Get unique categories
  const categories = [...new Set(blogPosts.map((post) => post.category))]

  // Get unique tags
  const allTags = blogPosts.flatMap((post) => post.tags || [])
  const tags = [...new Set(allTags)]

  return (
    <div className="space-y-6">
      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input placeholder="Search articles..." />
            <Button size="icon" className="transition-all duration-300 hover:bg-pink-600 dark:hover:bg-pink-700">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Popular Posts */}
      <Card>
        <CardHeader>
          <CardTitle>Popular Posts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {popularPosts.map((post, index) => (
            <div key={post.slug} className="flex gap-3">
              <div className="h-16 min-w-16 relative rounded overflow-hidden flex-shrink-0">
                <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
              </div>
              <div className="flex flex-col">
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-medium line-clamp-2 hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-300"
                >
                  {post.title}
                </Link>
                <span className="text-xs text-muted-foreground">{post.date}</span>
              </div>
              {index < popularPosts.length - 1 }
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/blog?category=${category.toLowerCase().replace(/\s+/g, "-")}`}
                className="flex justify-between items-center group"
              >
                <span className="group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-300">
                  {category}
                </span>
                <Badge variant="outline" className="bg-pink-50 dark:bg-pink-950/30">
                  {blogPosts.filter((post) => post.category === category).length}
                </Badge>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tags */}
      <Card>
        <CardHeader>
          <CardTitle>Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="bg-pink-50 dark:bg-pink-950/30 hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-colors duration-300 cursor-pointer"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
