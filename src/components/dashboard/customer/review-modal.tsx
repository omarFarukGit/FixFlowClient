"use client";

import { useForm } from "@tanstack/react-form";
import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useCreateReview } from "@/hooks";
import { CreateReviewFormSchema } from "@/validation/review.validation";

interface ReviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceRequestId: string;
  onSuccess?: () => void;
}

export default function ReviewModal({
  open,
  onOpenChange,
  serviceRequestId,
  onSuccess,
}: ReviewModalProps) {
  const { mutate: createReview, isPending } = useCreateReview();

  const form = useForm({
    defaultValues: {
      rating: 0,
      comment: "",
    },

    validators: {
      onSubmit: CreateReviewFormSchema,
    },

    onSubmit: ({ value }) => {
      const payload = {
        serviceRequestId,
        rating: value.rating,
        comment: value.comment.trim() || undefined,
      };

      createReview(payload, {
        onSuccess: () => {
          toast.add({
            title: "Review submitted successfully",
            type: "success",
          });

          form.reset();

          onOpenChange(false);
          onSuccess?.();
        },

        onError: (error: any) => {
          console.error("Review creation failed:", error);

          const message =
            error?.response?._data?.message ||
            error?.message ||
            "Failed to submit review";

          toast.add({
            title: "Review Failed",
            description: message,
            type: "error",
          });
          onOpenChange(false);
        },
      });
    },
  });

  const handleClose = (value: boolean) => {
    if (!value) {
      form.reset();
    }

    onOpenChange(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rate Your Service</DialogTitle>

          <DialogDescription>
            Share your experience with the technician.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            {/* Rating */}
            <form.Field name="rating">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                const rating = field.state.value;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>Rating</FieldLabel>

                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const active = star <= rating;

                        return (
                          <button
                            key={star}
                            type="button"
                            onClick={() => field.handleChange(star)}
                            className="rounded-md p-1 transition-transform hover:scale-110"
                            aria-label={`Rate ${star} star${
                              star > 1 ? "s" : ""
                            }`}
                          >
                            <Star
                              className={`size-7 transition-colors ${
                                active
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-muted-foreground"
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>

                    {rating > 0 && (
                      <p className="text-muted-foreground text-sm">
                        {rating === 1 && "Poor"}
                        {rating === 2 && "Fair"}
                        {rating === 3 && "Good"}
                        {rating === 4 && "Very Good"}
                        {rating === 5 && "Excellent"}
                      </p>
                    )}

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Comment */}
            <form.Field name="comment">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="review-comment">
                      Comment{" "}
                      <span className="text-muted-foreground">(Optional)</span>
                    </FieldLabel>

                    <Textarea
                      id="review-comment"
                      name={field.name}
                      placeholder="Tell us about your experience..."
                      value={field.state.value}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      onBlur={field.handleBlur}
                      rows={5}
                      maxLength={1000}
                      aria-invalid={isInvalid}
                    />

                    <div className="flex items-center justify-between">
                      {isInvalid ? (
                        <FieldError errors={field.state.meta.errors} />
                      ) : (
                        <span />
                      )}

                      <p className="text-muted-foreground text-xs">
                        {field.state.value.length}/1000
                      </p>
                    </div>
                  </Field>
                );
              }}
            </form.Field>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleClose(false)}
                disabled={isPending}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={isPending}>
                {isPending && <Spinner />}
                {isPending ? "Submitting..." : "Submit Review"}
              </Button>
            </DialogFooter>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
