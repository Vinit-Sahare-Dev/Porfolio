import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

/**
 * Theme toggle button with system preference support
 * Allows switching between light, dark, and system modes
 */
export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="size-10 rounded-xl bg-accent/50 flex items-center justify-center"
        disabled
      >
        <Sun className="size-5" />
      </button>
    );
  }

  const isDark = resolvedTheme === 'dark';

  const getIcon = () => {
    if (theme === 'system') return <Monitor className="size-5" />;
    return isDark ? <Sun className="size-5 text-amber-500" /> : <Moon className="size-5 text-indigo-500" />;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button
          className="relative size-10 rounded-xl bg-accent/50 hover:bg-accent flex items-center justify-center overflow-hidden transition-colors duration-300"
          aria-label="Toggle theme"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={theme}
              initial={{ rotate: -90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              {getIcon()}
            </motion.div>
          </AnimatePresence>
          
          {/* Background glow effect */}
          <motion.div
            className="absolute inset-0 rounded-xl"
            animate={{
              background: theme === 'system'
                ? 'radial-gradient(circle at center, rgba(139, 92, 246, 0.1) 0%, transparent 70%)'
                : isDark 
                  ? 'radial-gradient(circle at center, rgba(251, 191, 36, 0.1) 0%, transparent 70%)'
                  : 'radial-gradient(circle at center, rgba(99, 102, 241, 0.1) 0%, transparent 70%)'
            }}
            transition={{ duration: 0.5 }}
          />
        </motion.button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuItem onClick={() => setTheme('light')} className="cursor-pointer">
          <Sun className="size-4 mr-2" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')} className="cursor-pointer">
          <Moon className="size-4 mr-2" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')} className="cursor-pointer">
          <Monitor className="size-4 mr-2" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
