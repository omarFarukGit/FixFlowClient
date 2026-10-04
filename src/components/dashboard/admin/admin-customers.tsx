"use client";

import { Mail, Phone, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetCustomers } from "@/hooks";
import Image from "next/image";
import { Customer } from "@/types";
import CustomerSkeleton from "./customer.skeleton";

export default function AdminCustomers() {
  const { data: customersResponse, isLoading, isError } = useGetCustomers();

  const customers: Customer[] = customersResponse?.data ?? [];

  if (isLoading) {
    return <CustomerSkeleton />;
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="flex min-h-40 items-center justify-center">
          <p className="text-sm text-destructive">
            Failed to load customers. Please try again.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Customers</h1>

        <p className="text-sm text-muted-foreground">
          Manage and view all registered customers.
        </p>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10">
              <UserRound className="size-5 text-primary" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Total Customers</p>

              <p className="text-2xl font-bold">
                {customersResponse?.meta?.total ?? customers.length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-11 items-center justify-center rounded-lg bg-green-500/10">
              <UserRound className="size-5 text-green-600" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Active Customers</p>

              <p className="text-2xl font-bold">
                {
                  customers.filter((customer) => customer.status === "ACTIVE")
                    .length
                }
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer List */}
      {customers.length === 0 ? (
        <Card>
          <CardContent className="flex min-h-48 flex-col items-center justify-center text-center">
            <UserRound className="mb-3 size-10 text-muted-foreground" />

            <h3 className="font-semibold">No customers found</h3>

            <p className="mt-1 text-sm text-muted-foreground">
              There are no registered customers yet.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {customers.map((customer) => (
            <Card
              key={customer.id}
              className="transition-shadow hover:shadow-md"
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    {customer.imageUrl ? (
                      <Image
                        src={customer.imageUrl}
                        alt={customer.name}
                        className="size-11 shrink-0 rounded-full object-cover"
                        width={500}
                        height={500}
                      />
                    ) : (
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <UserRound className="size-5 text-primary" />
                      </div>
                    )}

                    <div className="min-w-0">
                      <CardTitle className="truncate text-base">
                        {customer.name}
                      </CardTitle>

                      <p className="truncate text-xs text-muted-foreground">
                        Customer
                      </p>
                    </div>
                  </div>

                  <Badge
                    variant={
                      customer.status === "ACTIVE" ? "default" : "secondary"
                    }
                  >
                    {customer.status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="size-4 shrink-0" />

                  <span className="truncate">{customer.email}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="size-4 shrink-0" />

                  <span>{customer.phone ?? "No phone number"}</span>
                </div>

                <div className="border-t pt-3">
                  <p className="text-xs text-muted-foreground">Joined</p>

                  <p className="mt-1 text-sm font-medium">
                    {new Date(customer.createdAt).toLocaleDateString("en-BD", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
