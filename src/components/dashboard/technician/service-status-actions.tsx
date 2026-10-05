"use client";

import { useState } from "react";
import { CheckCircle2, Play, ThumbsUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useAcceptServiceRequest, useStartServiceRequest } from "@/hooks";

import CompleteServiceDialog from "./complete-service-dialog";

type ServiceStatus =
  | "PENDING"
  | "ASSIGNED"
  | "ACCEPTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

interface ServiceStatusActionsProps {
  serviceRequestId: string;
  status: ServiceStatus;
  onSuccess?: () => void;
}

export default function ServiceStatusActions({
  serviceRequestId,
  status,
  onSuccess,
}: ServiceStatusActionsProps) {
  const [completeDialogOpen, setCompleteDialogOpen] = useState(false);

  const { mutate: acceptService, isPending: acceptPending } =
    useAcceptServiceRequest();

  const { mutate: startService, isPending: startPending } =
    useStartServiceRequest();

  const handleAccept = () => {
    acceptService(serviceRequestId, {
      onSuccess: (response) => {
        if (!response.success) {
          toast.add({
            title: "Accept Failed",
            description:
              response.message ?? "Unable to accept service request.",
            type: "error",
          });

          return;
        }

        toast.add({
          title: "Service Accepted",
          description: "Service request accepted successfully.",
          type: "success",
        });

        onSuccess?.();
      },

      onError: () => {
        toast.add({
          title: "Accept Failed",
          description: "Unable to accept service request. Please try again.",
          type: "error",
        });
      },
    });
  };

  const handleStart = () => {
    startService(serviceRequestId, {
      onSuccess: (response) => {
        if (!response.success) {
          toast.add({
            title: "Start Failed",
            description: response.message ?? "Unable to start service.",
            type: "error",
          });

          return;
        }

        toast.add({
          title: "Service Started",
          description: "Service is now in progress.",
          type: "success",
        });

        onSuccess?.();
      },

      onError: () => {
        toast.add({
          title: "Start Failed",
          description: "Unable to start service. Please try again.",
          type: "error",
        });
      },
    });
  };

  /*
   * ASSIGNED
   * → Accept
   */
  if (status === "ASSIGNED") {
    return (
      <Button onClick={handleAccept} disabled={acceptPending}>
        {acceptPending ? (
          <>
            <Spinner />
            Accepting...
          </>
        ) : (
          <>
            <ThumbsUp />
            Accept Service
          </>
        )}
      </Button>
    );
  }

  /*
   * ACCEPTED
   * → Start
   */
  if (status === "ACCEPTED") {
    return (
      <Button onClick={handleStart} disabled={startPending}>
        {startPending ? (
          <>
            <Spinner />
            Starting...
          </>
        ) : (
          <>
            <Play />
            Start Service
          </>
        )}
      </Button>
    );
  }

  /*
   * IN_PROGRESS
   * → Complete Dialog
   */
  if (status === "IN_PROGRESS") {
    return (
      <>
        <Button onClick={() => setCompleteDialogOpen(true)}>
          <CheckCircle2 />
          Complete Service
        </Button>

        <CompleteServiceDialog
          open={completeDialogOpen}
          onOpenChange={setCompleteDialogOpen}
          serviceRequestId={serviceRequestId}
          onSuccess={onSuccess}
        />
      </>
    );
  }

  /*
   * COMPLETED / PENDING / CANCELLED
   * → No action
   */
  return null;
}
