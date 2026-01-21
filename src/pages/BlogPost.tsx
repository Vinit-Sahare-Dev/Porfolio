import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { getArticleBySlug } from '@/data/articles';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SEOHead } from '@/components/seo/SEOHead';
import { generateBlogPostingSchema } from '@/lib/structuredData';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) {
    return (
      <main className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Article Not Found</h1>
          <Button onClick={() => navigate('/blog')}>
            <ArrowLeft className="size-4 mr-2" />
            Back to Blog
          </Button>
        </div>
      </main>
    );
  }

  const structuredData = generateBlogPostingSchema(article);

  return (
    <>
      <SEOHead
        title={article.title}
        description={article.excerpt}
        type="article"
        article={{
          publishedTime: article.publishedAt,
          modifiedTime: article.publishedAt,
          author: 'Vinit Sahare',
          tags: article.tags
        }}
        structuredData={structuredData}
      />
      
      <main id="main-content" className="min-h-screen pt-24 pb-16">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/blog')}
            className="mb-8 -ml-2"
          >
            <ArrowLeft className="size-4 mr-2" />
            Back to Blog
          </Button>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">{article.category}</Badge>
            {article.featured && (
              <Badge className="bg-primary/10 text-primary border-primary/20">
                Featured
              </Badge>
            )}
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
            {article.title}
          </h1>
          
          <p className="text-lg text-muted-foreground mb-6">
            {article.excerpt}
          </p>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pb-6 border-b border-border">
            <span className="flex items-center gap-1.5">
              <Calendar className="size-4" />
              {new Date(article.publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" />
              {article.readTime}
            </span>
          </div>
        </motion.header>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="prose prose-neutral dark:prose-invert max-w-none"
        >
          {article.content.split('\n').map((paragraph, index) => {
            const trimmed = paragraph.trim();
            if (!trimmed) return null;
            
            // Handle headers
            if (trimmed.startsWith('# ')) {
              return <h1 key={index} className="text-3xl font-bold mt-8 mb-4">{trimmed.slice(2)}</h1>;
            }
            if (trimmed.startsWith('## ')) {
              return <h2 key={index} className="text-2xl font-semibold mt-8 mb-4">{trimmed.slice(3)}</h2>;
            }
            if (trimmed.startsWith('### ')) {
              return <h3 key={index} className="text-xl font-semibold mt-6 mb-3">{trimmed.slice(4)}</h3>;
            }
            
            // Handle code blocks
            if (trimmed.startsWith('```')) {
              return null; // Skip code fence markers
            }
            
            // Handle list items
            if (trimmed.startsWith('- ')) {
              return (
                <li key={index} className="text-muted-foreground ml-4">
                  {trimmed.slice(2)}
                </li>
              );
            }
            if (/^\d+\.\s/.test(trimmed)) {
              return (
                <li key={index} className="text-muted-foreground ml-4 list-decimal">
                  {trimmed.replace(/^\d+\.\s/, '')}
                </li>
              );
            }
            
            // Regular paragraphs
            return (
              <p key={index} className="text-muted-foreground mb-4 leading-relaxed">
                {trimmed}
              </p>
            );
          })}
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 pt-6 border-t border-border"
        >
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="size-4 text-muted-foreground" />
            {article.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </motion.div>
      </article>
    </main>
    </>
  );
}
