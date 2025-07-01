"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Search, Users, Phone, Mail, Calendar, Award, AlertTriangle, Edit, MessageSquare } from "lucide-react"

// Mock data for roster
const mockRosterPlayers = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@university.edu",
    phone: "+1 (555) 123-4567",
    position: "Midfielder",
    jerseyNumber: 10,
    academicYear: "3rd Year",
    gpa: 3.8,
    status: "Active",
    joinedDate: "2024-01-15",
    matchesPlayed: 12,
    goals: 5,
    assists: 8,
    yellowCards: 2,
    redCards: 0,
    emergencyContact: "Sarah Johnson - +1 (555) 987-6543",
    medicalNotes: "No known allergies",
    lastPerformanceRating: 8.5,
  },
  {
    id: 2,
    name: "Maria Rodriguez",
    email: "maria.rodriguez@university.edu",
    phone: "+1 (555) 234-5678",
    position: "Defender",
    jerseyNumber: 4,
    academicYear: "2nd Year",
    gpa: 3.6,
    status: "Active",
    joinedDate: "2024-01-10",
    matchesPlayed: 11,
    goals: 1,
    assists: 3,
    yellowCards: 1,
    redCards: 0,
    emergencyContact: "Carlos Rodriguez - +1 (555) 876-5432",
    medicalNotes: "Knee injury history - cleared to play",
    lastPerformanceRating: 7.8,
  },
  {
    id: 3,
    name: "David Chen",
    email: "david.chen@university.edu",
    phone: "+1 (555) 345-6789",
    position: "Goalkeeper",
    jerseyNumber: 1,
    academicYear: "4th Year",
    gpa: 3.9,
    status: "Injured",
    joinedDate: "2024-01-05",
    matchesPlayed: 8,
    goals: 0,
    assists: 0,
    yellowCards: 0,
    redCards: 0,
    emergencyContact: "Linda Chen - +1 (555) 765-4321",
    medicalNotes: "Shoulder injury - expected return in 2 weeks",
    lastPerformanceRating: 8.2,
  },
  {
    id: 4,
    name: "Sarah Williams",
    email: "sarah.williams@university.edu",
    phone: "+1 (555) 456-7890",
    position: "Forward",
    jerseyNumber: 9,
    academicYear: "3rd Year",
    gpa: 3.7,
    status: "Active",
    joinedDate: "2024-01-12",
    matchesPlayed: 10,
    goals: 12,
    assists: 4,
    yellowCards: 1,
    redCards: 0,
    emergencyContact: "Mike Williams - +1 (555) 654-3210",
    medicalNotes: "No medical concerns",
    lastPerformanceRating: 9.1,
  },
]

