"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Home, Trophy, Users, Target, Calendar } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function Custom404Page() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-2xl">
        <CardContent className="p-8 text-center">
          {/* Football Pitch Illustration */}
          <div className="relative mb-8 mx-auto max-w-2xl">
            {/* Pitch Background */}
            <div className="relative bg-gradient-to-b from-green-400 to-green-600 rounded-lg p-8 shadow-inner">
              {/* Pitch Markings */}
              <div className="absolute inset-4 border-2 border-white/60 rounded">
                {/* Center Line */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/60 transform -translate-y-0.5"></div>
                {/* Center Circle */}
                <div className="absolute top-1/2 left-1/2 w-20 h-20 border-2 border-white/60 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                {/* Goal Areas */}
                <div className="absolute top-1/2 left-0 w-8 h-16 border-2 border-white/60 border-l-0 transform -translate-y-1/2"></div>
                <div className="absolute top-1/2 right-0 w-8 h-16 border-2 border-white/60 border-r-0 transform -translate-y-1/2"></div>
                {/* Penalty Areas */}
                <div className="absolute top-1/2 left-0 w-16 h-32 border-2 border-white/60 border-l-0 transform -translate-y-1/2"></div>
                <div className="absolute top-1/2 right-0 w-16 h-32 border-2 border-white/60 border-r-0 transform -translate-y-1/2"></div>
              </div>

              {/* 404 in Center Circle */}
              <div className="relative z-10 flex items-center justify-center h-32">
                <span className="text-6xl font-bold text-white drop-shadow-lg font-mono">404</span>
              </div>

              {/* Animated Footballs */}
              <div className="absolute top-4 left-8 text-2xl animate-bounce" style={{ animationDelay: "0s" }}>
                ⚽
              </div>
              <div className="absolute top-8 right-12 text-xl animate-bounce" style={{ animationDelay: "0.5s" }}>
                ⚽
              </div>
              <div className="absolute bottom-6 left-16 text-lg animate-bounce" style={{ animationDelay: "1s" }}>
                ⚽
              </div>
              <div className="absolute bottom-4 right-8 text-2xl animate-bounce" style={{ animationDelay: "1.5s" }}>
                ⚽
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-2">
              🚩 Offside!
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-2">
              Page not found. This part of the pitch doesn't exist.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Looks like you've wandered into the stands! Even the best managers take wrong turns sometimes.
            </p>
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-500 font-mono">Error Code: OFFSIDE_404</div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/dashboard">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
                <Home className="h-5 w-5 mr-2" />
                Go back to Dashboard
              </Button>
            </Link>
            <Button variant="outline" onClick={() => router.back()} className="px-8 py-3 text-lg">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Go Back
            </Button>
          </div>

          {/* Quick Links */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Let's get you back to the action! Try one of these popular pages:
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/create-team">
                <Button variant="ghost" className="w-full h-16 flex-col space-y-1">
                  <Trophy className="h-6 w-6 text-green-600" />
                  <span className="text-sm">Create Team</span>
                </Button>
              </Link>
              <Link href="/leaderboard">
                <Button variant="ghost" className="w-full h-16 flex-col space-y-1">
                  <Users className="h-6 w-6 text-blue-600" />
                  <span className="text-sm">Leaderboard</span>
                </Button>
              </Link>
              <Link href="/players">
                <Button variant="ghost" className="w-full h-16 flex-col space-y-1">
                  <Target className="h-6 w-6 text-purple-600" />
                  <span className="text-sm">Browse Players</span>
                </Button>
              </Link>
              <Link href="/fixtures">
                <Button variant="ghost" className="w-full h-16 flex-col space-y-1">
                  <Calendar className="h-6 w-6 text-orange-600" />
                  <span className="text-sm">Fixtures</span>
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
