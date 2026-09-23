const prefix = "/technician";

export const technicianRoutes = [
  {
    title: "Technician",
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
        title: "Assigned Services",
        url: `${prefix}/services`,
      },
      {
        title: "Pending Requests",
        url: `${prefix}/requests`,
      },
      {
        title: "Completed Services",
        url: `${prefix}/services/completed`,
      },
    ],
  },
  {
    title: "Availability",
    url: "#",
    items: [
      {
        title: "My Availability",
        url: `${prefix}/availability`,
      },
    ],
  },
  {
    title: "Earnings",
    url: "#",
    items: [
      {
        title: "Earnings",
        url: `${prefix}/earnings`,
      },
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
