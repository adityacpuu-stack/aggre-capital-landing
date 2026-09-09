import AdminRouteFrame from "@/components/dashboard/AdminRouteFrame";
export default function NewsManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminRouteFrame activeTab="news">{children}</AdminRouteFrame>;
}
