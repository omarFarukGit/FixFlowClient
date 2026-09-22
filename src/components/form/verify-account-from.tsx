"use client";

import { useVerifyAccount } from "@/hooks";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "../ui/toast";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

const RESEND_COOLDOWN = 120;

export default function VerifyAccountForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN);

  const { mutate: verify, isPending: verifyPending } = useVerifyAccount();

  const email = searchParams.get("email") || "";

  // Redirect if email is missing
  useEffect(() => {
    if (!email) {
      router.push("/");
    }
  }, [email, router]);

  // Resend OTP countdown
  useEffect(() => {
    if (resendTimer <= 0) {
      return;
    }

    const timer = setTimeout(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [resendTimer]);

  // Verify OTP
  const handleOTP = () => {
    if (otp.length !== 6) {
      setIsInvalid(true);
      return;
    }

    const verifyData = {
      email,
      otp,
    };

    verify(verifyData, {
      onSuccess: (res) => {
        if (!res.success) {
          toast.add({
            title: "Server Failure",
            description: "Something went wrong. Please try again",
            type: "error",
          });

          return;
        }

        toast.add({
          title: "Verification Successful",
          description: "Welcome onboard",
          type: "success",
        });

        router.push("/");
      },

      onError: (err) => {
        toast.add({
          title: "Verification failure",
          description: "Otp invaild",
          type: "error",
        });
      },
    });
  };

  // Resend OTP
  const handleResend = () => {
    if (resendTimer > 0) {
      return;
    }

    /*
       resend OTP API call 

      Example:

      resendOTP(
        { email },
        {
          onSuccess: () => {
            toast.add({
              title: "OTP Sent",
              description: "A new OTP has been sent to your email.",
              type: "success",
            });

            setResendTimer(RESEND_COOLDOWN);
          },
          onError: (err) => {
            toast.add({
              title: "Resend Failed",
              description:
                err.message || "Something went wrong. Please try again",
              type: "error",
            });
          },
        }
      );
    */

    // Temporary: API না থাকায় শুধু timer reset হচ্ছে
    setResendTimer(RESEND_COOLDOWN);

    toast.add({
      title: "OTP Resent",
      description: "A new OTP has been sent to your email.",
      type: "success",
    });
  };

  if (!email) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verify Account</CardTitle>

        <CardDescription>
          Please provide the OTP we sent you in your email
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="otp-form"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();

            handleOTP();
          }}
        >
          <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor="otp">OTP</FieldLabel>

            <InputOTP
              maxLength={6}
              onChange={(value) => {
                setOtp(value);

                if (isInvalid) {
                  setIsInvalid(false);
                }
              }}
              value={otp}
              autoComplete="off"
              name="otp"
              id="otp"
              pattern={REGEXP_ONLY_DIGITS}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>

            {isInvalid && (
              <FieldError
                errors={[
                  {
                    message: "Invalid Code. Please try again",
                  },
                ]}
              />
            )}

            <FieldDescription>
              {resendTimer > 0
                ? `Resend in ${resendTimer}s`
                : "You can resend the OTP now"}
            </FieldDescription>
          </Field>
        </form>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          disabled={resendTimer > 0}
          onClick={handleResend}
        >
          Resend
        </Button>

        <Button
          type="submit"
          form="otp-form"
          disabled={verifyPending || otp.length !== 6}
        >
          {verifyPending ? "Verifying..." : "Submit"}
        </Button>
      </CardFooter>
    </Card>
  );
}
