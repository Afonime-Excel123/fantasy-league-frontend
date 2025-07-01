"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ModeToggle } from "@/components/mode-toggle"
import {
  Trophy,
  Medal,
  ArrowLeft,
  Users,
  Target,
  TrendingUp,
  Crown,
  Star,
  CheckCircle,
  AlertCircle,
  Minus,
} from "lucide-react"
import Link from "next/link"

// Mock group standings data
const mockGroupStandings = {
  "Group A": [
    {
      id: 1,
      position: 1,
      teamName: "Engineering Eagles",
      department: "Engineering",
      matchesPlayed: 6,
      wins: 5,
      draws: 1,
      losses: 0,
      goalsFor: 15,
      goalsAgainst: 3,
      goalDifference: 12,
      points: 16,
      form: ["W", "W", "D", "W", "W"],
      qualified: true,
    },
    {
      id: 2,
      position: 2,
      teamName: "Computer Science Crushers",
      department: "Computer Science",
      matchesPlayed: 6,
      wins: 4,
      draws: 1,
      losses: 1,
      goalsFor: 12,
      goalsAgainst: 6,
      goalDifference: 6,
      points: 13,
      form: ["W", "L", "W", "W", "D"],
      qualified: true,
    },
    {
      id: 3,
      position: 3,
      teamName: "Business Bulldogs",
      department: "Business",
      matchesPlayed: 6,
      wins: 2,
      draws: 2,
      losses: 2,
      goalsFor: 8,
      goalsAgainst: 8,
      goalDifference: 0,
      points: 8,
      form: ["D", "W", "L", "D", "W"],
      qualified: false,
    },
    {
      id: 4,
      position: 4,
      teamName: "Art Attack",
      department: "Art & Design",
      matchesPlayed: 6,
      wins: 0,
      draws: 0,
      losses: 6,
      goalsFor: 2,
      goalsAgainst: 20,
      goalDifference: -18,
      points: 0,
      form: ["L", "L", "L", "L", "L"],
      qualified: false,
    },
  ],
  "Group B": [
    {
      id: 5,
      position: 1,
      teamName: "Psychology Panthers",
      department: "Psychology",
      matchesPlayed: 6,
      wins: 4,
      draws: 2,
      losses: 0,
      goalsFor: 14,
      goalsAgainst: 4,
      goalDifference: 10,
      points: 14,
      form: ["W", "D", "W", "W", "D"],
      qualified: true,
    },
    {
      id: 6,
      position: 2,
      teamName: "Biology Beasts",
      department: "Biology",
      matchesPlayed: 6,
      wins: 3,
      draws: 2,
      losses: 1,
      goalsFor: 10,
      goalsAgainst: 7,
      goalDifference: 3,
      points: 11,
      form: ["W", "D", "L", "W", "W"],
      qualified: true,
    },
    {
      id: 7,
      position: 3,
      teamName: "Physics Force",
      department: "Physics",
      matchesPlayed: 6,
      wins: 2,
      draws: 1,
      losses: 3,
      goalsFor: 9,
      goalsAgainst: 11,
      goalDifference: -2,
      points: 7,
      form: ["L", "W", "D", "L", "W"],
      qualified: false,
    },
    {
      id: 8,
      position: 4,
      teamName: "Math Mavericks",
      department: "Mathematics",
      matchesPlayed: 6,
      wins: 1,
      draws: 1,
      losses: 4,
      goalsFor: 5,
      goalsAgainst: 16,
      goalDifference: -11,
      points: 4,
      form: ["L", "L", "W", "L", "D"],
      qualified: false,
    },
  ],
  "Group C": [
    {
      id: 9,
      position: 1,
      teamName: "History Heroes",
      department: "History",
      matchesPlayed: 6,
      wins: 5,
      draws: 0,
      losses: 1,
      goalsFor: 16,
      goalsAgainst: 5,
      goalDifference: 11,
      points: 15,
      form: ["W", "W", "L", "W", "W"],
      qualified: true,
    },
    {
      id: 10,
      position: 2,
      teamName: "Chemistry Champions",
      department: "Chemistry",
      matchesPlayed: 6,
      wins: 3,
      draws: 3,
      losses: 0,
      goalsFor: 11,
      goalsAgainst: 6,
      goalDifference: 5,
      points: 12,
      form: ["D", "W", "D", "W", "D"],
      qualified: true,
    },
    {
      id: 11,
      position: 3,
      teamName: "Literature Lions",
      department: "Literature",
      matchesPlayed: 6,
      wins: 2,
      draws: 0,
      losses: 4,
      goalsFor: 7,
      goalsAgainst: 12,
      goalDifference: -5,
      points: 6,
      form: ["L", "W", "L", "L", "W"],
      qualified: false,
    },
    {
      id: 12,
      position: 4,
      teamName: "Geography Giants",
      department: "Geography",
      matchesPlayed: 6,
      wins: 1,
      draws: 1,
      losses: 4,
      goalsFor: 4,
      goalsAgainst: 15,
      goalDifference: -11,
      points: 4,
      form: ["L", "D", "L", "L", "W"],
      qualified: false,
    },
  ],
}

