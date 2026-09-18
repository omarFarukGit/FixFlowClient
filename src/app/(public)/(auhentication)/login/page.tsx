import Link from "next/link";
import { LoginForm } from "@/components/form/login-form";

const LogingPage = () => {
  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-4 shadow-lg">
        {/* From Text  */}
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome Back!</h1>
          <p className="text-gray-500">
            Enter your credentials to access your account
          </p>
        </div>

        {/* From  */}
        <LoginForm />
        <div className="flex items-center justify-center">
          <p className="text-xs text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href={"/register"} className="text-red-400">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogingPage;
