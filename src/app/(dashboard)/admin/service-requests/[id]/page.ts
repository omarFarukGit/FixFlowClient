import ServiceDetails from "@/components/dashboard/technician/service-details";

import { createElement } from "react";

interface TechnicianServiceDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function TechnicianServiceDetailsPage({
  params,
}: TechnicianServiceDetailsPageProps) {
  const { id } = await params;

  return createElement(
    "main",
    { className: "space-y-6 p-4 sm:p-6 lg:p-8" },
    createElement(ServiceDetails, { serviceRequestId: id }),
  );
}
