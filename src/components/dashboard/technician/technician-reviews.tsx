"use client";

import {
  CalendarDays,
  MessageSquare,
  Star,
  UserRound,
  Wrench,
} from "lucide-react";
import { useMemo, useState } from "react";

import { useGetTechnicianReviews } from "@/hooks";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TechnicianReviewsSkeleton from "./technician-review-skeletion";
import {
  formatPrice,
  ReviewsResponse,
  TechnicianReview,
} from "@/types/review.type";
import { formatDate, PAGE_SIZE } from "@/types";

export default function TechnicianReviews() {
  const [ratingFilter, setRatingFilter] = useState<
    "ALL" | "5" | "4" | "3" | "2" | "1"
  >("ALL");

  const [currentPage, setCurrentPage] = useState(1);

  const { data: response, isLoading, isError } = useGetTechnicianReviews();

  const apiResponse = response as ReviewsResponse | undefined;

  const reviews = apiResponse?.data ?? [];

  const filteredReviews = useMemo(() => {
    if (ratingFilter === "ALL") {
      return reviews;
    }

    return reviews.filter((review) => review.rating === Number(ratingFilter));
  }, [reviews, ratingFilter]);

  const totalReviews = reviews.length;

  const averageRating =
    totalReviews > 0
      ? reviews.reduce((total, review) => total + review.rating, 0) /
        totalReviews
      : 0;

  const fiveStarReviews = reviews.filter(
    (review) => review.rating === 5,
  ).length;

  const fourStarReviews = reviews.filter(
    (review) => review.rating === 4,
  ).length;

  const totalPages = Math.max(1, Math.ceil(filteredReviews.length / PAGE_SIZE));

  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const handleFilterChange = (value: "ALL" | "5" | "4" | "3" | "2" | "1") => {
    setRatingFilter(value);
    setCurrentPage(1);
  };

  if (isLoading) {
    return <TechnicianReviewsSkeleton />;
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="flex min-h-60 items-center justify-center">
          <div className="text-center">
            <MessageSquare className="mx-auto size-10 text-muted-foreground" />

            <h3 className="mt-4 font-semibold">Unable to load reviews</h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Please try again later.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Reviews</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          See what customers are saying about your services.
        </p>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Total Reviews"
          value={totalReviews}
          icon={MessageSquare}
        />

        <SummaryCard
          title="Average Rating"
          value={averageRating.toFixed(1)}
          icon={Star}
        />

        <SummaryCard
          title="5 Star Reviews"
          value={fiveStarReviews}
          icon={Star}
        />

        <SummaryCard
          title="4 Star Reviews"
          value={fourStarReviews}
          icon={Star}
        />
      </div>

      {/* Rating Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            {(
              [
                ["ALL", "All Reviews"],
                ["5", "5 Stars"],
                ["4", "4 Stars"],
                ["3", "3 Stars"],
                ["2", "2 Stars"],
                ["1", "1 Star"],
              ] as const
            ).map(([value, label]) => (
              <Button
                key={value}
                size="sm"
                variant={ratingFilter === value ? "default" : "outline"}
                onClick={() => handleFilterChange(value)}
              >
                {label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Empty State */}
      {paginatedReviews.length === 0 ? (
        <Card>
          <CardContent className="flex min-h-72 items-center justify-center">
            <div className="text-center">
              <Star className="mx-auto size-12 text-muted-foreground" />

              <h3 className="mt-4 text-lg font-semibold">No reviews found</h3>

              <p className="mt-1 text-sm text-muted-foreground">
                {ratingFilter === "ALL"
                  ? "You haven't received any reviews yet."
                  : "No reviews found for this rating."}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Desktop */}
          <Card className="hidden md:block">
            <CardHeader>
              <CardTitle>Customer Reviews</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                {paginatedReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Mobile */}
          <div className="space-y-4 md:hidden">
            {paginatedReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </>
      )}

      {/* Pagination */}
      {filteredReviews.length > PAGE_SIZE && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * PAGE_SIZE + 1}-
            {Math.min(currentPage * PAGE_SIZE, filteredReviews.length)} of{" "}
            {filteredReviews.length} reviews
          </p>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => page - 1)}
            >
              Previous
            </Button>

            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((page) => page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function ReviewCard({ review }: { review: TechnicianReview }) {
  return (
    <div className="rounded-xl border p-4 sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        {/* Customer */}
        <div className="flex items-center gap-3">
          {review.reviewer?.imageUrl ? (
            <img
              src={review.reviewer.imageUrl}
              alt={review.reviewer.name}
              className="size-11 rounded-full object-cover"
            />
          ) : (
            <div className="flex size-11 items-center justify-center rounded-full bg-primary/10">
              <UserRound className="size-5 text-primary" />
            </div>
          )}

          <div>
            <p className="font-semibold">
              {review.reviewer?.name ?? "Customer"}
            </p>

            <p className="text-xs text-muted-foreground">
              {review.reviewer?.email ?? "No email"}
            </p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((starValue) => (
            <Star
              key={`${review.id}-${starValue}`}
              className={`size-4 ${
                starValue <= review.rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-muted-foreground"
              }`}
            />
          ))}

          <span className="ml-1 text-sm font-medium">{review.rating}/5</span>
        </div>
      </div>

      {/* Comment */}
      {review.comment ? (
        <div className="mt-4 rounded-lg bg-muted/50 p-3">
          <div className="flex gap-2">
            <MessageSquare className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

            <p className="text-sm leading-6">{review.comment}</p>
          </div>
        </div>
      ) : (
        <p className="mt-4 text-sm italic text-muted-foreground">
          No comment provided.
        </p>
      )}

      {/* Service Info */}
      <div className="mt-4 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-2">
          <Wrench className="size-4 shrink-0 text-muted-foreground" />

          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">Service</p>

            <p className="truncate text-sm font-medium">
              {review.serviceRequest?.title ?? "Service Request"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {review.serviceRequest?.finalPrice !== null &&
            review.serviceRequest?.finalPrice !== undefined && (
              <div>
                <p className="text-xs text-muted-foreground">Service Price</p>

                <p className="text-sm font-semibold">
                  {formatPrice(review.serviceRequest.finalPrice)}
                </p>
              </div>
            )}

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarDays className="size-4" />
            {formatDate(review.createdAt)}
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="mt-3">
        <Badge variant="secondary">
          {review.serviceRequest?.status ?? "COMPLETED"}
        </Badge>
      </div>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>

            <p className="mt-2 text-2xl font-bold">{value}</p>
          </div>

          <div className="rounded-lg bg-primary/10 p-3">
            <Icon className="size-5 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
