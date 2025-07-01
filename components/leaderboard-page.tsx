"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ModeToggle } from "@/components/mode-toggle"
import {
  Trophy,
  Medal,
  Award,
  TrendingUp,
  TrendingDown,
  Minus,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Users,
  Calendar,
  Target,
  ArrowLeft,
  Crown,
  Star,
} from "lucide-react"
import Link from "next/link"

// Mock leaderboard data
const mockLeaderboardData = [
  {
    id: 1,
    rank: 1,
    username: "sarah_j",
    teamName: "Campus Crushers",
    department: "Computer Science",
    weeklyPoints: 89,
    overallPoints: 1456,
    previousRank: 2,
    gamesPlayed: 8,
    avgPoints: 182.0,
    isCurrentUser: false,
  },
  {
    id: 2,
    rank: 2,
    username: "alex_m",
    teamName: "Dorm Room Dynasty",
    department: "Business",
    weeklyPoints: 76,
    overallPoints: 1398,
    previousRank: 1,
    gamesPlayed: 8,
    avgPoints: 174.8,
    isCurrentUser: false,
  },
  {
    id: 3,
    rank: 3,
    username: "you",
    teamName: "Thunder Hawks",
    department: "Engineering",
    weeklyPoints: 127,
    overallPoints: 1284,
    previousRank: 4,
    gamesPlayed: 8,
    avgPoints: 160.5,
    isCurrentUser: true,
  },
  {
    id: 4,
    rank: 4,
    username: "emma_k",
    teamName: "Study Hall Stars",
    department: "Psychology",
    weeklyPoints: 82,
    overallPoints: 1268,
    previousRank: 3,
    gamesPlayed: 8,
    avgPoints: 158.5,
    isCurrentUser: false,
  },
  {
    id: 5,
    rank: 5,
    username: "jake_r",
    teamName: "Library Lions",
    department: "Biology",
    weeklyPoints: 94,
    overallPoints: 1245,
    previousRank: 6,
    gamesPlayed: 8,
    avgPoints: 155.6,
    isCurrentUser: false,
  },
  {
    id: 6,
    rank: 6,
    username: "mike_t",
    teamName: "Engineering Eagles",
    department: "Engineering",
    weeklyPoints: 68,
    overallPoints: 1223,
    previousRank: 5,
    gamesPlayed: 8,
    avgPoints: 152.9,
    isCurrentUser: false,
  },
  {
    id: 7,
    rank: 7,
    username: "lisa_w",
    teamName: "Art Attack",
    department: "Art & Design",
    weeklyPoints: 91,
    overallPoints: 1198,
    previousRank: 8,
    gamesPlayed: 8,
    avgPoints: 149.8,
    isCurrentUser: false,
  },
  {
    id: 8,
    rank: 8,
    username: "david_p",
    teamName: "Physics Force",
    department: "Physics",
    weeklyPoints: 73,
    overallPoints: 1187,
    previousRank: 7,
    gamesPlayed: 8,
    avgPoints: 148.4,
    isCurrentUser: false,
  },
  {
    id: 9,
    rank: 9,
    username: "rachel_s",
    teamName: "Math Mavericks",
    department: "Mathematics",
    weeklyPoints: 85,
    overallPoints: 1156,
    previousRank: 10,
    gamesPlayed: 8,
    avgPoints: 144.5,
    isCurrentUser: false,
  },
  {
    id: 10,
    rank: 10,
    username: "tom_h",
    teamName: "History Heroes",
    department: "History",
    weeklyPoints: 79,
    overallPoints: 1134,
    previousRank: 9,
    gamesPlayed: 8,
    avgPoints: 141.8,
    isCurrentUser: false,
  },
]

type SortField = "rank" | "username" | "teamName" | "weeklyPoints" | "overallPoints" | "department"
type SortDirection = "asc" | "desc"

interface LeaderboardEntry {
  id: number
  rank: number
  username: string
  teamName: string
  department: string
  weeklyPoints: number
  overallPoints: number
  previousRank: number
  gamesPlayed: number
  avgPoints: number
  isCurrentUser: boolean
}

