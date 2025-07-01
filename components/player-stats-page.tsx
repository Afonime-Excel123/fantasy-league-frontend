"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { TrendingUp, Target, Users, Award, Calendar, Activity, Zap } from "lucide-react"

// Mock data for player statistics
const mockPlayerStats = {
  overview: {
    matchesPlayed: 12,
    goals: 5,
    assists: 8,
    yellowCards: 2,
    redCards: 0,
    minutesPlayed: 1080,
    averageRating: 8.5,
    passAccuracy: 87,
    shotsOnTarget: 65,
    tacklesWon: 78,
  },
  monthlyPerformance: [
    { month: "Sep", goals: 1, assists: 2, rating: 7.8 },
    { month: "Oct", goals: 2, assists: 3, rating: 8.2 },
    { month: "Nov", goals: 1, assists: 2, rating: 8.1 },
    { month: "Dec", goals: 1, assists: 1, rating: 8.8 },
    { month: "Jan", goals: 0, assists: 0, rating: 8.5 },
  ],
  matchRatings: [
    { match: "vs Arts Lions", rating: 8.5, goals: 1, assists: 2 },
    { match: "vs Law Eagles", rating: 7.8, goals: 0, assists: 1 },
    { match: "vs Medical Mavericks", rating: 9.1, goals: 2, assists: 1 },
    { match: "vs Business Bulldogs", rating: 8.2, goals: 0, assists: 2 },
    { match: "vs Science Sharks", rating: 7.9, goals: 1, assists: 0 },
  ],
  positionStats: [
    { name: "Attacking", value: 75, color: "#ef4444" },
    { name: "Passing", value: 87, color: "#3b82f6" },
    { name: "Defending", value: 65, color: "#10b981" },
    { name: "Physical", value: 82, color: "#f59e0b" },
  ],
  comparisonData: {
    teamAverage: {
      goals: 3.2,
      assists: 4.1,
      rating: 7.8,
      passAccuracy: 82,
    },
    leagueAverage: {
      goals: 2.8,
      assists: 3.5,
      rating: 7.5,
      passAccuracy: 79,
    },
  },
}

export function PlayerStatsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("season")
  const { overview, monthlyPerformance, matchRatings, positionStats, comparisonData } = mockPlayerStats

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Player Statistics</h1>
          <p className="text-muted-foreground">Detailed performance analytics and insights</p>
        </div>
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="season">Full Season</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="recent">Last 5 Games</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Matches Played</p>
                <p className="text-2xl font-bold">{overview.matchesPlayed}</p>
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
                <p className="text-2xl font-bold">{overview.goals}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm font-medium">Assists</p>
                <p className="text-2xl font-bold">{overview.assists}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Award className="h-4 w-4 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Avg Rating</p>
                <p className="text-2xl font-bold">{overview.averageRating}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Performance Trends</span>
            </CardTitle>
            <CardDescription>Monthly goals, assists, and ratings</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="goals" stroke="#ef4444" strokeWidth={2} />
                <Line type="monotone" dataKey="assists" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="rating" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Position Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5" />
              <span>Position Analysis</span>
            </CardTitle>
            <CardDescription>Strengths across different areas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {positionStats.map((stat) => (
                <div key={stat.name} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{stat.name}</span>
                    <span className="text-sm text-muted-foreground">{stat.value}%</span>
                  </div>
                  <Progress value={stat.value} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Technical Stats</CardTitle>
            <CardDescription>Passing and shooting accuracy</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Pass Accuracy</span>
              <div className="flex items-center space-x-2">
                <Progress value={overview.passAccuracy} className="w-20 h-2" />
                <span className="text-sm font-medium">{overview.passAccuracy}%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Shots on Target</span>
              <div className="flex items-center space-x-2">
                <Progress value={overview.shotsOnTarget} className="w-20 h-2" />
                <span className="text-sm font-medium">{overview.shotsOnTarget}%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Tackles Won</span>
              <div className="flex items-center space-x-2">
                <Progress value={overview.tacklesWon} className="w-20 h-2" />
                <span className="text-sm font-medium">{overview.tacklesWon}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Disciplinary Record</CardTitle>
            <CardDescription>Cards and conduct</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Yellow Cards</span>
              <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                {overview.yellowCards}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Red Cards</span>
              <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">{overview.redCards}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Minutes Played</span>
              <span className="font-medium">{overview.minutesPlayed}'</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Comparison</CardTitle>
            <CardDescription>vs team and league averages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Goals (You vs Team vs League)</span>
              </div>
              <div className="flex space-x-2 text-xs">
                <span className="font-medium">{overview.goals}</span>
                <span className="text-muted-foreground">{comparisonData.teamAverage.goals}</span>
                <span className="text-muted-foreground">{comparisonData.leagueAverage.goals}</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Assists (You vs Team vs League)</span>
              </div>
              <div className="flex space-x-2 text-xs">
                <span className="font-medium">{overview.assists}</span>
                <span className="text-muted-foreground">{comparisonData.teamAverage.assists}</span>
                <span className="text-muted-foreground">{comparisonData.leagueAverage.assists}</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Rating (You vs Team vs League)</span>
              </div>
              <div className="flex space-x-2 text-xs">
                <span className="font-medium">{overview.averageRating}</span>
                <span className="text-muted-foreground">{comparisonData.teamAverage.rating}</span>
                <span className="text-muted-foreground">{comparisonData.leagueAverage.rating}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Match Ratings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Recent Match Ratings</span>
          </CardTitle>
          <CardDescription>Performance in last 5 matches</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={matchRatings}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="match" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Bar dataKey="rating" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Match Details */}
      <Card>
        <CardHeader>
          <CardTitle>Match-by-Match Breakdown</CardTitle>
          <CardDescription>Detailed performance in recent matches</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {matchRatings.map((match, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">{match.match}</p>
                  <div className="flex space-x-4 text-sm text-muted-foreground">
                    <span>Goals: {match.goals}</span>
                    <span>Assists: {match.assists}</span>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    className={
                      match.rating >= 8.5
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : match.rating >= 7.5
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                    }
                  >
                    {match.rating}
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
