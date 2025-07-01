"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Crown, Shield, Target, Zap, Star, Users, Calendar, AlertTriangle } from "lucide-react"
import Link from "next/link"

interface Player {
  id: string
  name: string
  position: "GK" | "DEF" | "MID" | "FWD"
  points: number
  price: number
  team: string
  image?: string
  isCaptain?: boolean
}

interface Formation {
  name: string
  positions: {
    GK: number
    DEF: number
    MID: number
    FWD: number
  }
}

const formations: Formation[] = [
  { name: "4-4-2", positions: { GK: 1, DEF: 4, MID: 4, FWD: 2 } },
  { name: "4-3-3", positions: { GK: 1, DEF: 4, MID: 3, FWD: 3 } },
  { name: "3-5-2", positions: { GK: 1, DEF: 3, MID: 5, FWD: 2 } },
  { name: "4-5-1", positions: { GK: 1, DEF: 4, MID: 5, FWD: 1 } },
  { name: "3-4-3", positions: { GK: 1, DEF: 3, MID: 4, FWD: 3 } },
  { name: "5-3-2", positions: { GK: 1, DEF: 5, MID: 3, FWD: 2 } },
  { name: "5-4-1", positions: { GK: 1, DEF: 5, MID: 4, FWD: 1 } },
]

// Mock team data
const mockTeam = {
  name: "Thunder Bolts",
  formation: "4-3-3",
  players: [
    {
      id: "1",
      name: "Alisson Becker",
      position: "GK" as const,
      points: 145,
      price: 5.5,
      team: "Liverpool",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      name: "Virgil van Dijk",
      position: "DEF" as const,
      points: 178,
      price: 6.5,
      team: "Liverpool",
      image: "/placeholder.svg?height=40&width=40",
      isCaptain: true,
    },
    {
      id: "3",
      name: "Trent Alexander-Arnold",
      position: "DEF" as const,
      points: 156,
      price: 7.0,
      team: "Liverpool",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "4",
      name: "Andrew Robertson",
      position: "DEF" as const,
      points: 134,
      price: 6.0,
      team: "Liverpool",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "5",
      name: "Joël Matip",
      position: "DEF" as const,
      points: 112,
      price: 5.0,
      team: "Liverpool",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "6",
      name: "Kevin De Bruyne",
      position: "MID" as const,
      points: 221,
      price: 12.0,
      team: "Man City",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "7",
      name: "Bruno Fernandes",
      position: "MID" as const,
      points: 189,
      price: 8.5,
      team: "Man United",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "8",
      name: "Sadio Mané",
      position: "MID" as const,
      points: 167,
      price: 7.5,
      team: "Bayern Munich",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "9",
      name: "Erling Haaland",
      position: "FWD" as const,
      points: 272,
      price: 14.0,
      team: "Man City",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "10",
      name: "Mohamed Salah",
      position: "FWD" as const,
      points: 211,
      price: 13.0,
      team: "Liverpool",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "11",
      name: "Harry Kane",
      position: "FWD" as const,
      points: 198,
      price: 11.0,
      team: "Bayern Munich",
      image: "/placeholder.svg?height=40&width=40",
    },
  ],
  bench: [
    {
      id: "12",
      name: "Jordan Pickford",
      position: "GK" as const,
      points: 98,
      price: 4.5,
      team: "Everton",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "13",
      name: "Luke Shaw",
      position: "DEF" as const,
      points: 87,
      price: 5.5,
      team: "Man United",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "14",
      name: "Mason Mount",
      position: "MID" as const,
      points: 134,
      price: 6.5,
      team: "Chelsea",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "15",
      name: "Ivan Toney",
      position: "FWD" as const,
      points: 156,
      price: 7.0,
      team: "Brentford",
      image: "/placeholder.svg?height=40&width=40",
    },
  ],
}

