import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function TechnicianReviewsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-36" />
        <Skeleton className="h-4 w-80 max-w-full" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => `stat-card-${index + 1}`).map(
          (cardKey) => (
            <Card key={cardKey}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-8 w-16" />
                  </div>

                  <Skeleton className="size-11 rounded-lg" />
                </div>
              </CardContent>
            </Card>
          ),
        )}
      </div>

      <Card>
        <CardContent className="flex flex-wrap gap-2 p-4">
          {Array.from(
            { length: 6 },
            (_, index) => `filter-pill-${index + 1}`,
          ).map((pillKey) => (
            <Skeleton key={pillKey} className="h-9 w-24" />
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>

        <CardContent className="space-y-4">
          {Array.from(
            { length: 5 },
            (_, index) => `review-skeleton-${index + 1}`,
          ).map((reviewKey) => (
            <div key={reviewKey} className="space-y-4 rounded-xl border p-5">
              <div className="flex justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="size-11 rounded-full" />

                  <div className="space-y-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-3 w-40" />
                  </div>
                </div>

                <Skeleton className="h-5 w-24" />
              </div>

              <Skeleton className="h-16 w-full rounded-lg" />

              <div className="flex justify-between">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
