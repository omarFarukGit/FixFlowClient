const prefix = "/admin";

export const adminRoutes = [
  {
    title: "Admin",
    url: "#",
    items: [
      {
        title: "Overview",
        url: `${prefix}`,
      },
    ],
  },
  {
    title: "User Management",
    url: "#",
    items: [
      {
        title: "Customers",
        url: `${prefix}/customers`,
      },
      {
        title: "Technicians",
        url: `${prefix}/technicians`,
      },
      {
        title: "Approve Technicians",
        url: `${prefix}/technicians/approve`,
      },
    ],
  },
  {
    title: "Service Management",
    url: "#",
    items: [
      {
        title: "Service Requests",
        url: `${prefix}/service-requests`,
      },
      {
        title: "Assign Technician",
        url: `${prefix}/service-requests/assign`,
      },
      {
        title: "Categories",
        url: `${prefix}/categories`,
      },
    ],
  },
  {
    title: "Payments",
    url: "#",
    items: [
      {
        title: "Payments",
        url: `${prefix}/payments`,
      },
    ],
  },
  {
    title: "Reviews",
    url: "#",
    items: [
      {
        title: "Reviews",
        url: `${prefix}/reviews`,
      },
    ],
  },
  {
    title: "System",
    url: "#",
    items: [
      {
        title: "Audit Logs",
        url: `${prefix}/audit-logs`,
      },
    ],
  },
];
