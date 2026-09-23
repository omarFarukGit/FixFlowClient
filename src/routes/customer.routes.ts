const prefix = "/customer";

export const customerRoutes = [
  {
    title: "Customer",
    url: "#",
    items: [
      {
        title: "Overview",
        url: `${prefix}`,
      },
      {
        title: "My Profile",
        url: `${prefix}/profile`,
      },
    ],
  },
  {
    title: "Service Management",
    url: "#",
    items: [
      {
        title: "Browse Services",
        url: `${prefix}/services`,
      },
      {
        title: "My Service Requests",
        url: `${prefix}/service-requests`,
      },
      {
        title: "Create Service Request",
        url: `${prefix}/service-requests/create`,
      },
    ],
  },
  {
    title: "Payments",
    url: "#",
    items: [
      {
        title: "Payment History",
        url: `${prefix}/payments`,
      },
    ],
  },
  {
    title: "Reviews",
    url: "#",
    items: [
      {
        title: "My Reviews",
        url: `${prefix}/reviews`,
      },
    ],
  },
];
