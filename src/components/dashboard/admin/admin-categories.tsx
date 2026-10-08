"use client";

import {
  ChevronLeft,
  ChevronRight,
  Edit,
  ImageIcon,
  Loader2,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

import {
  useDeleteCategory,
  useGetCategories,
  useUpdateCategory,
} from "@/hooks";

type Category = {
  id: string;
  name: string;
  description: string;
  imageUrl?: string | null;
  createdAt: string;
  updatedAt: string;
};

const ITEMS_PER_PAGE = 6;

export default function AdminCategories() {
  const {
    data: categoriesResponse,
    isLoading,
    isError,
    refetch,
  } = useGetCategories();

  const updateCategoryMutation = useUpdateCategory();

  const deleteCategoryMutation = useDeleteCategory();

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const [deleteCategory, setDeleteCategory] = useState<Category | null>(null);

  /*
   * All categories from API
   */
  const categories: Category[] = categoriesResponse?.data ?? [];

  /*
   * Search / Filter
   */
  const filteredCategories = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return categories;
    }

    return categories.filter(
      (category) =>
        category.name.toLowerCase().includes(value) ||
        category.description.toLowerCase().includes(value),
    );
  }, [categories, search]);

  /*
   * Total pages
   */
  const totalPages = Math.ceil(filteredCategories.length / ITEMS_PER_PAGE);

  /*
   * Current page categories
   */
  const paginatedCategories = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    const endIndex = startIndex + ITEMS_PER_PAGE;

    return filteredCategories.slice(startIndex, endIndex);
  }, [filteredCategories, currentPage]);

  /*
   * Prevent invalid page
   */
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  /*
   * Delete category
   */
  const handleDelete = () => {
    if (!deleteCategory) return;

    deleteCategoryMutation.mutate(deleteCategory.id, {
      onSuccess: async () => {
        setDeleteCategory(null);

        await refetch();
      },

      onError: (error: any) => {
        console.error("Delete category error:", error);

        console.error("Response:", error?.response?._data ?? error?.data);
      },
    });
  };

  /*
   * Loading
   */
  if (isLoading) {
    return <AdminCategoriesSkeleton />;
  }

  /*
   * Error
   */
  if (isError) {
    return (
      <Card>
        <CardContent className="flex min-h-60 items-center justify-center">
          <div className="text-center">
            <p className="font-medium text-destructive">
              Failed to load categories
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Please try again later.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Service Categories
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage all service categories.
            </p>
          </div>

          <Button>
            <Link
              className=" flex justify-center items-center gap"
              href="/admin/categories/create"
            >
              <Plus className="size-4" />
              Create Category
            </Link>
          </Button>
        </div>

        {/* Summary */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">Total Categories</p>

              <p className="mt-1 text-2xl font-bold">{categories.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">Showing</p>

              <p className="mt-1 text-2xl font-bold">
                {filteredCategories.length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search categories..."
                className="pl-9"
              />
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        {paginatedCategories.length === 0 ? (
          <Card>
            <CardContent className="flex min-h-60 flex-col items-center justify-center text-center">
              <ImageIcon className="mb-4 size-10 text-muted-foreground" />

              <h3 className="font-semibold">No Categories Found</h3>

              <p className="mt-1 text-sm text-muted-foreground">
                {search ? "Try a different search." : "Create a new category."}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {paginatedCategories.map((category) => (
              <Card key={category.id} className="overflow-hidden">
                {/* Image */}
                <div className="relative aspect-video overflow-hidden bg-muted">
                  {category.imageUrl ? (
                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <ImageIcon className="size-10 text-muted-foreground" />
                    </div>
                  )}

                  <Badge className="absolute left-3 top-3">Service</Badge>
                </div>

                {/* Content */}
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle className="line-clamp-1">
                      {category.name}
                    </CardTitle>

                    <div className="flex shrink-0 gap-1">
                      {/* Edit */}
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setSelectedCategory(category)}
                        title="Edit category"
                      >
                        <Edit className="size-4" />
                      </Button>

                      {/* Delete */}
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => setDeleteCategory(category)}
                        title="Delete category"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
                    {category.description}
                  </p>

                  <Separator className="my-4" />

                  <p className="text-xs text-muted-foreground">
                    Created {new Date(category.createdAt).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
            {/* Showing info */}
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-medium text-foreground">
                {(currentPage - 1) * ITEMS_PER_PAGE + 1}
              </span>{" "}
              -{" "}
              <span className="font-medium text-foreground">
                {Math.min(
                  currentPage * ITEMS_PER_PAGE,
                  filteredCategories.length,
                )}
              </span>{" "}
              of{" "}
              <span className="font-medium text-foreground">
                {filteredCategories.length}
              </span>
            </p>

            {/* Controls */}
            <div className="flex items-center gap-2">
              {/* Previous */}
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((page) => page - 1)}
              >
                <ChevronLeft className="size-4" />

                <span className="hidden sm:inline">Previous</span>
              </Button>

              {/* Page numbers */}
              <div className="flex items-center gap-1">
                {Array.from(
                  {
                    length: totalPages,
                  },
                  (_, index) => index + 1,
                ).map((pageNumber) => (
                  <Button
                    key={pageNumber}
                    variant={currentPage === pageNumber ? "default" : "outline"}
                    size="sm"
                    className="size-9"
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                ))}
              </div>

              {/* Next */}
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((page) => page + 1)}
              >
                <span className="hidden sm:inline">Next</span>

                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Update Dialog */}
      {selectedCategory && (
        <UpdateCategoryDialog
          category={selectedCategory}
          isPending={updateCategoryMutation.isPending}
          onClose={() => setSelectedCategory(null)}
          onUpdate={(data) => {
            updateCategoryMutation.mutate(
              {
                id: selectedCategory.id,
                payload: data,
              },
              {
                onSuccess: () => {
                  setSelectedCategory(null);
                },

                onError: (error: any) => {
                  console.error("Update category error:", error);
                },
              },
            );
          }}
        />
      )}

      {/* Delete Dialog */}
      <Dialog
        open={!!deleteCategory}
        onOpenChange={(open) => {
          if (!open && !deleteCategoryMutation.isPending) {
            setDeleteCategory(null);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Category?</DialogTitle>

            <DialogDescription>
              Are you sure you want to delete{" "}
              <strong>{deleteCategory?.name}</strong>? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteCategory(null)}
              disabled={deleteCategoryMutation.isPending}
            >
              Cancel
            </Button>

            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteCategoryMutation.isPending}
            >
              {deleteCategoryMutation.isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="size-4" />
                  Delete
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

/* ---------------------------------------------
   Update Category Dialog
--------------------------------------------- */

function UpdateCategoryDialog({
  category,
  isPending,
  onClose,
  onUpdate,
}: {
  category: Category;
  isPending: boolean;
  onClose: () => void;
  onUpdate: (data: FormData) => void;
}) {
  const [name, setName] = useState(category.name);

  const [description, setDescription] = useState(category.description);

  const [image, setImage] = useState<File | null>(null);

  const [preview, setPreview] = useState<string | null>(
    category.imageUrl ?? null,
  );

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      return;
    }

    setImage(file);

    const objectUrl = URL.createObjectURL(file);

    setPreview(objectUrl);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !description.trim()) {
      return;
    }

    const formData = new FormData();

    formData.append("name", name.trim());

    formData.append("description", description.trim());

    if (image) {
      formData.append("image", image);
    }

    onUpdate(formData);
  };

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open && !isPending) {
          onClose();
        }
      }}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Update Category</DialogTitle>

          <DialogDescription>
            Update category information and image.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Image */}
          <div className="space-y-2">
            <label htmlFor="category-image" className="text-sm font-medium">
              Category Image
            </label>

            <div className="relative overflow-hidden rounded-lg border">
              {preview ? (
                <Image
                  src={preview}
                  alt={category.name}
                  width={800}
                  height={450}
                  className="h-48 w-full object-cover"
                />
              ) : (
                <div className="flex h-48 items-center justify-center bg-muted">
                  <ImageIcon className="size-10 text-muted-foreground" />
                </div>
              )}
            </div>

            <Input
              id="category-image"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleImageChange}
              disabled={isPending}
            />

            <p className="text-xs text-muted-foreground">
              Leave empty to keep the current image.
            </p>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <label htmlFor="edit-category-name" className="text-sm font-medium">
              Category Name
            </label>

            <Input
              id="edit-category-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              disabled={isPending}
              placeholder="e.g. AC Repair"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label
              htmlFor="edit-category-description"
              className="text-sm font-medium"
            >
              Description
            </label>

            <textarea
              id="edit-category-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              disabled={isPending}
              rows={5}
              placeholder="Category description..."
              className="flex min-h-24 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          {/* Footer */}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isPending}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isPending || !name.trim() || !description.trim()}
            >
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Edit className="size-4" />
                  Update Category
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/* ---------------------------------------------
   Skeleton
--------------------------------------------- */

function AdminCategoriesSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="h-8 w-56 animate-pulse rounded bg-muted" />

          <div className="h-4 w-72 animate-pulse rounded bg-muted" />
        </div>

        <div className="h-10 w-36 animate-pulse rounded bg-muted" />
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2">
        {["total", "showing"].map((key) => (
          <Card key={key}>
            <CardContent className="space-y-2 p-5">
              <div className="h-4 w-32 animate-pulse rounded bg-muted" />

              <div className="h-7 w-14 animate-pulse rounded bg-muted" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <div className="h-10 animate-pulse rounded bg-muted" />

      {/* Cards */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {["one", "two", "three", "four", "five", "six"].map((key) => (
          <Card key={key} className="overflow-hidden">
            <div className="aspect-video animate-pulse bg-muted" />

            <CardContent className="space-y-4 p-5">
              <div className="h-5 w-40 animate-pulse rounded bg-muted" />

              <div className="space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-muted" />

                <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
