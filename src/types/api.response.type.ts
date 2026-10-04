export type UserRole = "CUSTOMER" | "TECHNICIAN" | "ADMIN";

export type UserStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";

export type AuthProvider = "CREDENTIAL" | "GOOGLE";

export interface ITechnicianProfile {
  userId: string;
  bio: string | null;
  experienceYears: number;
  averageRating: number;
  totalJobs: number;
  createdAt: string;
  updatedAt: string;
}

export interface ITechnician {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: "TECHNICIAN";
  status: UserStatus;
  imageUrl: string;
  authProvider: AuthProvider;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  technicianProfile: ITechnicianProfile;
}

export interface IPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ITechniciansResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ITechnician[];
  meta: IPaginationMeta;
}
