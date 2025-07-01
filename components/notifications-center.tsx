"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ModeToggle } from "@/components/mode-toggle"
import {
  Bell,
  Info,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Trophy,
  Users,
  Calendar,
  Target,
  TrendingUp,
  Star,
  Shield,
  ArrowLeft,
  MoreVertical,
  Trash2,
  Eye,
  EyeOff,
  Settings,
  Filter,
} from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    type: "player_eliminated",
    title: "Player Eliminated",
    description: "Erling Haaland has been eliminated from your team due to injury",
    timestamp: "2024-01-15T10:30:00Z",
    isRead: false,
    priority: "high",
    actionRequired: true,
    relatedPlayer: "Erling Haaland",
    relatedTeam: "Man City",
  },
  {
    id: 2,
    type: "gameweek_deadline",
    title: "Gameweek Deadline Approaching",
    description: "You have 2 hours left to set your lineup for Gameweek 9",
    timestamp: "2024-01-15T08:00:00Z",
    isRead: false,
    priority: "high",
    actionRequired: true,
  },
  {
    id: 3,
    type: "price_change",
    title: "Player Price Rise",
    description: "Kevin De Bruyne's price has increased by £0.1m to £12.1m",
    timestamp: "2024-01-15T06:00:00Z",
    isRead: true,
    priority: "medium",
    actionRequired: false,
    relatedPlayer: "Kevin De Bruyne",
    relatedTeam: "Man City",
  },
  {
    id: 4,
    type: "league_update",
    title: "League Position Update",
    description: "You've moved up 3 places to 5th in Computer Science League",
    timestamp: "2024-01-14T20:15:00Z",
    isRead: true,
    priority: "medium",
    actionRequired: false,
    relatedLeague: "Computer Science League",
  },
  {
    id: 5,
    type: "match_result",
    title: "Match Result",
    description: "Engineering Eagles beat CS Crushers 2-1 in yesterday's fixture",
    timestamp: "2024-01-14T18:30:00Z",
    isRead: true,
    priority: "low",
    actionRequired: false,
    relatedMatch: "Engineering Eagles vs CS Crushers",
  },
  {
    id: 6,
    type: "transfer_suggestion",
    title: "Transfer Suggestion",
    description: "Consider transferring out Mohamed Salah - he's flagged as doubtful",
    timestamp: "2024-01-14T15:45:00Z",
    isRead: false,
    priority: "medium",
    actionRequired: true,
    relatedPlayer: "Mohamed Salah",
    relatedTeam: "Liverpool",
  },
  {
    id: 7,
    type: "achievement",
    title: "Achievement Unlocked",
    description: "Congratulations! You've earned the 'Captain Fantastic' badge",
    timestamp: "2024-01-14T12:20:00Z",
    isRead: true,
    priority: "low",
    actionRequired: false,
    achievement: "Captain Fantastic",
  },
  {
    id: 8,
    type: "system_maintenance",
    title: "System Maintenance",
    description: "Scheduled maintenance tonight from 2:00 AM - 4:00 AM GMT",
    timestamp: "2024-01-14T10:00:00Z",
    isRead: false,
    priority: "medium",
    actionRequired: false,
  },
  {
    id: 9,
    type: "captain_points",
    title: "Captain Performance",
    description: "Your captain Kevin De Bruyne scored 15 points this gameweek!",
    timestamp: "2024-01-13T22:00:00Z",
    isRead: true,
    priority: "low",
    actionRequired: false,
    relatedPlayer: "Kevin De Bruyne",
    points: 15,
  },
  {
    id: 10,
    type: "league_invitation",
    title: "League Invitation",
    description: "You've been invited to join 'Engineering Department League'",
    timestamp: "2024-01-13T16:30:00Z",
    isRead: false,
    priority: "medium",
    actionRequired: true,
    relatedLeague: "Engineering Department League",
  },
]

interface Notification {
  id: number
  type: string
  title: string
  description: string
  timestamp: string
  isRead: boolean
  priority: "low" | "medium" | "high"
  actionRequired: boolean
  relatedPlayer?: string
  relatedTeam?: string
  relatedLeague?: string
  relatedMatch?: string
  achievement?: string
  points?: number
}

