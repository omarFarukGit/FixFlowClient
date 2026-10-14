import PaymentList from "@/components/dashboard/customer/payment-list";

export default function PaymentsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Payments</h1>

        <p className="text-muted-foreground mt-1 text-sm">
          View your payment history and transaction details.
        </p>
      </div>

      <PaymentList />
    </main>
  );
}
