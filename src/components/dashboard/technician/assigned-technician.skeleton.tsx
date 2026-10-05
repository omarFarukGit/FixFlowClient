import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function AssignedServicesSkeleton() {
  const summarySkeletons = [
    "assigned-count",
    "accepted-count",
    "in-progress-count",
  ];

  const serviceSkeletons = [
    "service-row-1",
    "service-row-2",
    "service-row-3",
    "service-row-4",
    "service-row-5",
  ];
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-52" />
        <Skeleton className="mt-2 h-4 w-80" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {summarySkeletons.map((skeletonId) => (
          <Card key={skeletonId}>
            <CardContent className="p-5">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="mt-2 h-8 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="space-y-4 p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>

          {serviceSkeletons.map((skeletonId) => (
            <Skeleton key={skeletonId} className="h-12 w-full" />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
