"use client";

import {
  BriefcaseBusiness,
  Check,
  Clock,
  Mail,
  Phone,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { useApproveTechnician, useGetTechnicians } from "@/hooks";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TechnicianApprovalModal } from "./admin-approve-techinicans-modal";

export type Technician = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  imageUrl?: string | null;
  role: string;
  status: string;
  createdAt: string;

  technicianProfile?: {
    id: string;
    userId: string;
    bio?: string | null;
    experienceYears?: number | null;
    skills?: string[];
    hourlyRate?: number | string | null;
    status?: string;
    averageRating?: number | null;
    totalJobs?: number | null;
    isApproved: boolean;
    createdAt: string;
    updatedAt: string;
  } | null;
};

function TechnicianAvatar({
  name,
  imageUrl,
}: {
  name: string;
  imageUrl?: string | null;
}) {
  if (imageUrl) {
    return (
      <Image
        src={imageUrl}
        alt={name}
        className="size-12 rounded-full object-cover"
        width={48}
        height={48}
      />
    );
  }

  return (
    <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
      <UserRound className="size-6" />
    </div>
  );
}

function ExperienceText({ years }: { years?: number | null }) {
  if (years === null || years === undefined) {
    return "Not provided";
  }

  if (years === 0) {
    return "No experience";
  }

  return `${years} ${years === 1 ? "year" : "years"} experience`;
}

function isTechnicianProfileComplete(technician: Technician) {
  const profile = technician.technicianProfile;

  if (!profile) {
    return false;
  }

  const hasName = Boolean(technician.name?.trim());

  const hasEmail = Boolean(technician.email?.trim());

  const hasPhone = Boolean(technician.phone?.trim());

  const hasBio = Boolean(profile.bio?.trim());

  const hasExperience =
    profile.experienceYears !== null &&
    profile.experienceYears !== undefined &&
    profile.experienceYears >= 0;

  const hasSkills = Array.isArray(profile.skills) && profile.skills.length > 0;

  const hasHourlyRate =
    profile.hourlyRate !== null &&
    profile.hourlyRate !== undefined &&
    Number(profile.hourlyRate) > 0;

  return (
    hasName &&
    hasEmail &&
    hasPhone &&
    hasBio &&
    hasExperience &&
    hasSkills &&
    hasHourlyRate
  );
}

function getMissingProfileFields(technician: Technician) {
  const profile = technician.technicianProfile;

  if (!profile) {
    return ["Technician profile"];
  }

  const missingFields: string[] = [];

  if (!technician.name?.trim()) {
    missingFields.push("Name");
  }

  if (!technician.email?.trim()) {
    missingFields.push("Email");
  }

  if (!technician.phone?.trim()) {
    missingFields.push("Phone");
  }

  if (!profile.bio?.trim()) {
    missingFields.push("Bio");
  }

  if (
    profile.experienceYears === null ||
    profile.experienceYears === undefined ||
    profile.experienceYears < 0
  ) {
    missingFields.push("Experience");
  }

  if (!Array.isArray(profile.skills) || profile.skills.length === 0) {
    missingFields.push("Skills");
  }

  if (
    profile.hourlyRate === null ||
    profile.hourlyRate === undefined ||
    Number(profile.hourlyRate) <= 0
  ) {
    missingFields.push("Hourly rate");
  }

  return missingFields;
}

