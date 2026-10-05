
"use client";

import { useState } from "react";
import {
  Ban,
  BriefcaseBusiness,
  CheckCircle2,
  Mail,
  Phone,
  Star,
  UserRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useGetTechnicians, useUpdateUserStatus } from "@/hooks";
import { ITechnician } from "@/types/user.type";
import Image from "next/image";

export default function AdminTechnicians() {
  const [selectedTechnician, setSelectedTechnician] = useState<{
    id: string;
    name: string;
    status: string;
  } | null>(null);

  const [statusAction, setStatusAction] = useState<
    "BLOCK" | "UNBLOCK" | null
  >(null);

  const {
    data: techniciansResponse,
    isLoading,
    isError,
    refetch,
  } = useGetTechnicians();

  const {
    mutate: updateUserStatus,
    isPending: statusPending,
  } = useUpdateUserStatus();

  const technicians = techniciansResponse?.data ?? [];

  const openStatusDialog = (
    technician: (typeof technicians)[number],
  ) => {
    setSelectedTechnician({
      id: technician.id,
      name: technician.name,
      status: technician.status,
    });

    setStatusAction(
      technician.status === "SUSPENDED"
        ? "UNBLOCK"
        : "BLOCK",
    );
  };

  const closeStatusDialog = () => {
    if (statusPending) {
      return;
    }

    setSelectedTechnician(null);
    setStatusAction(null);
  };

  const handleStatusChange = () => {
    if (!selectedTechnician || !statusAction) {
      return;
    }

    const newStatus =
      statusAction === "BLOCK" ? "SUSPENDED" : "ACTIVE";

    updateUserStatus(
      {
        technicianId: selectedTechnician.id,
        status: newStatus,
      },
      {
        onSuccess: (response) => {
          if (!response.success) {
            toast.add({
              title:
                statusAction === "BLOCK"
                  ? "Block Failed"
                  : "Unblock Failed",
              description:
                response.message ??
                "Unable to update technician status.",
              type: "error",
            });

            return;
          }

          toast.add({
            title:
              statusAction === "BLOCK"
                ? "Technician Blocked"
                : "Technician Unblocked",
            description:
              statusAction === "BLOCK"
                ? `${selectedTechnician.name} has been blocked successfully.`
                : `${selectedTechnician.name} has been unblocked successfully.`,
            type: "success",
          });

          closeStatusDialog();
          refetch();
        },

        onError: () => {
          toast.add({
            title:
              statusAction === "BLOCK"
                ? "Block Failed"
                : "Unblock Failed",
            description:
              "Something went wrong. Please try again.",
            type: "error",
          });
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-52" />
          <Skeleton className="mt-2 h-4 w-80" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {["skeleton-a", "skeleton-b", "skeleton-c", "skeleton-d", "skeleton-e", "skeleton-f"].map((skeletonKey) => (
            <Card key={skeletonKey}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Skeleton className="size-11 rounded-full" />

                  <div className="space-y-2">
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-3 w-44" />
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-8 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="flex min-h-40 items-center justify-center">
          <p className="text-sm text-destructive">
            Failed to load technicians. Please try again.
          </p>
        </CardContent>
      </Card>
    );
  }

  const activeTechnicians = technicians.filter(
    (technician: ITechnician) => technician.status === "ACTIVE",
  ).length;

  const blockedTechnicians:ITechnician[] = technicians.filter(
    (technician:ITechnician) => technician.status === "SUSPENDED",
  ).length;

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Technicians
          </h1>

          <p className="text-sm text-muted-foreground">
            Manage and monitor all registered technicians.
          </p>
        </div>

        {/* Summary */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10">
                <UserRound className="size-5 text-primary" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Total Technicians
                </p>

                <p className="text-2xl font-bold">
                  {techniciansResponse?.meta?.total ??
                    technicians.length}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex size-11 items-center justify-center rounded-lg bg-green-500/10">
                <CheckCircle2 className="size-5 text-green-600" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Active Technicians
                </p>

                <p className="text-2xl font-bold">
                  {activeTechnicians}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex size-11 items-center justify-center rounded-lg bg-destructive/10">
                <Ban className="size-5 text-destructive" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Blocked Technicians
                </p>

                <p className="text-2xl font-bold">
                
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Technician List */}
        {technicians.length === 0 ? (
          <Card>
            <CardContent className="flex min-h-48 flex-col items-center justify-center text-center">
              <UserRound className="mb-3 size-10 text-muted-foreground" />

              <h3 className="font-semibold">
                No technicians found
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                There are no registered technicians yet.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {technicians.map((technician: ITechnician) => {
              const profile = technician.technicianProfile;

              const isBlocked =
                technician.status === "SUSPENDED";

              return (
                <Card
                  key={technician.id}
                  className="overflow-hidden transition-shadow hover:shadow-md"
                >
                  {/* Header */}
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        {technician.imageUrl ? (
                          <Image
                            src={technician.imageUrl}
                            alt={technician.name}
                            className="size-11 shrink-0 rounded-full object-cover"
                            width={44}
                            height={44}
                          />
                        ) : (
                          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10">
                            <UserRound className="size-5 text-primary" />
                          </div>
                        )}

                        <div className="min-w-0">
                          <CardTitle className="truncate text-base">
                            {technician.name}
                          </CardTitle>

                          <p className="truncate text-xs text-muted-foreground">
                            Technician
                          </p>
                        </div>
                      </div>

                      <Badge
                        variant={
                          technician.status === "ACTIVE"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {technician.status}
                      </Badge>
                    </div>
                  </CardHeader>

                  {/* Content */}
                  <CardContent className="space-y-4">
                    {/* Contact */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="size-4 shrink-0" />

                        <span className="truncate">
                          {technician.email}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="size-4 shrink-0" />

                        <span>
                          {technician.phone ??
                            "No phone number"}
                        </span>
                      </div>
                    </div>

                    {/* Bio */}
                    {profile?.bio && (
                      <p className="line-clamp-2 text-sm text-muted-foreground">
                        {profile.bio}
                      </p>
                    )}

                    {/* Technician Stats */}
                    <div className="grid grid-cols-3 gap-2 border-y py-3">
                      <div className="text-center">
                        <div className="mb-1 flex items-center justify-center gap-1">
                          <BriefcaseBusiness className="size-4 text-muted-foreground" />
                        </div>

                        <p className="text-lg font-semibold">
                          {profile?.experienceYears ?? 0}
                        </p>

                        <p className="text-[11px] text-muted-foreground">
                          Years
                        </p>
                      </div>

                      <div className="border-x text-center">
                        <div className="mb-1 flex items-center justify-center gap-1">
                          <Star className="size-4 fill-current text-yellow-500" />
                        </div>

                        <p className="text-lg font-semibold">
                          {profile?.averageRating?.toFixed(1) ??
                            "0.0"}
                        </p>

                        <p className="text-[11px] text-muted-foreground">
                          Rating
                        </p>
                      </div>

                      <div className="text-center">
                        <div className="mb-1 flex items-center justify-center gap-1">
                          <BriefcaseBusiness className="size-4 text-muted-foreground" />
                        </div>

                        <p className="text-lg font-semibold">
                          {profile?.totalJobs ?? 0}
                        </p>

                        <p className="text-[11px] text-muted-foreground">
                          Jobs
                        </p>
                      </div>
                    </div>

                    {/* Joined + Action */}
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Joined
                        </p>

                        <p className="mt-1 text-sm font-medium">
                          {new Date(
                            technician.createdAt,
                          ).toLocaleDateString("en-BD", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>

                      {/* <Button
                        size="sm"
                        variant={
                          isBlocked
                            ? "default"
                            : "destructive"
                        }
                        onClick={() =>
                          openStatusDialog(technician)
                        }
                        disabled={statusPending}
                      >
                        {isBlocked ? (
                          <>
                            <CheckCircle2 className="size-4" />
                            Unblock
                          </>
                        ) : (
                          <>
                            <Ban className="size-4" />
                            Block
                          </>
                        )}
                      </Button> */}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Block / Unblock Dialog */}
      <Dialog
        open={!!selectedTechnician}
        onOpenChange={(open) => {
          if (!open) {
            closeStatusDialog();
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {statusAction === "BLOCK"
                ? "Block Technician"
                : "Unblock Technician"}
            </DialogTitle>

            <DialogDescription>
              {statusAction === "BLOCK"
                ? `Are you sure you want to block ${selectedTechnician?.name}? This technician will no longer be able to use the system normally.`
                : `Are you sure you want to unblock ${selectedTechnician?.name}? This technician will regain access to the system.`}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={closeStatusDialog}
              disabled={statusPending}
            >
              Cancel
            </Button>

            <Button
              type="button"
              variant={
                statusAction === "BLOCK"
                  ? "destructive"
                  : "default"
              }
              onClick={handleStatusChange}
              disabled={statusPending}
            >
              {statusPending ? (
                <>
                  <Spinner />

                  {statusAction === "BLOCK"
                    ? "Blocking..."
                    : "Unblocking..."}
                </>
              ) : statusAction === "BLOCK" ? (
                <>
                  <Ban className="size-4" />
                  Block Technician
                </>
              ) : (
                <>
                  <CheckCircle2 className="size-4" />
                  Unblock Technician
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}