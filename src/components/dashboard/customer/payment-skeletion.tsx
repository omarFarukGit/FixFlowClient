import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function PaymentListSkeleton() {
  return (
    <div className="space-y-4">
      {["payment-1", "payment-2", "payment-3"].map((id) => (
        <Card key={id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-3 w-24" />
              </div>

              <Skeleton className="h-6 w-16" />
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {["a", "b", "c", "d"].map((item) => (
                <div key={item} className="space-y-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-4 w-28" />
                </div>
              ))}
            </div>

            <Skeleton className="mt-5 h-12 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}