"use client";

import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { useGetCategories } from "@/hooks";
import { ICategory } from "@/types/service.type";

export default function ServiceCategoryGrid() {
  const {
    data: categoriesResponse,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useGetCategories();

  const categories: ICategory[] = categoriesResponse?.data ?? [];

  if (categoriesLoading) {
    const skeletonCards = [
      "service-category-skeleton-1",
      "service-category-skeleton-2",
      "service-category-skeleton-3",
      "service-category-skeleton-4",
    ];

    return (
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <div className="h-8 w-56 animate-pulse rounded-md bg-muted" />
            <div className="mt-3 h-5 w-full max-w-2xl animate-pulse rounded-md bg-muted" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {skeletonCards.map((cardId) => (
              <Card key={cardId} className="overflow-hidden">
                <div className="aspect-[16/9] animate-pulse bg-muted" />

                <CardContent className="p-5">
                  <div className="h-6 w-2/3 animate-pulse rounded bg-muted" />

                  <div className="mt-3 h-4 w-full animate-pulse rounded bg-muted" />
                  <div className="mt-2 h-4 w-4/5 animate-pulse rounded bg-muted" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (categoriesError) {
    return (
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6 text-center">
            <p className="text-sm text-destructive">
              Failed to load service categories.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!categories.length) {
    return (
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Explore Our Services
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              Browse our service categories and find the right professional for
              your needs.
            </p>
          </div>

          <div className="rounded-xl border border-border/60 bg-muted/30 p-10 text-center">
            <p className="text-sm text-muted-foreground">
              No service categories available at the moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Explore Our Services
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            Browse our service categories and find the right professional for
            your needs.
          </p>
        </div>

        {/* Categories */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="group overflow-hidden border-border/60 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Category Image */}
              <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                {category.imageUrl ? (
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span className="text-sm text-muted-foreground">
                      No image
                    </span>
                  </div>
                )}
              </div>

              {/* Category Content */}
              <CardContent className="p-5">
                <h3 className="text-lg font-semibold tracking-tight">
                  {category.name}
                </h3>

                <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                  {category.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
