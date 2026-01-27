import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted/60",
        className
      )}
      {...props}
    />
  );
}

export function EventCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {/* Poster skeleton */}
      <Skeleton className="aspect-[3/4] w-full" />
      
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-6 w-1/2" />
        
        {/* Date */}
        <Skeleton className="h-4 w-2/3" />
        
        {/* Location */}
        <Skeleton className="h-4 w-1/2" />
        
        {/* Club */}
        <Skeleton className="h-4 w-1/3" />
        
        {/* Button */}
        <Skeleton className="h-10 w-full mt-4" />
      </div>
    </div>
  );
}

export function EventDetailSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero skeleton */}
      <Skeleton className="h-[60vh] min-h-[400px] w-full" />
      
      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
          
          {/* Sidebar */}
          <div className="space-y-4">
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function RegistrationCardSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg">
      <Skeleton className="w-32 h-32 rounded-lg flex-shrink-0" />
      
      <div className="flex-1 space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      
      <Skeleton className="h-8 w-24" />
    </div>
  );
}
