"use client";

import {
  CalendarDays,
  MessageSquare,
  Star,
  UserRound,
  Wrench,
} from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetAllReviews } from "@/hooks";
import {
  AdminReview,
  getRatingLabel,
  getStatusVariant,
} from "@/types/review.type";
import { formatDate, PAGE_SIZE } from "@/types";
import Image from "next/image";

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`size-4 ${
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-muted-foreground"
          }`}
        />
      ))}
    </div>
  );
}

function Avatar({
  name,
  imageUrl,
}: {
  name?: string;
  imageUrl?: string | null;
}) {
  if (imageUrl) {
    return (
      <Image
        src={imageUrl}
        alt={name ?? "User"}
        className="size-10 rounded-full object-cover"
        width={44}
        height={44}
      />
    );
  }

  return (
    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
      <UserRound className="size-5" />
    </div>
  );
}

export default function AdminReviews() {
  const { data: reviewsResponse, isLoading, error } = useGetAllReviews();

  const reviews: AdminReview[] = reviewsResponse?.data ?? [];

  const [ratingFilter, setRatingFilter] = useState<number | "ALL">("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredReviews = useMemo(() => {
    if (ratingFilter === "ALL") return reviews;

    return reviews.filter((review) => review.rating === ratingFilter);
  }, [reviews, ratingFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredReviews.length / PAGE_SIZE));

  const paginatedReviews = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;

    return filteredReviews.slice(start, start + PAGE_SIZE);
  }, [filteredReviews, currentPage]);

  const totalReviews = reviews.length;

  const averageRating =
    totalReviews > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
      : 0;

  const fiveStarReviews = reviews.filter(
    (review) => review.rating === 5,
  ).length;

  const fourStarReviews = reviews.filter(
    (review) => review.rating === 4,
  ).length;

  const handleRatingFilter = (rating: number | "ALL") => {
    setRatingFilter(rating);
    setCurrentPage(1);
  };

  if (isLoading) {
    return <AdminReviewsSkeleton />;
  }

  if (error) {
    return (
      <Card>
        <CardContent className="flex min-h-50 items-center justify-center">
          <p className="text-sm text-destructive">
            Failed to load reviews. Please try again.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Reviews
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Monitor customer reviews and technician feedback.
        </p>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <MessageSquare className="size-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Total Reviews</p>
              <p className="text-2xl font-bold">{totalReviews}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-11 items-center justify-center rounded-lg bg-yellow-500/10 text-yellow-500">
              <Star className="size-5 fill-current" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Average Rating</p>

              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold">{averageRating.toFixed(1)}</p>

                <Star className="size-4 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-11 items-center justify-center rounded-lg bg-green-500/10 text-green-500">
              <Star className="size-5 fill-current" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">5 Star Reviews</p>
              <p className="text-2xl font-bold">{fiveStarReviews}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-11 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
              <Star className="size-5 fill-current" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">4 Star Reviews</p>
              <p className="text-2xl font-bold">{fourStarReviews}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rating Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filter Reviews</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleRatingFilter("ALL")}
              className={`rounded-md border px-4 py-2 text-sm font-medium transition ${
                ratingFilter === "ALL"
                  ? "border-primary bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              All
            </button>

            {[5, 4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                type="button"
                onClick={() => handleRatingFilter(rating)}
                className={`flex items-center gap-1 rounded-md border px-4 py-2 text-sm font-medium transition ${
                  ratingFilter === rating
                    ? "border-primary bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                <Star className="size-3.5 fill-current" />
                {rating}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reviews */}
      {paginatedReviews.length === 0 ? (
        <Card>
          <CardContent className="flex min-h-60 flex-col items-center justify-center text-center">
            <MessageSquare className="mb-3 size-10 text-muted-foreground" />

            <h3 className="font-semibold">No reviews found</h3>

            <p className="mt-1 text-sm text-muted-foreground">
              There are no reviews matching the selected filter.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {paginatedReviews.map((review) => (
            <Card key={review.id} className="overflow-hidden">
              <CardContent className="p-5 sm:p-6">
                <div className="space-y-5">
                  {/* Reviewer + Rating */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar
                        name={review.reviewer?.name}
                        imageUrl={review.reviewer?.imageUrl}
                      />

                      <div>
                        <p className="font-semibold">
                          {review.reviewer?.name ?? "Unknown Customer"}
                        </p>

                        <p className="text-sm text-muted-foreground">
                          {review.reviewer?.email ?? "No email"}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-start gap-1 sm:items-end">
                      <div className="flex items-center gap-2">
                        <RatingStars rating={review.rating} />

                        <span className="text-sm font-medium">
                          {review.rating}/5
                        </span>
                      </div>

                      <span className="text-xs text-muted-foreground">
                        {getRatingLabel(review.rating)}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  {/* Review comment */}
                  {review.comment ? (
                    <div className="rounded-lg bg-muted/50 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <MessageSquare className="size-4 text-primary" />
                        <span className="text-sm font-medium">
                          Customer Feedback
                        </span>
                      </div>

                      <p className="text-sm leading-6 text-muted-foreground">
                        {review.comment}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm italic text-muted-foreground">
                      No written feedback provided.
                    </p>
                  )}

                  {/* Service + Technician */}
                  <div className="grid gap-4 md:grid-cols-2">
                    {/* Technician */}
                    <div className="rounded-lg border p-4">
                      <div className="mb-3 flex items-center gap-2">
                        <Wrench className="size-4 text-primary" />
                        <span className="text-sm font-medium">Technician</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <Avatar
                          name={review.technician?.name}
                          imageUrl={review.technician?.imageUrl}
                        />

                        <div className="min-w-0">
                          <p className="truncate font-medium">
                            {review.technician?.name ?? "Unknown Technician"}
                          </p>

                          <p className="truncate text-sm text-muted-foreground">
                            {review.technician?.email ?? "No email"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Service */}
                    <div className="rounded-lg border p-4">
                      <div className="mb-3 flex items-center gap-2">
                        <Wrench className="size-4 text-primary" />
                        <span className="text-sm font-medium">
                          Service Request
                        </span>
                      </div>

                      <p className="font-medium">
                        {review.serviceRequest?.title ??
                          "Unknown Service Request"}
                      </p>

                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        {review.serviceRequest?.status && (
                          <Badge
                            variant={getStatusVariant(
                              review.serviceRequest.status,
                            )}
                          >
                            {review.serviceRequest.status.replaceAll("_", " ")}
                          </Badge>
                        )}

                        {review.serviceRequest?.finalPrice != null && (
                          <span className="text-sm font-medium">
                            ৳
                            {Number(review.serviceRequest.finalPrice).toFixed(
                              2,
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex flex-col gap-2 border-t pt-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="size-4" />
                      <span>{formatDate(review.createdAt)}</span>
                    </div>

                    <span className="font-mono">
                      Review ID: {review.id.slice(0, 8)}...
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {filteredReviews.length > PAGE_SIZE && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * PAGE_SIZE + 1}-
            {Math.min(currentPage * PAGE_SIZE, filteredReviews.length)} of{" "}
            {filteredReviews.length} reviews
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => page - 1)}
              className="rounded-md border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            <span className="rounded-md border px-3 py-2 text-sm">
              {currentPage} / {totalPages}
            </span>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((page) => page + 1)}
              className="rounded-md border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function AdminReviewsSkeleton() {
  const summaryCards = [
    { id: "reviews-total" },
    { id: "reviews-rating" },
    { id: "reviews-pending" },
    { id: "reviews-average" },
  ];

  const filterPills = [
    { id: "all" },
    { id: "5-stars" },
    { id: "4-stars" },
    { id: "3-stars" },
    { id: "2-stars" },
    { id: "1-star" },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="h-8 w-40 animate-pulse rounded-md bg-muted" />
        <div className="h-4 w-72 animate-pulse rounded-md bg-muted" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card) => (
          <Card key={card.id}>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="size-11 animate-pulse rounded-lg bg-muted" />

              <div className="space-y-2">
                <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                <div className="h-7 w-14 animate-pulse rounded bg-muted" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="h-6 w-32 animate-pulse rounded bg-muted" />
        </CardHeader>

        <CardContent>
          <div className="flex gap-2">
            {filterPills.map((pill) => (
              <div
                key={pill.id}
                className="h-9 w-16 animate-pulse rounded-md bg-muted"
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {["review-skeleton-1", "review-skeleton-2", "review-skeleton-3"].map(
        (id) => (
          <Card key={id}>
            <CardContent className="space-y-5 p-6">
              <div className="flex justify-between">
                <div className="flex gap-3">
                  <div className="size-10 animate-pulse rounded-full bg-muted" />

                  <div className="space-y-2">
                    <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                    <div className="h-3 w-44 animate-pulse rounded bg-muted" />
                  </div>
                </div>

                <div className="h-5 w-24 animate-pulse rounded bg-muted" />
              </div>

              <div className="h-px bg-muted" />

              <div className="h-20 animate-pulse rounded-lg bg-muted" />

              <div className="grid gap-4 md:grid-cols-2">
                <div className="h-24 animate-pulse rounded-lg bg-muted" />
                <div className="h-24 animate-pulse rounded-lg bg-muted" />
              </div>
            </CardContent>
          </Card>
        ),
      )}
    </div>
  );
}
