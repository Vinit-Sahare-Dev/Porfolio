import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ReactNode, useEffect } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
  attribute?: string;
  defaultTheme?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}

/**
 * Theme Provider component wrapping next-themes
 * Provides dark mode support with smooth transitions
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Add smooth transition class when theme changes
  useEffect(() => {
    const handleThemeChange = () => {
      document.documentElement.classList.add('transitioning');
      setTimeout(() => {
        document.documentElement.classList.remove('transitioning');
      }, 500);
    };

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          handleThemeChange();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange={false}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
