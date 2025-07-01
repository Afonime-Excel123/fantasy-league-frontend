"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ModeToggle } from "@/components/mode-toggle"
import {
  Calendar,
  Clock,
  Plus,
  Edit,
  Save,
  X,
  ArrowLeft,
  Trophy,
  MapPin,
  CheckCircle,
  Play,
  AlertCircle,
  Filter,
  Search,
  Download,
} from "lucide-react"
import Link from "next/link"

// Mock teams data
const teams = [
  "Engineering Eagles",
  "Computer Science Crushers",
  "Business Bulldogs",
  "Psychology Panthers",
  "Biology Beasts",
  "Art Attack",
  "Mathematics Mavericks",
  "Physics Phantoms",
  "Chemistry Champions",
  "History Hawks",
]

// Mock venues data
const venues = ["Main Campus Field", "South Field", "North Field", "Training Ground A", "Training Ground B"]

// Mock fixture data
const mockFixtures = [
  {
    id: 1,
    gameweek: 9,
    teamA: "Engineering Eagles",
    teamB: "Computer Science Crushers",
    scoreA: null,
    scoreB: null,
    date: "2024-02-15",
    time: "15:00",
    venue: "Main Campus Field",
    status: "upcoming",
    referee: "John Smith",
  },
  {
    id: 2,
    gameweek: 9,
    teamA: "Business Bulldogs",
    teamB: "Psychology Panthers",
    scoreA: null,
    scoreB: null,
    date: "2024-02-15",
    time: "17:00",
    venue: "South Field",
    status: "upcoming",
    referee: "Sarah Johnson",
  },
  {
    id: 3,
    gameweek: 8,
    teamA: "Biology Beasts",
    teamB: "Art Attack",
    scoreA: 2,
    scoreB: 1,
    date: "2024-02-08",
    time: "14:00",
    venue: "North Field",
    status: "completed",
    referee: "Mike Davis",
  },
  {
    id: 4,
    gameweek: 8,
    teamA: "Mathematics Mavericks",
    teamB: "Physics Phantoms",
    scoreA: 0,
    scoreB: 3,
    date: "2024-02-08",
    time: "16:00",
    venue: "Main Campus Field",
    status: "completed",
    referee: "Lisa Wilson",
  },
  {
    id: 5,
    gameweek: 9,
    teamA: "Chemistry Champions",
    teamB: "History Hawks",
    scoreA: null,
    scoreB: null,
    date: "2024-02-16",
    time: "13:00",
    venue: "Training Ground A",
    status: "upcoming",
    referee: "Tom Brown",
  },
]

interface Fixture {
  id: number
  gameweek: number
  teamA: string
  teamB: string
  scoreA: number | null
  scoreB: number | null
  date: string
  time: string
  venue: string
  status: "upcoming" | "completed" | "live"
  referee: string
}

interface NewFixture {
  teamA: string
  teamB: string
  date: string
  time: string
  venue: string
  gameweek: number
  referee: string
}

