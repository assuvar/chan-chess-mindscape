import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface PostData {
  title: string;
  date: string;
  author: string;
  coverImage?: string;
  content: string;
  readTime: string;
}

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Load markdown file based on slug
    // For now, showing placeholder
    setPost({
      title: 'How Chess Builds Concentration in Children',
      date: '2025-10-27',
      author: 'Chan Chess Club',
      content: `## Introduction

Chess is more than just a game—it's a powerful tool for developing young minds. In this article, we explore how regular chess practice can significantly improve concentration and focus in children.

## The Science Behind Chess and Focus

Research has shown that chess engages multiple areas of the brain simultaneously...

## Benefits for Young Learners

1. **Enhanced Attention Span**: Chess requires sustained focus throughout the game
2. **Pattern Recognition**: Players learn to identify and remember complex patterns
3. **Strategic Planning**: Thinking several moves ahead develops long-term focus

## Conclusion

Starting chess at a young age can provide lifelong benefits in concentration and cognitive development.`,
      readTime: '5 min read'
    });
    setLoading(false);
  }, [slug]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        url: window.location.href,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Link to="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container px-4 py-6">
          <Link to="/blog">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>

      <article className="py-12">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl">
            {/* Post Header */}
            <header className="mb-8 space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
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
                <span>By {post.author}</span>
              </div>

              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleShare}
                className="gap-2"
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </header>

            {/* Cover Image */}
            {post.coverImage && (
              <div className="mb-8 overflow-hidden rounded-xl">
                <img 
                  src={post.coverImage} 
                  alt={post.title}
                  className="w-full aspect-video object-cover"
                />
              </div>
            )}

            {/* Post Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Author Box */}
            <div className="mt-12 rounded-xl border-2 bg-secondary/30 p-6">
              <h3 className="text-xl font-semibold mb-2">About the Author</h3>
              <p className="text-muted-foreground">
                {post.author} is dedicated to nurturing young chess talent through expert coaching and personalized training programs.
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
