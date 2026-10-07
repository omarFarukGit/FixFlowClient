"use client";

import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Clock3,
  CreditCard,
  ShieldCheck,
  UserCheck,
  Users,
  Wrench,
  XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useGetAllServicesRequests,
  useGetCustomers,
  useGetAllPayments,
  useGetTechnicians,
} from "@/hooks";
import AdminOverviewSkeleton from "./admin-overview-skeleton";
import { IServiceRequest } from "@/types/service.type";

const formatPrice = (value: string | number | null | undefined) => {
  if (value === null || value === undefined || value === "") {
    return "৳0";
  }

  return `৳${Number(value).toLocaleString("en-BD")}`;
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export default function AdminOverview() {
  const { data: servicesResponse, isLoading: servicesLoading } =
    useGetAllServicesRequests();

  const { data: customersResponse, isLoading: customersLoading } =
    useGetCustomers();

  const { data: techniciansResponse, isLoading: techniciansLoading } =
    useGetTechnicians();

  const { data: paymentsResponse, isLoading: paymentsLoading } =
    useGetAllPayments();

  const services = servicesResponse?.data ?? [];
  const customers = customersResponse?.data ?? [];
  const technicians = techniciansResponse?.data ?? [];
  const payments = paymentsResponse?.data.data ?? [];

  const pendingRequests = services.filter(
    (service: IServiceRequest) => service.status === "PENDING",
  ).length;

  const assignedServices = services.filter(
    (service: IServiceRequest) => service.status === "ASSIGNED",
  ).length;

  const inProgressServices = services.filter(
    (service: IServiceRequest) => service.status === "IN_PROGRESS",
  ).length;

  const completedServices = services.filter(
    (service: IServiceRequest) => service.status === "COMPLETED",
  ).length;

  const cancelledServices = services.filter(
    (service: IServiceRequest) => service.status === "CANCELLED",
  ).length;

  const activeCustomers = customers.filter(
    (customer: any) => customer.status === "ACTIVE",
  ).length;

  const activeTechnicians = technicians.filter(
    (technician: any) => technician.status === "ACTIVE",
  ).length;

  const paidPayments = payments.filter(
    (payment: any) => payment.status === "PAID",
  );

  const totalRevenue = paidPayments.reduce(
    (total: number, payment: any) => total + Number(payment.amount ?? 0),
    0,
  );

  const recentServices = [...services]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  const recentPayments = [...payments]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  const isLoading =
    servicesLoading ||
    customersLoading ||
    techniciansLoading ||
    paymentsLoading;

  if (isLoading) {
    return <AdminOverviewSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-6 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight">
              Admin Overview
            </h1>
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            Monitor FixFlow users, services, payments, and platform activity.
          </p>
        </div>

        <Button className={"cursor-pointer"}>
          <Link
            className="flex items-center gap-2"
            href="/admin/service-requests"
          >
            Manage Service Requests
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>

      {/* Main Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Customers"
          value={customers.length}
          description={`${activeCustomers} active customers`}
          icon={Users}
        />

        <StatCard
          title="Total Technicians"
          value={technicians.length}
          description={`${activeTechnicians} active technicians`}
          icon={UserCheck}
        />

        <StatCard
          title="Service Requests"
          value={services.length}
          description={`${pendingRequests} pending requests`}
          icon={Wrench}
        />

        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          description={`${paidPayments.length} paid payments`}
          icon={CreditCard}
        />
      </div>

      {/* Service Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="size-5 text-primary" />
            Service Overview
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <StatusCard label="Pending" value={pendingRequests} icon={Clock3} />

            <StatusCard
              label="Assigned"
              value={assignedServices}
              icon={UserCheck}
            />

            <StatusCard
              label="In Progress"
              value={inProgressServices}
              icon={Wrench}
            />

            <StatusCard
              label="Completed"
              value={completedServices}
              icon={CheckCircle2}
            />

            <StatusCard
              label="Cancelled"
              value={cancelledServices}
              icon={XCircle}
            />
          </div>
        </CardContent>
      </Card>

      {/* Recent Services + Payments */}
      <div className="grid gap-6 xl:grid-cols-2">
        {/* Recent Services */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Service Requests</CardTitle>

            <Button variant="ghost" size="sm">
              <Link
                className="flex items-center gap-2"
                href="/admin/service-requests"
              >
                View All
                <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
          </CardHeader>

          <CardContent>
            {recentServices.length === 0 ? (
              <EmptyState message="No service requests found." />
            ) : (
              <div className="space-y-4">
                {recentServices.map((service) => (
                  <div
                    key={service.id}
                    className="flex items-center justify-between gap-4 rounded-lg border p-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium">{service.title}</p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {service.customer?.name ?? "Unknown customer"}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatDate(service.createdAt)}
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <ServiceStatusBadge status={service.status} />

                      <p className="mt-2 text-sm font-semibold">
                        {formatPrice(
                          service.finalPrice ?? service.estimatedPrice,
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Payments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Payments</CardTitle>

            <Button variant="ghost" size="sm">
              <Link className="flex items-center gap-2" href="/admin/payments">
                View All
                <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
          </CardHeader>

          <CardContent>
            {recentPayments.length === 0 ? (
              <EmptyState message="No payments found." />
            ) : (
              <div className="space-y-4">
                {recentPayments.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between gap-4 rounded-lg border p-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium">
                        {payment.serviceRequest?.title ?? "Service Payment"}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {payment.method ?? "STRIPE"}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatDate(payment.createdAt)}
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <PaymentStatusBadge status={payment.status} />

                      <p className="mt-2 text-sm font-semibold">
                        {formatPrice(payment.amount)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <QuickAction
              href="/admin/service-requests"
              title="Service Requests"
              description="Manage and assign services"
              icon={Wrench}
            />

            <QuickAction
              href="/admin/customers"
              title="Customers"
              description="Manage customer accounts"
              icon={Users}
            />

            <QuickAction
              href="/admin/technicians"
              title="Technicians"
              description="Manage technician accounts"
              icon={UserCheck}
            />

            <QuickAction
              href="/admin/audit-logs"
              title="Audit Logs"
              description="Monitor platform activities"
              icon={Activity}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  title,
  value,
  description,
  icon: Icon,
}: {
  title: string;
  value: string | number;
  description: string;
  icon: React.ElementType;
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>

            <p className="mt-2 text-2xl font-bold">{value}</p>

            <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          </div>

          <div className="rounded-lg bg-primary/10 p-3">
            <Icon className="size-5 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatusCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        <Icon className="size-4 text-muted-foreground" />
      </div>

      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}

function ServiceStatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; className: string }> = {
    PENDING: {
      label: "Pending",
      className:
        "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-400",
    },
    ASSIGNED: {
      label: "Assigned",
      className:
        "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-400",
    },
    ACCEPTED: {
      label: "Accepted",
      className:
        "border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950 dark:text-indigo-400",
    },
    IN_PROGRESS: {
      label: "In Progress",
      className:
        "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-900 dark:bg-purple-950 dark:text-purple-400",
    },
    COMPLETED: {
      label: "Completed",
      className:
        "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-400",
    },
    CANCELLED: {
      label: "Cancelled",
      className:
        "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-400",
    },
  };

  const item = config[status] ?? {
    label: status,
    className: "",
  };

  return (
    <Badge variant="outline" className={item.className}>
      {item.label}
    </Badge>
  );
}

function PaymentStatusBadge({ status }: { status: string }) {
  const config: Record<string, string> = {
    PAID: "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-400",
    PENDING:
      "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-400",
    FAILED:
      "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-400",
    CANCELLED:
      "border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400",
    REFUNDED:
      "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-900 dark:bg-orange-950 dark:text-orange-400",
  };

  return (
    <Badge variant="outline" className={config[status] ?? ""}>
      {status}
    </Badge>
  );
}

function QuickAction({
  href,
  title,
  description,
  icon: Icon,
}: {
  href: string;
  title: string;
  description: string;
  icon: React.ElementType;
}) {
  return (
    <Button variant="outline" className="h-auto justify-start p-4">
      <Link className="flex items-center gap-2" href={href}>
        <Icon className="size-5 text-primary" />

        <span className="ml-3 flex flex-col items-start">
          <span className="font-medium">{title}</span>
          <span className="text-xs font-normal text-muted-foreground">
            {description}
          </span>
        </span>

        <ArrowRight className="ml-auto size-4" />
      </Link>
    </Button>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex min-h-32 items-center justify-center rounded-lg border border-dashed">
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
