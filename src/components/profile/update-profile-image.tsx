"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, ImagePlus, Loader2, X } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface UpdateProfileImageProps {
  imageUrl: string | null;
  userName: string;
  isPending?: boolean;
  onSubmit: (file: File) => Promise<void>;
}

export default function UpdateProfileImage({
  imageUrl,
  userName,
  isPending = false,
  onSubmit,
}: UpdateProfileImageProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(imageUrl);

  const initials = userName
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();

  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      return;
    }

    if (preview?.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    const previewUrl = URL.createObjectURL(selectedFile);

    setFile(selectedFile);
    setPreview(previewUrl);
  };

  const handleRemove = () => {
    if (preview?.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setFile(null);
    setPreview(imageUrl);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleSubmit = async () => {
    if (!file || isPending) return;

    try {
      await onSubmit(file);

      // Upload successful হলে modal বন্ধ হবে
      setOpen(false);

      // Selected file reset
      setFile(null);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } catch (error) {
      console.error("Profile image upload failed:", error);
    }
  };

  const handleOpenChange = (value: boolean) => {
    setOpen(value);

    if (!value) {
      handleRemove();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger>
        <Button
          type="button"
          size="icon"
          variant="secondary"
          className="absolute right-1 bottom-1 size-9 rounded-full border shadow-sm"
        >
          <Camera className="size-4" />
          <span className="sr-only">Change profile picture</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Profile Picture</DialogTitle>

          <DialogDescription>
            Choose a new profile picture. Maximum file size is 5MB.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-5 py-4">
          {/* Preview */}
          <div className="relative">
            <Avatar className="size-32 border">
              <AvatarImage
                src={preview ?? undefined}
                alt={`${userName}'s profile picture`}
              />

              <AvatarFallback className="text-3xl">{initials}</AvatarFallback>
            </Avatar>

            {file && (
              <Button
                type="button"
                size="icon"
                variant="destructive"
                className="absolute -top-2 -right-2 size-7 rounded-full"
                onClick={handleRemove}
                disabled={isPending}
              >
                <X className="size-3.5" />
                <span className="sr-only">Remove selected image</span>
              </Button>
            )}
          </div>

          {/* File Input */}
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />

          <Button
            type="button"
            variant="outline"
            onClick={() => inputRef.current?.click()}
            disabled={isPending}
          >
            <ImagePlus className="mr-2 size-4" />
            Choose Image
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            JPG, PNG or WebP · Maximum 5MB
          </p>
        </div>

        <DialogFooter>
          <DialogClose>
            <Button type="button" variant="outline" disabled={isPending}>
              Cancel
            </Button>
          </DialogClose>

          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!file || isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Update Picture"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
