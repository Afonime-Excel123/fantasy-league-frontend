"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LogOut, ArrowLeft } from "lucide-react"

export function LogoutConfirmation() {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)

    // Simulate logout process
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Clear any stored user data
    localStorage.removeItem("user")
    localStorage.removeItem("authToken")

    // Redirect to login page
    router.push("/")
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md shadow-xl border-0 backdrop-blur-sm bg-white/90 dark:bg-gray-900/90">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
            <LogOut className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Confirm Logout</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300 text-base mt-2">
            Are you sure you want to log out?
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">
            You will need to sign in again to access your fantasy teams and dashboard.
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="flex-1 h-11 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
              disabled={isLoggingOut}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Cancel
            </Button>

            <Button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex-1 h-11 bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 text-white"
            >
              {isLoggingOut ? (
                <>
                  <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Logging out...
                </>
              ) : (
                <>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
