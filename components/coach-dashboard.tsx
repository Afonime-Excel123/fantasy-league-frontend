"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ModeToggle } from "@/components/mode-toggle"
import {
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Trophy,
  Target,
  Shield,
  Zap,
  Star,
  ArrowLeft,
  UserCheck,
  Eye,
  Calendar,
  Mail,
  Award,
  TrendingUp,
  Filter,
  Search,
  Download,
} from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for pending requests
const pendingRequests = [
  {
    id: 1,
    fullName: "Alex Johnson",
    department: "Computer Science",
    preferredPosition: "CM",
    positionLabel: "Central Midfielder",
    shirtNumber: 8,
    experience:
      "Played for high school varsity team for 3 years. Captain in senior year. Strong passing and defensive skills.",
    motivation:
      "I want to represent Computer Science and bring my leadership experience to help the team succeed in the inter-departmental league.",
    availability: "both",
    submittedDate: "2024-01-15",
    email: "alex.johnson@university.edu",
    year: "3rd Year",
    gpa: "3.7",
    previousInjuries: "None",
  },
  {
    id: 2,
    fullName: "Sarah Martinez",
    department: "Computer Science",
    preferredPosition: "ST",
    positionLabel: "Striker",
    shirtNumber: 9,
    experience: "Club football for 5 years. Top scorer in local women's league. Fast and clinical finisher.",
    motivation:
      "Football is my passion and I want to score goals for our department. I believe I can make a significant impact up front.",
    availability: "weekends",
    submittedDate: "2024-01-14",
    email: "sarah.martinez@university.edu",
    year: "2nd Year",
    gpa: "3.9",
    previousInjuries: "Minor ankle sprain (fully recovered)",
  },
  {
    id: 3,
    fullName: "Michael Chen",
    department: "Computer Science",
    preferredPosition: "GK",
    positionLabel: "Goalkeeper",
    shirtNumber: 1,
    experience:
      "Goalkeeper for 8 years. Excellent reflexes and shot-stopping ability. Good with distribution and organizing defense.",
    motivation:
      "As a goalkeeper, I want to be the last line of defense for our department. I'm committed to keeping clean sheets and helping the team win.",
    availability: "flexible",
    submittedDate: "2024-01-13",
    email: "michael.chen@university.edu",
    year: "4th Year",
    gpa: "3.5",
    previousInjuries: "None",
  },
  {
    id: 4,
    fullName: "Emma Thompson",
    department: "Computer Science",
    preferredPosition: "LB",
    positionLabel: "Left-Back",
    shirtNumber: 3,
    experience:
      "Played left-back for university women's team. Strong in tackles and good crossing ability from wide positions.",
    motivation:
      "I love the defensive side of the game and want to contribute to our department's success. I'm reliable and always give 100%.",
    availability: "weekdays",
    submittedDate: "2024-01-12",
    email: "emma.thompson@university.edu",
    year: "1st Year",
    gpa: "3.8",
    previousInjuries: "None",
  },
  {
    id: 5,
    fullName: "David Rodriguez",
    department: "Computer Science",
    preferredPosition: "CAM",
    positionLabel: "Attacking Midfielder",
    shirtNumber: 10,
    experience:
      "Creative midfielder with excellent vision and passing range. Scored 15 goals and 20 assists in last season.",
    motivation:
      "I want to be the creative force behind our attacks. My goal is to create chances and help our strikers score goals.",
    availability: "both",
    submittedDate: "2024-01-11",
    email: "david.rodriguez@university.edu",
    year: "3rd Year",
    gpa: "3.6",
    previousInjuries: "None",
  },
  {
    id: 6,
    fullName: "Lisa Wang",
    department: "Computer Science",
    preferredPosition: "CB",
    positionLabel: "Centre-Back",
    shirtNumber: 4,
    experience:
      "Solid defender with good heading ability. Played center-back for 4 years. Strong in aerial duels and organizing defense.",
    motivation:
      "Defense wins championships. I want to be a rock at the back and help our team keep clean sheets throughout the season.",
    availability: "weekends",
    submittedDate: "2024-01-10",
    email: "lisa.wang@university.edu",
    year: "2nd Year",
    gpa: "3.7",
    previousInjuries: "None",
  },
]

// Mock current team data
const currentTeam = [
  { name: "John Smith", position: "GK", shirtNumber: 12, year: "4th Year" },
  { name: "Mark Davis", position: "CB", shirtNumber: 5, year: "3rd Year" },
  { name: "Tom Wilson", position: "CB", shirtNumber: 6, year: "2nd Year" },
  { name: "Jake Brown", position: "RB", shirtNumber: 2, year: "3rd Year" },
  { name: "Chris Lee", position: "CDM", shirtNumber: 7, year: "4th Year" },
  { name: "Ryan Taylor", position: "CM", shirtNumber: 11, year: "1st Year" },
  { name: "Kevin Park", position: "RW", shirtNumber: 14, year: "2nd Year" },
  { name: "Steve Kim", position: "LW", shirtNumber: 15, year: "3rd Year" },
  { name: "Ben Garcia", position: "ST", shirtNumber: 16, year: "4th Year" },
]

