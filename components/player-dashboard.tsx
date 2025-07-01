"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Trophy, Target, TrendingUp, Users, Clock, Star, Award } from "lucide-react"

// Mock data for player
const mockPlayerData = {
  name: "Alex Johnson",
  position: "Midfielder",
  jerseyNumber: 10,
  team: "Engineering Eagles",
  coach: "Coach Thompson",
  status: "Active",
  seasonStats: {
    matchesPlayed: 12,
    goals: 5,
    assists: 8,
    yellowCards: 2,
    redCards: 0,
    averageRating: 8.5,
    minutesPlayed: 1080,
  },
  upcomingMatches: [
    {
      id: 1,
      opponent: "Business Bulldogs",
      date: "2024-01-20",
      time: "15:00",
      venue: "Main Stadium",
    },
    {
      id: 2,
      opponent: "Science Sharks",
      date: "2024-01-25",
      time: "14:30",
      venue: "Training Ground",
    },
  ],
  recentMatches: [
    {
      id: 1,
      opponent: "Arts Lions",
      date: "2024-01-15",
      result: "W 3-1",
      rating: 8.5,
      goals: 1,
      assists: 2,
    },
    {
      id: 2,
      opponent: "Law Eagles",
      date: "2024-01-10",
      result: "D 2-2",
      rating: 7.8,
      goals: 0,
      assists: 1,
    },
  ],
  achievements: [
    { title: "Player of the Month", date: "January 2024" },
    { title: "5 Goals Milestone", date: "January 2024" },
    { title: "Team Captain", date: "Season 2024" },
  ],
  teamRanking: 2,
  personalGoals: {
    goalsTarget: 10,
    currentGoals: 5,
    assistsTarget: 15,
    currentAssists: 8,
  },
}

export function PlayerDashboard() {
  const { seasonStats, upcomingMatches, recentMatches, achievements, personalGoals } = mockPlayerData

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {mockPlayerData.name}!</h1>
          <p className="text-muted-foreground">
            {mockPlayerData.position} • #{mockPlayerData.jerseyNumber} • {mockPlayerData.team}
          </p>
        </div>
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
          {mockPlayerData.status}
        </Badge>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Trophy className="h-4 w-4 text-yellow-600" />
              <div>
                <p className="text-sm font-medium">Matches Played</p>
                <p className="text-2xl font-bold">{seasonStats.matchesPlayed}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4 text-red-600" />
              <div>
                <p className="text-sm font-medium">Goals</p>
                <p className="text-2xl font-bold">{seasonStats.goals}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Assists</p>
                <p className="text-2xl font-bold">{seasonStats.assists}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Avg Rating</p>
                <p className="text-2xl font-bold">{seasonStats.averageRating}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Goals Progress */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Season Goals</span>
            </CardTitle>
            <CardDescription>Track your personal targets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Goals</span>
                <span>
                  {personalGoals.currentGoals}/{personalGoals.goalsTarget}
                </span>
              </div>
              <Progress value={(personalGoals.currentGoals / personalGoals.goalsTarget) * 100} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Assists</span>
                <span>
                  {personalGoals.currentAssists}/{personalGoals.assistsTarget}
                </span>
              </div>
              <Progress value={(personalGoals.currentAssists / personalGoals.assistsTarget) * 100} />
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
            <CardDescription>Your next fixtures</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingMatches.map((match) => (
                <div key={match.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">vs {match.opponent}</p>
                    <p className="text-sm text-muted-foreground">{match.venue}</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Matches */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Recent Matches</span>
            </CardTitle>
            <CardDescription>Your latest performances</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentMatches.map((match) => (
                <div key={match.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">vs {match.opponent}</p>
                    <p className="text-sm text-muted-foreground">{new Date(match.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{match.result}</p>
                    <div className="flex space-x-2 text-sm text-muted-foreground">
                      <span>Rating: {match.rating}</span>
                      <span>G: {match.goals}</span>
                      <span>A: {match.assists}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5" />
              <span>Recent Achievements</span>
            </CardTitle>
            <CardDescription>Your latest accomplishments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Trophy className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium">{achievement.title}</p>
                    <p className="text-sm text-muted-foreground">{achievement.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Status */}
      <Card>
        <CardHeader>
          <CardTitle>Team Status</CardTitle>
          <CardDescription>Current team information and ranking</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Team</p>
              <p className="text-lg font-semibold">{mockPlayerData.team}</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Coach</p>
              <p className="text-lg font-semibold">{mockPlayerData.coach}</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">League Position</p>
              <p className="text-lg font-semibold">#{mockPlayerData.teamRanking}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
