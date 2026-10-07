export type AuditLog = {
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

export type AuditLogResponse = {
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

export const PAGE_SIZE = 10;

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(date: string) {
  return new Date(date).toLocaleString("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getActionClass(action: string) {
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

export function getActionLabel(action: string) {
  return action
    .replaceAll("_", " ")
    .replaceAll("-", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
