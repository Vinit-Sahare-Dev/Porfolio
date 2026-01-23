import { useState, useMemo } from 'react';
import { projects } from '@/data/projects';
import { PortfolioGrid } from '@/components/portfolio/PortfolioGrid';
import { ProjectFilter } from '@/components/portfolio/ProjectFilter';
import { SEOHead } from '@/components/seo/SEOHead';
import { motion } from 'framer-motion';

export default function Portfolio() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Get unique categories from projects
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(projects.map(p => p.category))];
    return uniqueCategories.sort();
  }, []);

  // Filter projects based on search and category
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      // Category filter
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = searchQuery === '' || 
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.techStack.some(tech => tech.toLowerCase().includes(searchLower)) ||
        project.category.toLowerCase().includes(searchLower);
      
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <>
      <SEOHead 
        title="Projects"
        description="Browse my software development projects featuring full-stack applications built with Java, Spring Boot, React, and modern technologies."
      />
      
      <div className="min-h-screen">
        <section className="relative py-12 md:py-16 px-6 lg:px-8 border-b border-border">
          <div className="max-w-7xl mx-auto text-center space-y-3">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Projects</h1>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                Full-stack applications built with Java, Spring Boot, React, and modern technologies
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-12 md:py-16 px-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Filter Controls */}
            <ProjectFilter
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              categories={categories}
              resultCount={filteredProjects.length}
            />

            {/* Projects Grid */}
            {filteredProjects.length > 0 ? (
              <PortfolioGrid projects={filteredProjects} />
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <p className="text-lg text-muted-foreground mb-2">No projects found</p>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search or filters
                </p>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}