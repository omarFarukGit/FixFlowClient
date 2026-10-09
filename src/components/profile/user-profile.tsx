"use client";

import {
  CalendarDays,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import {
  useGetMe,
  useUpdateMyProfileInformation,
  useUpdateMyProfileImage,
} from "@/hooks";

import type { UpdateProfileFormValues } from "./edit-profile-dialog";
import EditProfileDialog from "./edit-profile-dialog";
import UpdateProfileImage from "./update-profile-image";
import { toast } from "../ui/toast";
import Image from "next/image";

type UserProfileData = {
  id: string;
  name: string;
  email: string;
  authProvider: "CREDENTIAL" | "GOOGLE";
  emailVerified: boolean;
  phone: string | null;
  address: string | null;
  city: string | null;
  area: string | null;
  role: "CUSTOMER" | "TECHNICIAN" | "ADMIN";
  status: "ACTIVE" | "INACTIVE" | "BLOCKED";
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

type ApiResponse<T> = {
  success?: boolean;
  message?: string;
  data: T;
};

export default function UserProfile() {
  const queryClient = useQueryClient();

  const { data: response, isLoading, isError, error, refetch } = useGetMe();

  const updateProfileMutation = useUpdateMyProfileInformation();
  const updateProfileImageMutation = useUpdateMyProfileImage();

  // Expected API response: { data: user }
  const user = (response as ApiResponse<UserProfileData> | undefined)?.data;

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
    } catch (error) {
      // toast.error(
      //   error instanceof Error ? error.message : "Failed to update profile",
      // );
      toast.add({
        description: "Failed to update profile",
        type: "error",
      });

      throw error;
    }
  };

  const handleUpdateProfileImage = async (file: File): Promise<void> => {
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
  };

  if (isLoading) {
    return (
      <div className="grid gap-6 lg:grid-cols-2">
        {["profile", "account", "security", "preferences"].map((section) => (
          <Card key={section}>
            {" "}
            <CardContent className="space-y-4 p-6">
              {" "}
              <div className="h-6 w-40 animate-pulse rounded bg-muted" />{" "}
              <div className="h-4 w-full animate-pulse rounded bg-muted" />{" "}
              <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />{" "}
            </CardContent>{" "}
          </Card>
        ))}{" "}
      </div>
    );
  }

  if (isError || !user) {
    return (
      <Card>
        {" "}
        <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
          {" "}
          <p className="font-medium">Unable to load your profile.</p>
          ```
          <p className="text-sm text-muted-foreground">
            {error instanceof Error ? error.message : "Please try again."}
          </p>
          <Button onClick={() => refetch()} variant="outline">
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  const joinedDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const updatedDate = new Date(user.updatedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const location = [user.area, user.city].filter(Boolean).join(", ");

  const initials =
    user.name
      ?.trim()
      .split(/\s+/)
      .map((word) => word.charAt(0))
      .slice(0, 2)
      .join("")
      .toUpperCase() || "U";

  return (
    <div className="space-y-6">
      {/* Profile Header */}{" "}
      <Card>
        {" "}
        <CardContent className="p-6">
          {" "}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            {/* Avatar and image update */}{" "}
            <div className="relative h-24 w-24 shrink-0">
              {" "}
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
                )}{" "}
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
            {/* User information */}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight">
                  {user.name}
                </h1>

                <Badge variant="secondary">{user.role}</Badge>

                <Badge
                  variant={user.status === "ACTIVE" ? "default" : "secondary"}
                >
                  {user.status === "ACTIVE" && (
                    <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                  )}
                  {user.status}
                </Badge>
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
            {/* Edit profile */}
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
            <ProfileItem icon={UserRound} label="Full Name" value={user.name} />

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

                <div className="min-w-0">
                  <p className="font-medium">Default Service Location</p>

                  <p className="mt-1 break-words text-sm text-muted-foreground">
                    {location || user.address || "No service location added"}
                  </p>
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
  icon: React.ElementType;
  label: string;
  value: string;
  verified?: boolean;
};

function ProfileItem({ icon: Icon, label, value, verified }: ProfileItemProps) {
  return (
    <div className="flex items-start gap-3">
      {" "}
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        {" "}
        <Icon className="h-4 w-4" />{" "}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>

        <div className="mt-1 flex flex-wrap items-center gap-2">
          <p className="break-words text-sm font-medium">{value}</p>

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
