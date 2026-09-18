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
import { useLogin } from "@/hooks";
import { UserValidation } from "@/validation";
import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { mutate: login, isPending: loginPending } = useLogin();
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
          console.log(res);
          if (res.success) {
            toast.add({
              title: "Login Success",
              description: "Welcome back",
              type: "success",
            });
            router.push("/");
          }
        },
        onError: (err) => {
          toast.add({
            title: "Login Failed",
            description: "Invalid email or password",
            type: "error",
          });
        },
      });
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
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
              <form.Field name="email">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invaild={isInvalid}>
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <Input
                        id={field.name}
                        placeholder="m@example.com"
                        name={field.name}
                        onChange={(e) => field.handleChange(e.target.value)}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        autoComplete="false"
                        aria-invalid={isInvalid}
                      />

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
              <form.Field name="password">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <div className="flex items-center">
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <a
                          href="/"
                          className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </a>
                      </div>
                      <div className=" relative">
                        <Input
                          id={field.name}
                          type={showPassword ? "text" : "password"}
                          name={field.name}
                          onChange={(e) => field.handleChange(e.target.value)}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          aria-invalid={isInvalid}
                        />

                        <button
                          className=" absolute right-3 top-1/2 -translate-y-1/2"
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? (
                            <EyeClosed className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                        </button>

                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </div>
                    </Field>
                  );
                }}
              </form.Field>
              <Field>
                <Button disabled={loginPending} type="submit">
                  {" "}
                  {loginPending ? (
                    <>
                      <Spinner /> sbumiting
                    </>
                  ) : (
                    <>login</>
                  )}
                </Button>
                <Button variant="outline" type="button">
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="/">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
