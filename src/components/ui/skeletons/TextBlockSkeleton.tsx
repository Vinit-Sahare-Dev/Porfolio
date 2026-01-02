import { Skeleton } from "@/components/ui/skeleton";

interface TextBlockSkeletonProps {
  lines?: number;
  showHeading?: boolean;
}

export function TextBlockSkeleton({ lines = 4, showHeading = true }: TextBlockSkeletonProps) {
  return (
    <div className="space-y-4">
      {showHeading && <Skeleton className="h-8 w-1/3" />}
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton 
            key={i} 
            className="h-4" 
            style={{ width: `${85 + Math.random() * 15}%` }} 
          />
        ))}
      </div>
    </div>
  );
}
