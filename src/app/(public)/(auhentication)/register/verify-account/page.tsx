import Link from "next/link";
import { LoginForm } from "@/components/form/login-form";
import VerifyAccountForm from "@/components/form/verify-account-from";

const VerifyAccount = () => {
  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-4 shadow-lg">
        {/* From  */}
        <VerifyAccountForm />
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

export default VerifyAccount;
