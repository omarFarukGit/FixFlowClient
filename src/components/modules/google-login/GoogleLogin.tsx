"use client";

import { toast } from "@/components/ui/toast";
import { useGoogleOAuth } from "@/hooks";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";

export default function GoogleLoginComponent() {
  const router = useRouter();
  const { mutate: googleOAuth, isPending } = useGoogleOAuth();

  const handleGoogleSuccess = (credentialResponse: { credential?: string }) => {
    const idToken = credentialResponse.credential;
    console.log(idToken);

    if (!idToken) {
      toast.add({
        title: "Google OAuth Failed",
        type: "error",
      });
      return;
    }

    googleOAuth(
      { idToken },
      {
        onSuccess: () => {
          toast.add({
            title: "Google login successful",
          });

          router.replace("/customer");
          router.refresh();
        },
        onError: (error) => {
          console.error("Google login failed:", error);

          toast.add({
            title: "Google login failed",
            type: "error",
          });
        },
      },
    );
  };

  return (
    <GoogleLogin
      theme="outline"
      shape="pill"
      text="continue_with"
      onSuccess={handleGoogleSuccess}
      onError={() => {
        toast.add({
          title: "Google authentication failed",
          type: "error",
        });
      }}
    />
  );
}
