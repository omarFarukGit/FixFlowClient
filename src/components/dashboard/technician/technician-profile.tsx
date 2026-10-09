
"use client";

import Image from "next/image";
import type { ElementType } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  Banknote,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  UserRound,
  Wrench,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/toast";

import {
  useGetMe,
  useUpdateMyProfileInformation,
  useUpdateMyProfileImage,
  useUpdateTechnicainInfo,
} from "@/hooks";

import EditProfileDialog, {
  type UpdateProfileFormValues,
} from "@/components/profile/edit-profile-dialog";
import UpdateProfileImage from "@/components/profile/update-profile-image";
import TechnicianInfoDialog, {
  type TechnicianInfoValues,
} from "@/components/profile/technician-info-dialog";
import { ApiResponse, UserProfileData } from "@/types/technician.type";



export default function TechnicianProfile() {
  const queryClient = useQueryClient();

  const {
    data: response,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetMe();

  const updateProfileMutation = useUpdateMyProfileInformation();
  const updateProfileImageMutation = useUpdateMyProfileImage();
  const updateTechnicianMutation = useUpdateTechnicainInfo();

  // User details come from data.
  const user = (
    response as ApiResponse<UserProfileData> | undefined
  )?.data;

  // Technician details come from data.technicianProfile.
  const technician = user?.technicianProfile;

  const handleUpdateProfile = async (
    data: UpdateProfileFormValues,
  ): Promise<void> => {
    try {
      await updateProfileMutation.mutateAsync(data);

      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });

      toast.add({
        description: "Profile updated successfully",
        type: "success",
      });
    } catch (err) {
      toast.add({
        description:
          err instanceof Error
            ? err.message
            : "Failed to update profile",
        type: "error",
      });

      throw err;
    }
  };

  const handleUpdateProfileImage = async (
    file: File,
  ): Promise<void> => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      await updateProfileImageMutation.mutateAsync(formData);

      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });

      toast.add({
        description: "Profile image updated successfully",
        type: "success",
      });
    } catch (err) {
      toast.add({
        description:
          err instanceof Error
            ? err.message
            : "Failed to update profile image",
        type: "error",
      });

      throw err;
    }
  };

  const handleUpdateTechnicianInfo = async (
    values: TechnicianInfoValues,
  ): Promise<void> => {
    try {
      await updateTechnicianMutation.mutateAsync(values);

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["user"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["technician-profile"],
        }),
      ]);

      toast.add({
        description: "Technician information updated successfully",
        type: "success",
      });
    } catch (err) {
      toast.add({
        description:
          err instanceof Error
            ? err.message
            : "Failed to update technician information",
        type: "error",
      });

      throw err;
    }
  };

  if (isLoading) {
    return (
      <div className="grid gap-6 lg:grid-cols-2">
        {["profile", "personal", "technician", "account"].map(
          (section) => (
            <Card key={section}>
              <CardContent className="space-y-4 p-6">
                <div className="h-6 w-40 animate-pulse rounded bg-muted" />
                <div className="h-4 w-full animate-pulse rounded bg-muted" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
              </CardContent>
            </Card>
          ),
        )}
      </div>
    );
  }

  if (isError || !user) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
          <p className="font-medium">
            Unable to load your profile.
          </p>

          <p className="text-sm text-muted-foreground">
            {error instanceof Error
              ? error.message
              : "Please try again."}
          </p>

          <Button
            onClick={() => refetch()}
            variant="outline"
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  const formatDate = (date: string) => {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Not available";
    }

    return parsedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const joinedDate = formatDate(user.createdAt);
  const updatedDate = formatDate(user.updatedAt);

  const location = [user.area, user.city]
    .filter(Boolean)
    .join(", ");

  const initials =
    user.name
      ?.trim()
      .split(/\s+/)
      .map((word) => word.charAt(0))
      .slice(0, 2)
      .join("")
      .toUpperCase() || "U";

  // Correct nested technician data for the edit dialog.
  const technicianValues: TechnicianInfoValues = {
    bio: technician?.bio ?? "",
    experienceYears: technician?.experienceYears ?? 0,
    skills: technician?.skills ?? [],
    hourlyRate: Number(technician?.hourlyRate ?? 0),
  };

  const hourlyRate =
    technician?.hourlyRate != null
      ? `৳${Number(technician.hourlyRate).toLocaleString(
          "en-BD",
        )} / hour`
      : "Not provided";

  const availabilityVariant =
    technician?.status === "AVAILABLE"
      ? "default"
      : "secondary";

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="relative h-24 w-24 shrink-0">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-2xl font-bold text-primary">
                {user.imageUrl ? (
                  <Image
                    src={user.imageUrl}
                    alt={user.name}
                    width={500}
                    height={500}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  initials
                )}
              </div>

              <UpdateProfileImage
                imageUrl={user.imageUrl}
                userName={user.name}
                onSubmit={handleUpdateProfileImage}
                isPending={updateProfileImageMutation.isPending}
              />

              {updateProfileImageMutation.isPending && (
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-background/80 text-xs font-medium">
                  Uploading...
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight">
                  {user.name}
                </h1>

                <Badge variant="secondary">
                  {user.role}
                </Badge>

                <Badge
                  variant={
                    user.status === "ACTIVE"
                      ? "default"
                      : "secondary"
                  }
                >
                  {user.status === "ACTIVE" && (
                    <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                  )}
                  {user.status}
                </Badge>

                {technician && (
                  <Badge
                    variant={
                      technician.isApproved
                        ? "default"
                        : "secondary"
                    }
                  >
                    {technician.isApproved
                      ? "Approved Technician"
                      : "Pending Approval"}
                  </Badge>
                )}
              </div>

              <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0" />
                <span className="break-all">{user.email}</span>
              </p>

              <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays className="h-4 w-4 shrink-0" />
                Member since {joinedDate}
              </p>
            </div>

            <div className="shrink-0">
              <EditProfileDialog
                user={user}
                onSubmit={handleUpdateProfile}
                isPending={updateProfileMutation.isPending}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Information */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserRound className="h-5 w-5 text-primary" />
              Personal Information
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <ProfileItem
              icon={UserRound}
              label="Full Name"
              value={user.name}
            />

            <Separator />

            <ProfileItem
              icon={Mail}
              label="Email Address"
              value={user.email}
              verified={user.emailVerified}
            />

            <Separator />

            <ProfileItem
              icon={Phone}
              label="Phone Number"
              value={user.phone || "Not provided"}
            />
          </CardContent>
        </Card>

        {/* Location Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Location Information
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <ProfileItem
              icon={MapPin}
              label="Address"
              value={user.address || "Not provided"}
            />

            <Separator />

            <ProfileItem
              icon={MapPin}
              label="Area"
              value={user.area || "Not provided"}
            />

            <Separator />

            <ProfileItem
              icon={MapPin}
              label="City"
              value={user.city || "Not provided"}
            />
          </CardContent>
        </Card>

        {/* Technician Information */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-primary" />
                Technician Information
              </CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                Your professional experience, skills, ratings, and service rate.
              </p>
            </div>

            {technician && (
              <TechnicianInfoDialog
                initialValues={technicianValues}
                onSubmit={handleUpdateTechnicianInfo}
                isPending={updateTechnicianMutation.isPending}
              />
            )}
          </CardHeader>

          <CardContent>
            {!technician ? (
              <div className="rounded-lg border border-dashed p-6 text-center">
                <Wrench className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
                <p className="font-medium">
                  Technician profile not found
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Technician information is not available for this account.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                <ProfileItem
                  icon={BriefcaseBusiness}
                  label="Professional Bio"
                  value={technician.bio || "Not provided"}
                />

                <Separator />

                <ProfileItem
                  icon={Clock}
                  label="Experience"
                  value={`${technician.experienceYears} ${
                    technician.experienceYears === 1
                      ? "year"
                      : "years"
                  }`}
                />

                <Separator />

                <ProfileItem
                  icon={Banknote}
                  label="Hourly Rate"
                  value={hourlyRate}
                />

                <Separator />

                <ProfileItem
                  icon={Star}
                  label="Average Rating"
                  value={`${Number(
                    technician.averageRating ?? 0,
                  ).toFixed(1)} / 5`}
                />

                <Separator />

                <ProfileItem
                  icon={BriefcaseBusiness}
                  label="Total Jobs"
                  value={String(technician.totalJobs ?? 0)}
                />

                <Separator />

                <ProfileItem
                  icon={ShieldCheck}
                  label="Approval Status"
                  value={
                    technician.isApproved
                      ? "Approved"
                      : "Pending Approval"
                  }
                />

                <Separator />

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <Clock className="h-4 w-4" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Availability
                    </p>

                    <div className="mt-2">
                      <Badge variant={availabilityVariant}>
                        {technician.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <Wrench className="h-4 w-4" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Skills
                    </p>

                    <div className="mt-2 flex flex-wrap gap-2">
                      {technician.skills?.length ? (
                        technician.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="max-w-full whitespace-normal break-words"
                          >
                            {skill}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          No skills added yet
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Account Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Account Information
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <ProfileItem
              icon={ShieldCheck}
              label="Account Status"
              value={user.status}
            />

            <Separator />

            <ProfileItem
              icon={Mail}
              label="Email Verification"
              value={
                user.emailVerified ? "Verified" : "Not verified"
              }
            />

            <Separator />

            <ProfileItem
              icon={ShieldCheck}
              label="Authentication"
              value={
                user.authProvider === "GOOGLE"
                  ? "Google Account"
                  : "Email & Password"
              }
            />

            <Separator />

            <ProfileItem
              icon={CalendarDays}
              label="Member Since"
              value={joinedDate}
            />

            <Separator />

            <ProfileItem
              icon={CalendarDays}
              label="Last Updated"
              value={updatedDate}
            />
          </CardContent>
        </Card>

        {/* Service Location */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Service Location
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="rounded-xl border bg-muted/40 p-5">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-medium">
                    Default Service Location
                  </p>

                  <p className="mt-1 break-words text-sm text-muted-foreground">
                    {location ||
                      user.address ||
                      "No service location added"}
                  </p>

                  {user.address && (
                    <p className="mt-1 break-words text-xs text-muted-foreground">
                      {user.address}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

type ProfileItemProps = {
  icon: ElementType;
  label: string;
  value: string;
  verified?: boolean;
};

function ProfileItem({
  icon: Icon,
  label,
  value,
  verified,
}: ProfileItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>

        <div className="mt-1 flex flex-wrap items-center gap-2">
          <p className="break-words text-sm font-medium">
            {value}
          </p>

          {verified && (
            <Badge variant="outline" className="gap-1 text-xs">
              <CheckCircle2 className="h-3 w-3" />
              Verified
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}