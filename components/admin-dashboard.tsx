"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ModeToggle } from "@/components/mode-toggle"
import {
  Users,
  UserPlus,
  Trophy,
  TrendingUp,
  TrendingDown,
  Activity,
  Bell,
  Settings,
  Plus,
  Edit,
  UserCheck,
  Send,
  BarChart3,
  Clock,
  Target,
  Award,
  Shield,
  AlertTriangle,
  CheckCircle,
  ArrowLeft,
  Download,
  Upload,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"

// Mock admin data
const adminStats = {
  totalUsers: 1247,
  userGrowth: 12.5,
  totalPlayers: 156,
  playerGrowth: 8.3,
  matchesPlayed: 45,
  matchGrowth: 15.2,
  activeLeagues: 8,
  leagueGrowth: 25.0,
  weeklyActiveUsers: 892,
  averageTeamValue: 98.5,
  totalTransfers: 3421,
  mostOwnedPlayer: "Kevin De Bruyne",
}

const recentActivity = [
  {
    id: 1,
    type: "user_registration",
    message: "New user registered: @sarah_j from Computer Science",
    timestamp: "2 minutes ago",
    icon: UserPlus,
    color: "text-green-600",
  },
  {
    id: 2,
    type: "match_result",
    message: "Match result updated: Engineering Eagles 2-1 CS Crushers",
    timestamp: "15 minutes ago",
    icon: Trophy,
    color: "text-blue-600",
  },
  {
    id: 3,
    type: "player_transfer",
    message: "High transfer activity: Erling Haaland (89 transfers in)",
    timestamp: "1 hour ago",
    icon: TrendingUp,
    color: "text-purple-600",
  },
  {
    id: 4,
    type: "league_created",
    message: "New league created: Psychology Department League",
    timestamp: "2 hours ago",
    icon: Users,
    color: "text-orange-600",
  },
  {
    id: 5,
    type: "system_alert",
    message: "Server maintenance completed successfully",
    timestamp: "3 hours ago",
    icon: CheckCircle,
    color: "text-green-600",
  },
]

const topPerformers = [
  { rank: 1, name: "Sarah Johnson", department: "Computer Science", points: 1456, team: "Campus Crushers" },
  { rank: 2, name: "Alex Martinez", department: "Business", points: 1398, team: "Dorm Room Dynasty" },
  { rank: 3, name: "Emma Kim", department: "Psychology", points: 1284, team: "Study Hall Stars" },
  { rank: 4, name: "Jake Rodriguez", department: "Biology", points: 1267, team: "Library Lions" },
  { rank: 5, name: "Mike Thompson", department: "Engineering", points: 1245, team: "Engineering Eagles" },
]

const systemAlerts = [
  {
    id: 1,
    type: "warning",
    title: "High Server Load",
    message: "Server experiencing high traffic during peak hours",
    severity: "medium",
    timestamp: "30 minutes ago",
  },
  {
    id: 2,
    type: "info",
    title: "Gameweek Deadline",
    message: "Gameweek 9 deadline is in 2 hours",
    severity: "low",
    timestamp: "1 hour ago",
  },
  {
    id: 3,
    type: "success",
    title: "Backup Completed",
    message: "Daily database backup completed successfully",
    severity: "low",
    timestamp: "6 hours ago",
  },
]

export function AdminDashboard() {
  const [showCreateMatch, setShowCreateMatch] = useState(false)
  const [showManagePlayers, setShowManagePlayers] = useState(false)
  const [showAssignCoaches, setShowAssignCoaches] = useState(false)
  const [showSendNotification, setShowSendNotification] = useState(false)

  const getGrowthIcon = (growth: number) => {
    return growth > 0 ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    )
  }

  const getGrowthColor = (growth: number) => {
    return growth > 0 ? "text-green-600" : "text-red-600"
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-orange-600" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      default:
        return <Activity className="h-4 w-4 text-blue-600" />
    }
  }

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "border-red-500 bg-red-50 dark:bg-red-900/20"
      case "medium":
        return "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
      default:
        return "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="bg-green-600 dark:bg-green-500 p-2 rounded-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Campus League Management</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-green-600 border-green-600">
                <Shield className="h-3 w-3 mr-1" />
                Administrator
              </Badge>
              <ModeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Registered Users</CardTitle>
              <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.totalUsers.toLocaleString()}</div>
              <div className="flex items-center space-x-1 text-xs">
                {getGrowthIcon(adminStats.userGrowth)}
                <span className={getGrowthColor(adminStats.userGrowth)}>+{adminStats.userGrowth}% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Players</CardTitle>
              <Target className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.totalPlayers}</div>
              <div className="flex items-center space-x-1 text-xs">
                {getGrowthIcon(adminStats.playerGrowth)}
                <span className={getGrowthColor(adminStats.playerGrowth)}>
                  +{adminStats.playerGrowth}% from last month
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Matches Played</CardTitle>
              <Trophy className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.matchesPlayed}</div>
              <div className="flex items-center space-x-1 text-xs">
                {getGrowthIcon(adminStats.matchGrowth)}
                <span className={getGrowthColor(adminStats.matchGrowth)}>
                  +{adminStats.matchGrowth}% from last month
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Leagues</CardTitle>
              <Award className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.activeLeagues}</div>
              <div className="flex items-center space-x-1 text-xs">
                {getGrowthIcon(adminStats.leagueGrowth)}
                <span className={getGrowthColor(adminStats.leagueGrowth)}>
                  +{adminStats.leagueGrowth}% from last month
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5 text-green-600 dark:text-green-400" />
              <span>Quick Actions</span>
            </CardTitle>
            <CardDescription>Manage your fantasy football league efficiently</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Dialog open={showCreateMatch} onOpenChange={setShowCreateMatch}>
                <DialogTrigger asChild>
                  <Button className="h-20 flex-col space-y-2 bg-green-600 hover:bg-green-700 text-white">
                    <Plus className="h-6 w-6" />
                    <span>Create Match</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create New Match</DialogTitle>
                    <DialogDescription>Schedule a new match for the campus league</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="homeTeam">Home Team</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select team" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="engineering">Engineering Eagles</SelectItem>
                            <SelectItem value="cs">CS Crushers</SelectItem>
                            <SelectItem value="business">Business Bulldogs</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="awayTeam">Away Team</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select team" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="psychology">Psychology Panthers</SelectItem>
                            <SelectItem value="biology">Biology Beasts</SelectItem>
                            <SelectItem value="art">Art Attack</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="date">Match Date</Label>
                        <Input type="date" />
                      </div>
                      <div>
                        <Label htmlFor="time">Match Time</Label>
                        <Input type="time" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="venue">Venue</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select venue" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="main">Main Campus Field</SelectItem>
                          <SelectItem value="south">South Field</SelectItem>
                          <SelectItem value="north">North Field</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Create Match</Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={showManagePlayers} onOpenChange={setShowManagePlayers}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <Edit className="h-6 w-6" />
                    <span>Manage Players</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Manage Players</DialogTitle>
                    <DialogDescription>Add, edit, or remove players from the system</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="playerName">Player Name</Label>
                      <Input placeholder="Enter player name" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="position">Position</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select position" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="GK">Goalkeeper</SelectItem>
                            <SelectItem value="DEF">Defender</SelectItem>
                            <SelectItem value="MID">Midfielder</SelectItem>
                            <SelectItem value="FWD">Forward</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="team">Team</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select team" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="liverpool">Liverpool</SelectItem>
                            <SelectItem value="city">Man City</SelectItem>
                            <SelectItem value="arsenal">Arsenal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="price">Price (£m)</Label>
                      <Input type="number" step="0.1" placeholder="8.5" />
                    </div>
                    <div className="flex space-x-2">
                      <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">Add Player</Button>
                      <Button variant="outline" className="flex-1">
                        Import CSV
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={showAssignCoaches} onOpenChange={setShowAssignCoaches}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <UserCheck className="h-6 w-6" />
                    <span>Assign Coaches</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Assign Coaches</DialogTitle>
                    <DialogDescription>Assign coaching staff to teams and leagues</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="coachName">Coach Name</Label>
                      <Input placeholder="Enter coach name" />
                    </div>
                    <div>
                      <Label htmlFor="coachEmail">Coach Email</Label>
                      <Input type="email" placeholder="coach@university.edu" />
                    </div>
                    <div>
                      <Label htmlFor="assignedTeam">Assigned Team</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select team" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="engineering">Engineering Eagles</SelectItem>
                          <SelectItem value="cs">CS Crushers</SelectItem>
                          <SelectItem value="business">Business Bulldogs</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="permissions">Permissions</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select permission level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="view">View Only</SelectItem>
                          <SelectItem value="manage">Manage Team</SelectItem>
                          <SelectItem value="admin">Full Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Assign Coach</Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={showSendNotification} onOpenChange={setShowSendNotification}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <Send className="h-6 w-6" />
                    <span>Send Notification</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Send Notification</DialogTitle>
                    <DialogDescription>Send announcements to users or specific groups</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="audience">Audience</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select audience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Users</SelectItem>
                          <SelectItem value="active">Active Players Only</SelectItem>
                          <SelectItem value="department">Specific Department</SelectItem>
                          <SelectItem value="league">Specific League</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="title">Notification Title</Label>
                      <Input placeholder="Enter notification title" />
                    </div>
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea placeholder="Enter your message here..." rows={4} />
                    </div>
                    <div>
                      <Label htmlFor="priority">Priority</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                      <Send className="h-4 w-4 mr-2" />
                      Send Notification
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Analytics & Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Additional Metrics */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span>Platform Analytics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {adminStats.weeklyActiveUsers}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Weekly Active</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      £{adminStats.averageTeamValue}m
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Avg Team Value</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {adminStats.totalTransfers.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Transfers</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <div className="text-xl font-bold text-orange-600 dark:text-orange-400">KDB</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Most Owned</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <CardTitle>Recent Activity</CardTitle>
                  </div>
                  <Button variant="ghost" size="sm">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>Latest system events and user activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                    >
                      <div className={`p-2 rounded-full bg-white dark:bg-gray-800 ${activity.color}`}>
                        <activity.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.message}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Performers */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span>Top Performers</span>
                </CardTitle>
                <CardDescription>Highest scoring fantasy managers this season</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topPerformers.map((performer) => (
                    <div
                      key={performer.rank}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            performer.rank === 1
                              ? "bg-yellow-500 text-white"
                              : performer.rank === 2
                                ? "bg-gray-400 text-white"
                                : performer.rank === 3
                                  ? "bg-orange-500 text-white"
                                  : "bg-gray-300 text-gray-700"
                          }`}
                        >
                          {performer.rank}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{performer.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {performer.department} • {performer.team}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900 dark:text-white">{performer.points}</p>
                        <p className="text-xs text-gray-500">points</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - System Status & Alerts */}
          <div className="space-y-6">
            {/* System Status */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span>System Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Server Health</span>
                    <span className="text-green-600">Excellent</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Database Performance</span>
                    <span className="text-green-600">Good</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>API Response Time</span>
                    <span className="text-yellow-600">Fair</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Storage Usage</span>
                    <span className="text-blue-600">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* System Alerts */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <CardTitle>System Alerts</CardTitle>
                  </div>
                  <Badge variant="secondary">{systemAlerts.length}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {systemAlerts.map((alert) => (
                    <div key={alert.id} className={`p-3 rounded-lg border ${getAlertColor(alert.severity)}`}>
                      <div className="flex items-start space-x-2">
                        {getAlertIcon(alert.type)}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{alert.title}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{alert.message}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{alert.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span>Quick Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Online Users</span>
                  <span className="font-medium">234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Active Sessions</span>
                  <span className="font-medium">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Today's Transfers</span>
                  <span className="font-medium">89</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Support Tickets</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Server Uptime</span>
                  <span className="font-medium text-green-600">99.9%</span>
                </div>
              </CardContent>
            </Card>

            {/* Export Tools */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Download className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span>Export Tools</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Export User Data
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Export Match Results
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Upload className="h-4 w-4 mr-2" />
                  Import Player Data
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
