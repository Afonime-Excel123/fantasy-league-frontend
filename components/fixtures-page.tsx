"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
import { ModeToggle } from "@/components/mode-toggle"
import {
  Calendar,
  Clock,
  Trophy,
  Edit,
  Save,
  X,
  ArrowLeft,
  Filter,
  Users,
  MapPin,
  CheckCircle,
  Play,
} from "lucide-react"
import Link from "next/link"

// Mock fixture data
const mockFixtures = [
  // Gameweek 1
  {
    id: 1,
    gameweek: 1,
    homeTeam: "Engineering Eagles",
    awayTeam: "Computer Science Crushers",
    homeScore: 2,
    awayScore: 1,
    date: "2024-01-15",
    time: "15:00",
    venue: "Main Campus Field",
    status: "completed", // completed, live, upcoming
    attendance: 245,
  },
  {
    id: 2,
    gameweek: 1,
    homeTeam: "Business Bulldogs",
    awayTeam: "Psychology Panthers",
    homeScore: 0,
    awayScore: 3,
    date: "2024-01-15",
    time: "17:00",
    venue: "South Field",
    status: "completed",
    attendance: 189,
  },
  {
    id: 3,
    gameweek: 1,
    homeTeam: "Art Attack",
    awayTeam: "Biology Beasts",
    homeScore: 1,
    awayScore: 1,
    date: "2024-01-16",
    time: "14:00",
    venue: "North Field",
    status: "completed",
    attendance: 156,
  },

  // Gameweek 2
  {
    id: 4,
    gameweek: 2,
    homeTeam: "Computer Science Crushers",
    awayTeam: "Business Bulldogs",
    homeScore: 2,
    awayScore: 0,
    date: "2024-01-22",
    time: "15:00",
    venue: "Main Campus Field",
    status: "live",
    attendance: null,
    liveMinute: 67,
  },
  {
    id: 5,
    gameweek: 2,
    homeTeam: "Psychology Panthers",
    awayTeam: "Engineering Eagles",
    homeScore: null,
    awayScore: null,
    date: "2024-01-22",
    time: "17:00",
    venue: "South Field",
    status: "upcoming",
    attendance: null,
  },
  {
    id: 6,
    gameweek: 2,
    homeTeam: "Biology Beasts",
    awayTeam: "Art Attack",
    homeScore: null,
    awayScore: null,
    date: "2024-01-23",
    time: "14:00",
    venue: "North Field",
    status: "upcoming",
    attendance: null,
  },

  // Gameweek 3
  {
    id: 7,
    gameweek: 3,
    homeTeam: "Engineering Eagles",
    awayTeam: "Biology Beasts",
    homeScore: null,
    awayScore: null,
    date: "2024-01-29",
    time: "15:00",
    venue: "Main Campus Field",
    status: "upcoming",
    attendance: null,
  },
  {
    id: 8,
    gameweek: 3,
    homeTeam: "Art Attack",
    awayTeam: "Computer Science Crushers",
    homeScore: null,
    awayScore: null,
    date: "2024-01-29",
    time: "17:00",
    venue: "South Field",
    status: "upcoming",
    attendance: null,
  },
  {
    id: 9,
    gameweek: 3,
    homeTeam: "Business Bulldogs",
    awayTeam: "Psychology Panthers",
    homeScore: null,
    awayScore: null,
    date: "2024-01-30",
    time: "14:00",
    venue: "North Field",
    status: "upcoming",
    attendance: null,
  },
]

interface Fixture {
  id: number
  gameweek: number
  homeTeam: string
  awayTeam: string
  homeScore: number | null
  awayScore: number | null
  date: string
  time: string
  venue: string
  status: "completed" | "live" | "upcoming"
  attendance: number | null
  liveMinute?: number
}

