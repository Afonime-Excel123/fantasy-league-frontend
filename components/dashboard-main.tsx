"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ModeToggle } from "@/components/mode-toggle"
import {
  Trophy,
  TrendingUp,
  Clock,
  Bell,
  Eye,
  Edit,
  BarChart3,
  Calendar,
  Target,
  Star,
  AlertCircle,
  CheckCircle,
  Search,
  X,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"

// Mock data
const teamData = {
  name: "Thunder Hawks",
  weeklyPoints: 127.5,
  totalPoints: 1284.2,
  rank: 3,
  totalTeams: 12,
  nextDeadline: "Sunday, 1:00 PM EST",
  hoursUntilDeadline: 18,
}

const notifications = [
  {
    id: 1,
    type: "deadline",
    title: "Lineup Deadline Approaching",
    message: "Set your lineup before Sunday 1:00 PM EST",
    time: "18 hours left",
    urgent: true,
  },
  {
    id: 2,
    type: "injury",
    title: "Player Injury Update",
    message: "Tyreek Hill listed as questionable for Sunday",
    time: "2 hours ago",
    urgent: false,
  },
  {
    id: 3,
    type: "trade",
    title: "Trade Proposal Received",
    message: "Mike from Engineering wants to trade",
    time: "4 hours ago",
    urgent: false,
  },
]

const leaderboard = [
  { rank: 1, team: "Campus Crushers", owner: "Sarah J.", points: 1456.8, department: "Computer Science" },
  { rank: 2, team: "Dorm Room Dynasty", owner: "Alex M.", points: 1398.2, department: "Business" },
  { rank: 3, team: "Thunder Hawks", owner: "You", points: 1284.2, department: "Engineering", isCurrentUser: true },
  { rank: 4, team: "Study Hall Stars", owner: "Emma K.", points: 1267.9, department: "Psychology" },
  { rank: 5, team: "Library Lions", owner: "Jake R.", points: 1245.3, department: "Biology" },
]

const searchableData = [
  // Teams
  { rank: 1, team: "Campus Crushers", owner: "Sarah J.", points: 1456.8, department: "Computer Science", type: "team" },
  { rank: 2, team: "Dorm Room Dynasty", owner: "Alex M.", points: 1398.2, department: "Business", type: "team" },
  {
    rank: 3,
    team: "Thunder Hawks",
    owner: "You",
    points: 1284.2,
    department: "Engineering",
    type: "team",
    isCurrentUser: true,
  },
  { rank: 4, team: "Study Hall Stars", owner: "Emma K.", points: 1267.9, department: "Psychology", type: "team" },
  { rank: 5, team: "Library Lions", owner: "Jake R.", points: 1245.3, department: "Biology", type: "team" },
  // Players (mock data)
  { name: "Josh Allen", position: "QB", team: "BUF", type: "player", points: 24.5 },
  { name: "Christian McCaffrey", position: "RB", team: "SF", type: "player", points: 18.2 },
  { name: "Tyreek Hill", position: "WR", team: "MIA", type: "player", points: 15.8 },
  { name: "Travis Kelce", position: "TE", team: "KC", type: "player", points: 12.4 },
  // League info
  { name: "Computer Science League", type: "league", members: 12 },
  { name: "Engineering Division", type: "league", members: 8 },
]

export function DashboardMain() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.length > 0) {
      setIsSearching(true)
      const results = searchableData.filter(
        (item) =>
          item.name?.toLowerCase().includes(query.toLowerCase()) ||
          item.team?.toLowerCase().includes(query.toLowerCase()) ||
          item.owner?.toLowerCase().includes(query.toLowerCase()),
      )
      setSearchResults(results)
    } else {
      setIsSearching(false)
      setSearchResults([])
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      {/* Header with Search */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back! Here's your fantasy football overview.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search teams, players, leagues..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 pr-10 bg-white dark:bg-gray-800"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <ModeToggle />
        </div>
      </div>

      {/* Search Results */}
      {isSearching && (
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5 text-green-600 dark:text-green-400" />
              <span>Search Results</span>
              <Badge variant="secondary">{searchResults.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {searchResults.length > 0 ? (
              <div className="space-y-2">
                {searchResults.map((result, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          result.type === "team"
                            ? "bg-green-500 text-white"
                            : result.type === "player"
                              ? "bg-blue-500 text-white"
                              : "bg-purple-500 text-white"
                        }`}
                      >
                        {result.type === "team" ? "T" : result.type === "player" ? "P" : "L"}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{result.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {result.type === "team" && `${result.owner} • ${result.department}`}
                          {result.type === "player" && `${result.position} • ${result.team}`}
                          {result.type === "league" && `${result.members} members`}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      {result.type === "team" && (
                        <>
                          <p className="font-bold text-gray-900 dark:text-white">{result.points}</p>
                          <p className="text-xs text-gray-500">points</p>
                        </>
                      )}
                      {result.type === "player" && (
                        <>
                          <p className="font-bold text-gray-900 dark:text-white">{result.points}</p>
                          <p className="text-xs text-gray-500">avg pts</p>
                        </>
                      )}
                      {result.type === "league" && <Badge variant="outline">League</Badge>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-sm">No results found for "{searchQuery}"</p>
                <p className="text-xs">Try searching for teams, players, or leagues</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Team Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Name</CardTitle>
            <Trophy className="h-4 w-4 text-green-600 dark:text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{teamData.name}</div>
            <p className="text-xs text-muted-foreground">Your fantasy team</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Points</CardTitle>
            <Target className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamData.weeklyPoints}</div>
            <p className="text-xs text-muted-foreground">This week's performance</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Points</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamData.totalPoints}</div>
            <p className="text-xs text-muted-foreground">Season total</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Deadline</CardTitle>
            <Clock className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{teamData.hoursUntilDeadline}h</div>
            <p className="text-xs text-muted-foreground">{teamData.nextDeadline}</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Notifications */}
        <Card className="col-span-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-green-600 dark:text-green-400" />
                <CardTitle>Notifications</CardTitle>
              </div>
              <Badge variant="secondary">{notifications.length}</Badge>
            </div>
            <CardDescription>Stay updated with your fantasy league</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start space-x-3 p-3 rounded-lg border ${
                  notification.urgent
                    ? "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800"
                    : "bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600"
                }`}
              >
                <div className="flex-shrink-0">
                  {notification.urgent ? (
                    <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{notification.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{notification.message}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{notification.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="col-span-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-green-600 dark:text-green-400" />
              <span>Quick Actions</span>
            </CardTitle>
            <CardDescription>Manage your team efficiently</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-green-600 hover:bg-green-700 text-white">
              <Eye className="mr-2 h-4 w-4" />
              View My Team
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Team Lineup
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <BarChart3 className="mr-2 h-4 w-4" />
              View Leaderboard
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Calendar className="mr-2 h-4 w-4" />
              Check Schedule
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Leaderboard and Team Performance */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Campus Leaderboard */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-green-600 dark:text-green-400" />
                <CardTitle>Campus Leaderboard</CardTitle>
              </div>
              <Badge variant="outline">Top 5</Badge>
            </div>
            <CardDescription>See how you rank against your classmates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leaderboard.map((team) => (
                <div
                  key={team.rank}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    team.isCurrentUser
                      ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                      : "bg-gray-50 dark:bg-gray-700/50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        team.rank === 1
                          ? "bg-yellow-500 text-white"
                          : team.rank === 2
                            ? "bg-gray-400 text-white"
                            : team.rank === 3
                              ? "bg-orange-500 text-white"
                              : "bg-gray-300 text-gray-700"
                      }`}
                    >
                      {team.rank}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900 dark:text-white">{team.team}</p>
                        {team.isCurrentUser && (
                          <Badge variant="secondary" className="text-xs">You</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {team.owner} • {team.department}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 dark:text-white">{team.points}</p>
                    <p className="text-xs text-gray-500">points</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team Performance */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
              <CardTitle>Team Performance</CardTitle>
            </div>
            <CardDescription>Your season progress and stats</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Season Progress</span>
                <span>Week 8 of 17</span>
              </div>
              <Progress value={47} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">5</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Wins</p>
              </div>
              <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">3</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Losses</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Average Points/Week</span>
                <span className="font-medium">160.5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Highest Week</span>
                <span className="font-medium">198.7</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Current Streak</span>
                <span className="font-medium text-green-600 dark:text-green-400">3W</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
