import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminServiceRequestsSkeleton() {
  const summarySkeletons = Array.from(
    { length: 4 },
    (_, index) => `summary-${index + 1}`,
  );
  const requestRowSkeletons = Array.from(
    { length: 5 },
    (_, index) => `request-row-${index + 1}`,
  );

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-4 w-80 max-w-full" />
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {summarySkeletons.map((item) => (
          <Skeleton key={item} className="h-24 rounded-xl" />
        ))}
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64 max-w-full" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-10 w-full" />
          {requestRowSkeletons.map((item) => (
            <Skeleton key={item} className="h-16 w-full" />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
