"use client";

import { useForm } from "@tanstack/react-form";
import { CalendarDays, MapPin, Send } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";

import { useCreateServiceRequest, useGetCategories } from "@/hooks";
import { CreateServiceRequestPayload, ICategory } from "@/types/service.type";
import { CreateServiceRequestFormSchema } from "@/validation/service-request.validation";

export function CreateServiceRequestForm() {
  const router = useRouter();

  const { data: categoriesResponse, isLoading: categoriesLoading } =
    useGetCategories();

  const { mutate: createServiceRequest, isPending } = useCreateServiceRequest();

  const categories: ICategory[] = categoriesResponse?.data ?? [];

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      address: "",
      city: "",
      area: "",
      scheduledAt: "",
      estimatedPrice: "",
      categoryId: "",
    },

    validators: {
      onSubmit: CreateServiceRequestFormSchema,
    },

    onSubmit: ({ value }) => {
      const payload: CreateServiceRequestPayload = {
        title: value.title,
        description: value.description,
        address: value.address,
        city: value.city,
        area: value.area,

        scheduledAt: value.scheduledAt
          ? new Date(value.scheduledAt).toISOString()
          : undefined,

        estimatedPrice: value.estimatedPrice
          ? Number(value.estimatedPrice)
          : undefined,

        categoryId: value.categoryId,
      };

      createServiceRequest(payload, {
        onSuccess: (res) => {
          if (res.success) {
            toast.add({
              title: "Request Created",
              description:
                "Your service request has been submitted successfully.",
              type: "success",
            });

            router.push("/customer/service-requests");
          }
        },

        onError: () => {
          toast.add({
            title: "Request Failed",
            description: "Unable to create service request.",
            type: "error",
          });
        },
      });
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Service Request</CardTitle>

        <CardDescription>
          Tell us what service you need. An admin will review your request and
          assign a suitable technician.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            {/* Category */}
            <form.Field name="categoryId">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="categoryId">
                      Service Category
                    </FieldLabel>

                    <select
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      disabled={categoriesLoading}
                      aria-invalid={isInvalid}
                      className="border-input bg-background text-foreground h-10 w-full rounded-md border px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">
                        {categoriesLoading
                          ? "Loading categories..."
                          : "Select a service category"}
                      </option>

                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Title */}
            <form.Field name="title">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="title">Service Title</FieldLabel>

                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder="e.g. AC not cooling"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      aria-invalid={isInvalid}
                    />

                    <FieldDescription>
                      Give a short title describing the problem.
                    </FieldDescription>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Description */}
            <form.Field name="description">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="description">Description</FieldLabel>

                    <Textarea
                      id={field.name}
                      name={field.name}
                      placeholder="Describe the problem in detail..."
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      aria-invalid={isInvalid}
                      className="min-h-32 resize-none"
                    />

                    <FieldDescription>
                      Provide enough details so the technician can understand
                      the issue.
                    </FieldDescription>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Address */}
            <form.Field name="address">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="address">Service Address</FieldLabel>

                    <div className="relative">
                      <MapPin className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />

                      <Input
                        id={field.name}
                        name={field.name}
                        placeholder="House 12, Road 5, Mirpur, Dhaka"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        aria-invalid={isInvalid}
                        className="pl-9"
                      />
                    </div>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* City + Area */}
            <div className="grid gap-5 sm:grid-cols-2">
              <form.Field name="city">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor="city">City</FieldLabel>

                      <Input
                        id={field.name}
                        name={field.name}
                        placeholder="Dhaka"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        aria-invalid={isInvalid}
                      />

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              <form.Field name="area">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor="area">Area</FieldLabel>

                      <Input
                        id={field.name}
                        name={field.name}
                        placeholder="Mirpur"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        aria-invalid={isInvalid}
                      />

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            </div>

            {/* Date + Estimated Price */}
            <div className="grid gap-5 sm:grid-cols-2">
              {/* Scheduled At */}
              <form.Field name="scheduledAt">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor="scheduledAt">
                        Preferred Date & Time
                      </FieldLabel>

                      <div className="relative">
                        <CalendarDays className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />

                        <Input
                          id={field.name}
                          type="datetime-local"
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          aria-invalid={isInvalid}
                          className="pl-9"
                        />
                      </div>

                      <FieldDescription>
                        Choose your preferred service time.
                      </FieldDescription>

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              {/* Estimated Price */}
              <form.Field name="estimatedPrice">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor="estimatedPrice">
                        Estimated Price
                      </FieldLabel>

                      <Input
                        id={field.name}
                        type="number"
                        min="0"
                        step="1"
                        name={field.name}
                        placeholder="1000"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        aria-invalid={isInvalid}
                      />

                      <FieldDescription>
                        Enter your expected budget if applicable.
                      </FieldDescription>

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            </div>

            {/* Submit */}
            <Field>
              <Button
                disabled={isPending || categoriesLoading}
                type="submit"
                className="w-full"
              >
                {isPending ? (
                  <>
                    <Spinner />
                    Creating Request...
                  </>
                ) : (
                  <>
                    <Send className="size-4" />
                    Create Service Request
                  </>
                )}
              </Button>

              <FieldDescription className="text-center">
                Your request will be reviewed before a technician is assigned.
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
