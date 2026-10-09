"use client";

import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export interface TechnicianInfoValues {
  bio: string;
  experienceYears: number;
  skills: string[];
  hourlyRate: number;
}

interface TechnicianInfoDialogProps {
  initialValues: TechnicianInfoValues;
  isPending?: boolean;
  onSubmit: (values: TechnicianInfoValues) => Promise<void>;
}

export default function TechnicianInfoDialog({
  initialValues,
  isPending = false,
  onSubmit,
}: TechnicianInfoDialogProps) {
  const [open, setOpen] = useState(false);
  const [bio, setBio] = useState(initialValues.bio);
  const [experienceYears, setExperienceYears] = useState(
    String(initialValues.experienceYears),
  );
  const [skills, setSkills] = useState(initialValues.skills.join(", "));
  const [hourlyRate, setHourlyRate] = useState(
    String(initialValues.hourlyRate),
  );
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (open) {
      setBio(initialValues.bio);
      setExperienceYears(String(initialValues.experienceYears));
      setSkills(initialValues.skills.join(", "));
      setHourlyRate(String(initialValues.hourlyRate));
      setFormError("");
    }
  }, [open, initialValues]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    const years = Number(experienceYears);
    const rate = Number(hourlyRate);

    if (!bio.trim()) {
      setFormError("Please enter your professional bio.");
      return;
    }

    if (
      experienceYears.trim() === "" ||
      !Number.isInteger(years) ||
      years < 0
    ) {
      setFormError("Experience years must be a non-negative integer.");
      return;
    }

    if (hourlyRate.trim() === "" || !Number.isFinite(rate) || rate < 0) {
      setFormError("Hourly rate must be a non-negative number.");
      return;
    }

    const parsedSkills = [
      ...new Set(
        skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      ),
    ];

    if (parsedSkills.length === 0) {
      setFormError("Please enter at least one skill.");
      return;
    }

    try {
      await onSubmit({
        bio: bio.trim(),
        experienceYears: years,
        skills: parsedSkills,
        hourlyRate: rate,
      });

      setOpen(false);
    } catch {
      setFormError(
        "Unable to update technician information. Please try again.",
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="outline" size="sm">
          <Pencil className="mr-2 h-4 w-4" />
          Edit Technician Info
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Update Technician Information</DialogTitle>
          <DialogDescription>
            Update your professional bio, experience, skills, and hourly rate.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="technician-bio">Professional Bio</Label>
            <Textarea
              id="technician-bio"
              placeholder="Professional AC and electrical technician"
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              rows={4}
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="experience-years">Experience (Years)</Label>
              <Input
                id="experience-years"
                type="number"
                min={0}
                step={1}
                value={experienceYears}
                onChange={(event) => setExperienceYears(event.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hourly-rate">Hourly Rate (BDT)</Label>
              <Input
                id="hourly-rate"
                type="number"
                min={0}
                step="any"
                value={hourlyRate}
                onChange={(event) => setHourlyRate(event.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="technician-skills">Skills</Label>
            <Textarea
              id="technician-skills"
              placeholder="AC Repair, Electrical Wiring, AC Installation"
              value={skills}
              onChange={(event) => setSkills(event.target.value)}
              rows={3}
              required
            />
            <p className="text-xs text-muted-foreground">
              Separate each skill with a comma.
            </p>
          </div>

          {formError && (
            <p role="alert" className="text-sm text-destructive">
              {formError}
            </p>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
