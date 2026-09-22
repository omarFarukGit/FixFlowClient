import { LoginForm } from "@/components/form/login-form";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 ">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative  hidden  lg:block w-full h-full">
        <Image
          src="/images/Side_Image.png"
          alt="Image"
          width={500}
          height={500}
          className="absolute w-full h-full  dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
