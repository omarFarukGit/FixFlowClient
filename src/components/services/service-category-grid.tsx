"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGetCategories } from "@/hooks";
import type { ICategory } from "@/types/service.type";

const ITEMS_PER_PAGE = 8;

export default function ServiceCategoryGrid() {
  const {
    data: categoriesResponse,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useGetCategories();

  const categories: ICategory[] = categoriesResponse?.data ?? [];

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const updateSearchTerm = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  // Filter categories by name or description
  const filteredCategories = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return categories;

    return categories.filter(
      (category) =>
        category.name.toLowerCase().includes(query) ||
        (category.description ?? "").toLowerCase().includes(query),
    );
  }, [categories, searchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredCategories.length / ITEMS_PER_PAGE);

  const paginatedCategories = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredCategories.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE,
    );
  }, [filteredCategories, currentPage]);

  const startItem =
    filteredCategories.length === 0
      ? 0
      : (currentPage - 1) * ITEMS_PER_PAGE + 1;

  const endItem = Math.min(
    currentPage * ITEMS_PER_PAGE,
    filteredCategories.length,
  );

  if (categoriesLoading) {
    return (
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <div className="h-8 w-56 animate-pulse rounded-md bg-muted" />
            <div className="mt-3 h-5 w-full max-w-2xl animate-pulse rounded-md bg-muted" />
          </div>

          <div className="mb-8 h-11 w-full max-w-md animate-pulse rounded-lg bg-muted" />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {["category-skeleton-1", "category-skeleton-2", "category-skeleton-3", "category-skeleton-4", "category-skeleton-5", "category-skeleton-6", "category-skeleton-7", "category-skeleton-8"].map((key) => (
              <Card key={key} className="overflow-hidden">
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
              Failed to load service categories. Please try again later.
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
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Explore Our Services
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              Browse our service categories and discover the services we offer.
            </p>
          </div>

          <p className="shrink-0 text-sm text-muted-foreground">
            {filteredCategories.length}{" "}
            {filteredCategories.length === 1 ? "category" : "categories"}
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 flex w-full max-w-md items-center gap-2">
          <div className="relative flex-1">
            <Search
              aria-hidden="true"
              className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            />

            <Input
              type="search"
              placeholder="Search service categories..."
              value={searchTerm}
              onChange={(event) => updateSearchTerm(event.target.value)}
              aria-label="Search service categories"
              className="h-11 pr-10 pl-9"
            />

            {searchTerm && (
              <button
                type="button"
                onClick={() => updateSearchTerm("")}
                aria-label="Clear search"
                className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>

        {/* Empty State */}
        {filteredCategories.length === 0 ? (
          <div className="rounded-xl border border-border/60 bg-muted/20 px-6 py-14 text-center">
            <Search className="mx-auto mb-4 size-10 text-muted-foreground/60" />

            <h3 className="text-lg font-semibold">
              {categories.length === 0
                ? "No service categories available"
                : "No categories found"}
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              {categories.length === 0
                ? "Service categories will appear here when they become available."
                : `No categories match "${searchTerm}". Try a different search.`}
            </p>

            {searchTerm && (
              <Button
                variant="outline"
                className="mt-5"
                onClick={() => updateSearchTerm("")}
              >
                Clear Search
              </Button>
            )}
          </div>
        ) : (
          <>
            {/* Category Grid */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {paginatedCategories.map((category) => (
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
                      {category.description || "Explore this service category."}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 sm:flex-row">
                <p className="text-sm text-muted-foreground">
                  Showing{" "}
                  <span className="font-medium text-foreground">
                    {startItem}–{endItem}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-foreground">
                    {filteredCategories.length}
                  </span>{" "}
                  categories
                </p>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setCurrentPage((page) => Math.max(1, page - 1))
                    }
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="size-4" />
                  </Button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, index) => {
                      const page = index + 1;

                      return (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="icon"
                          onClick={() => setCurrentPage(page)}
                          aria-label={`Go to page ${page}`}
                          aria-current={
                            currentPage === page ? "page" : undefined
                          }
                          className="size-9"
                        >
                          {page}
                        </Button>
                      );
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setCurrentPage((page) =>
                        Math.min(totalPages, page + 1),
                      )
                    }
                    disabled={currentPage === totalPages}
                    aria-label="Next page"
                  >
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}