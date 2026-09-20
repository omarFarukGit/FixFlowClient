export interface RegistrationPyload {
  name: string;
  email: string;
  password: string;
  role: "CUSTOMER" | "TECHNICIAN";
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface VerifyAccountPyaload {
  email: string;
  otp: string;
}