export function EditTeamPageComponent() {
  const [team, setTeam] = useState(mockTeam)
  const [selectedFormation, setSelectedFormation] = useState<Formation>(
    formations.find((f) => f.name === mockTeam.formation) || formations[0],
  )
  const [isEditingAllowed, setIsEditingAllowed] = useState(true) // Mock: would be based on current day/time
  const [captain, setCaptain] = useState(team.players.find((p) => p.isCaptain)?.id || "")

  const getPositionIcon = (position: string) => {
    switch (position) {
      case "GK":
        return <Shield className="h-4 w-4" />
      case "DEF":
        return <Target className="h-4 w-4" />
      case "MID":
        return <Zap className="h-4 w-4" />
      case "FWD":
        return <Star className="h-4 w-4" />
      default:
        return null
    }
  }

  const getPositionPlayers = (position: "GK" | "DEF" | "MID" | "FWD") => {
    return team.players.filter((p) => p.position === position)
  }

  const handleFormationChange = (formationName: string) => {
    if (!isEditingAllowed) return

    const formation = formations.find((f) => f.name === formationName)
    if (!formation) return

    setSelectedFormation(formation)

    // Reorganize players based on new formation
    const newLineup: Player[] = []
    const newBench = [...team.bench]

    // Add players by position according to formation requirements
    Object.entries(formation.positions).forEach(([pos, maxCount]) => {
      const positionPlayers = team.players.filter((p) => p.position === pos)
      const playersToAdd = positionPlayers.slice(0, maxCount)
      const playersToMove = positionPlayers.slice(maxCount)

      newLineup.push(...playersToAdd)
      newBench.push(...playersToMove)
    })

    setTeam({
      ...team,
      formation: formationName,
      players: newLineup,
      bench: newBench,
    })
  }

  const handleCaptainChange = (playerId: string) => {
    if (!isEditingAllowed) return
    setCaptain(captain === playerId ? "" : playerId)
  }

  const renderFormationView = () => {
    const gkPlayers = getPositionPlayers("GK")
    const defPlayers = getPositionPlayers("DEF")
    const midPlayers = getPositionPlayers("MID")
    const fwdPlayers = getPositionPlayers("FWD")

    const renderPlayerSlot = (player: Player | null, position: string, index: number) => (
      <div
        key={player?.id || `empty-${position}-${index}`}
        className={`relative p-3 rounded-lg border-2 border-dashed transition-all cursor-pointer ${
          player ? "border-solid border-primary bg-card hover:bg-muted/50" : "border-muted-foreground/30 bg-muted/20"
        }`}
        onClick={() => player && handleCaptainChange(player.id)}
      >
        {player ? (
          <div className="text-center space-y-2">
            <Avatar className="h-12 w-12 mx-auto">
              <AvatarImage src={player.image || "/placeholder.svg"} />
              <AvatarFallback className="text-xs">
                {player.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm truncate">{player.name}</p>
              <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                {getPositionIcon(player.position)}
                <span>{player.position}</span>
              </div>
              <p className="text-xs font-bold">{player.points} pts</p>
            </div>
            {captain === player.id && (
              <Crown className="absolute -top-2 -right-2 h-5 w-5 text-yellow-500 fill-yellow-500" />
            )}
          </div>
        ) : (
          <div className="text-center space-y-2 opacity-50">
            <div className="h-12 w-12 mx-auto rounded-full bg-muted flex items-center justify-center">
              {getPositionIcon(position)}
            </div>
            <p className="text-xs text-muted-foreground">Empty {position}</p>
          </div>
        )}
      </div>
    )

    return (
      <div className="bg-gradient-to-b from-green-100 to-green-200 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-lg">
        <div className="space-y-8">
          {/* Forwards */}
          <div className="flex justify-center">
            <div
              className={`grid gap-4 ${selectedFormation.positions.FWD === 1 ? "grid-cols-1" : selectedFormation.positions.FWD === 2 ? "grid-cols-2" : "grid-cols-3"}`}
            >
              {Array.from({ length: selectedFormation.positions.FWD }).map((_, index) =>
                renderPlayerSlot(fwdPlayers[index] || null, "FWD", index),
              )}
            </div>
          </div>

          {/* Midfielders */}
          <div className="flex justify-center">
            <div
              className={`grid gap-4 ${selectedFormation.positions.MID <= 3 ? `grid-cols-${selectedFormation.positions.MID}` : "grid-cols-5"}`}
            >
              {Array.from({ length: selectedFormation.positions.MID }).map((_, index) =>
                renderPlayerSlot(midPlayers[index] || null, "MID", index),
              )}
            </div>
          </div>

          {/* Defenders */}
          <div className="flex justify-center">
            <div
              className={`grid gap-4 ${selectedFormation.positions.DEF <= 3 ? `grid-cols-${selectedFormation.positions.DEF}` : selectedFormation.positions.DEF === 4 ? "grid-cols-4" : "grid-cols-5"}`}
            >
              {Array.from({ length: selectedFormation.positions.DEF }).map((_, index) =>
                renderPlayerSlot(defPlayers[index] || null, "DEF", index),
              )}
            </div>
          </div>

          {/* Goalkeeper */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1">{renderPlayerSlot(gkPlayers[0] || null, "GK", 0)}</div>
          </div>
        </div>
      </div>
    )
  }

  const totalCost = [...team.players, ...team.bench].reduce((sum, player) => sum + player.price, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 mr-2"
                  >
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                  </svg>
                  Back to Dashboard
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="bg-green-600 dark:bg-green-500 p-2 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-white"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">Edit Team</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{team.name}</p>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 mr-2"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
              Toggle Mode
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isEditingAllowed && (
          <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/20">
            <CardContent className="flex items-center gap-3 p-4">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <div>
                <p className="font-medium text-orange-800 dark:text-orange-200">Team editing is locked</p>
                <p className="text-sm text-orange-600 dark:text-orange-300">
                  You can only make changes between Monday and Wednesday each week.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="formation" className="space-y-6">
          <TabsList>
            <TabsTrigger value="formation">Formation View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="bench">Bench</TabsTrigger>
          </TabsList>

          <TabsContent value="formation" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Formation: {selectedFormation.name}
                    </CardTitle>
                    <CardDescription>
                      Click on players to set captain.{" "}
                      {captain ? `Captain: ${team.players.find((p) => p.id === captain)?.name}` : "No captain selected"}
                    </CardDescription>
                  </div>
                  {isEditingAllowed && (
                    <Select value={selectedFormation.name} onValueChange={handleFormationChange}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {formations.map((formation) => (
                          <SelectItem key={formation.name} value={formation.name}>
                            {formation.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </CardHeader>
              <CardContent>{renderFormationView()}</CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="list" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Starting XI</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {team.players.map((player) => (
                    <div key={player.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={player.image || "/placeholder.svg"} />
                          <AvatarFallback>
                            {player.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{player.name}</p>
                            {captain === player.id && <Crown className="h-4 w-4 text-yellow-500 fill-yellow-500" />}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              {getPositionIcon(player.position)}
                              <span>{player.position}</span>
                            </div>
                            <span>•</span>
                            <span>{player.team}</span>
                            <span>•</span>
                            <span>{player.points} pts</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold">£{player.price}M</span>
                        {isEditingAllowed && (
                          <Button
                            size="sm"
                            variant={captain === player.id ? "default" : "outline"}
                            onClick={() => handleCaptainChange(player.id)}
                          >
                            <Crown className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bench" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Bench Players</CardTitle>
                <CardDescription>Substitute players for your team</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {team.bench.map((player) => (
                    <div key={player.id} className="flex items-center justify-between p-3 border rounded-lg opacity-75">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={player.image || "/placeholder.svg"} />
                          <AvatarFallback>
                            {player.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{player.name}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              {getPositionIcon(player.position)}
                              <span>{player.position}</span>
                            </div>
                            <span>•</span>
                            <span>{player.team}</span>
                            <span>•</span>
                            <span>{player.points} pts</span>
                          </div>
                        </div>
                      </div>
                      <span className="font-bold">£{player.price}M</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {isEditingAllowed && (
          <div className="flex justify-end gap-4">
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
            <Button>Transfer Players</Button>
          </div>
        )}
      </div>
    </div>
  )
}
