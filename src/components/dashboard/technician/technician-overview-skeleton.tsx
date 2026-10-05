import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function TechnicianOverviewSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-56 sm:h-9" />
        <Skeleton className="h-4 w-80 max-w-full" />
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {["jobs", "earnings", "rating", "availability"].map((stat) => (
          <Card key={stat}>
            <CardContent className="flex items-center justify-between p-5">
              <div className="space-y-3">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-9 w-16" />
                <Skeleton className="h-3 w-36" />
              </div>

              <Skeleton className="size-11 rounded-full" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Earnings + Performance */}
      <div className="grid gap-4 md:grid-cols-2">
        {["earnings", "performance"].map((section) => (
          <Card key={section}>
            <CardHeader className="space-y-2">
              <Skeleton className="h-6 w-40" />
            </CardHeader>

            <CardContent className="space-y-4">
              <Skeleton className="h-9 w-32" />
              <Skeleton className="h-4 w-56" />
              <Skeleton className="h-9 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Services */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-6 w-52" />
            <Skeleton className="h-4 w-64 max-w-full" />
          </div>

          <Skeleton className="h-9 w-20" />
        </CardHeader>

        <CardContent className="space-y-3">
          {[
            "service-one",
            "service-two",
            "service-three",
            "service-four",
            "service-five",
          ].map((service) => (
            <div
              key={service}
              className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0 space-y-3">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-48 max-w-[60vw]" />
                  <Skeleton className="h-5 w-20 rounded-full" />
                </div>

                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-40" />
                <Skeleton className="h-3 w-44" />
              </div>

              <div className="flex items-center justify-between gap-4 sm:justify-end">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-9 w-16" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-72 max-w-full" />
        </CardHeader>

        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {["action-one", "action-two", "action-three", "action-four"].map(
              (action) => (
                <Skeleton key={action} className="h-10 w-full" />
              ),
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
