"use client";

import { ImagePlus, Loader2, Plus, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

import { useCreateCategory } from "@/hooks";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AdminCreateCategory() {
  const createCategoryMutation = useCreateCategory();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Image validation
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    // 5MB limit
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB.");
      return;
    }

    setImage(file);

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  const handleRemoveImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setImage(null);
    setPreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim()) {
      alert("Category name is required.");
      return;
    }

    if (!description.trim()) {
      alert("Category description is required.");
      return;
    }

    if (!image) {
      alert("Category image is required.");
      return;
    }

    const formData = new FormData();

    formData.append("name", name.trim());
    formData.append("description", description.trim());
    formData.append("image", image);

    createCategoryMutation.mutate(formData, {
      onSuccess: () => {
        setName("");
        setDescription("");
        handleRemoveImage();
      },

      onError: (error: any) => {
        console.error("Create category error:", error);

        console.error("Response:", error?.response?._data ?? error?.data);
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="size-5" />
          Create Service Category
        </CardTitle>

        <CardDescription>
          Create a new service category with an image.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Name */}

          <div className="space-y-2">
            <Label htmlFor="category-name">Category Name</Label>

            <Input
              id="category-name"
              placeholder="e.g. AC Repair"
              value={name}
              onChange={(event) => setName(event.target.value)}
              disabled={createCategoryMutation.isPending}
            />
          </div>

          {/* Description */}

          <div className="space-y-2">
            <Label htmlFor="category-description">Description</Label>

            <Textarea
              id="category-description"
              placeholder="Air conditioner repair, maintenance, and installation services."
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={5}
              disabled={createCategoryMutation.isPending}
            />
          </div>

          {/* Image */}

          <div className="space-y-2">
            <Label>Category Image</Label>

            {!preview ? (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={createCategoryMutation.isPending}
                className="flex min-h-50 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/20 transition-colors hover:border-primary/50 hover:bg-muted/40"
              >
                <ImagePlus className="mb-3 size-10 text-muted-foreground" />

                <p className="font-medium">Upload category image</p>

                <p className="mt-1 text-xs text-muted-foreground">
                  PNG, JPG or WEBP • Max 5MB
                </p>
              </button>
            ) : (
              <div className="relative overflow-hidden rounded-xl border">
                <Image
                  src={preview}
                  alt="Category preview"
                  width={800}
                  height={450}
                  className="h-64 w-full object-cover"
                />

                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute right-3 top-3"
                  onClick={handleRemoveImage}
                  disabled={createCategoryMutation.isPending}
                >
                  <X className="size-4" />
                </Button>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          {/* Submit */}

          <Button
            type="submit"
            className="w-full sm:w-auto"
            disabled={createCategoryMutation.isPending}
          >
            {createCategoryMutation.isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Plus className="size-4" />
                Create Category
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
