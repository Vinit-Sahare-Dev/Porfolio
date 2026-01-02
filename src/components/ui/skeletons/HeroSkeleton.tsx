import { Skeleton } from "@/components/ui/skeleton";

export function HeroSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl w-full space-y-8">
        <Skeleton className="h-4 w-24 mx-auto" />
        <Skeleton className="h-16 md:h-24 w-3/4 mx-auto" />
        <Skeleton className="h-6 w-2/3 mx-auto" />
        <div className="flex justify-center gap-4 pt-4">
          <Skeleton className="h-12 w-32 rounded-full" />
          <Skeleton className="h-12 w-32 rounded-full" />
        </div>
      </div>
    </div>
  );
}
