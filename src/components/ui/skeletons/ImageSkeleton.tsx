import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ImageSkeletonProps {
  aspectRatio?: "square" | "video" | "portrait" | "wide";
  className?: string;
}

const aspectRatioClasses = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
  wide: "aspect-[21/9]",
};

export function ImageSkeleton({ aspectRatio = "video", className }: ImageSkeletonProps) {
  return (
    <Skeleton 
      className={cn(
        "w-full rounded-lg",
        aspectRatioClasses[aspectRatio],
        className
      )} 
    />
  );
}
