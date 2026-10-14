import AdminServiceDetails from "@/components/dashboard/admin/AdminServiceDetails";

interface ServiceDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function TechnicianServiceDetailsPage({
  params,
}: ServiceDetailsPageProps) {
  const { id } = await params;

  return <AdminServiceDetails serviceRequestId={id} />;
}
