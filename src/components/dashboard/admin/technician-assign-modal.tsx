"use client";

import { useEffect, useState } from "react";
import { UserRound, Wrench } from "lucide-react";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useAssignTechnician, useGetTechnicians } from "@/hooks";
import { ITechnician } from "@/types/user.type";

interface TechnicianAssignModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceRequestId: string;
  currentTechnicianId?: string | null;
  onSuccess?: () => void;
}

export default function TechnicianAssignModal({
  open,
  onOpenChange,
  serviceRequestId,
  currentTechnicianId,
  onSuccess,
}: TechnicianAssignModalProps) {
  const [technicianId, setTechnicianId] = useState(currentTechnicianId ?? "");

  const { data: techniciansResponse, isLoading: techniciansLoading } =
    useGetTechnicians();

  const { mutate: assignTechnician, isPending: assignPending } =
    useAssignTechnician();

  const technicians = techniciansResponse?.data ?? [];

  useEffect(() => {
    if (open) {
      setTechnicianId(currentTechnicianId ?? "");
    }
  }, [open, currentTechnicianId]);

  const selectedTechnician = technicians.find(
    (technician: ITechnician) => technician.id === technicianId,
  );

  const handleAssign = () => {
    if (!technicianId) {
      toast.add({
        title: "Technician Required",
        description: "Please select a technician.",
        type: "error",
      });

      return;
    }

    assignTechnician(
      {
        serviceRequestId,
        technicianId,
      },
      {
        onSuccess: (response) => {
          if (!response.success) {
            toast.add({
              title: "Assignment Failed",
              description: response.message ?? "Unable to assign technician.",
              type: "error",
            });

            return;
          }

          toast.add({
            title: "Technician Assigned",
            description: "Technician has been assigned successfully.",
            type: "success",
          });

          onOpenChange(false);
          onSuccess?.();
        },

        onError: () => {
          toast.add({
            title: "Assignment Failed",
            description: "Unable to assign technician. Please try again.",
            type: "error",
          });
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wrench className="size-5 text-primary" />

            {currentTechnicianId ? "Reassign Technician" : "Assign Technician"}
          </DialogTitle>

          <DialogDescription>
            Select a technician for this service request.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4">
          <label htmlFor="technician" className="text-sm font-medium">
            Technician
          </label>

          <Select
            value={technicianId}
            onValueChange={(value) => setTechnicianId(value ?? "")}
            disabled={techniciansLoading || assignPending}
          >
            <SelectTrigger id="technician" className="w-full">
              <SelectValue placeholder="Select a technician">
                {selectedTechnician?.name ?? "Select a technician"}
              </SelectValue>
            </SelectTrigger>

            <SelectContent>
              {techniciansLoading ? (
                <div className="flex items-center justify-center py-4">
                  <Spinner />
                </div>
              ) : technicians.length === 0 ? (
                <div className="px-3 py-4 text-center text-sm text-muted-foreground">
                  No technicians available.
                </div>
              ) : (
                technicians.map((technician: ITechnician) => (
                  <SelectItem key={technician.id} value={technician.id}>
                    <div className="flex items-center gap-2">
                      <UserRound className="size-4" />

                      <div className="flex flex-col">
                        <span>{technician.name}</span>

                        <span className="text-xs text-muted-foreground">
                          {technician.email}
                        </span>
                      </div>
                    </div>
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={assignPending}
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={handleAssign}
            disabled={!technicianId || techniciansLoading || assignPending}
          >
            {assignPending ? (
              <>
                <Spinner />
                Assigning...
              </>
            ) : (
              <>
                <Wrench />

                {currentTechnicianId
                  ? "Reassign Technician"
                  : "Assign Technician"}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
