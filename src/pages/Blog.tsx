import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  readTime: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
    });

    // TODO: Load blog posts from markdown files
    // For now, showing placeholder
    setPosts([
      {
        slug: 'example-post',
        title: 'How Chess Builds Concentration in Children',
        date: '2025-10-27',
        excerpt: 'Discover how regular chess practice can significantly improve focus and concentration in young learners...',
        readTime: '5 min read'
      }
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container px-4 py-6">
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary/30 to-background py-20">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center" data-aos="fade-up">
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl mb-4">
              Chess Insights & Updates
            </h1>
            <p className="text-lg text-muted-foreground">
              Tips, strategies, and stories from Chan Chess Club
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container px-4">
          <div className="mx-auto max-w-5xl">
            {posts.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-lg text-muted-foreground mb-4">
                  No blog posts yet. Check back soon for updates!
                </p>
              </Card>
            ) : (
              <div className="grid gap-8 md:grid-cols-2">
                {posts.map((post, index) => (
                  <Link 
                    key={post.slug} 
                    to={`/blog/${post.slug}`}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <Card className="group overflow-hidden border-2 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/20">
                      {post.coverImage && (
                        <div className="aspect-video overflow-hidden bg-secondary">
                          <img 
                            src={post.coverImage} 
                            alt={post.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="p-6 space-y-3">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(post.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {post.readTime}
                          </span>
                        </div>
                        <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-muted-foreground">
                          {post.excerpt}
                        </p>
                        <Button variant="link" className="px-0">
                          Read more →
                        </Button>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
