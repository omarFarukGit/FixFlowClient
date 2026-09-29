import UserProfile from "@/components/profile/user-profile";

const user = {
  id: "e87c63cb-fb1e-4b0a-8917-b407fd1e967c",
  name: "Test Customer",
  email: "customer@fixflow.com",
  authProvider: "CREDENTIAL" as const,
  emailVerified: true,
  phone: null,
  address: null,
  city: null,
  area: null,
  role: "CUSTOMER" as const,
  status: "ACTIVE" as const,
  imageUrl: "",
  createdAt: "2026-09-06T12:07:22.572Z",
  updatedAt: "2026-09-06T12:07:22.572Z",
};

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <UserProfile user={user} />
    </div>
  );
}
