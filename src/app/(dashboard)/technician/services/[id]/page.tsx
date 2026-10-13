import TechnicianServiceDetails from "@/components/dashboard/technician/technician-service-details";

interface ServiceDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function TechnicianServiceDetailsPage({
  params,
}: ServiceDetailsPageProps) {
  const { id } = await params;

  return (
    <main className="space-y-6 p-4 sm:p-6 lg:p-8">
      <TechnicianServiceDetails serviceRequestId={id} />
    </main>
  );
}
