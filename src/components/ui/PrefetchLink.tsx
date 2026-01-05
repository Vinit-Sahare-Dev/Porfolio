import { Link, LinkProps } from "react-router-dom";
import { useCallback } from "react";

interface PrefetchLinkProps extends LinkProps {
  children: React.ReactNode;
}

const prefetchedRoutes = new Set<string>();

export function PrefetchLink({ to, children, ...props }: PrefetchLinkProps) {
  const handleMouseEnter = useCallback(() => {
    const path = typeof to === "string" ? to : to.pathname || "";
    
    if (prefetchedRoutes.has(path)) return;
    prefetchedRoutes.add(path);

    // Trigger route module prefetch
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.as = "document";
    link.href = path;
    document.head.appendChild(link);
  }, [to]);

  return (
    <Link
      to={to}
      onMouseEnter={handleMouseEnter}
      onFocus={handleMouseEnter}
      {...props}
    >
      {children}
    </Link>
  );
}
