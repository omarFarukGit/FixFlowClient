import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function MyServicesSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-44" />

        <Skeleton className="mt-2 h-4 w-72" />
      </CardHeader>

      <CardContent className="space-y-3">
        {["service-skeleton-1", "service-skeleton-2", "service-skeleton-3"].map(
          (id) => (
            <div key={id} className="space-y-3 rounded-lg border p-4">
              <div className="flex justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-4 w-32" />
                </div>

                <Skeleton className="h-6 w-20" />
              </div>

              <Skeleton className="h-4 w-64" />
            </div>
          ),
        )}
      </CardContent>
    </Card>
  );
}
