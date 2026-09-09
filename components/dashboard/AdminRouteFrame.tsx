"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api-client";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
export default function AdminRouteFrame({
  children,
  activeTab = "applications",
}: {
  children: React.ReactNode;
  activeTab?: string;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  useEffect(() => {
    let active = true;
    apiClient
      .verifySession()
      .then((result) => {
        if (active && result.success) setEmail(result.data?.user?.email || "");
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);
  const navigate = (tab: string) => {
    localStorage.setItem("dashboardActiveTab", tab);
    router.push("/dashboard");
  };
  const logout = async () => {
    try {
      await apiClient.logout();
    } finally {
      localStorage.removeItem("dashboardActiveTab");
      router.push("/login");
    }
  };
  return (
    <DashboardLayout
      activeTab={activeTab}
      onTabChange={navigate}
      userEmail={email}
      onLogout={logout}
    >
      {children}
    </DashboardLayout>
  );
}
