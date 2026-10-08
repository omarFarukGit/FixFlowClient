import { Button } from "@/components/ui/button";
import { Check, ShieldCheck } from "lucide-react";
import { Technician } from "./admin-approve-technicians";

export function TechnicianApprovalModal({
  technician,
  isPending,
  onClose,
  onConfirm,
}: {
  technician: Technician;
  isPending: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl border bg-background p-6 shadow-xl">
        <div className="flex items-start gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600">
            <ShieldCheck className="size-5" />
          </div>

          <div>
            <h2 className="font-semibold">Approve Technician?</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {technician.name}
            </p>
          </div>
        </div>

        <p className="mt-5 text-sm leading-6 text-muted-foreground">
          This technician has completed their profile and is eligible for
          approval. After approval, they can receive assigned service requests.
        </p>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>

          <Button onClick={onConfirm} disabled={isPending}>
            {isPending ? (
              "Approving..."
            ) : (
              <>
                <Check className="size-4" />
                Confirm Approval
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
