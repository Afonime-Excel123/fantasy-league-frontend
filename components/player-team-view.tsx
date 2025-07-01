"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Trophy, Calendar, Target, Phone, Mail, MapPin, Clock } from "lucide-react"

// Mock data for team
const mockTeamData = {
  name: "Engineering Eagles",
  coach: {
    name: "Coach Thompson",
    email: "thompson@university.edu",
    phone: "+1 (555) 123-4567",
  },
  captain: "Sarah Williams",
  founded: "2020",
  homeGround: "Engineering Stadium",
  currentSeason: {
    position: 2,
    played: 12,
    won: 8,
    drawn: 2,
    lost: 2,
    goalsFor: 24,
    goalsAgainst: 12,
    points: 26,
  },
  roster: [
    {
      id: 1,
      name: "Alex Johnson",
      position: "Midfielder",
      jerseyNumber: 10,
      status: "Active",
      isCaptain: false,
      isCurrentUser: true,
    },
    {
      id: 2,
      name: "Sarah Williams",
      position: "Forward",
      jerseyNumber: 9,
      status: "Active",
      isCaptain: true,
      isCurrentUser: false,
    },
    {
      id: 3,
      name: "David Chen",
      position: "Goalkeeper",
      jerseyNumber: 1,
      status: "Injured",
      isCaptain: false,
      isCurrentUser: false,
    },
    {
      id: 4,
      name: "Maria Rodriguez",
      position: "Defender",
      jerseyNumber: 4,
      status: "Active",
      isCaptain: false,
      isCurrentUser: false,
    },
    {
      id: 5,
      name: "James Wilson",
      position: "Midfielder",
      jerseyNumber: 8,
      status: "Active",
      isCaptain: false,
      isCurrentUser: false,
    },
    {
      id: 6,
      name: "Emma Davis",
      position: "Defender",
      jerseyNumber: 3,
      status: "Active",
      isCaptain: false,
      isCurrentUser: false,
    },
  ],
  upcomingMatches: [
    {
      id: 1,
      opponent: "Business Bulldogs",
      date: "2024-01-20",
      time: "15:00",
      venue: "Main Stadium",
      type: "League",
    },
    {
      id: 2,
      opponent: "Science Sharks",
      date: "2024-01-25",
      time: "14:30",
      venue: "Training Ground",
      type: "Cup",
    },
  ],
  recentResults: [
    {
      id: 1,
      opponent: "Arts Lions",
      date: "2024-01-15",
      result: "W 3-1",
      venue: "Home",
    },
    {
      id: 2,
      opponent: "Law Eagles",
      date: "2024-01-10",
      result: "D 2-2",
      venue: "Away",
    },
    {
      id: 3,
      opponent: "Medical Mavericks",
      date: "2024-01-05",
      result: "W 2-0",
      venue: "Home",
    },
  ],
  teamStats: {
    averageAge: 21.5,
    totalPlayers: 22,
    activePlayers: 20,
    injuredPlayers: 2,
  },
}

export function PlayerTeamView() {
  const { name, coach, captain, currentSeason, roster, upcomingMatches, recentResults, teamStats } = mockTeamData

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

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Team Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{name}</h1>
          <p className="text-muted-foreground">Your team overview and information</p>
        </div>
        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
          League Position: #{currentSeason.position}
        </Badge>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Trophy className="h-4 w-4 text-yellow-600" />
              <div>
                <p className="text-sm font-medium">Points</p>
                <p className="text-2xl font-bold">{currentSeason.points}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm font-medium">Wins</p>
                <p className="text-2xl font-bold">{currentSeason.won}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Goals For</p>
                <p className="text-2xl font-bold">{currentSeason.goalsFor}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Active Players</p>
                <p className="text-2xl font-bold">{teamStats.activePlayers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Team Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Coach</p>
                  <p className="font-medium">{coach.name}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Trophy className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Captain</p>
                  <p className="font-medium">{captain}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Home Ground</p>
                  <p className="font-medium">{mockTeamData.homeGround}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Founded</p>
                  <p className="font-medium">{mockTeamData.founded}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-medium mb-2">Contact Coach</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Mail className="h-3 w-3" />
                  <span>{coach.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-3 w-3" />
                  <span>{coach.phone}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Matches */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Upcoming Matches</span>
            </CardTitle>
            <CardDescription>Next fixtures for the team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingMatches.map((match) => (
                <div key={match.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">vs {match.opponent}</p>
                    <p className="text-sm text-muted-foreground">
                      {match.venue} • {match.type}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{new Date(match.date).toLocaleDateString()}</p>
                    <p className="text-sm text-muted-foreground">{match.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Season Record */}
      <Card>
        <CardHeader>
          <CardTitle>Season Record</CardTitle>
          <CardDescription>Current season performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-2xl font-bold">{currentSeason.played}</p>
              <p className="text-sm text-muted-foreground">Played</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{currentSeason.won}</p>
              <p className="text-sm text-muted-foreground">Won</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-600">{currentSeason.drawn}</p>
              <p className="text-sm text-muted-foreground">Drawn</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <p className="text-2xl font-bold text-red-600">{currentSeason.lost}</p>
              <p className="text-sm text-muted-foreground">Lost</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{currentSeason.goalsFor}</p>
              <p className="text-sm text-muted-foreground">Goals For</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">{currentSeason.goalsAgainst}</p>
              <p className="text-sm text-muted-foreground">Goals Against</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Roster */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Team Roster</span>
          </CardTitle>
          <CardDescription>Current squad members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {roster.map((player) => (
              <div
                key={player.id}
                className={`p-4 rounded-lg border ${player.isCurrentUser ? "bg-primary/5 border-primary" : "bg-muted"}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary text-sm">
                      {player.jerseyNumber}
                    </div>
                    <div>
                      <p className="font-medium flex items-center space-x-1">
                        <span>{player.name}</span>
                        {player.isCaptain && <Trophy className="h-3 w-3 text-yellow-600" />}
                        {player.isCurrentUser && <span className="text-xs text-primary">(You)</span>}
                      </p>
                    </div>
                  </div>
                  <Badge className={getStatusBadgeColor(player.status)}>{player.status}</Badge>
                </div>
                <Badge className={getPositionBadgeColor(player.position)} variant="outline">
                  {player.position}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Recent Results</span>
          </CardTitle>
          <CardDescription>Latest match results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentResults.map((result) => (
              <div key={result.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">vs {result.opponent}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(result.date).toLocaleDateString()} • {result.venue}
                  </p>
                </div>
                <div className="text-right">
                  <Badge
                    className={
                      result.result.startsWith("W")
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : result.result.startsWith("D")
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                    }
                  >
                    {result.result}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
