import TechnicianServiceDetails from "@/components/dashboard/technician/technician-service-details";

interface TechnicianServiceDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function TechnicianServiceDetailsPage({
  params,
}: TechnicianServiceDetailsPageProps) {
  const { id } = await params;

  return (
    <main className="space-y-6 p-4 sm:p-6 lg:p-8">
      <TechnicianServiceDetails
        serviceRequestId={id}
      />
    </main>
  );
}