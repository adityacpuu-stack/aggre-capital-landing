"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { 
  Mail,
  User,
  Shield,
  Bell,
  Settings,
  AlertTriangle,
  Server,
  Save,
  TestTube
} from "lucide-react"

interface SettingsTabProps {
  userEmail: string
  smtpSettings: any
  onSmtpSettingsChange: (settings: any) => void
  onSaveSmtpSettings: () => void
  onTestSmtpConnection: () => void
  onRefreshSmtpSettings: () => void
  smtpLoading: boolean
  smtpTestLoading: boolean
  smtpSettingsLoading: boolean
}

export default function SettingsTab({
  userEmail,
  smtpSettings,
  onSmtpSettingsChange,
  onSaveSmtpSettings,
  onTestSmtpConnection,
  onRefreshSmtpSettings,
  smtpLoading,
  smtpTestLoading,
  smtpSettingsLoading
}: SettingsTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* SMTP Settings */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              SMTP Email Settings
            </CardTitle>
            <p className="text-sm text-gray-600">
              Configure SMTP settings for sending emails from the application
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Enable SMTP Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Enable SMTP Email</p>
                <p className="text-sm text-gray-600">Turn on/off email functionality</p>
                {smtpSettingsLoading && (
                  <p className="text-xs text-blue-600">Loading settings...</p>
                )}
                <p className="text-xs text-gray-500">Current status: {smtpSettings.enabled ? 'ON' : 'OFF'}</p>
              </div>
              <Switch 
                checked={smtpSettings.enabled}
                onCheckedChange={(checked) => {
                  console.log('🔄 Toggle changed to:', checked)
                  onSmtpSettingsChange({...smtpSettings, enabled: checked})
                }}
                disabled={smtpSettingsLoading}
              />
            </div>

            {smtpSettings.enabled && (
              <>
                {/* Basic SMTP Configuration */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SMTP Host *
                    </label>
                    <input
                      type="text"
                      value={smtpSettings.smtp_host}
                      onChange={(e) => onSmtpSettingsChange({...smtpSettings, smtp_host: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="smtp.gmail.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SMTP Port *
                    </label>
                    <select
                      value={smtpSettings.smtp_port}
                      onChange={(e) => {
                        const port = parseInt(e.target.value)
                        const secure = port === 465 // Only port 465 uses SSL
                        onSmtpSettingsChange({...smtpSettings, smtp_port: port, smtp_secure: secure})
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    >
                      <option value={25}>25 (SMTP)</option>
                      <option value={587}>587 (SMTP - Recommended)</option>
                      <option value={465}>465 (SMTPS)</option>
                      <option value={2525}>2525 (Alternative)</option>
                    </select>
                  </div>
                </div>

                {/* Security & Authentication */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Use SSL/TLS Encryption</p>
                      <p className="text-sm text-gray-600">
                        {smtpSettings.smtp_port === 465 
                          ? 'SSL (required for port 465)' 
                          : smtpSettings.smtp_port === 587 
                          ? 'STARTTLS (recommended for port 587)'
                          : 'Enable secure connection'
                        }
                      </p>
                    </div>
                    <Switch 
                      checked={smtpSettings.smtp_secure}
                      onCheckedChange={(checked) => onSmtpSettingsChange({...smtpSettings, smtp_secure: checked})}
                      disabled={smtpSettings.smtp_port === 465} // Port 465 always uses SSL
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SMTP Username (Email) *
                      </label>
                      <input
                        type="email"
                        value={smtpSettings.smtp_username}
                        onChange={(e) => onSmtpSettingsChange({...smtpSettings, smtp_username: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="your-email@gmail.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SMTP Password *
                      </label>
                      <input
                        type="password"
                        value={smtpSettings.smtp_password}
                        onChange={(e) => onSmtpSettingsChange({...smtpSettings, smtp_password: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Leave empty to use EMAIL_PASSWORD env var"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Password akan diambil dari environment variable EMAIL_PASSWORD jika kosong
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email Configuration */}
                <div className="space-y-4 border-t pt-4">
                  <h4 className="font-medium text-gray-900 flex items-center gap-2">
                    <Server className="h-4 w-4" />
                    Email Configuration
                  </h4>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        From Name
                      </label>
                      <input
                        type="text"
                        value={smtpSettings.from_name}
                        onChange={(e) => onSmtpSettingsChange({...smtpSettings, from_name: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="AGGRE CAPITAL"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        From Email *
                      </label>
                      <input
                        type="email"
                        value={smtpSettings.from_email}
                        onChange={(e) => onSmtpSettingsChange({...smtpSettings, from_email: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="noreply@aggrecapital.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reply-To Email
                    </label>
                    <input
                      type="email"
                      value={smtpSettings.reply_to}
                      onChange={(e) => onSmtpSettingsChange({...smtpSettings, reply_to: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="support@aggrecapital.com"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                  <Button
                    onClick={onTestSmtpConnection}
                    variant="outline"
                    disabled={smtpTestLoading || !smtpSettings.smtp_host || !smtpSettings.smtp_username}
                    className="flex-1"
                  >
                    {smtpTestLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
                        Testing...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <TestTube className="h-4 w-4" />
                        Test SMTP Connection
                      </div>
                    )}
                  </Button>
                  
                  <Button
                    onClick={onSaveSmtpSettings}
                    disabled={smtpLoading || !smtpSettings.smtp_host || !smtpSettings.smtp_username}
                    className="flex-1 bg-teal-600 hover:bg-teal-700"
                  >
                    {smtpLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Saving...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Save SMTP Settings
                      </div>
                    )}
                  </Button>
                  
                  <Button
                    onClick={onRefreshSmtpSettings}
                    variant="outline"
                    className="flex-1"
                  >
                    <div className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Refresh Settings
                    </div>
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
                defaultValue={typeof window !== 'undefined' ? localStorage.getItem('userFullName') || '' : ''}
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
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              System Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Version</span>
              <span className="font-medium">1.0.0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Last Login</span>
              <span className="font-medium">{new Date().toLocaleDateString('id-ID')}</span>
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
  )
}
