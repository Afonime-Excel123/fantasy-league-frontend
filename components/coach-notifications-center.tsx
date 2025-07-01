"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ModeToggle } from "@/components/mode-toggle"
import {
  Bell,
  Users,
  Calendar,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  UserPlus,
  Trophy,
  ArrowLeft,
  Eye,
  Mail,
  Award,
  Filter,
  Search,
  MoreVertical,
  Trash2,
} from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock notifications data
const mockNotifications = [
  // Player Requests
  {
    id: 1,
    type: "player_request",
    category: "requests",
    title: "New Player Application",
    description: "Alex Johnson has applied to join your team as Central Midfielder",
    timestamp: "2024-01-15T10:30:00Z",
    isRead: false,
    priority: "high",
    status: "pending",
    playerInfo: {
      name: "Alex Johnson",
      email: "alex.johnson@university.edu",
      position: "CM",
      year: "3rd Year",
      gpa: "3.7",
      experience: "Played for high school varsity team for 3 years. Captain in senior year.",
    },
  },
  {
    id: 2,
    type: "player_request",
    category: "requests",
    title: "Player Application Reminder",
    description: "Sarah Martinez's application has been pending for 3 days",
    timestamp: "2024-01-14T15:20:00Z",
    isRead: false,
    priority: "medium",
    status: "pending",
    playerInfo: {
      name: "Sarah Martinez",
      email: "sarah.martinez@university.edu",
      position: "ST",
      year: "2nd Year",
      gpa: "3.9",
      experience: "Club football for 5 years. Top scorer in local women's league.",
    },
  },
  {
    id: 3,
    type: "player_request",
    category: "requests",
    title: "Application Accepted",
    description: "You accepted Michael Chen's application for Goalkeeper position",
    timestamp: "2024-01-13T09:15:00Z",
    isRead: true,
    priority: "low",
    status: "accepted",
    playerInfo: {
      name: "Michael Chen",
      email: "michael.chen@university.edu",
      position: "GK",
      year: "4th Year",
      gpa: "3.5",
    },
  },
  {
    id: 4,
    type: "player_request",
    category: "requests",
    title: "Application Declined",
    description: "You declined Emma Thompson's application due to position filled",
    timestamp: "2024-01-12T14:30:00Z",
    isRead: true,
    priority: "low",
    status: "declined",
    playerInfo: {
      name: "Emma Thompson",
      email: "emma.thompson@university.edu",
      position: "LB",
      year: "1st Year",
      gpa: "3.8",
    },
  },
  // Match Schedule Notifications
  {
    id: 5,
    type: "match_schedule",
    category: "matches",
    title: "Upcoming Match Reminder",
    description: "CS Crushers vs Engineering Eagles tomorrow at 3:00 PM",
    timestamp: "2024-01-14T18:00:00Z",
    isRead: false,
    priority: "high",
    matchInfo: {
      opponent: "Engineering Eagles",
      date: "2024-01-16T15:00:00Z",
      venue: "University Sports Complex",
      type: "League Match",
    },
  },
  {
    id: 6,
    type: "match_schedule",
    category: "matches",
    title: "Match Schedule Updated",
    description: "Your match against Business Bombers has been rescheduled to Friday 2:00 PM",
    timestamp: "2024-01-13T11:45:00Z",
    isRead: true,
    priority: "medium",
    matchInfo: {
      opponent: "Business Bombers",
      date: "2024-01-19T14:00:00Z",
      venue: "Main Field",
      type: "League Match",
      change: "Rescheduled from Thursday 4:00 PM",
    },
  },
  {
    id: 7,
    type: "match_result",
    category: "matches",
    title: "Match Result Submitted",
    description: "CS Crushers 2-1 victory over Math Mavericks has been recorded",
    timestamp: "2024-01-12T20:30:00Z",
    isRead: true,
    priority: "low",
    matchInfo: {
      opponent: "Math Mavericks",
      result: "2-1 Win",
      date: "2024-01-12T16:00:00Z",
      venue: "South Field",
    },
  },
  // Admin Alerts
  {
    id: 8,
    type: "admin_alert",
    category: "admin",
    title: "Tournament Registration Deadline",
    description: "Submit your final squad list for the knockout tournament by January 20th",
    timestamp: "2024-01-14T09:00:00Z",
    isRead: false,
    priority: "high",
    adminInfo: {
      deadline: "2024-01-20T23:59:00Z",
      action: "Submit squad list",
      department: "Sports Administration",
    },
  },
  {
    id: 9,
    type: "admin_alert",
    category: "admin",
    title: "New League Rules",
    description: "Updated substitution rules are now in effect for all matches",
    timestamp: "2024-01-13T16:20:00Z",
    isRead: true,
    priority: "medium",
    adminInfo: {
      type: "Rule Update",
      department: "Sports Administration",
      document: "League Rules v2.1",
    },
  },
  {
    id: 10,
    type: "admin_alert",
    category: "admin",
    title: "Facility Maintenance",
    description: "Main Field will be unavailable January 18-19 due to maintenance",
    timestamp: "2024-01-11T12:00:00Z",
    isRead: true,
    priority: "medium",
    adminInfo: {
      type: "Facility Notice",
      dates: "January 18-19, 2024",
      affectedVenue: "Main Field",
    },
  },
]