export function CoachRosterManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [positionFilter, setPositionFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null)
  const [isPlayerDialogOpen, setIsPlayerDialogOpen] = useState(false)
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false)
  const [message, setMessage] = useState("")

  const filteredPlayers = mockRosterPlayers.filter((player) => {
    const matchesSearch =
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.position.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesPosition = positionFilter === "all" || player.position === positionFilter
    const matchesStatus = statusFilter === "all" || player.status === statusFilter

    return matchesSearch && matchesPosition && matchesStatus
  })

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "injured":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "suspended":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getPositionBadgeColor = (position: string) => {
    switch (position.toLowerCase()) {
      case "goalkeeper":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "defender":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "midfielder":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "forward":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const positions = [...new Set(mockRosterPlayers.map((player) => player.position))]
  const statuses = [...new Set(mockRosterPlayers.map((player) => player.status))]

  const handlePlayerClick = (player: any) => {
    setSelectedPlayer(player)
    setIsPlayerDialogOpen(true)
  }

  const handleSendMessage = (player: any) => {
    setSelectedPlayer(player)
    setMessage("")
    setIsMessageDialogOpen(true)
  }

  const sendMessage = () => {
    console.log("Sending message to:", selectedPlayer.name, "Message:", message)
    setIsMessageDialogOpen(false)
    setMessage("")
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Team Roster</h1>
          <p className="text-muted-foreground">Manage your team players and their information</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Total Players</p>
                <p className="text-2xl font-bold">{mockRosterPlayers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Award className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm font-medium">Active Players</p>
                <p className="text-2xl font-bold">{mockRosterPlayers.filter((p) => p.status === "Active").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <div>
                <p className="text-sm font-medium">Injured</p>
                <p className="text-2xl font-bold">{mockRosterPlayers.filter((p) => p.status === "Injured").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Avg Performance</p>
                <p className="text-2xl font-bold">
                  {(
                    mockRosterPlayers.reduce((sum, p) => sum + p.lastPerformanceRating, 0) / mockRosterPlayers.length
                  ).toFixed(1)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or position..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={positionFilter} onValueChange={setPositionFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Positions</SelectItem>
                {positions.map((position) => (
                  <SelectItem key={position} value={position}>
                    {position}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Player Roster */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPlayers.map((player) => (
          <Card key={player.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary">
                    {player.jerseyNumber}
                  </div>
                  <div>
                    <h3 className="font-semibold">{player.name}</h3>
                    <p className="text-sm text-muted-foreground">{player.academicYear}</p>
                  </div>
                </div>
                <Badge className={getStatusBadgeColor(player.status)}>{player.status}</Badge>
              </div>

              <div className="space-y-2 mb-4">
                <Badge className={getPositionBadgeColor(player.position)}>{player.position}</Badge>
                <div className="text-sm space-y-1">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-3 w-3" />
                    <span className="truncate">{player.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-3 w-3" />
                    <span>{player.phone}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs text-center mb-4">
                <div>
                  <p className="font-medium">{player.matchesPlayed}</p>
                  <p className="text-muted-foreground">Matches</p>
                </div>
                <div>
                  <p className="font-medium">{player.goals}</p>
                  <p className="text-muted-foreground">Goals</p>
                </div>
                <div>
                  <p className="font-medium">{player.assists}</p>
                  <p className="text-muted-foreground">Assists</p>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent"
                  onClick={() => handlePlayerClick(player)}
                >
                  <Edit className="h-3 w-3 mr-1" />
                  View Details
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleSendMessage(player)}>
                  <MessageSquare className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPlayers.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No players found matching your criteria.</p>
          </CardContent>
        </Card>
      )}

      {/* Player Details Dialog */}
      <Dialog open={isPlayerDialogOpen} onOpenChange={setIsPlayerDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Player Details</DialogTitle>
            <DialogDescription>Complete information for {selectedPlayer?.name}</DialogDescription>
          </DialogHeader>

          {selectedPlayer && (
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-medium">Name</Label>
                  <p>{selectedPlayer.name}</p>
                </div>
                <div>
                  <Label className="font-medium">Jersey Number</Label>
                  <p>#{selectedPlayer.jerseyNumber}</p>
                </div>
                <div>
                  <Label className="font-medium">Position</Label>
                  <Badge className={getPositionBadgeColor(selectedPlayer.position)}>{selectedPlayer.position}</Badge>
                </div>
                <div>
                  <Label className="font-medium">Status</Label>
                  <Badge className={getStatusBadgeColor(selectedPlayer.status)}>{selectedPlayer.status}</Badge>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2">
                <Label className="font-medium">Contact Information</Label>
                <div className="bg-muted p-3 rounded-lg space-y-1 text-sm">
                  <p>
                    <strong>Email:</strong> {selectedPlayer.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {selectedPlayer.phone}
                  </p>
                  <p>
                    <strong>Emergency Contact:</strong> {selectedPlayer.emergencyContact}
                  </p>
                </div>
              </div>

              {/* Academic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-medium">Academic Year</Label>
                  <p>{selectedPlayer.academicYear}</p>
                </div>
                <div>
                  <Label className="font-medium">GPA</Label>
                  <p>{selectedPlayer.gpa}</p>
                </div>
              </div>

              {/* Performance Stats */}
              <div className="space-y-2">
                <Label className="font-medium">Performance Statistics</Label>
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-2xl font-bold">{selectedPlayer.matchesPlayed}</p>
                    <p className="text-sm text-muted-foreground">Matches</p>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-2xl font-bold">{selectedPlayer.goals}</p>
                    <p className="text-sm text-muted-foreground">Goals</p>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-2xl font-bold">{selectedPlayer.assists}</p>
                    <p className="text-sm text-muted-foreground">Assists</p>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-2xl font-bold">{selectedPlayer.lastPerformanceRating}</p>
                    <p className="text-sm text-muted-foreground">Rating</p>
                  </div>
                </div>
              </div>

              {/* Disciplinary */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-medium">Yellow Cards</Label>
                  <p>{selectedPlayer.yellowCards}</p>
                </div>
                <div>
                  <Label className="font-medium">Red Cards</Label>
                  <p>{selectedPlayer.redCards}</p>
                </div>
              </div>

              {/* Medical Notes */}
              <div>
                <Label className="font-medium">Medical Notes</Label>
                <p className="text-sm bg-muted p-3 rounded-lg">{selectedPlayer.medicalNotes}</p>
              </div>

              {/* Dates */}
              <div>
                <Label className="font-medium">Joined Team</Label>
                <p>{new Date(selectedPlayer.joinedDate).toLocaleDateString()}</p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPlayerDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={() => handleSendMessage(selectedPlayer)}>Send Message</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Message Dialog */}
      <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Message</DialogTitle>
            <DialogDescription>Send a message to {selectedPlayer?.name}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMessageDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={sendMessage} disabled={!message.trim()}>
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