export default function AdminApproveTechnicians() {
  const {
    data: techniciansResponse,
    isLoading,
    isError,
    refetch,
  } = useGetTechnicians();

  const approveTechnicianMutation = useApproveTechnician();

  const [selectedTechnician, setSelectedTechnician] =
    useState<Technician | null>(null);

  const technicians: Technician[] = techniciansResponse?.data ?? [];

  const pendingTechnicians = technicians.filter(
    (technician) => technician.technicianProfile?.isApproved === false,
  );

  const approvedCount = technicians.filter(
    (technician) => technician.technicianProfile?.isApproved === true,
  ).length;

  const handleApprove = (technician: Technician) => {
    const profileComplete = isTechnicianProfileComplete(technician);

    if (!profileComplete) {
      return;
    }

    setSelectedTechnician(technician);
  };

  const handleConfirmApprove = () => {
    if (!selectedTechnician) {
      return;
    }

    const profileComplete = isTechnicianProfileComplete(selectedTechnician);

    if (!profileComplete) {
      return;
    }

    approveTechnicianMutation.mutate(selectedTechnician.id, {
      onSuccess: async () => {
        setSelectedTechnician(null);

        await refetch();
      },

      onError: (error: any) => {
        console.error("Failed to approve technician:", error);

        console.error("Response:", error?.response?._data ?? error?.data);

        console.error(
          "Message:",
          error?.response?._data?.message ?? error?.data?.message,
        );
      },
    });
  };

  const handleCloseModal = () => {
    if (approveTechnicianMutation.isPending) {
      return;
    }

    setSelectedTechnician(null);
  };

  if (isLoading) {
    return <AdminApproveTechniciansSkeleton />;
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="flex min-h-60 items-center justify-center">
          <div className="text-center">
            <p className="font-medium text-destructive">
              Failed to load technicians
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Please try again later.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  /* ---------------------------------------------
     UI
  --------------------------------------------- */

  return (
    <>
      <div className="space-y-6">
        {/* Header */}

        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Approve Technicians
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Review technician profiles and approve eligible technicians.
          </p>
        </div>

        {/* Summary */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Pending */}

          <Card>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex size-11 items-center justify-center rounded-lg bg-yellow-500/10 text-yellow-600">
                <Clock className="size-5" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Pending Approval
                </p>

                <p className="text-2xl font-bold">
                  {pendingTechnicians.length}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Total */}

          <Card>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex size-11 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
                <BriefcaseBusiness className="size-5" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Total Technicians
                </p>

                <p className="text-2xl font-bold">{technicians.length}</p>
              </div>
            </CardContent>
          </Card>

          {/* Approved */}

          <Card>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex size-11 items-center justify-center rounded-lg bg-green-500/10 text-green-600">
                <ShieldCheck className="size-5" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Approved</p>

                <p className="text-2xl font-bold">{approvedCount}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Applications */}

        {pendingTechnicians.length === 0 ? (
          <Card>
            <CardContent className="flex min-h-70 flex-col items-center justify-center text-center">
              <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-green-500/10 text-green-600">
                <ShieldCheck className="size-7" />
              </div>

              <h3 className="text-lg font-semibold">No Pending Applications</h3>

              <p className="mt-1 max-w-md text-sm text-muted-foreground">
                There are currently no technicians waiting for approval.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-5 xl:grid-cols-2">
            {pendingTechnicians.map((technician) => {
              const profileComplete = isTechnicianProfileComplete(technician);

              const missingFields = getMissingProfileFields(technician);

              return (
                <Card key={technician.id} className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <TechnicianAvatar
                          name={technician.name}
                          imageUrl={technician.imageUrl}
                        />

                        <div className="min-w-0">
                          <CardTitle className="truncate text-lg">
                            {technician.name}
                          </CardTitle>

                          <Badge variant="secondary" className="mt-1">
                            Pending Approval
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-5">
                    {/* Contact */}

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="flex min-w-0 items-center gap-2 text-sm">
                        <Mail className="size-4 shrink-0 text-muted-foreground" />

                        <span className="truncate">{technician.email}</span>
                      </div>

                      {technician.phone ? (
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="size-4 shrink-0 text-muted-foreground" />

                          <span>{technician.phone}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-sm text-destructive">
                          <Phone className="size-4 shrink-0" />

                          <span>Phone not provided</span>
                        </div>
                      )}
                    </div>

                    <Separator />

                    {/* Technician Info */}

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Experience
                        </p>

                        <p className="mt-1 font-medium">
                          {ExperienceText({
                            years:
                              technician.technicianProfile?.experienceYears,
                          })}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground">
                          Completed Jobs
                        </p>

                        <p className="mt-1 font-medium">
                          {technician.technicianProfile?.totalJobs ?? 0}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground">
                          Hourly Rate
                        </p>

                        <p className="mt-1 font-medium">
                          {technician.technicianProfile?.hourlyRate
                            ? `BDT ${Number(
                                technician.technicianProfile.hourlyRate,
                              ).toLocaleString()}`
                            : "Not provided"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground">Skills</p>

                        <p className="mt-1 font-medium">
                          {technician.technicianProfile?.skills?.length
                            ? technician.technicianProfile.skills.join(", ")
                            : "Not provided"}
                        </p>
                      </div>
                    </div>

                    {/* Bio */}

                    {technician.technicianProfile?.bio ? (
                      <div>
                        <p className="mb-2 text-xs text-muted-foreground">
                          About Technician
                        </p>

                        <p className="rounded-lg bg-muted/50 p-3 text-sm leading-6">
                          {technician.technicianProfile.bio}
                        </p>
                      </div>
                    ) : (
                      <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3">
                        <p className="text-sm font-medium text-destructive">
                          Bio is missing
                        </p>
                      </div>
                    )}

                    <Separator />

                    {/* Profile Status */}

                    {profileComplete ? (
                      <div className="flex items-center gap-2 rounded-lg border border-green-500/20 bg-green-500/5 p-3">
                        <Check className="size-5 text-green-600" />

                        <div>
                          <p className="text-sm font-medium text-green-600">
                            Profile Complete
                          </p>

                          <p className="text-xs text-muted-foreground">
                            This technician is eligible for approval.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3">
                        <div className="flex items-start gap-2">
                          <X className="mt-0.5 size-5 shrink-0 text-destructive" />

                          <div>
                            <p className="text-sm font-medium text-destructive">
                              Profile Incomplete
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                              Complete the following fields before approval:
                            </p>

                            <p className="mt-2 text-xs font-medium text-destructive">
                              {missingFields.join(", ")}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action */}

                    <Button
                      className="w-full"
                      disabled={
                        !profileComplete || approveTechnicianMutation.isPending
                      }
                      onClick={() => handleApprove(technician)}
                    >
                      <Check className="size-4" />

                      {profileComplete
                        ? "Approve Technician"
                        : "Profile Incomplete"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Approval Modal */}

      {selectedTechnician && (
        <TechnicianApprovalModal
          technician={selectedTechnician}
          isPending={approveTechnicianMutation.isPending}
          onClose={handleCloseModal}
          onConfirm={handleConfirmApprove}
        />
      )}
    </>
  );
}

function AdminApproveTechniciansSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="space-y-2">
        <div className="h-8 w-56 animate-pulse rounded-md bg-muted" />

        <div className="h-4 w-80 animate-pulse rounded-md bg-muted" />
      </div>

      {/* Summary */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {["pending", "total", "approved"].map((key) => (
          <Card key={key}>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="size-11 animate-pulse rounded-lg bg-muted" />

              <div className="space-y-2">
                <div className="h-4 w-28 animate-pulse rounded bg-muted" />

                <div className="h-7 w-14 animate-pulse rounded bg-muted" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cards */}

      <div className="grid gap-5 xl:grid-cols-2">
        {[
          "technician-one",
          "technician-two",
          "technician-three",
          "technician-four",
        ].map((key) => (
          <Card key={key}>
            <CardContent className="space-y-5 p-6">
              <div className="flex items-center gap-3">
                <div className="size-12 animate-pulse rounded-full bg-muted" />

                <div className="space-y-2">
                  <div className="h-5 w-36 animate-pulse rounded bg-muted" />

                  <div className="h-5 w-28 animate-pulse rounded bg-muted" />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="h-5 animate-pulse rounded bg-muted" />

                <div className="h-5 animate-pulse rounded bg-muted" />
              </div>

              <div className="h-px bg-muted" />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="h-12 animate-pulse rounded bg-muted" />

                <div className="h-12 animate-pulse rounded bg-muted" />

                <div className="h-12 animate-pulse rounded bg-muted" />

                <div className="h-12 animate-pulse rounded bg-muted" />
              </div>

              <div className="h-20 animate-pulse rounded-lg bg-muted" />

              <div className="h-20 animate-pulse rounded-lg bg-muted" />

              <div className="h-10 animate-pulse rounded bg-muted" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
