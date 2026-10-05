"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useCompleteServiceRequest } from "@/hooks";

interface CompleteServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceRequestId: string;
  onSuccess?: () => void;
}

export default function CompleteServiceDialog({
  open,
  onOpenChange,
  serviceRequestId,
  onSuccess,
}: CompleteServiceDialogProps) {
  const [finalPrice, setFinalPrice] = useState("");

  const { mutate: completeService, isPending } = useCompleteServiceRequest();

  const handleComplete = () => {
    const trimmedPrice = finalPrice.trim();

    if (!trimmedPrice) {
      toast.add({
        title: "Final Price Required",
        description: "Please enter the final service price.",
        type: "error",
      });

      return;
    }

    const price = Number(trimmedPrice);

    if (!Number.isFinite(price) || price <= 0) {
      toast.add({
        title: "Invalid Price",
        description: "Please enter a valid final price.",
        type: "error",
      });

      return;
    }

    completeService(
      {
        serviceRequestId,
        finalPrice: price,
      },
      {
        onSuccess: (response) => {
          if (!response.success) {
            toast.add({
              title: "Completion Failed",
              description: response.message ?? "Unable to complete service.",
              type: "error",
            });

            return;
          }

          toast.add({
            title: "Service Completed",
            description: "Service has been completed successfully.",
            type: "success",
          });

          setFinalPrice("");
          onOpenChange(false);
          onSuccess?.();
        },

        onError: () => {
          toast.add({
            title: "Completion Failed",
            description: "Unable to complete service. Please try again.",
            type: "error",
          });
        },
      },
    );
  };

  const handleDialogChange = (value: boolean) => {
    if (isPending) {
      return;
    }

    onOpenChange(value);

    if (!value) {
      setFinalPrice("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle2 className="size-5 text-primary" />
            Complete Service
          </DialogTitle>

          <DialogDescription>
            Enter the final price before completing this service request.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 py-4">
          <label htmlFor="finalPrice" className="text-sm font-medium">
            Final Price
          </label>

          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              ৳
            </span>

            <Input
              id="finalPrice"
              name="finalPrice"
              type="number"
              min="1"
              step="1"
              placeholder="Enter final price"
              value={finalPrice}
              onChange={(event) => setFinalPrice(event.target.value)}
              disabled={isPending}
              className="pl-8"
            />
          </div>

          <p className="text-xs text-muted-foreground">
            This amount will be saved as the final service price.
          </p>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleDialogChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={handleComplete}
            disabled={isPending || !finalPrice.trim()}
          >
            {isPending ? (
              <>
                <Spinner />
                Completing...
              </>
            ) : (
              <>
                <CheckCircle2 />
                Complete Service
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