interface Notification {
  id: number
  type: string
  category: string
  title: string
  description: string
  timestamp: string
  isRead: boolean
  priority: "low" | "medium" | "high"
  status?: "pending" | "accepted" | "declined"
  playerInfo?: {
    name: string
    email: string
    position: string
    year: string
    gpa: string
    experience?: string
  }
  matchInfo?: {
    opponent: string
    date: string
    venue: string
    type: string
    result?: string
    change?: string
  }
  adminInfo?: {
    deadline?: string
    action?: string
    department: string
    type?: string
    document?: string
    dates?: string
    affectedVenue?: string
  }
}

export function CoachNotificationsCenter() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")

  const getNotificationIcon = (type: string, status?: string) => {
    const iconClass = "h-5 w-5"

    switch (type) {
      case "player_request":
        if (status === "accepted") return <CheckCircle className={`${iconClass} text-green-600`} />
        if (status === "declined") return <XCircle className={`${iconClass} text-red-600`} />
        return <UserPlus className={`${iconClass} text-blue-600`} />
      case "match_schedule":
        return <Calendar className={`${iconClass} text-purple-600`} />
      case "match_result":
        return <Trophy className={`${iconClass} text-green-600`} />
      case "admin_alert":
        return <AlertTriangle className={`${iconClass} text-orange-600`} />
      default:
        return <Bell className={`${iconClass} text-gray-600`} />
    }
  }

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge
            variant="secondary"
            className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
          >
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "accepted":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
            <CheckCircle className="h-3 w-3 mr-1" />
            Accepted
          </Badge>
        )
      case "declined":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300">
            <XCircle className="h-3 w-3 mr-1" />
            Declined
          </Badge>
        )
      default:
        return null
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

  const handlePlayerRequest = (notificationId: number, action: "accept" | "decline") => {
    setNotifications(
      notifications.map((n) =>
        n.id === notificationId
          ? {
              ...n,
              status: action === "accept" ? "accepted" : "declined",
              title: action === "accept" ? "Application Accepted" : "Application Declined",
              description:
                action === "accept"
                  ? `You accepted ${n.playerInfo?.name}'s application for ${n.playerInfo?.position} position`
                  : `You declined ${n.playerInfo?.name}'s application`,
              isRead: true,
            }
          : n,
      ),
    )
  }

  const markAsRead = (id: number) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const handleViewDetails = (notification: Notification) => {
    setSelectedNotification(notification)
    setShowDetailsDialog(true)
    if (!notification.isRead) {
      markAsRead(notification.id)
    }
  }

  const filteredNotifications = notifications.filter((notification) => {
    const categoryMatch = filterCategory === "all" || notification.category === filterCategory
    const statusMatch =
      filterStatus === "all" ||
      (filterStatus === "unread" && !notification.isRead) ||
      (filterStatus === "pending" && notification.status === "pending") ||
      (filterStatus === "accepted" && notification.status === "accepted") ||
      (filterStatus === "declined" && notification.status === "declined")
    const searchMatch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.description.toLowerCase().includes(searchTerm.toLowerCase())

    return categoryMatch && statusMatch && searchMatch
  })

  const stats = {
    total: notifications.length,
    unread: notifications.filter((n) => !n.isRead).length,
    pending: notifications.filter((n) => n.status === "pending").length,
    requests: notifications.filter((n) => n.category === "requests").length,
    matches: notifications.filter((n) => n.category === "matches").length,
    admin: notifications.filter((n) => n.category === "admin").length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/coach">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Coach Dashboard
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="bg-green-600 dark:bg-green-500 p-2 rounded-lg">
                  <Bell className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">Coach Notifications</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Manage team requests and updates</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {stats.unread > 0 && (
                <Badge variant="destructive" className="animate-pulse">
                  {stats.unread} unread
                </Badge>
              )}
              <ModeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Notifications</CardTitle>
              <Bell className="h-4 w-4 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">All notifications</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unread</CardTitle>
              <Eye className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.unread}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Need attention</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pending}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Awaiting decision</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Admin Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.admin}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Important updates</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search notifications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>

                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="requests">Player Requests</SelectItem>
                    <SelectItem value="matches">Match Updates</SelectItem>
                    <SelectItem value="admin">Admin Alerts</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="unread">Unread Only</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="declined">Declined</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[500px]">
            <TabsTrigger value="all" className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span>All ({filteredNotifications.length})</span>
            </TabsTrigger>
            <TabsTrigger value="requests" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Requests ({stats.requests})</span>
            </TabsTrigger>
            <TabsTrigger value="matches" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Matches ({stats.matches})</span>
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Admin ({stats.admin})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Bell className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No notifications found</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-center">
                    Try adjusting your filters to see more notifications.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {filteredNotifications.map((notification) => (
                  <Card
                    key={notification.id}
                    className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transition-all hover:shadow-md cursor-pointer ${
                      !notification.isRead ? "border-l-4 border-l-green-500" : ""
                    } ${
                      notification.status === "pending" && notification.type === "player_request"
                        ? "bg-yellow-50 dark:bg-yellow-900/10"
                        : ""
                    }`}
                    onClick={() => handleViewDetails(notification)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notification.type, notification.status)}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3
                                  className={`text-sm font-medium ${
                                    !notification.isRead
                                      ? "text-gray-900 dark:text-white"
                                      : "text-gray-700 dark:text-gray-300"
                                  }`}
                                >
                                  {notification.title}
                                </h3>
                                {!notification.isRead && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
                                {getStatusBadge(notification.status)}
                              </div>

                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                {notification.description}
                              </p>

                              <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-500">
                                <span>{formatTimestamp(notification.timestamp)}</span>
                                {getPriorityBadge(notification.priority)}
                              </div>
                            </div>

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleViewDetails(notification)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    deleteNotification(notification.id)
                                  }}
                                  className="text-red-600"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          {/* Quick Actions for Pending Player Requests */}
                          {notification.status === "pending" && notification.type === "player_request" && (
                            <div className="mt-3 flex space-x-2">
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-white"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handlePlayerRequest(notification.id, "accept")
                                }}
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Accept
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handlePlayerRequest(notification.id, "decline")
                                }}
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Decline
                              </Button>
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

          {/* Other tab contents would filter by category */}
          <TabsContent value="requests" className="space-y-4">
            <div className="space-y-3">
              {filteredNotifications
                .filter((n) => n.category === "requests")
                .map((notification) => (
                  <Card
                    key={notification.id}
                    className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transition-all hover:shadow-md cursor-pointer ${
                      !notification.isRead ? "border-l-4 border-l-green-500" : ""
                    } ${notification.status === "pending" ? "bg-yellow-50 dark:bg-yellow-900/10" : ""}`}
                    onClick={() => handleViewDetails(notification)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notification.type, notification.status)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white">{notification.title}</h3>
                            {!notification.isRead && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
                            {getStatusBadge(notification.status)}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{notification.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-500">
                            <span>{formatTimestamp(notification.timestamp)}</span>
                            {getPriorityBadge(notification.priority)}
                          </div>
                          {notification.status === "pending" && (
                            <div className="mt-3 flex space-x-2">
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-white"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handlePlayerRequest(notification.id, "accept")
                                }}
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Accept
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handlePlayerRequest(notification.id, "decline")
                                }}
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Decline
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="matches" className="space-y-4">
            <div className="space-y-3">
              {filteredNotifications
                .filter((n) => n.category === "matches")
                .map((notification) => (
                  <Card
                    key={notification.id}
                    className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transition-all hover:shadow-md cursor-pointer ${
                      !notification.isRead ? "border-l-4 border-l-green-500" : ""
                    }`}
                    onClick={() => handleViewDetails(notification)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white">{notification.title}</h3>
                            {!notification.isRead && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{notification.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-500">
                            <span>{formatTimestamp(notification.timestamp)}</span>
                            {getPriorityBadge(notification.priority)}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="admin" className="space-y-4">
            <div className="space-y-3">
              {filteredNotifications
                .filter((n) => n.category === "admin")
                .map((notification) => (
                  <Card
                    key={notification.id}
                    className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transition-all hover:shadow-md cursor-pointer ${
                      !notification.isRead ? "border-l-4 border-l-green-500" : ""
                    } ${notification.priority === "high" ? "bg-red-50 dark:bg-red-900/10" : ""}`}
                    onClick={() => handleViewDetails(notification)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white">{notification.title}</h3>
                            {!notification.isRead && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
                            {notification.priority === "high" && (
                              <Badge variant="destructive" className="text-xs">
                                Urgent
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{notification.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-500">
                            <span>{formatTimestamp(notification.timestamp)}</span>
                            {getPriorityBadge(notification.priority)}
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

      {/* Notification Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              {selectedNotification && getNotificationIcon(selectedNotification.type, selectedNotification.status)}
              <span>Notification Details</span>
            </DialogTitle>
            <DialogDescription>Complete information about this notification</DialogDescription>
          </DialogHeader>

          {selectedNotification && (
            <div className="space-y-6">
              {/* Header */}
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{selectedNotification.title}</h3>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(selectedNotification.status)}
                    {getPriorityBadge(selectedNotification.priority)}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">{selectedNotification.description}</p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                  {new Date(selectedNotification.timestamp).toLocaleString()}
                </p>
              </div>

              {/* Player Request Details */}
              {selectedNotification.playerInfo && (
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                    <Users className="h-4 w-4 text-green-600" />
                    <span>Player Information</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900 dark:text-white">Name:</span>
                        <span className="text-gray-600 dark:text-gray-400">{selectedNotification.playerInfo.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-3 w-3 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {selectedNotification.playerInfo.email}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900 dark:text-white">Position:</span>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                          {selectedNotification.playerInfo.position}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900 dark:text-white">Year:</span>
                        <span className="text-gray-600 dark:text-gray-400">{selectedNotification.playerInfo.year}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Award className="h-3 w-3 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">
                          GPA: {selectedNotification.playerInfo.gpa}
                        </span>
                      </div>
                    </div>
                  </div>
                  {selectedNotification.playerInfo.experience && (
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">Experience:</span>
                      <p className="text-gray-600 dark:text-gray-400 mt-1 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                        {selectedNotification.playerInfo.experience}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Match Details */}
              {selectedNotification.matchInfo && (
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-green-600" />
                    <span>Match Information</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900 dark:text-white">Opponent:</span>
                        <span className="text-gray-600 dark:text-gray-400">
                          {selectedNotification.matchInfo.opponent}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900 dark:text-white">Date:</span>
                        <span className="text-gray-600 dark:text-gray-400">
                          {new Date(selectedNotification.matchInfo.date).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900 dark:text-white">Venue:</span>
                        <span className="text-gray-600 dark:text-gray-400">{selectedNotification.matchInfo.venue}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900 dark:text-white">Type:</span>
                        <span className="text-gray-600 dark:text-gray-400">{selectedNotification.matchInfo.type}</span>
                      </div>
                      {selectedNotification.matchInfo.result && (
                        <div className="flex items-center space-x-2">
                          <Trophy className="h-3 w-3 text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-400">
                            {selectedNotification.matchInfo.result}
                          </span>
                        </div>
                      )}
                      {selectedNotification.matchInfo.change && (
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="h-3 w-3 text-orange-400" />
                          <span className="text-orange-600 dark:text-orange-400">
                            {selectedNotification.matchInfo.change}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Admin Details */}
              {selectedNotification.adminInfo && (
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-green-600" />
                    <span>Administrative Information</span>
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900 dark:text-white">Department:</span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {selectedNotification.adminInfo.department}
                      </span>
                    </div>
                    {selectedNotification.adminInfo.deadline && (
                      <div className="flex items-center space-x-2">
                        <Clock className="h-3 w-3 text-red-400" />
                        <span className="text-red-600 dark:text-red-400">
                          Deadline: {new Date(selectedNotification.adminInfo.deadline).toLocaleString()}
                        </span>
                      </div>
                    )}
                    {selectedNotification.adminInfo.action && (
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900 dark:text-white">Required Action:</span>
                        <span className="text-gray-600 dark:text-gray-400">
                          {selectedNotification.adminInfo.action}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {selectedNotification.status === "pending" && selectedNotification.type === "player_request" && (
                <div className="flex space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => {
                      handlePlayerRequest(selectedNotification.id, "accept")
                      setShowDetailsDialog(false)
                    }}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Accept Application
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => {
                      handlePlayerRequest(selectedNotification.id, "decline")
                      setShowDetailsDialog(false)
                    }}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Decline Application
                  </Button>
                </div>
              )}

              <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
