"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ModeToggle } from "@/components/mode-toggle"
import {
  Trophy,
  Users,
  Target,
  Calendar,
  ArrowLeft,
  Save,
  RefreshCw,
  Crown,
  Medal,
  Award,
  ArrowRight,
  GripVertical,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

// Mock qualified teams data
const qualifiedTeams = [
  { id: 1, name: "Engineering Eagles", department: "Engineering", points: 156, gd: 12, logo: "🦅" },
  { id: 2, name: "CS Crushers", department: "Computer Science", points: 148, gd: 8, logo: "💻" },
  { id: 3, name: "Business Bulldogs", department: "Business", points: 142, gd: 6, logo: "🐕" },
  { id: 4, name: "Psychology Panthers", department: "Psychology", points: 138, gd: 4, logo: "🐾" },
  { id: 5, name: "Biology Beasts", department: "Biology", points: 134, gd: 3, logo: "🧬" },
  { id: 6, name: "Art Attack", department: "Fine Arts", points: 130, gd: 2, logo: "🎨" },
  { id: 7, name: "History Hawks", department: "History", points: 126, gd: 1, logo: "📚" },
  { id: 8, name: "Physics Force", department: "Physics", points: 122, gd: 0, logo: "⚛️" },
]

// Bracket structure
interface BracketMatch {
  id: string
  round: string
  position: number
  team1?: (typeof qualifiedTeams)[0]
  team2?: (typeof qualifiedTeams)[0]
  winner?: (typeof qualifiedTeams)[0]
  date?: string
  time?: string
  venue?: string
  status: "pending" | "scheduled" | "completed"
}

const initialBracket: BracketMatch[] = [
  // Quarterfinals
  { id: "qf1", round: "quarterfinal", position: 1, status: "pending" },
  { id: "qf2", round: "quarterfinal", position: 2, status: "pending" },
  { id: "qf3", round: "quarterfinal", position: 3, status: "pending" },
  { id: "qf4", round: "quarterfinal", position: 4, status: "pending" },
  // Semifinals
  { id: "sf1", round: "semifinal", position: 1, status: "pending" },
  { id: "sf2", round: "semifinal", position: 2, status: "pending" },
  // Final
  { id: "final", round: "final", position: 1, status: "pending" },
]

export function AdminBracketManagement() {
  const [availableTeams, setAvailableTeams] = useState(qualifiedTeams)
  const [bracket, setBracket] = useState<BracketMatch[]>(initialBracket)
  const [draggedTeam, setDraggedTeam] = useState<(typeof qualifiedTeams)[0] | null>(null)
  const [showScheduleDialog, setShowScheduleDialog] = useState(false)
  const [selectedMatch, setSelectedMatch] = useState<BracketMatch | null>(null)
  const [bracketSaved, setBracketSaved] = useState(false)

  const handleDragStart = (team: (typeof qualifiedTeams)[0]) => {
    setDraggedTeam(team)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, matchId: string, position: "team1" | "team2") => {
    e.preventDefault()
    if (!draggedTeam) return

    // Update bracket
    setBracket((prev) =>
      prev.map((match) => {
        if (match.id === matchId) {
          return { ...match, [position]: draggedTeam }
        }
        return match
      }),
    )

    // Remove team from available teams
    setAvailableTeams((prev) => prev.filter((team) => team.id !== draggedTeam.id))
    setDraggedTeam(null)
  }

  const removeTeamFromBracket = (matchId: string, position: "team1" | "team2") => {
    const match = bracket.find((m) => m.id === matchId)
    if (!match) return

    const teamToRemove = match[position]
    if (!teamToRemove) return

    // Add team back to available teams
    setAvailableTeams((prev) => [...prev, teamToRemove].sort((a, b) => b.points - a.points))

    // Remove team from bracket
    setBracket((prev) =>
      prev.map((m) => {
        if (m.id === matchId) {
          return { ...m, [position]: undefined }
        }
        return m
      }),
    )
  }

  const saveBracket = () => {
    // Validate that all quarterfinal matches have both teams
    const quarterfinals = bracket.filter((m) => m.round === "quarterfinal")
    const isValid = quarterfinals.every((match) => match.team1 && match.team2)

    if (!isValid) {
      alert("Please assign all teams to quarterfinal matches before saving.")
      return
    }

    setBracketSaved(true)
    console.log("Bracket saved:", bracket)
  }

  const resetBracket = () => {
    setBracket(initialBracket)
    setAvailableTeams(qualifiedTeams)
    setBracketSaved(false)
  }

  const scheduleMatch = (match: BracketMatch, date: string, time: string, venue: string) => {
    setBracket((prev) =>
      prev.map((m) => {
        if (m.id === match.id) {
          return { ...m, date, time, venue, status: "scheduled" as const }
        }
        return m
      }),
    )
    setShowScheduleDialog(false)
    setSelectedMatch(null)
  }

  const getRoundTitle = (round: string) => {
    switch (round) {
      case "quarterfinal":
        return "Quarterfinals"
      case "semifinal":
        return "Semifinals"
      case "final":
        return "Final"
      default:
        return round
    }
  }

  const getRoundIcon = (round: string) => {
    switch (round) {
      case "quarterfinal":
        return <Target className="h-4 w-4" />
      case "semifinal":
        return <Medal className="h-4 w-4" />
      case "final":
        return <Crown className="h-4 w-4" />
      default:
        return <Trophy className="h-4 w-4" />
    }
  }

  const getMatchesForRound = (round: string) => {
    return bracket.filter((match) => match.round === round)
  }

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
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">Knockout Bracket</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Tournament Management</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant={bracketSaved ? "default" : "secondary"} className="text-green-600 border-green-600">
                {bracketSaved ? <CheckCircle className="h-3 w-3 mr-1" /> : <AlertCircle className="h-3 w-3 mr-1" />}
                {bracketSaved ? "Saved" : "Unsaved"}
              </Badge>
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
              <CardTitle className="text-sm font-medium">Qualified Teams</CardTitle>
              <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{qualifiedTeams.length}</div>
              <p className="text-xs text-muted-foreground">Top 8 teams</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Teams</CardTitle>
              <Target className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{availableTeams.length}</div>
              <p className="text-xs text-muted-foreground">Unassigned</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Matches Created</CardTitle>
              <Calendar className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bracket.filter((m) => m.team1 && m.team2).length}</div>
              <p className="text-xs text-muted-foreground">of 7 total</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tournament Status</CardTitle>
              <Award className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bracketSaved ? "Ready" : "Setup"}</div>
              <p className="text-xs text-muted-foreground">{bracketSaved ? "Tournament ready" : "In progress"}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Available Teams */}
          <div className="lg:col-span-1">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span>Available Teams</span>
                </CardTitle>
                <CardDescription>Drag teams to bracket positions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {availableTeams.map((team) => (
                    <div
                      key={team.id}
                      draggable
                      onDragStart={() => handleDragStart(team)}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-move hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <GripVertical className="h-4 w-4 text-gray-400" />
                        <div className="text-2xl">{team.logo}</div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{team.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{team.department}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">{team.points}</p>
                        <p className="text-xs text-gray-500">pts</p>
                      </div>
                    </div>
                  ))}
                  {availableTeams.length === 0 && (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>All teams assigned to bracket</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="mt-6 space-y-3">
              <Button
                onClick={saveBracket}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                disabled={bracket.filter((m) => m.round === "quarterfinal" && m.team1 && m.team2).length < 4}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Bracket
              </Button>
              <Button onClick={resetBracket} variant="outline" className="w-full">
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset Bracket
              </Button>
            </div>
          </div>

          {/* Bracket Visualization */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span>Tournament Bracket</span>
                </CardTitle>
                <CardDescription>Knockout tournament structure</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {/* Quarterfinals */}
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      {getRoundIcon("quarterfinal")}
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {getRoundTitle("quarterfinal")}
                      </h3>
                      <Badge variant="outline">Round 1</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {getMatchesForRound("quarterfinal").map((match) => (
                        <div key={match.id} className="relative">
                          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border-2 border-dashed border-gray-300 dark:border-gray-600">
                            {/* Team 1 Drop Zone */}
                            <div
                              onDragOver={handleDragOver}
                              onDrop={(e) => handleDrop(e, match.id, "team1")}
                              className="mb-2 p-3 bg-white dark:bg-gray-800 rounded border min-h-[60px] flex items-center justify-between"
                            >
                              {match.team1 ? (
                                <div className="flex items-center space-x-3">
                                  <div className="text-xl">{match.team1.logo}</div>
                                  <div>
                                    <p className="font-medium">{match.team1.name}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{match.team1.points} pts</p>
                                  </div>
                                </div>
                              ) : (
                                <p className="text-gray-500 dark:text-gray-400">Drop team here</p>
                              )}
                              {match.team1 && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeTeamFromBracket(match.id, "team1")}
                                >
                                  ×
                                </Button>
                              )}
                            </div>

                            <div className="text-center text-sm text-gray-500 dark:text-gray-400 mb-2">vs</div>

                            {/* Team 2 Drop Zone */}
                            <div
                              onDragOver={handleDragOver}
                              onDrop={(e) => handleDrop(e, match.id, "team2")}
                              className="p-3 bg-white dark:bg-gray-800 rounded border min-h-[60px] flex items-center justify-between"
                            >
                              {match.team2 ? (
                                <div className="flex items-center space-x-3">
                                  <div className="text-xl">{match.team2.logo}</div>
                                  <div>
                                    <p className="font-medium">{match.team2.name}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{match.team2.points} pts</p>
                                  </div>
                                </div>
                              ) : (
                                <p className="text-gray-500 dark:text-gray-400">Drop team here</p>
                              )}
                              {match.team2 && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeTeamFromBracket(match.id, "team2")}
                                >
                                  ×
                                </Button>
                              )}
                            </div>

                            {/* Schedule Button */}
                            {match.team1 && match.team2 && (
                              <div className="mt-3 flex justify-center">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedMatch(match)
                                    setShowScheduleDialog(true)
                                  }}
                                >
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {match.status === "scheduled" ? "Scheduled" : "Schedule"}
                                </Button>
                              </div>
                            )}
                          </div>

                          {/* Connection Line */}
                          <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 hidden md:block">
                            <ArrowRight className="h-6 w-6 text-gray-400" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Semifinals */}
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      {getRoundIcon("semifinal")}
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {getRoundTitle("semifinal")}
                      </h3>
                      <Badge variant="outline">Round 2</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                      {getMatchesForRound("semifinal").map((match) => (
                        <div
                          key={match.id}
                          className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border-2 border-dashed border-gray-300 dark:border-gray-600"
                        >
                          <div className="text-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              Winner of QF{match.position === 1 ? "1 vs QF2" : "3 vs QF4"}
                            </p>
                            <div className="p-3 bg-white dark:bg-gray-800 rounded border">
                              <p className="text-gray-500 dark:text-gray-400">TBD</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Final */}
                  <div>
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      {getRoundIcon("final")}
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{getRoundTitle("final")}</h3>
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                        Championship
                      </Badge>
                    </div>
                    <div className="max-w-md mx-auto">
                      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-6 border-2 border-dashed border-yellow-300 dark:border-yellow-600">
                        <div className="text-center">
                          <Crown className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Championship Match</p>
                          <div className="p-4 bg-white dark:bg-gray-800 rounded border">
                            <p className="text-gray-500 dark:text-gray-400">Winner of SF1 vs Winner of SF2</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Schedule Match Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Schedule Match</DialogTitle>
            <DialogDescription>Set date, time, and venue for this knockout match</DialogDescription>
          </DialogHeader>
          {selectedMatch && (
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{selectedMatch.team1?.logo}</span>
                    <span className="font-medium">{selectedMatch.team1?.name}</span>
                  </div>
                  <span className="text-gray-500">vs</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{selectedMatch.team2?.name}</span>
                    <span className="text-lg">{selectedMatch.team2?.logo}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="matchDate">Match Date</Label>
                  <Input type="date" id="matchDate" />
                </div>
                <div>
                  <Label htmlFor="matchTime">Match Time</Label>
                  <Input type="time" id="matchTime" />
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
                    <SelectItem value="indoor">Indoor Arena</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={() => {
                  const dateInput = document.getElementById("matchDate") as HTMLInputElement
                  const timeInput = document.getElementById("matchTime") as HTMLInputElement
                  const venueSelect = document.querySelector('[role="combobox"]') as HTMLElement

                  if (dateInput.value && timeInput.value) {
                    scheduleMatch(selectedMatch, dateInput.value, timeInput.value, "Main Campus Field")
                  }
                }}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Match
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
