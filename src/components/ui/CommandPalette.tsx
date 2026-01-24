import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Home, Briefcase, Award, BookOpen, Code2, User, Mail, X } from 'lucide-react';
import { projects } from '@/data/projects';
import { articles } from '@/data/articles';

interface CommandItem {
  id: string;
  title: string;
  description?: string;
  icon: React.ReactNode;
  action: () => void;
  category: string;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  // Open/close with Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close on navigation
  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
    setSearch('');
  };

  // Build command items
  const commands: CommandItem[] = useMemo(() => {
    const items: CommandItem[] = [
      // Navigation
      {
        id: 'nav-home',
        title: 'Home',
        description: 'Go to homepage',
        icon: <Home className="size-4" />,
        action: () => handleNavigate('/'),
        category: 'Navigation'
      },
      {
        id: 'nav-portfolio',
        title: 'Projects',
        description: 'View all projects',
        icon: <Briefcase className="size-4" />,
        action: () => handleNavigate('/portfolio'),
        category: 'Navigation'
      },
      {
        id: 'nav-certifications',
        title: 'Certifications',
        description: 'View certifications',
        icon: <Award className="size-4" />,
        action: () => handleNavigate('/certifications'),
        category: 'Navigation'
      },
      {
        id: 'nav-blog',
        title: 'Blog',
        description: 'Read articles',
        icon: <BookOpen className="size-4" />,
        action: () => handleNavigate('/blog'),
        category: 'Navigation'
      },
      {
        id: 'nav-about',
        title: 'About',
        description: 'Learn more about me',
        icon: <User className="size-4" />,
        action: () => handleNavigate('/about'),
        category: 'Navigation'
      },
      {
        id: 'nav-contact',
        title: 'Contact',
        description: 'Get in touch',
        icon: <Mail className="size-4" />,
        action: () => handleNavigate('/contact'),
        category: 'Navigation'
      },
    ];

    // Add projects
    projects.forEach(project => {
      items.push({
        id: `project-${project.id}`,
        title: project.title,
        description: project.description.substring(0, 60) + '...',
        icon: <Code2 className="size-4" />,
        action: () => handleNavigate(`/project/${project.slug}`),
        category: 'Projects'
      });
    });

    // Add articles
    articles.forEach(article => {
      items.push({
        id: `article-${article.slug}`,
        title: article.title,
        description: article.excerpt.substring(0, 60) + '...',
        icon: <BookOpen className="size-4" />,
        action: () => handleNavigate(`/blog/${article.slug}`),
        category: 'Articles'
      });
    });

    return items;
  }, []);

  // Filter commands based on search
  const filteredCommands = useMemo(() => {
    if (!search) return commands;
    
    const searchLower = search.toLowerCase();
    return commands.filter(cmd => 
      cmd.title.toLowerCase().includes(searchLower) ||
      cmd.description?.toLowerCase().includes(searchLower) ||
      cmd.category.toLowerCase().includes(searchLower)
    );
  }, [search, commands]);

  // Group by category
  const groupedCommands = useMemo(() => {
    const groups: Record<string, CommandItem[]> = {};
    filteredCommands.forEach(cmd => {
      if (!groups[cmd.category]) {
        groups[cmd.category] = [];
      }
      groups[cmd.category].push(cmd);
    });
    return groups;
  }, [filteredCommands]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        />

        {/* Command Palette */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-card border border-border rounded-xl shadow-2xl overflow-hidden"
        >
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
            <Search className="size-5 text-muted-foreground flex-shrink-0" />
            <input
              type="text"
              placeholder="Search for pages, projects, articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
              autoFocus
            />
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {Object.keys(groupedCommands).length > 0 ? (
              Object.entries(groupedCommands).map(([category, items]) => (
                <div key={category} className="py-2">
                  <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {category}
                  </div>
                  {items.map((item) => (
                    <button
                      key={item.id}
                      onClick={item.action}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-accent transition-colors text-left"
                    >
                      <div className="text-primary">{item.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground">{item.title}</div>
                        {item.description && (
                          <div className="text-xs text-muted-foreground truncate">
                            {item.description}
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-sm text-muted-foreground">
                No results found for "{search}"
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-accent/30 text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span>↑↓ Navigate</span>
              <span>↵ Select</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-background border border-border rounded text-xs">ESC</kbd>
              <span>to close</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
