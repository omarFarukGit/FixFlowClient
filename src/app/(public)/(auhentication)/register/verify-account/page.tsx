import VerifyAccountForm from "@/components/form/verify-account-from";
import { Suspense } from "react";

const VerifyAccount = () => {
  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-4 shadow-lg">
        {/* From  */}
        <Suspense fallback={<div>Loading...</div>}>
          <VerifyAccountForm />
        </Suspense>
      </div>
    </div>
  );
};

export default VerifyAccount;
