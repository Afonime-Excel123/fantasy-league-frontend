"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { EliminatedPlayerWarningModal } from "./eliminated-player-warning-modal"
import {
  Trophy,
  Users,
  Star,
  TrendingUp,
  Calendar,
  Target,
  Crown,
  Award,
  AlertTriangle,
  Clock,
  Zap,
} from "lucide-react"
import Link from "next/link"

// Mock data for eliminated players in user's team
const mockEliminatedPlayers = [
  {
    id: 3,
    name: "Aaron Ramsdale",
    position: "GK" as const,
    team: "Arsenal",
    status: "injured" as const,
    eliminationReason: "Shoulder injury - Expected return: 3 weeks",
    expectedReturn: "March 15, 2024",
  },
  {
    id: 19,
    name: "Mohamed Salah",
    position: "FWD" as const,
    team: "Liverpool",
    status: "injured" as const,
    eliminationReason: "Ankle injury - Surgery required, out for 6 weeks",
    expectedReturn: "April 1, 2024",
  },
  {
    id: 22,
    name: "Ivan Toney",
    position: "FWD" as const,
    team: "Brentford",
    status: "suspended" as const,
    eliminationReason: "Betting violations - 8 month ban",
  },
]

export function DashboardContent() {
  const [showEliminatedModal, setShowEliminatedModal] = useState(false)

  // Check for eliminated players on component mount
  useEffect(() => {
    // In a real app, this would check the user's actual team
    if (mockEliminatedPlayers.length > 0) {
      // Show modal after a short delay to allow page to load
      const timer = setTimeout(() => {
        setShowEliminatedModal(true)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <div className="space-y-8">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 dark:text-green-400 text-sm font-medium">Team Rank</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">#42</p>
                <p className="text-green-700 dark:text-green-300 text-xs">↑ 8 positions</p>
              </div>
              <Trophy className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">Total Points</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">1,847</p>
                <p className="text-blue-700 dark:text-blue-300 text-xs">+156 this week</p>
              </div>
              <Star className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/20 border-purple-200 dark:border-purple-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 dark:text-purple-400 text-sm font-medium">Team Value</p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">£98.5m</p>
                <p className="text-purple-700 dark:text-purple-300 text-xs">+£2.1m this week</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 dark:text-orange-400 text-sm font-medium">Gameweek</p>
                <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">GW 28</p>
                <p className="text-orange-700 dark:text-orange-300 text-xs">2 days left</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Issues Alert */}
      {mockEliminatedPlayers.length > 0 && (
        <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
                <div>
                  <h3 className="font-semibold text-red-900 dark:text-red-100">Team Issues Detected</h3>
                  <p className="text-red-700 dark:text-red-300 text-sm">
                    {mockEliminatedPlayers.length} player{mockEliminatedPlayers.length > 1 ? "s" : ""} in your team{" "}
                    {mockEliminatedPlayers.length > 1 ? "are" : "is"} no longer active
                  </p>
                </div>
              </div>
              <Button
                variant="destructive"
                onClick={() => setShowEliminatedModal(true)}
                className="bg-red-600 hover:bg-red-700"
              >
                View Issues
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Current Team Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
              <span>Your Team</span>
              <Badge variant="outline">Thunder Hawks</Badge>
            </CardTitle>
            <CardDescription>Current lineup and performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Formation</span>
              <Badge variant="secondary">4-4-2</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Captain</span>
              <div className="flex items-center space-x-1">
                <Crown className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">Kevin De Bruyne</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">This Week Points</span>
              <span className="font-bold text-green-600">156 pts</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Team Performance</span>
                <span>78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
            <div className="flex space-x-2">
              <Link href="/edit-team" className="flex-1">
                <Button variant="outline" className="w-full">
                  Edit Team
                </Button>
              </Link>
              <Link href="/create-team" className="flex-1">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">New Team</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span>League Performance</span>
            </CardTitle>
            <CardDescription>Your standing in active leagues</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">University League</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">248 managers</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">#42</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">↑ 8</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Friends League</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">12 managers</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-yellow-600">#3</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">→ 0</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Department Cup</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">64 managers</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-600">#7</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">↑ 2</p>
                </div>
              </div>
            </div>
            <Link href="/leaderboard">
              <Button variant="outline" className="w-full">
                View All Leagues
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Upcoming */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Award className="h-4 w-4 text-green-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Captain scored 24 points!</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Kevin De Bruyne • 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Moved up 8 positions</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">University League • 4 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <Star className="h-4 w-4 text-purple-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Player price increased</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Erling Haaland +£0.2m • 1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              <span>Upcoming Deadlines</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                <div>
                  <p className="font-medium text-sm">Gameweek 29 Deadline</p>
                  <p className="text-xs text-orange-700 dark:text-orange-300">Set your lineup</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-orange-600">2 days</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Mar 16, 11:30</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Transfer Window</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Make changes</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-600">5 days</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Mar 19, 09:00</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Eliminated Player Warning Modal */}
      <EliminatedPlayerWarningModal
        isOpen={showEliminatedModal}
        onClose={() => setShowEliminatedModal(false)}
        eliminatedPlayers={mockEliminatedPlayers}
        nextMatchweek="Gameweek 29"
        daysUntilDeadline={2}
      />
    </div>
  )
}