interface TeamStanding {
  id: number
  position: number
  teamName: string
  department: string
  matchesPlayed: number
  wins: number
  draws: number
  losses: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
  points: number
  form: string[]
  qualified: boolean
}

export function GroupStandingsPage() {
  const [selectedGroup, setSelectedGroup] = useState<string>("all")

  const groups = Object.keys(mockGroupStandings)
  const allTeams = Object.values(mockGroupStandings).flat()

  const getPositionIcon = (position: number, qualified: boolean) => {
    if (qualified) {
      if (position === 1) {
        return <Crown className="h-4 w-4 text-yellow-500" />
      } else if (position === 2) {
        return <Medal className="h-4 w-4 text-gray-400" />
      }
    }
    return <span className="font-bold text-gray-600 dark:text-gray-400">{position}</span>
  }

  const getFormIcon = (result: string) => {
    switch (result) {
      case "W":
        return (
          <div className="w-6 h-6 bg-green-500 text-white text-xs font-bold rounded flex items-center justify-center">
            W
          </div>
        )
      case "D":
        return (
          <div className="w-6 h-6 bg-yellow-500 text-white text-xs font-bold rounded flex items-center justify-center">
            D
          </div>
        )
      case "L":
        return (
          <div className="w-6 h-6 bg-red-500 text-white text-xs font-bold rounded flex items-center justify-center">
            L
          </div>
        )
      default:
        return (
          <div className="w-6 h-6 bg-gray-400 text-white text-xs font-bold rounded flex items-center justify-center">
            -
          </div>
        )
    }
  }

  const getQualificationBadge = (qualified: boolean, position: number) => {
    if (qualified) {
      return (
        <Badge variant="default" className="bg-green-600 hover:bg-green-700 text-white">
          <CheckCircle className="h-3 w-3 mr-1" />
          Qualified
        </Badge>
      )
    } else if (position === 3) {
      return (
        <Badge variant="outline" className="text-orange-600 border-orange-600">
          <AlertCircle className="h-3 w-3 mr-1" />
          Playoff
        </Badge>
      )
    }
    return (
      <Badge variant="secondary" className="text-gray-600">
        <Minus className="h-3 w-3 mr-1" />
        Eliminated
      </Badge>
    )
  }

  const renderGroupTable = (groupName: string, teams: TeamStanding[]) => (
    <Card key={groupName} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-green-600 dark:bg-green-500 p-2 rounded-lg">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="flex items-center space-x-2">
                <span>{groupName}</span>
                <Badge variant="outline" className="text-sm">
                  {teams.length} Teams
                </Badge>
              </CardTitle>
              <CardDescription>Top 2 teams qualify for knockout stage</CardDescription>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Qualified</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span>Playoff</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <span>Eliminated</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 dark:bg-gray-800">
                <TableHead className="w-12 text-center">Pos</TableHead>
                <TableHead>Team</TableHead>
                <TableHead className="text-center w-12">MP</TableHead>
                <TableHead className="text-center w-12">W</TableHead>
                <TableHead className="text-center w-12">D</TableHead>
                <TableHead className="text-center w-12">L</TableHead>
                <TableHead className="text-center w-16">GF</TableHead>
                <TableHead className="text-center w-16">GA</TableHead>
                <TableHead className="text-center w-16">GD</TableHead>
                <TableHead className="text-center w-16 font-bold">Pts</TableHead>
                <TableHead className="text-center w-32">Form</TableHead>
                <TableHead className="text-center w-24">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teams.map((team) => (
                <TableRow
                  key={team.id}
                  className={`
                    ${
                      team.qualified
                        ? "bg-green-50 dark:bg-green-900/20 border-l-4 border-l-green-500"
                        : team.position === 3
                          ? "bg-orange-50 dark:bg-orange-900/20 border-l-4 border-l-orange-500"
                          : ""
                    } 
                    hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors
                  `}
                >
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center space-x-1">
                      {getPositionIcon(team.position, team.qualified)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <div className="font-medium">{team.teamName}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{team.department}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center font-medium">{team.matchesPlayed}</TableCell>
                  <TableCell className="text-center font-medium text-green-600">{team.wins}</TableCell>
                  <TableCell className="text-center font-medium text-yellow-600">{team.draws}</TableCell>
                  <TableCell className="text-center font-medium text-red-600">{team.losses}</TableCell>
                  <TableCell className="text-center font-medium">{team.goalsFor}</TableCell>
                  <TableCell className="text-center font-medium">{team.goalsAgainst}</TableCell>
                  <TableCell
                    className={`text-center font-medium ${
                      team.goalDifference > 0
                        ? "text-green-600"
                        : team.goalDifference < 0
                          ? "text-red-600"
                          : "text-gray-600"
                    }`}
                  >
                    {team.goalDifference > 0 ? "+" : ""}
                    {team.goalDifference}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="font-bold text-lg text-green-600 dark:text-green-400">{team.points}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center space-x-1">
                      {team.form.slice(-5).map((result, index) => (
                        <div key={index}>{getFormIcon(result)}</div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{getQualificationBadge(team.qualified, team.position)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )

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
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">Group Standings</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Campus League Group Stage</p>
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
              <CardTitle className="text-sm font-medium">Total Teams</CardTitle>
              <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{allTeams.length}</div>
              <p className="text-xs text-muted-foreground">Across {groups.length} groups</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Qualified</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {allTeams.filter((team) => team.qualified).length}
              </div>
              <p className="text-xs text-muted-foreground">Teams to knockout stage</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Matches Played</CardTitle>
              <Target className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {allTeams.reduce((sum, team) => sum + team.matchesPlayed, 0) / 2}
              </div>
              <p className="text-xs text-muted-foreground">Total fixtures completed</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Goals Scored</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{allTeams.reduce((sum, team) => sum + team.goalsFor, 0)}</div>
              <p className="text-xs text-muted-foreground">Total goals in groups</p>
            </CardContent>
          </Card>
        </div>

        {/* Group Tables */}
        <Tabs value={selectedGroup} onValueChange={setSelectedGroup} className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="grid grid-cols-4 w-full max-w-md">
              <TabsTrigger value="all">All Groups</TabsTrigger>
              {groups.map((group) => (
                <TabsTrigger key={group} value={group}>
                  {group.replace("Group ", "")}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="all" className="space-y-6">
            {groups.map((groupName) =>
              renderGroupTable(groupName, mockGroupStandings[groupName as keyof typeof mockGroupStandings]),
            )}
          </TabsContent>

          {groups.map((groupName) => (
            <TabsContent key={groupName} value={groupName}>
              {renderGroupTable(groupName, mockGroupStandings[groupName as keyof typeof mockGroupStandings])}
            </TabsContent>
          ))}
        </Tabs>

        {/* Qualification Rules */}
        <Card className="mt-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-green-600 dark:text-green-400" />
              <span>Qualification Rules</span>
            </CardTitle>
            <CardDescription>How teams advance to the knockout stage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start space-x-3">
                <div className="bg-green-500 p-2 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-green-600 dark:text-green-400">Automatic Qualification</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Top 2 teams from each group advance directly to the Round of 16
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-orange-500 p-2 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-orange-600 dark:text-orange-400">Playoff Position</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    3rd place teams compete in playoff matches for remaining spots
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-gray-500 p-2 rounded-lg">
                  <Minus className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-600 dark:text-gray-400">Eliminated</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    4th place teams are eliminated from the tournament
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h4 className="font-medium mb-3">Tiebreaker Rules (in order):</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>Points (3 for win, 1 for draw, 0 for loss)</li>
                <li>Goal difference</li>
                <li>Goals scored</li>
                <li>Head-to-head record</li>
                <li>Fair play points</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