// Coach stats
const coachStats = {
  totalPlayers: currentTeam.length,
  requestsPending: pendingRequests.length,
  requestsThisWeek: 4,
  approvedThisMonth: 12,
  teamCapacity: 25,
  averageGPA: 3.7,
}

interface PlayerRequest {
  id: number
  fullName: string
  department: string
  preferredPosition: string
  positionLabel: string
  shirtNumber: number
  experience: string
  motivation: string
  availability: string
  submittedDate: string
  email: string
  year: string
  gpa: string
  previousInjuries: string
}

export function CoachDashboard() {
  const [requests, setRequests] = useState<PlayerRequest[]>(pendingRequests)
  const [selectedRequest, setSelectedRequest] = useState<PlayerRequest | null>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [filterPosition, setFilterPosition] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"table" | "cards">("table")

  const getPositionIcon = (position: string) => {
    switch (position) {
      case "GK":
        return <Shield className="h-4 w-4 text-blue-600" />
      case "CB":
      case "LB":
      case "RB":
        return <Target className="h-4 w-4 text-red-600" />
      case "CDM":
      case "CM":
      case "CAM":
      case "LM":
      case "RM":
        return <Zap className="h-4 w-4 text-purple-600" />
      case "LW":
      case "RW":
      case "ST":
      case "CF":
        return <Star className="h-4 w-4 text-green-600" />
      default:
        return <Users className="h-4 w-4 text-gray-600" />
    }
  }

  const getPositionColor = (position: string) => {
    switch (position) {
      case "GK":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
      case "CB":
      case "LB":
      case "RB":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
      case "CDM":
      case "CM":
      case "CAM":
      case "LM":
      case "RM":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300"
      case "LW":
      case "RW":
      case "ST":
      case "CF":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
    }
  }

  const handleApprove = (requestId: number) => {
    setRequests(requests.filter((req) => req.id !== requestId))
    // In a real app, this would make an API call
    console.log(`Approved request ${requestId}`)
  }

  const handleReject = (requestId: number) => {
    setRequests(requests.filter((req) => req.id !== requestId))
    // In a real app, this would make an API call
    console.log(`Rejected request ${requestId}`)
  }

  const handleViewDetails = (request: PlayerRequest) => {
    setSelectedRequest(request)
    setShowDetailsDialog(true)
  }

  const filteredRequests = requests.filter((request) => {
    const matchesPosition = filterPosition === "all" || request.preferredPosition === filterPosition
    const matchesSearch =
      request.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.department.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesPosition && matchesSearch
  })

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case "weekdays":
        return "Weekdays Only"
      case "weekends":
        return "Weekends Only"
      case "both":
        return "Both Weekdays & Weekends"
      case "flexible":
        return "Flexible Schedule"
      case "limited":
        return "Limited Availability"
      default:
        return availability
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
                  <UserCheck className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">Coach Dashboard</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Computer Science Department</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-green-600 border-green-600">
                <Trophy className="h-3 w-3 mr-1" />
                Head Coach
              </Badge>
              <ModeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Coach Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Players</CardTitle>
              <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{coachStats.totalPlayers}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {coachStats.teamCapacity - coachStats.totalPlayers} spots available
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Requests Pending</CardTitle>
              <Clock className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{coachStats.requestsPending}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">+{coachStats.requestsThisWeek} this week</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved This Month</CardTitle>
              <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{coachStats.approvedThisMonth}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                +25% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Average GPA</CardTitle>
              <Award className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{coachStats.averageGPA}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Academic excellence</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="requests" className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Pending Requests ({filteredRequests.length})</span>
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Current Team ({currentTeam.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="space-y-6">
            {/* Filters and Search */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span>Filter & Search</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search by name or department..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={filterPosition} onValueChange={setFilterPosition}>
                    <SelectTrigger className="w-full md:w-[200px]">
                      <SelectValue placeholder="Filter by position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Positions</SelectItem>
                      <SelectItem value="GK">Goalkeeper</SelectItem>
                      <SelectItem value="CB">Centre-Back</SelectItem>
                      <SelectItem value="LB">Left-Back</SelectItem>
                      <SelectItem value="RB">Right-Back</SelectItem>
                      <SelectItem value="CDM">Defensive Mid</SelectItem>
                      <SelectItem value="CM">Central Mid</SelectItem>
                      <SelectItem value="CAM">Attacking Mid</SelectItem>
                      <SelectItem value="LW">Left Winger</SelectItem>
                      <SelectItem value="RW">Right Winger</SelectItem>
                      <SelectItem value="ST">Striker</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex space-x-2">
                    <Button
                      variant={viewMode === "table" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("table")}
                    >
                      Table
                    </Button>
                    <Button
                      variant={viewMode === "cards" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("cards")}
                    >
                      Cards
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pending Requests */}
            {filteredRequests.length === 0 ? (
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">All Caught Up!</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-center">
                    No pending requests match your current filters.
                  </p>
                </CardContent>
              </Card>
            ) : viewMode === "table" ? (
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-green-600 dark:text-green-400" />
                        <span>Pending Player Requests</span>
                      </CardTitle>
                      <CardDescription>Review and approve applications to join your team</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Player</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Shirt #</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarFallback className="bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                                  {request.fullName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium text-gray-900 dark:text-white">{request.fullName}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">{request.year}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-gray-900 dark:text-white">{request.department}</div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getPositionColor(request.preferredPosition)}>
                              <div className="flex items-center space-x-1">
                                {getPositionIcon(request.preferredPosition)}
                                <span>{request.preferredPosition}</span>
                              </div>
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                {request.shirtNumber}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {new Date(request.submittedDate).toLocaleDateString()}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="outline" onClick={() => handleViewDetails(request)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-white"
                                onClick={() => handleApprove(request.id)}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => handleReject(request.id)}>
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRequests.map((request) => (
                  <Card key={request.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback className="bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                              {request.fullName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{request.fullName}</CardTitle>
                            <CardDescription>
                              {request.year} • {request.department}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                          {request.shirtNumber}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge className={getPositionColor(request.preferredPosition)}>
                          <div className="flex items-center space-x-1">
                            {getPositionIcon(request.preferredPosition)}
                            <span>{request.positionLabel}</span>
                          </div>
                        </Badge>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(request.submittedDate).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="font-medium text-gray-900 dark:text-white">Experience:</span>
                          <p className="text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{request.experience}</p>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium text-gray-900 dark:text-white">Availability:</span>
                          <p className="text-gray-600 dark:text-gray-400">
                            {getAvailabilityText(request.availability)}
                          </p>
                        </div>
                      </div>

                      <div className="flex space-x-2 pt-4">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleViewDetails(request)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Details
                        </Button>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => handleApprove(request.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleReject(request.id)}>
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span>Current Team Roster</span>
                </CardTitle>
                <CardDescription>Computer Science Department Football Team</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Player</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Shirt #</TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentTeam.map((player, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                                {player.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="font-medium text-gray-900 dark:text-white">{player.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getPositionColor(player.position)}>
                            <div className="flex items-center space-x-1">
                              {getPositionIcon(player.position)}
                              <span>{player.position}</span>
                            </div>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {player.shirtNumber}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{player.year}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            Active
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Player Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-green-600" />
              <span>Player Application Details</span>
            </DialogTitle>
            <DialogDescription>Review complete application information before making a decision</DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-6">
              {/* Player Header */}
              <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400 text-xl">
                    {selectedRequest.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedRequest.fullName}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedRequest.year} • {selectedRequest.department}
                  </p>
                  <div className="flex items-center space-x-4 mt-2">
                    <Badge className={getPositionColor(selectedRequest.preferredPosition)}>
                      <div className="flex items-center space-x-1">
                        {getPositionIcon(selectedRequest.preferredPosition)}
                        <span>{selectedRequest.positionLabel}</span>
                      </div>
                    </Badge>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Shirt #</span>
                      <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {selectedRequest.shirtNumber}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-green-600" />
                    <span>Contact Information</span>
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-3 w-3 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">{selectedRequest.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-3 w-3 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">
                        Applied: {new Date(selectedRequest.submittedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                    <Award className="h-4 w-4 text-green-600" />
                    <span>Academic Information</span>
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">GPA:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{selectedRequest.gpa}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Year:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{selectedRequest.year}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Football Information */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                  <Trophy className="h-4 w-4 text-green-600" />
                  <span>Football Information</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-2">Training Availability</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {getAvailabilityText(selectedRequest.availability)}
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-2">Previous Injuries</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{selectedRequest.previousInjuries}</p>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2">Football Experience</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    {selectedRequest.experience}
                  </p>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2">Motivation</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    {selectedRequest.motivation}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                <Button
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => {
                    handleApprove(selectedRequest.id)
                    setShowDetailsDialog(false)
                  }}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve Application
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={() => {
                    handleReject(selectedRequest.id)
                    setShowDetailsDialog(false)
                  }}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject Application
                </Button>
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
