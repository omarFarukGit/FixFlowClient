
"use client";

import {
  Activity,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye,
  Globe,
  Search,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useGetAuditLogs } from "@/hooks";

type AuditLog = {
  id: string;
  action: string;
  entity?: string | null;
  entityId?: string | null;
  description?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  createdAt: string;

  user?: {
    id: string;
    name: string;
    email: string;
    role?: string | null;
  } | null;
};

type AuditLogResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data:
    | AuditLog[]
    | {
        data: AuditLog[];
        meta?: {
          page: number;
          limit: number;
          total: number;
          totalPages: number;
        };
      };
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

const PAGE_SIZE = 10;

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatDateTime(date: string) {
  return new Date(date).toLocaleString("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getActionClass(action: string) {
  const normalized = action.toUpperCase();

  if (
    normalized.includes("DELETE") ||
    normalized.includes("REMOVE") ||
    normalized.includes("BLOCK") ||
    normalized.includes("SUSPEND")
  ) {
    return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
  }

  if (
    normalized.includes("CREATE") ||
    normalized.includes("REGISTER") ||
    normalized.includes("ASSIGN") ||
    normalized.includes("APPROVE")
  ) {
    return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
  }

  if (
    normalized.includes("UPDATE") ||
    normalized.includes("EDIT") ||
    normalized.includes("CHANGE")
  ) {
    return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
  }

  if (
    normalized.includes("LOGIN") ||
    normalized.includes("LOGOUT") ||
    normalized.includes("AUTH")
  ) {
    return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
  }

  return "bg-muted text-muted-foreground";
}

function getActionLabel(action: string) {
  return action
    .replaceAll("_", " ")
    .replaceAll("-", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function AdminAuditLogs() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: response,
    isLoading,
    isError,
  } = useGetAuditLogs();

  const apiResponse =
    response as AuditLogResponse | undefined;

  const logs = useMemo(() => {
    if (!apiResponse?.data) {
      return [];
    }

    if (Array.isArray(apiResponse.data)) {
      return apiResponse.data;
    }

    return apiResponse.data.data ?? [];
  }, [apiResponse]);

  const filteredLogs = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return logs;
    }

    return logs.filter((log) => {
      return [
        log.action,
        log.entity ?? "",
        log.entityId ?? "",
        log.description ?? "",
        log.ipAddress ?? "",
        log.user?.name ?? "",
        log.user?.email ?? "",
        log.user?.role ?? "",
      ].some((value) =>
        value.toLowerCase().includes(query),
      );
    });
  }, [logs, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredLogs.length / PAGE_SIZE),
  );

  const paginatedLogs = useMemo(() => {
    const start =
      (currentPage - 1) * PAGE_SIZE;

    return filteredLogs.slice(
      start,
      start + PAGE_SIZE,
    );
  }, [filteredLogs, currentPage]);

  const loginLogs = logs.filter((log) =>
    log.action.toUpperCase().includes("LOGIN"),
  ).length;

  const createLogs = logs.filter((log) =>
    log.action.toUpperCase().includes("CREATE"),
  ).length;

  const deleteLogs = logs.filter((log) =>
    log.action.toUpperCase().includes("DELETE"),
  ).length;

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="flex min-h-[300px] items-center justify-center">
          <p className="text-sm text-destructive">
            Failed to load audit logs.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Audit Logs
        </h1>

        <p className="text-muted-foreground">
          Monitor important activities and actions across
          the system.
        </p>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-11 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <Activity className="size-5 text-blue-600 dark:text-blue-400" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Total Logs
              </p>

              <p className="text-xl font-bold">
                {logs.length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-11 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
              <ShieldCheck className="size-5 text-purple-600 dark:text-purple-400" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Login Activities
              </p>

              <p className="text-xl font-bold">
                {loginLogs}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-11 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
              <Activity className="size-5 text-green-600 dark:text-green-400" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Create Activities
              </p>

              <p className="text-xl font-bold">
                {createLogs}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-11 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
              <Activity className="size-5 text-red-600 dark:text-red-400" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Delete Activities
              </p>

              <p className="text-xl font-bold">
                {deleteLogs}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Logs */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="size-5" />
              System Activity
            </CardTitle>

            <div className="relative w-full lg:max-w-sm">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={search}
                onChange={(event) =>
                  handleSearch(event.target.value)
                }
                placeholder="Search audit logs..."
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {filteredLogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ShieldCheck className="mb-3 size-10 text-muted-foreground" />

              <h3 className="font-semibold">
                No audit logs found
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Try changing your search query.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left text-sm text-muted-foreground">
                      <th className="px-4 py-3 font-medium">
                        User
                      </th>

                      <th className="px-4 py-3 font-medium">
                        Action
                      </th>

                      <th className="px-4 py-3 font-medium">
                        Entity
                      </th>

                      <th className="px-4 py-3 font-medium">
                        Description
                      </th>

                      <th className="px-4 py-3 font-medium">
                        IP Address
                      </th>

                      <th className="px-4 py-3 font-medium">
                        Date
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedLogs.map((log) => (
                      <tr
                        key={log.id}
                        className="border-b last:border-0"
                      >
                        {/* User */}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
                              <UserRound className="size-4" />
                            </div>

                            <div className="min-w-0">
                              <p className="truncate font-medium">
                                {log.user?.name ??
                                  "System"}
                              </p>

                              <p className="truncate text-xs text-muted-foreground">
                                {log.user?.email ??
                                  "System action"}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Action */}
                        <td className="px-4 py-4">
                          <Badge
                            className={getActionClass(
                              log.action,
                            )}
                          >
                            {getActionLabel(log.action)}
                          </Badge>
                        </td>

                        {/* Entity */}
                        <td className="px-4 py-4">
                          <div>
                            <p className="font-medium">
                              {log.entity ?? "N/A"}
                            </p>

                            {log.entityId && (
                              <p className="text-xs text-muted-foreground">
                                {log.entityId.slice(0, 8)}
                                ...
                              </p>
                            )}
                          </div>
                        </td>

                        {/* Description */}
                        <td className="max-w-[300px] px-4 py-4">
                          <p className="truncate text-sm">
                            {log.description ??
                              "No description"}
                          </p>
                        </td>

                        {/* IP */}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <Globe className="size-3.5" />
                            {log.ipAddress ?? "N/A"}
                          </div>
                        </td>

                        {/* Date */}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <CalendarDays className="size-3.5" />
                            {formatDate(log.createdAt)}
                          </div>

                          <p className="mt-1 text-xs text-muted-foreground">
                            {new Date(
                              log.createdAt,
                            ).toLocaleTimeString(
                              "en-BD",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile */}
              <div className="space-y-4 md:hidden">
                {paginatedLogs.map((log) => (
                  <div
                    key={log.id}
                    className="rounded-lg border p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
                          <UserRound className="size-4" />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate font-medium">
                            {log.user?.name ?? "System"}
                          </p>

                          <p className="truncate text-xs text-muted-foreground">
                            {log.user?.email ??
                              "System action"}
                          </p>
                        </div>
                      </div>

                      <Badge
                        className={getActionClass(
                          log.action,
                        )}
                      >
                        {getActionLabel(log.action)}
                      </Badge>
                    </div>

                    <div className="mt-4 space-y-3 text-sm">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Entity
                        </p>

                        <p className="font-medium">
                          {log.entity ?? "N/A"}
                        </p>

                        {log.entityId && (
                          <p className="text-xs text-muted-foreground">
                            ID: {log.entityId}
                          </p>
                        )}
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground">
                          Description
                        </p>

                        <p>
                          {log.description ??
                            "No description"}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-muted-foreground">
                            IP Address
                          </p>

                          <div className="mt-1 flex items-center gap-1">
                            <Globe className="size-3.5" />
                            <span>
                              {log.ipAddress ?? "N/A"}
                            </span>
                          </div>
                        </div>

                        <div>
                          <p className="text-xs text-muted-foreground">
                            Date
                          </p>

                          <div className="mt-1 flex items-center gap-1">
                            <Clock className="size-3.5" />
                            <span>
                              {formatDateTime(
                                log.createdAt,
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-6 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing{" "}
                  {filteredLogs.length === 0
                    ? 0
                    : (currentPage - 1) *
                        PAGE_SIZE +
                      1}{" "}
                  to{" "}
                  {Math.min(
                    currentPage * PAGE_SIZE,
                    filteredLogs.length,
                  )}{" "}
                  of {filteredLogs.length} logs
                </p>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage((page) =>
                        Math.max(1, page - 1),
                      )
                    }
                  >
                    <ChevronLeft className="size-4" />
                    Previous
                  </Button>

                  <span className="min-w-20 text-center text-sm">
                    Page {currentPage} of {totalPages}
                  </span>

                  <Button
                    variant="outline"
                    size="sm"
                    disabled={
                      currentPage === totalPages
                    }
                    onClick={() =>
                      setCurrentPage((page) =>
                        Math.min(
                          totalPages,
                          page + 1,
                        ),
                      )
                    }
                  >
                    Next
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

