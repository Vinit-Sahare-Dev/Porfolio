import { useCallback } from "react";

const prefetchedRoutes = new Set<string>();

export function usePrefetch() {
  const prefetch = useCallback((path: string) => {
    if (prefetchedRoutes.has(path)) return;
    
    prefetchedRoutes.add(path);
    
    // Prefetch the route by creating a hidden link
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = path;
    document.head.appendChild(link);
  }, []);

  return { prefetch };
}
