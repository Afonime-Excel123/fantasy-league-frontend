"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Eye, Lock, Database, Mail, Users, Settings, AlertTriangle, Calendar } from "lucide-react"

export function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Privacy Policy</h1>
          <p className="text-gray-600 dark:text-gray-400">How we collect, use, and protect your personal information</p>
          <Badge variant="outline" className="mt-2">
            <Calendar className="w-3 h-3 mr-1" />
            Last updated: January 2024
          </Badge>
        </div>

        {/* Introduction */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              Introduction
            </CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Campus League Fantasy Football ("we," "our," or "us") is committed to protecting your privacy. This
              Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our
              fantasy football platform designed for university students and staff.
            </p>
          </CardContent>
        </Card>

        {/* Information We Collect */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-green-600" />
              Information We Collect
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Personal Information
                </h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Full name and email address</li>
                  <li>• University department affiliation</li>
                  <li>• Academic year and student status</li>
                  <li>• Phone number (optional)</li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Usage Information
                </h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Fantasy team selections and transfers</li>
                  <li>• League participation and rankings</li>
                  <li>• Login times and activity logs</li>
                  <li>• Device and browser information</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How We Use Your Information */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-green-600" />
              How We Use Your Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Platform Operations</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We use your information to provide and maintain the fantasy football platform, process your team
                  selections, calculate scores, and manage league competitions.
                </p>
              </div>
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Communication</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We may send you notifications about gameweek deadlines, player updates, league results, and important
                  platform announcements.
                </p>
              </div>
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Improvement and Analytics</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We analyze usage patterns to improve the platform, fix bugs, and develop new features for a better
                  user experience.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Protection */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-green-600" />
              Data Protection & Security
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 dark:text-white">Security Measures</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Encrypted data transmission (HTTPS)</li>
                  <li>• Secure password hashing</li>
                  <li>• Regular security audits</li>
                  <li>• Access controls and monitoring</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 dark:text-white">Data Retention</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Account data: Until account deletion</li>
                  <li>• Activity logs: 12 months</li>
                  <li>• Anonymous analytics: 24 months</li>
                  <li>• Backup data: 30 days</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Your Rights */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-green-600" />
              Your Rights & Choices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Access & Control</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• View your personal data</li>
                  <li>• Update your information</li>
                  <li>• Download your data</li>
                  <li>• Delete your account</li>
                </ul>
              </div>
              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Communication Preferences</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Opt out of marketing emails</li>
                  <li>• Customize notifications</li>
                  <li>• Choose communication frequency</li>
                  <li>• Manage privacy settings</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Sharing */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              Data Sharing & Disclosure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">We DO NOT sell your personal data</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Your personal information is never sold to third parties for marketing or commercial purposes.
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 dark:text-white">Limited Sharing Scenarios:</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <li>
                    • <strong>University Administration:</strong> Basic participation data for academic record keeping
                  </li>
                  <li>
                    • <strong>Service Providers:</strong> Technical partners who help maintain the platform (under
                    strict confidentiality)
                  </li>
                  <li>
                    • <strong>Legal Requirements:</strong> When required by law or to protect user safety
                  </li>
                  <li>
                    • <strong>Public Leaderboards:</strong> Your chosen display name and scores (no personal details)
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-green-600" />
              Contact Us
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                If you have questions about this Privacy Policy or how we handle your data, please contact us:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Email</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">privacy@campusleague.edu</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Data Protection Officer</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">dpo@campusleague.edu</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Updates */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-600" />
              Policy Updates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting
              the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this
              Privacy Policy periodically for any changes.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
