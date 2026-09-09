"use client";
import EmailDeliverySettings from "@/components/dashboard/EmailDeliverySettings";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Mail,
  User,
  Shield,
  Bell,
  Settings,
  AlertTriangle,
  Server,
  Save,
  TestTube,
} from "lucide-react";

export default function SettingsTab({ userEmail }: { userEmail: string }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Pengaturan akun & email
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <EmailDeliverySettings userEmail={userEmail} />

        {/* Profile Settings */}
        <Card className="admin-panel">
          <CardHeader className="admin-panel-heading">
            <CardTitle className="admin-panel-title flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="admin-panel-body space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={userEmail}
                disabled
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                defaultValue={
                  typeof window !== "undefined"
                    ? localStorage.getItem("userFullName") || ""
                    : ""
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="Enter your full name"
              />
            </div>
            <Button className="w-full bg-teal-600 hover:bg-teal-700">
              Update Profile
            </Button>
          </CardContent>
        </Card>

        {/* System Information */}
        <Card className="admin-panel">
          <CardHeader className="admin-panel-heading">
            <CardTitle className="admin-panel-title flex items-center gap-2">
              <Settings className="h-5 w-5" />
              System Information
            </CardTitle>
          </CardHeader>
          <CardContent className="admin-panel-body space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Version</span>
              <span className="font-medium">1.0.0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Last Login</span>
              <span className="font-medium">
                {new Date().toLocaleDateString("id-ID")}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Session Timeout</span>
              <span className="font-medium">24 hours</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Database Status</span>
              <Badge className="bg-green-100 text-green-800">Connected</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
