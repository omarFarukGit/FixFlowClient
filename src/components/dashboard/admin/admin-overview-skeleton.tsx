import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminOverviewSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-80 max-w-full" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {["stats-1", "stats-2", "stats-3", "stats-4"].map((card) => (
          <Card key={card}>
            <CardContent className="p-5">
              <div className="flex justify-between">
                <div className="space-y-3">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-3 w-32" />
                </div>

                <Skeleton className="size-11 rounded-lg" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {["status", "requests", "customers", "technicians", "payments"].map(
              (section) => (
                <Skeleton key={section} className="h-24 rounded-lg" />
              ),
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-2">
        {["first", "second"].map((section) => (
          <Card key={section}>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>

            <CardContent className="space-y-4">
              {["first", "second", "third", "fourth", "fifth"].map(
                (itemKey) => (
                  <Skeleton key={itemKey} className="h-16 rounded-lg" />
                ),
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