export function NotificationsCenter() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [filterType, setFilterType] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const getNotificationIcon = (type: string, priority: string) => {
    const iconClass = "h-5 w-5"

    switch (type) {
      case "player_eliminated":
        return <XCircle className={`${iconClass} text-red-600`} />
      case "gameweek_deadline":
        return <AlertTriangle className={`${iconClass} text-orange-600`} />
      case "price_change":
        return <TrendingUp className={`${iconClass} text-blue-600`} />
      case "league_update":
        return <Trophy className={`${iconClass} text-green-600`} />
      case "match_result":
        return <Target className={`${iconClass} text-purple-600`} />
      case "transfer_suggestion":
        return <Users className={`${iconClass} text-yellow-600`} />
      case "achievement":
        return <Star className={`${iconClass} text-yellow-500`} />
      case "system_maintenance":
        return <Settings className={`${iconClass} text-gray-600`} />
      case "captain_points":
        return <Shield className={`${iconClass} text-green-600`} />
      case "league_invitation":
        return <Users className={`${iconClass} text-blue-600`} />
      default:
        return priority === "high" ? (
          <AlertTriangle className={`${iconClass} text-red-600`} />
        ) : (
          <Info className={`${iconClass} text-blue-600`} />
        )
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return (
          <Badge variant="destructive" className="text-xs">
            High
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="secondary" className="text-xs">
            Medium
          </Badge>
        )
      case "low":
        return (
          <Badge variant="outline" className="text-xs">
            Low
          </Badge>
        )
      default:
        return null
    }
  }

  const getTypeLabel = (type: string) => {
    const typeLabels: Record<string, string> = {
      player_eliminated: "Player Eliminated",
      gameweek_deadline: "Deadline",
      price_change: "Price Change",
      league_update: "League Update",
      match_result: "Match Result",
      transfer_suggestion: "Transfer Tip",
      achievement: "Achievement",
      system_maintenance: "System",
      captain_points: "Captain",
      league_invitation: "Invitation",
    }
    return typeLabels[type] || "General"
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
      return `${diffInMinutes}m ago`
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays}d ago`
    }
  }

  const markAsRead = (id: number) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
  }

  const markAsUnread = (id: number) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, isRead: false } : n)))
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })))
  }

  const filteredNotifications = notifications.filter((notification) => {
    const typeMatch = filterType === "all" || notification.type === filterType
    const statusMatch =
      filterStatus === "all" ||
      (filterStatus === "unread" && !notification.isRead) ||
      (filterStatus === "read" && notification.isRead) ||
      (filterStatus === "action_required" && notification.actionRequired)

    return typeMatch && statusMatch
  })

  const unreadCount = notifications.filter((n) => !n.isRead).length
  const actionRequiredCount = notifications.filter((n) => n.actionRequired && !n.isRead).length

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
                  <Bell className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">Notifications</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Stay updated with your fantasy team</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {unreadCount > 0 && (
                <Badge variant="destructive" className="animate-pulse">
                  {unreadCount} unread
                </Badge>
              )}
              <ModeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Notifications</CardTitle>
              <Bell className="h-4 w-4 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{notifications.length}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">All time</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unread</CardTitle>
              <EyeOff className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{unreadCount}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Need attention</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Action Required</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{actionRequiredCount}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Urgent items</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  notifications.filter((n) => {
                    const notifDate = new Date(n.timestamp)
                    const weekAgo = new Date()
                    weekAgo.setDate(weekAgo.getDate() - 7)
                    return notifDate > weekAgo
                  }).length
                }
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Recent activity</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <Card className="mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-48 bg-white dark:bg-gray-700">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="player_eliminated">Player Eliminated</SelectItem>
                    <SelectItem value="gameweek_deadline">Deadlines</SelectItem>
                    <SelectItem value="price_change">Price Changes</SelectItem>
                    <SelectItem value="league_update">League Updates</SelectItem>
                    <SelectItem value="match_result">Match Results</SelectItem>
                    <SelectItem value="transfer_suggestion">Transfer Tips</SelectItem>
                    <SelectItem value="achievement">Achievements</SelectItem>
                    <SelectItem value="system_maintenance">System</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-48 bg-white dark:bg-gray-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="unread">Unread Only</SelectItem>
                    <SelectItem value="read">Read Only</SelectItem>
                    <SelectItem value="action_required">Action Required</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={markAllAsRead}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark All Read
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications List */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="all" className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span>All ({filteredNotifications.length})</span>
            </TabsTrigger>
            <TabsTrigger value="unread" className="flex items-center space-x-2">
              <EyeOff className="h-4 w-4" />
              <span>Unread ({unreadCount})</span>
            </TabsTrigger>
            <TabsTrigger value="urgent" className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Urgent ({actionRequiredCount})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Bell className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No notifications found</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-center">
                    {filterType !== "all" || filterStatus !== "all"
                      ? "Try adjusting your filters to see more notifications."
                      : "You're all caught up! New notifications will appear here."}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {filteredNotifications.map((notification) => (
                  <Card
                    key={notification.id}
                    className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transition-all hover:shadow-md ${
                      !notification.isRead ? "border-l-4 border-l-green-500" : ""
                    } ${notification.actionRequired && !notification.isRead ? "bg-orange-50 dark:bg-orange-900/10" : ""}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        {/* Icon */}
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notification.type, notification.priority)}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3
                                  className={`text-sm font-medium ${!notification.isRead ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300"}`}
                                >
                                  {notification.title}
                                </h3>
                                {!notification.isRead && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
                                {notification.actionRequired && (
                                  <Badge variant="destructive" className="text-xs">
                                    Action Required
                                  </Badge>
                                )}
                              </div>

                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                {notification.description}
                              </p>

                              <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-500">
                                <span>{formatTimestamp(notification.timestamp)}</span>
                                <Badge variant="outline" className="text-xs">
                                  {getTypeLabel(notification.type)}
                                </Badge>
                                {getPriorityBadge(notification.priority)}
                              </div>
                            </div>

                            {/* Actions */}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {notification.isRead ? (
                                  <DropdownMenuItem onClick={() => markAsUnread(notification.id)}>
                                    <EyeOff className="h-4 w-4 mr-2" />
                                    Mark as Unread
                                  </DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                    <Eye className="h-4 w-4 mr-2" />
                                    Mark as Read
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem
                                  onClick={() => deleteNotification(notification.id)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          {/* Action Buttons for Action Required Notifications */}
                          {notification.actionRequired && !notification.isRead && (
                            <div className="mt-3 flex space-x-2">
                              {notification.type === "gameweek_deadline" && (
                                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                                  Set Lineup
                                </Button>
                              )}
                              {notification.type === "player_eliminated" && (
                                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                                  Find Replacement
                                </Button>
                              )}
                              {notification.type === "transfer_suggestion" && (
                                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                                  View Transfers
                                </Button>
                              )}
                              {notification.type === "league_invitation" && (
                                <>
                                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                                    Accept
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    Decline
                                  </Button>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="unread" className="space-y-4">
            <div className="space-y-3">
              {filteredNotifications
                .filter((n) => !n.isRead)
                .map((notification) => (
                  <Card
                    key={notification.id}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-l-4 border-l-green-500 transition-all hover:shadow-md"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notification.type, notification.priority)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                  {notification.title}
                                </h3>
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                {notification.actionRequired && (
                                  <Badge variant="destructive" className="text-xs">
                                    Action Required
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                {notification.description}
                              </p>
                              <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-500">
                                <span>{formatTimestamp(notification.timestamp)}</span>
                                <Badge variant="outline" className="text-xs">
                                  {getTypeLabel(notification.type)}
                                </Badge>
                                {getPriorityBadge(notification.priority)}
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="urgent" className="space-y-4">
            <div className="space-y-3">
              {filteredNotifications
                .filter((n) => n.actionRequired && !n.isRead)
                .map((notification) => (
                  <Card
                    key={notification.id}
                    className="bg-orange-50 dark:bg-orange-900/10 border-l-4 border-l-orange-500 transition-all hover:shadow-md"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notification.type, notification.priority)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white">{notification.title}</h3>
                            <Badge variant="destructive" className="text-xs">
                              Urgent
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{notification.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-500">
                              <span>{formatTimestamp(notification.timestamp)}</span>
                              <Badge variant="outline" className="text-xs">
                                {getTypeLabel(notification.type)}
                              </Badge>
                            </div>
                            <div className="flex space-x-2">
                              {notification.type === "gameweek_deadline" && (
                                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                                  Set Lineup
                                </Button>
                              )}
                              {notification.type === "player_eliminated" && (
                                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                                  Find Replacement
                                </Button>
                              )}
                              {notification.type === "transfer_suggestion" && (
                                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                                  View Transfers
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