export function LeaderboardPage() {
  const [viewMode, setViewMode] = useState<"weekly" | "overall">("overall")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState<SortField>("rank")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

  const filteredAndSortedData = useMemo(() => {
    let filtered = mockLeaderboardData.filter(
      (entry) =>
        entry.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.department.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    // Sort data
    filtered.sort((a, b) => {
      let aValue: string | number
      let bValue: string | number

      switch (sortField) {
        case "rank":
          aValue = viewMode === "weekly" ? a.weeklyPoints : a.rank
          bValue = viewMode === "weekly" ? b.weeklyPoints : b.rank
          break
        case "username":
          aValue = a.username
          bValue = b.username
          break
        case "teamName":
          aValue = a.teamName
          bValue = b.teamName
          break
        case "department":
          aValue = a.department
          bValue = b.department
          break
        case "weeklyPoints":
          aValue = a.weeklyPoints
          bValue = b.weeklyPoints
          break
        case "overallPoints":
          aValue = a.overallPoints
          bValue = b.overallPoints
          break
        default:
          aValue = a.rank
          bValue = b.rank
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      return sortDirection === "asc" ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number)
    })

    // Re-rank for weekly view
    if (viewMode === "weekly") {
      filtered = filtered.map((entry, index) => ({
        ...entry,
        rank: index + 1,
      }))
    }

    return filtered
  }, [searchQuery, sortField, sortDirection, viewMode])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection(field === "rank" ? "asc" : "desc")
    }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-orange-500" />
      default:
        return <span className="font-bold text-gray-600 dark:text-gray-400">#{rank}</span>
    }
  }

  const getRankMovement = (currentRank: number, previousRank: number) => {
    if (currentRank < previousRank) {
      return <TrendingUp className="h-4 w-4 text-green-500" />
    } else if (currentRank > previousRank) {
      return <TrendingDown className="h-4 w-4 text-red-500" />
    }
    return <Minus className="h-4 w-4 text-gray-400" />
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4 text-gray-400" />
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="h-4 w-4 text-green-600" />
    ) : (
      <ArrowDown className="h-4 w-4 text-green-600" />
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
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">Campus Leaderboard</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Fantasy Football Rankings</p>
                </div>
              </div>
            </div>
            <ModeToggle />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Players</CardTitle>
              <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockLeaderboardData.length}</div>
              <p className="text-xs text-muted-foreground">Active in league</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Your Rank</CardTitle>
              <Target className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                #{mockLeaderboardData.find((entry) => entry.isCurrentUser)?.rank}
              </div>
              <p className="text-xs text-muted-foreground">Out of {mockLeaderboardData.length} players</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Week 8</CardTitle>
              <Calendar className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockLeaderboardData.find((entry) => entry.isCurrentUser)?.weeklyPoints}
              </div>
              <p className="text-xs text-muted-foreground">Your weekly points</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Leaderboard */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span>Fantasy Football Leaderboard</span>
                </CardTitle>
                <CardDescription>Top 10 players in your campus league</CardDescription>
              </div>

              <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-y-0 md:space-x-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search players..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full md:w-64 bg-white dark:bg-gray-700"
                  />
                </div>

                {/* View Toggle */}
                <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "weekly" | "overall")}>
                  <TabsList className="grid w-full grid-cols-2 md:w-auto">
                    <TabsTrigger value="overall" className="flex items-center space-x-1">
                      <Trophy className="h-4 w-4" />
                      <span>Overall</span>
                    </TabsTrigger>
                    <TabsTrigger value="weekly" className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>This Week</span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Rank</TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("username")}
                        className="h-auto p-0 font-semibold hover:bg-transparent"
                      >
                        Player
                        {getSortIcon("username")}
                      </Button>
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("teamName")}
                        className="h-auto p-0 font-semibold hover:bg-transparent"
                      >
                        Team Name
                        {getSortIcon("teamName")}
                      </Button>
                    </TableHead>
                    <TableHead className="hidden lg:table-cell">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort("department")}
                        className="h-auto p-0 font-semibold hover:bg-transparent"
                      >
                        Department
                        {getSortIcon("department")}
                      </Button>
                    </TableHead>
                    <TableHead className="text-right">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort(viewMode === "weekly" ? "weeklyPoints" : "overallPoints")}
                        className="h-auto p-0 font-semibold hover:bg-transparent"
                      >
                        {viewMode === "weekly" ? "Week Points" : "Total Points"}
                        {getSortIcon(viewMode === "weekly" ? "weeklyPoints" : "overallPoints")}
                      </Button>
                    </TableHead>
                    <TableHead className="w-16 text-center">Move</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedData.map((entry) => (
                    <TableRow
                      key={entry.id}
                      className={`${
                        entry.isCurrentUser
                          ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                          : ""
                      } hover:bg-gray-50 dark:hover:bg-gray-800/50`}
                    >
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getRankIcon(entry.rank)}
                          {entry.isCurrentUser && <Star className="h-4 w-4 text-green-600" />}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{entry.isCurrentUser ? "You" : `@${entry.username}`}</span>
                            {entry.isCurrentUser && (
                              <Badge variant="secondary" className="text-xs">
                                You
                              </Badge>
                            )}
                          </div>
                          <div className="md:hidden">
                            <p className="text-sm text-gray-600 dark:text-gray-400">{entry.teamName}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-500">{entry.department}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <span className="font-medium">{entry.teamName}</span>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <Badge variant="outline" className="text-xs">
                          {entry.department}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex flex-col items-end">
                          <span className="font-bold text-lg">
                            {viewMode === "weekly" ? entry.weeklyPoints : entry.overallPoints.toLocaleString()}
                          </span>
                          {viewMode === "overall" && (
                            <span className="text-xs text-gray-500 dark:text-gray-500">
                              Avg: {entry.avgPoints.toFixed(1)}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center">{getRankMovement(entry.rank, entry.previousRank)}</div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredAndSortedData.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-sm">No players found matching "{searchQuery}"</p>
                <p className="text-xs">Try adjusting your search terms</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Legend */}
        <Card className="mt-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-sm">Legend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Trophy className="h-4 w-4 text-yellow-500" />
                <span>1st Place</span>
              </div>
              <div className="flex items-center space-x-2">
                <Medal className="h-4 w-4 text-gray-400" />
                <span>2nd Place</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-orange-500" />
                <span>3rd Place</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-green-600" />
                <span>Your Position</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span>Rank Up</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingDown className="h-4 w-4 text-red-500" />
                <span>Rank Down</span>
              </div>
              <div className="flex items-center space-x-2">
                <Minus className="h-4 w-4 text-gray-400" />
                <span>No Change</span>
              </div>
              <div className="flex items-center space-x-2">
                <Crown className="h-4 w-4 text-green-600" />
                <span>League Leader</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