export function AdminFixtureManagement() {
  const [fixtures, setFixtures] = useState<Fixture[]>(mockFixtures)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [editingFixture, setEditingFixture] = useState<Fixture | null>(null)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const [newFixture, setNewFixture] = useState<NewFixture>({
    teamA: "",
    teamB: "",
    date: "",
    time: "",
    venue: "",
    gameweek: 9,
    referee: "",
  })

  // Filter fixtures based on search and status
  const filteredFixtures = fixtures.filter((fixture) => {
    const matchesSearch =
      fixture.teamA.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fixture.teamB.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fixture.venue.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || fixture.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Sort fixtures by date (upcoming first, then completed)
  const sortedFixtures = filteredFixtures.sort((a, b) => {
    if (a.status === "upcoming" && b.status === "completed") return -1
    if (a.status === "completed" && b.status === "upcoming") return 1
    return new Date(a.date).getTime() - new Date(b.date).getTime()
  })

  const handleCreateFixture = () => {
    if (!newFixture.teamA || !newFixture.teamB || !newFixture.date || !newFixture.time || !newFixture.venue) {
      alert("Please fill in all required fields")
      return
    }

    if (newFixture.teamA === newFixture.teamB) {
      alert("Team A and Team B cannot be the same")
      return
    }

    const fixture: Fixture = {
      id: Math.max(...fixtures.map((f) => f.id)) + 1,
      ...newFixture,
      scoreA: null,
      scoreB: null,
      status: "upcoming",
    }

    setFixtures([...fixtures, fixture])
    setNewFixture({
      teamA: "",
      teamB: "",
      date: "",
      time: "",
      venue: "",
      gameweek: 9,
      referee: "",
    })
    setShowCreateDialog(false)
  }

  const handleEditFixture = (fixture: Fixture) => {
    setEditingFixture({ ...fixture })
    setShowEditDialog(true)
  }

  const handleSaveEdit = () => {
    if (editingFixture) {
      setFixtures(fixtures.map((f) => (f.id === editingFixture.id ? editingFixture : f)))
      setShowEditDialog(false)
      setEditingFixture(null)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="text-green-600 border-green-600">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        )
      case "live":
        return (
          <Badge variant="destructive" className="animate-pulse">
            <Play className="h-3 w-3 mr-1" />
            Live
          </Badge>
        )
      case "upcoming":
        return (
          <Badge variant="secondary">
            <Clock className="h-3 w-3 mr-1" />
            Upcoming
          </Badge>
        )
      default:
        return null
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  const upcomingCount = fixtures.filter((f) => f.status === "upcoming").length
  const completedCount = fixtures.filter((f) => f.status === "completed").length
  const totalFixtures = fixtures.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/admin">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Admin
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="bg-green-600 dark:bg-green-500 p-2 rounded-lg">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">Fixture Management</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Create and manage league fixtures</p>
                </div>
              </div>
            </div>
            <ModeToggle />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Fixtures</CardTitle>
              <Trophy className="h-4 w-4 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalFixtures}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">All time</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
              <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingCount}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Awaiting results</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedCount}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Results entered</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current GW</CardTitle>
              <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">9</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Active gameweek</p>
            </CardContent>
          </Card>
        </div>

        {/* Actions Bar */}
        <Card className="mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 flex-1">
                {/* Search */}
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search fixtures..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white dark:bg-gray-700"
                  />
                </div>

                {/* Status Filter */}
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40 bg-white dark:bg-gray-700">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="live">Live</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>

                <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                  <DialogTrigger asChild>
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Fixture
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="flex items-center space-x-2">
                        <Plus className="h-5 w-5 text-green-600" />
                        <span>Create New Fixture</span>
                      </DialogTitle>
                      <DialogDescription>Schedule a new match between two teams</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="teamA">Team A (Home)</Label>
                          <Select
                            value={newFixture.teamA}
                            onValueChange={(value) => setNewFixture({ ...newFixture, teamA: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select team" />
                            </SelectTrigger>
                            <SelectContent>
                              {teams.map((team) => (
                                <SelectItem key={team} value={team} disabled={team === newFixture.teamB}>
                                  {team}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="teamB">Team B (Away)</Label>
                          <Select
                            value={newFixture.teamB}
                            onValueChange={(value) => setNewFixture({ ...newFixture, teamB: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select team" />
                            </SelectTrigger>
                            <SelectContent>
                              {teams.map((team) => (
                                <SelectItem key={team} value={team} disabled={team === newFixture.teamA}>
                                  {team}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="date">Match Date</Label>
                          <Input
                            type="date"
                            value={newFixture.date}
                            onChange={(e) => setNewFixture({ ...newFixture, date: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="time">Match Time</Label>
                          <Input
                            type="time"
                            value={newFixture.time}
                            onChange={(e) => setNewFixture({ ...newFixture, time: e.target.value })}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="venue">Venue</Label>
                        <Select
                          value={newFixture.venue}
                          onValueChange={(value) => setNewFixture({ ...newFixture, venue: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select venue" />
                          </SelectTrigger>
                          <SelectContent>
                            {venues.map((venue) => (
                              <SelectItem key={venue} value={venue}>
                                {venue}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="gameweek">Gameweek</Label>
                          <Input
                            type="number"
                            min="1"
                            max="38"
                            value={newFixture.gameweek}
                            onChange={(e) =>
                              setNewFixture({ ...newFixture, gameweek: Number.parseInt(e.target.value) })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="referee">Referee</Label>
                          <Input
                            placeholder="Referee name"
                            value={newFixture.referee}
                            onChange={(e) => setNewFixture({ ...newFixture, referee: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    <DialogFooter className="flex space-x-2">
                      <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                        <X className="h-4 w-4 mr-1" />
                        Cancel
                      </Button>
                      <Button onClick={handleCreateFixture} className="bg-green-600 hover:bg-green-700 text-white">
                        <Plus className="h-4 w-4 mr-1" />
                        Create Fixture
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fixtures Table */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span>League Fixtures</span>
                </CardTitle>
                <CardDescription>
                  Showing {sortedFixtures.length} of {fixtures.length} fixtures
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">GW</TableHead>
                    <TableHead>Match</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Venue</TableHead>
                    <TableHead>Referee</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedFixtures.map((fixture) => (
                    <TableRow key={fixture.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <TableCell>
                        <Badge variant="outline" className="font-mono">
                          {fixture.gameweek}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{fixture.teamA}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">vs {fixture.teamB}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {fixture.status === "completed" ? (
                          <div className="text-center">
                            <div className="text-lg font-bold">
                              {fixture.scoreA} - {fixture.scoreB}
                            </div>
                            <div className="text-xs text-gray-500">FT</div>
                          </div>
                        ) : (
                          <div className="text-center text-gray-400">
                            <div className="text-lg">- : -</div>
                            <div className="text-xs">{fixture.time}</div>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3 text-gray-400" />
                            <span className="text-sm">{formatDate(fixture.date)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3 text-gray-400" />
                            <span className="text-sm">{fixture.time}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          <span className="text-sm">{fixture.venue}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{fixture.referee}</div>
                      </TableCell>
                      <TableCell>{getStatusBadge(fixture.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" onClick={() => handleEditFixture(fixture)}>
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {sortedFixtures.length === 0 && (
              <div className="text-center py-12">
                <Trophy className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No fixtures found</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {searchTerm || statusFilter !== "all"
                    ? "Try adjusting your search or filters."
                    : "Create your first fixture to get started."}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Edit Fixture Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-md">
          {editingFixture && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <Edit className="h-5 w-5 text-green-600" />
                  <span>Edit Fixture</span>
                </DialogTitle>
                <DialogDescription>
                  {editingFixture.teamA} vs {editingFixture.teamB}
                  <br />
                  {formatDate(editingFixture.date)} at {editingFixture.time}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Score Input */}
                <div>
                  <Label className="text-base font-medium">Match Result</Label>
                  <div className="grid grid-cols-3 items-center gap-4 mt-2">
                    <div className="text-center">
                      <label className="block text-sm font-medium mb-2">{editingFixture.teamA}</label>
                      <Input
                        type="number"
                        min="0"
                        value={editingFixture.scoreA || ""}
                        onChange={(e) =>
                          setEditingFixture({
                            ...editingFixture,
                            scoreA: e.target.value ? Number.parseInt(e.target.value) : null,
                          })
                        }
                        className="text-center text-xl font-bold"
                        placeholder="0"
                      />
                    </div>

                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-400">-</div>
                    </div>

                    <div className="text-center">
                      <label className="block text-sm font-medium mb-2">{editingFixture.teamB}</label>
                      <Input
                        type="number"
                        min="0"
                        value={editingFixture.scoreB || ""}
                        onChange={(e) =>
                          setEditingFixture({
                            ...editingFixture,
                            scoreB: e.target.value ? Number.parseInt(e.target.value) : null,
                          })
                        }
                        className="text-center text-xl font-bold"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>

                {/* Match Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="editDate">Date</Label>
                    <Input
                      id="editDate"
                      type="date"
                      value={editingFixture.date}
                      onChange={(e) =>
                        setEditingFixture({
                          ...editingFixture,
                          date: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="editTime">Time</Label>
                    <Input
                      id="editTime"
                      type="time"
                      value={editingFixture.time}
                      onChange={(e) =>
                        setEditingFixture({
                          ...editingFixture,
                          time: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="editVenue">Venue</Label>
                  <Select
                    value={editingFixture.venue}
                    onValueChange={(value) =>
                      setEditingFixture({
                        ...editingFixture,
                        venue: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {venues.map((venue) => (
                        <SelectItem key={venue} value={venue}>
                          {venue}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="editStatus">Status</Label>
                  <Select
                    value={editingFixture.status}
                    onValueChange={(value) =>
                      setEditingFixture({
                        ...editingFixture,
                        status: value as "upcoming" | "completed" | "live",
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="live">Live</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter className="flex space-x-2">
                <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                  <X className="h-4 w-4 mr-1" />
                  Cancel
                </Button>
                <Button onClick={handleSaveEdit} className="bg-green-600 hover:bg-green-700 text-white">
                  <Save className="h-4 w-4 mr-1" />
                  Save Changes
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
