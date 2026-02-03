import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Article } from '@/data/articles';

interface ArticleCardProps {
  article: Article;
  index?: number;
}

export function ArticleCard({ article, index = 0 }: ArticleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.03,
        rotateY: 3,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      style={{ 
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
    >
      <Link to={`/blog/${article.slug}`}>
        <Card className="group h-full transition-all duration-300 hover:shadow-2xl hover:border-primary/50 relative overflow-hidden">
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            initial={false}
          />
          
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            initial={{ x: "-100%", opacity: 0 }}
            whileHover={{ 
              x: "100%", 
              opacity: 1,
              transition: { duration: 0.6, ease: "easeInOut" }
            }}
          />

          <CardHeader className="pb-3 relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="text-xs group-hover:bg-primary/20 transition-colors">
                {article.category}
              </Badge>
              {article.featured && (
                <Badge className="text-xs bg-primary/10 text-primary border-primary/20">
                  Featured
                </Badge>
              )}
            </div>
            <motion.h3 
              className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {article.title}
            </motion.h3>
          </CardHeader>
          <CardContent className="pt-0 relative z-10">
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {article.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="size-3" />
                  {new Date(article.publishedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="size-3" />
                  {article.readTime}
                </span>
              </div>
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
