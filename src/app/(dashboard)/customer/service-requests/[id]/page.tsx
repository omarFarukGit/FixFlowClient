import CustomerServiceDetails from "@/components/dashboard/customer/customer-service-details";

interface ServiceDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function TechnicianServiceDetailsPage({
  params,
}: ServiceDetailsPageProps) {
  const { id } = await params;

  return <CustomerServiceDetails serviceRequestId={id} />;
}