export function FixturesPage() {
  const [fixtures, setFixtures] = useState<Fixture[]>(mockFixtures)
  const [selectedGameweek, setSelectedGameweek] = useState<string>("all")
  const [selectedTeam, setSelectedTeam] = useState<string>("all")
  const [editingFixture, setEditingFixture] = useState<Fixture | null>(null)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [isAdmin] = useState(true) // In real app, check user role

  // Get unique gameweeks and teams
  const gameweeks = Array.from(new Set(fixtures.map((f) => f.gameweek))).sort()
  const teams = Array.from(new Set(fixtures.flatMap((f) => [f.homeTeam, f.awayTeam]))).sort()

  // Filter fixtures
  const filteredFixtures = fixtures.filter((fixture) => {
    const gameweekMatch = selectedGameweek === "all" || fixture.gameweek === Number.parseInt(selectedGameweek)
    const teamMatch = selectedTeam === "all" || fixture.homeTeam === selectedTeam || fixture.awayTeam === selectedTeam
    return gameweekMatch && teamMatch
  })

  // Group fixtures by gameweek
  const fixturesByGameweek = gameweeks.reduce(
    (acc, gameweek) => {
      acc[gameweek] = filteredFixtures.filter((f) => f.gameweek === gameweek)
      return acc
    },
    {} as Record<number, Fixture[]>,
  )

  const handleEditFixture = (fixture: Fixture) => {
    setEditingFixture({ ...fixture })
    setShowEditDialog(true)
  }

  const handleSaveFixture = () => {
    if (editingFixture) {
      setFixtures(fixtures.map((f) => (f.id === editingFixture.id ? editingFixture : f)))
      setShowEditDialog(false)
      setEditingFixture(null)
    }
  }

  const getStatusBadge = (fixture: Fixture) => {
    switch (fixture.status) {
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
            Live {fixture.liveMinute}'
          </Badge>
        )
      case "upcoming":
        return (
          <Badge variant="secondary">
            <Clock className="h-3 w-3 mr-1" />
            Upcoming
          </Badge>
        )
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

  const getResultDisplay = (fixture: Fixture) => {
    if (fixture.status === "upcoming") {
      return (
        <div className="text-center">
          <div className="text-lg font-medium text-gray-500 dark:text-gray-400">vs</div>
          <div className="text-sm text-gray-400">{fixture.time}</div>
        </div>
      )
    }

    if (fixture.status === "live") {
      return (
        <div className="text-center">
          <div className="text-xl font-bold">
            {fixture.homeScore} - {fixture.awayScore}
          </div>
          <div className="text-sm text-red-600 font-medium">{fixture.liveMinute}' LIVE</div>
        </div>
      )
    }

    return (
      <div className="text-center">
        <div className="text-xl font-bold">
          {fixture.homeScore} - {fixture.awayScore}
        </div>
        <div className="text-sm text-gray-500">Full Time</div>
      </div>
    )
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
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">Campus League Fixtures</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">School football league schedule</p>
                </div>
              </div>
            </div>
            <ModeToggle />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-green-600 dark:text-green-400" />
              <span>Filter Fixtures</span>
            </CardTitle>
            <CardDescription>Filter by gameweek or team to find specific matches</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Gameweek</label>
                <Select value={selectedGameweek} onValueChange={setSelectedGameweek}>
                  <SelectTrigger className="bg-white dark:bg-gray-700">
                    <SelectValue placeholder="All Gameweeks" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Gameweeks</SelectItem>
                    {gameweeks.map((gw) => (
                      <SelectItem key={gw} value={gw.toString()}>
                        Gameweek {gw}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Team</label>
                <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                  <SelectTrigger className="bg-white dark:bg-gray-700">
                    <SelectValue placeholder="All Teams" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Teams</SelectItem>
                    {teams.map((team) => (
                      <SelectItem key={team} value={team}>
                        {team}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p>Showing {filteredFixtures.length} fixtures</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Completed</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span>Live</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                      <span>Upcoming</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fixtures by Gameweek */}
        <div className="space-y-8">
          {gameweeks.map((gameweek) => {
            const gameweekFixtures = fixturesByGameweek[gameweek]
            if (!gameweekFixtures || gameweekFixtures.length === 0) return null

            return (
              <Card key={gameweek} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-600 dark:bg-green-500 p-2 rounded-lg">
                        <Trophy className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle>Gameweek {gameweek}</CardTitle>
                        <CardDescription>{gameweekFixtures.length} matches</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-lg px-3 py-1">
                      GW{gameweek}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {gameweekFixtures.map((fixture) => (
                      <Card
                        key={fixture.id}
                        className={`relative transition-all hover:shadow-md ${
                          fixture.status === "live"
                            ? "border-red-500 shadow-red-100 dark:shadow-red-900/20"
                            : fixture.status === "completed"
                              ? "border-green-200 dark:border-green-800"
                              : "border-gray-200 dark:border-gray-600"
                        }`}
                      >
                        <CardContent className="p-4">
                          <div className="space-y-4">
                            {/* Match Header */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4 text-gray-500" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  {formatDate(fixture.date)}
                                </span>
                              </div>
                              {getStatusBadge(fixture)}
                            </div>

                            {/* Teams and Score */}
                            <div className="grid grid-cols-3 items-center gap-4">
                              <div className="text-center">
                                <div className="font-medium text-sm mb-1">{fixture.homeTeam}</div>
                                <Badge variant="outline" className="text-xs">
                                  HOME
                                </Badge>
                              </div>

                              {getResultDisplay(fixture)}

                              <div className="text-center">
                                <div className="font-medium text-sm mb-1">{fixture.awayTeam}</div>
                                <Badge variant="outline" className="text-xs">
                                  AWAY
                                </Badge>
                              </div>
                            </div>

                            {/* Match Details */}
                            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                              <div className="flex items-center space-x-2">
                                <MapPin className="h-3 w-3" />
                                <span>{fixture.venue}</span>
                              </div>
                              {fixture.attendance && (
                                <div className="flex items-center space-x-2">
                                  <Users className="h-3 w-3" />
                                  <span>{fixture.attendance} attendance</span>
                                </div>
                              )}
                            </div>

                            {/* Admin Controls */}
                            {isAdmin && fixture.status !== "live" && (
                              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditFixture(fixture)}
                                  className="w-full"
                                >
                                  <Edit className="h-3 w-3 mr-1" />
                                  {fixture.status === "upcoming" ? "Set Result" : "Edit Result"}
                                </Button>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* No Results */}
        {filteredFixtures.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No fixtures found</h3>
            <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters to see more fixtures.</p>
          </div>
        )}
      </div>

      {/* Edit Fixture Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-md">
          {editingFixture && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <Edit className="h-5 w-5 text-green-600" />
                  <span>Edit Match Result</span>
                </DialogTitle>
                <DialogDescription>
                  {editingFixture.homeTeam} vs {editingFixture.awayTeam}
                  <br />
                  {formatDate(editingFixture.date)} at {editingFixture.time}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Score Input */}
                <div className="grid grid-cols-3 items-center gap-4">
                  <div className="text-center">
                    <label className="block text-sm font-medium mb-2">{editingFixture.homeTeam}</label>
                    <Input
                      type="number"
                      min="0"
                      value={editingFixture.homeScore || ""}
                      onChange={(e) =>
                        setEditingFixture({
                          ...editingFixture,
                          homeScore: e.target.value ? Number.parseInt(e.target.value) : null,
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
                    <label className="block text-sm font-medium mb-2">{editingFixture.awayTeam}</label>
                    <Input
                      type="number"
                      min="0"
                      value={editingFixture.awayScore || ""}
                      onChange={(e) =>
                        setEditingFixture({
                          ...editingFixture,
                          awayScore: e.target.value ? Number.parseInt(e.target.value) : null,
                        })
                      }
                      className="text-center text-xl font-bold"
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Additional Details */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Attendance</label>
                    <Input
                      type="number"
                      min="0"
                      value={editingFixture.attendance || ""}
                      onChange={(e) =>
                        setEditingFixture({
                          ...editingFixture,
                          attendance: e.target.value ? Number.parseInt(e.target.value) : null,
                        })
                      }
                      placeholder="Enter attendance"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Status</label>
                    <Select
                      value={editingFixture.status}
                      onValueChange={(value) =>
                        setEditingFixture({
                          ...editingFixture,
                          status: value as "completed" | "live" | "upcoming",
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
              </div>

              <DialogFooter className="flex space-x-2">
                <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                  <X className="h-4 w-4 mr-1" />
                  Cancel
                </Button>
                <Button onClick={handleSaveFixture} className="bg-green-600 hover:bg-green-700 text-white">
                  <Save className="h-4 w-4 mr-1" />
                  Save Result
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
