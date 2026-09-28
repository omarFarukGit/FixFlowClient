"use client";

import { useForm } from "@tanstack/react-form";
import { cn } from "cn";
import { Eye, EyeClosed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
import { useGoogleOAuth, useLogin } from "@/hooks";
import { UserValidation } from "@/validation";
import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";
import { GoogleLogin } from "@react-oauth/google";

const demoCredentials = {
  customer: {
    label: "Customer",
    email: "customer@fixflow.com",
    password: "Password123!",
  },
  technician: {
    label: "Technician",
    email: "technician@fixflow.com",
    password: "Password123!",
  },
  admin: {
    label: "Admin",
    email: "admin@fixflow.com",
    password: "Password123!",
  },
};

type DemoRole = keyof typeof demoCredentials;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { mutate: login, isPending: loginPending } = useLogin();
  const { mutate: googleLogin } = useGoogleOAuth();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "customer@fixflow.com",
      password: "Password123!",
    },

    validators: {
      onSubmit: UserValidation.UserLoginZodSchema,
    },

    onSubmit: ({ value }) => {
      const loginData = {
        email: value.email,
        password: value.password,
      };

      login(loginData, {
        onSuccess: (res) => {
          if (res.success) {
            toast.add({
              title: "Login Success",
              description: "Welcome back",
              type: "success",
            });

            router.push("/");
          }
        },

        onError: () => {
          toast.add({
            title: "Login Failed",
            description: "Invalid email or password",
            type: "error",
          });
        },
      });
    },
  });

  const handleDemoLogin = (role: DemoRole) => {
    const credential = demoCredentials[role];

    form.setFieldValue("email", credential.email);
    form.setFieldValue("password", credential.password);

    toast.add({
      title: `${credential.label} credentials loaded`,
      description: "Click Login to continue",
      type: "success",
    });
  };

  const handleGoogleSuccess = (credentialResponse: {
    credential?: string;
  }) => {
    const idToken = credentialResponse.credential;

    if (!idToken) {
      toast.add({
        title: "Google OAuth Failed",
        type: "error",
      });

      return;
    }

    googleLogin(
      { idToken },
      {
        onSuccess: () => {
          toast.add({
            title: "Google login successfully",
            type: "success",
          });

          router.push("/");
        },
      },
    );
  };

  const handleGoogleError = () => {
    toast.add({
      title: "Google Login Failed",
      description: "Unable to login with Google",
      type: "error",
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>

          <CardDescription>
            Enter your credentials below to login
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Demo Credentials */}
          <div className="mb-6 rounded-lg border bg-muted/40 p-4">
            <p className="mb-3 text-sm font-medium">
              Demo Login
            </p>

            <div className="grid grid-cols-3 gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleDemoLogin("customer")}
              >
                Customer
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleDemoLogin("technician")}
              >
                Technician
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleDemoLogin("admin")}
              >
                Admin
              </Button>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              {/* Email */}
              <form.Field name="email">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor="email">
                        Email
                      </FieldLabel>

                      <Input
                        id={field.name}
                        placeholder="m@example.com"
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) =>
                          field.handleChange(e.target.value)
                        }
                        onBlur={field.handleBlur}
                        autoComplete="email"
                        aria-invalid={isInvalid}
                      />

                      {isInvalid && (
                        <FieldError
                          errors={field.state.meta.errors}
                        />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              {/* Password */}
              <form.Field name="password">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <div className="flex items-center">
                        <FieldLabel htmlFor="password">
                          Password
                        </FieldLabel>

                        <a
                          href="/forgot-password"
                          className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </a>
                      </div>

                      <div className="relative">
                        <Input
                          id={field.name}
                          type={
                            showPassword
                              ? "text"
                              : "password"
                          }
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) =>
                            field.handleChange(e.target.value)
                          }
                          onBlur={field.handleBlur}
                          aria-invalid={isInvalid}
                        />

                        <button
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                          type="button"
                          onClick={() =>
                            setShowPassword((prev) => !prev)
                          }
                        >
                          {showPassword ? (
                            <EyeClosed className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                        </button>
                      </div>

                      {isInvalid && (
                        <FieldError
                          errors={field.state.meta.errors}
                        />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              {/* Login */}
              <Field>
                <Button
                  disabled={loginPending}
                  type="submit"
                  className="w-full"
                >
                  {loginPending ? (
                    <>
                      <Spinner />
                      Submitting...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>

                {/* Google */}
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                />

                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <a
                    href="/register"
                    className="underline underline-offset-4"
                  >
                    Register
                  </a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}