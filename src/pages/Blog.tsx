import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, Code2 } from 'lucide-react';
import { articles, getAllCategories } from '@/data/articles';
import { codeExamples } from '@/data/codeExamples';
import { ArticleCard } from '@/components/blog/ArticleCard';
import { CodePlayground } from '@/components/code/CodePlayground';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type TabType = 'articles' | 'code';

export default function Blog() {
  const [activeTab, setActiveTab] = useState<TabType>('articles');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const articleCategories = getAllCategories();
  const codeCategories = [...new Set(codeExamples.map(ex => ex.category))].sort();
  
  const filteredArticles = articles.filter((article) => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = !selectedCategory || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const filteredCodeExamples = codeExamples.filter((example) => {
    const matchesSearch = 
      example.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      example.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      example.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = !selectedCategory || example.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const currentCategories = activeTab === 'articles' ? articleCategories : codeCategories;
  const resultCount = activeTab === 'articles' ? filteredArticles.length : filteredCodeExamples.length;

  return (
    <main id="main-content" className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Blog & Code
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Technical articles and code examples showcasing best practices and solutions.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center gap-2 mb-8"
        >
          <button
            onClick={() => {
              setActiveTab('articles');
              setSearchQuery('');
              setSelectedCategory(null);
            }}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'articles'
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-accent hover:bg-accent/80 text-foreground'
            }`}
          >
            <BookOpen className="size-4" />
            Articles
            <Badge variant={activeTab === 'articles' ? 'secondary' : 'outline'} className="ml-1">
              {articles.length}
            </Badge>
          </button>
          <button
            onClick={() => {
              setActiveTab('code');
              setSearchQuery('');
              setSelectedCategory(null);
            }}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'code'
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-accent hover:bg-accent/80 text-foreground'
            }`}
          >
            <Code2 className="size-4" />
            Code Examples
            <Badge variant={activeTab === 'code' ? 'secondary' : 'outline'} className="ml-1">
              {codeExamples.length}
            </Badge>
          </button>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder={activeTab === 'articles' ? 'Search articles...' : 'Search code examples...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 items-center">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className="text-xs"
            >
              All
            </Button>
            {currentCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="text-xs"
              >
                {category}
              </Button>
            ))}
            <span className="text-xs text-muted-foreground ml-auto">
              {resultCount} {activeTab === 'articles' ? 'article' : 'example'}{resultCount !== 1 ? 's' : ''}
            </span>
          </div>
        </motion.div>

        {/* Content */}
        {activeTab === 'articles' ? (
          filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article, index) => (
                <ArticleCard key={article.slug} article={article} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-muted-foreground">
                No articles found matching your criteria.
              </p>
            </motion.div>
          )
        ) : (
          filteredCodeExamples.length > 0 ? (
            <div className="grid gap-6">
              {filteredCodeExamples.map((example, index) => (
                <CodePlayground key={example.id} example={example} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-muted-foreground">
                No code examples found matching your criteria.
              </p>
            </motion.div>
          )
        )}
      </div>
    </main>
  );
}
