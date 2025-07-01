"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Users, Trophy, Star, Shield, Target, Zap } from "lucide-react"

interface Player {
  id: string
  name: string
  position: "GK" | "DEF" | "MID" | "FWD"
  points: number
  price: number
  team: string
  image?: string
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

const mockPlayers: Player[] = [
  {
    id: "1",
    name: "Alisson Becker",
    position: "GK",
    points: 145,
    price: 5.5,
    team: "Liverpool",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Virgil van Dijk",
    position: "DEF",
    points: 178,
    price: 6.5,
    team: "Liverpool",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Kevin De Bruyne",
    position: "MID",
    points: 221,
    price: 12.0,
    team: "Man City",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Erling Haaland",
    position: "FWD",
    points: 272,
    price: 14.0,
    team: "Man City",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "Trent Alexander-Arnold",
    position: "DEF",
    points: 156,
    price: 7.0,
    team: "Liverpool",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "6",
    name: "Mohamed Salah",
    position: "FWD",
    points: 211,
    price: 13.0,
    team: "Liverpool",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "7",
    name: "Bruno Fernandes",
    position: "MID",
    points: 189,
    price: 8.5,
    team: "Man United",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "8",
    name: "Harry Kane",
    position: "FWD",
    points: 198,
    price: 11.0,
    team: "Bayern Munich",
    image: "/placeholder.svg?height=40&width=40",
  },
]

export function TeamCreationPage() {
  const [teamName, setTeamName] = useState("")
  const [selectedFormation, setSelectedFormation] = useState<Formation>(formations[0])
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [positionFilter, setPositionFilter] = useState<string>("all")
  const [budget] = useState(100.0)
  const [captain, setCaptain] = useState<string>("")

  const filteredPlayers = mockPlayers.filter((player) => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPosition = positionFilter === "all" || player.position === positionFilter
    const notSelected = !selectedPlayers.find((p) => p.id === player.id)
    return matchesSearch && matchesPosition && notSelected
  })

  const totalCost = selectedPlayers.reduce((sum, player) => sum + player.price, 0)
  const remainingBudget = budget - totalCost

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

  const getPositionCount = (position: "GK" | "DEF" | "MID" | "FWD") => {
    return selectedPlayers.filter((p) => p.position === position).length
  }

  const canAddPlayer = (player: Player) => {
    const currentCount = getPositionCount(player.position)
    const maxCount = selectedFormation.positions[player.position]
    return currentCount < maxCount && selectedPlayers.length < 11 && remainingBudget >= player.price
  }

  const addPlayer = (player: Player) => {
    if (canAddPlayer(player)) {
      setSelectedPlayers([...selectedPlayers, player])
    }
  }

  const removePlayer = (playerId: string) => {
    setSelectedPlayers(selectedPlayers.filter((p) => p.id !== playerId))
    if (captain === playerId) {
      setCaptain("")
    }
  }

  const isFormationValid = () => {
    return Object.entries(selectedFormation.positions).every(([pos, required]) => {
      const current = getPositionCount(pos as "GK" | "DEF" | "MID" | "FWD")
      return current === required
    })
  }

  const handleFormationChange = (formationName: string) => {
    const formation = formations.find((f) => f.name === formationName)
    if (formation) {
      setSelectedFormation(formation)
      // Remove excess players if new formation requires fewer
      const newSelectedPlayers = [...selectedPlayers]
      Object.entries(formation.positions).forEach(([pos, maxCount]) => {
        const positionPlayers = newSelectedPlayers.filter((p) => p.position === pos)
        if (positionPlayers.length > maxCount) {
          const toRemove = positionPlayers.slice(maxCount)
          toRemove.forEach((player) => {
            const index = newSelectedPlayers.findIndex((p) => p.id === player.id)
            if (index > -1) newSelectedPlayers.splice(index, 1)
          })
        }
      })
      setSelectedPlayers(newSelectedPlayers)
    }
  }

  const handleSubmit = () => {
    if (!teamName.trim()) {
      alert("Please enter a team name")
      return
    }
    if (!isFormationValid()) {
      alert("Please complete your team according to the selected formation")
      return
    }
    if (!captain) {
      alert("Please select a captain")
      return
    }

    const teamData = {
      name: teamName,
      formation: selectedFormation.name,
      players: selectedPlayers,
      captain: captain,
      totalCost: totalCost,
    }

    console.log("Creating team:", teamData)
    alert("Team created successfully!")
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Create Your Team</h1>
          <p className="text-muted-foreground">Build your fantasy football squad</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Remaining Budget</p>
          <p className="text-2xl font-bold text-green-600">£{remainingBudget.toFixed(1)}M</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Setup */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Setup</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="teamName">Team Name</Label>
                <Input
                  id="teamName"
                  placeholder="Enter team name"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="formation">Formation</Label>
                <Select value={selectedFormation.name} onValueChange={handleFormationChange}>
                  <SelectTrigger>
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
              </div>

              <div className="space-y-2">
                <Label>Formation Requirements</Label>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {Object.entries(selectedFormation.positions).map(([pos, count]) => (
                    <div key={pos} className="flex items-center justify-between p-2 bg-muted rounded">
                      <div className="flex items-center gap-1">
                        {getPositionIcon(pos)}
                        <span>{pos}</span>
                      </div>
                      <Badge variant={getPositionCount(pos as any) === count ? "default" : "secondary"}>
                        {getPositionCount(pos as any)}/{count}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Selected Team */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Your Team ({selectedPlayers.length}/11)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {selectedPlayers.map((player) => (
                  <div key={player.id} className="flex items-center justify-between p-2 bg-muted rounded">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={player.image || "/placeholder.svg"} />
                        <AvatarFallback>
                          {player.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{player.name}</p>
                        <div className="flex items-center gap-1">
                          {getPositionIcon(player.position)}
                          <span className="text-xs text-muted-foreground">{player.position}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant={captain === player.id ? "default" : "outline"}
                        onClick={() => setCaptain(captain === player.id ? "" : player.id)}
                      >
                        <Trophy className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => removePlayer(player.id)}>
                        ×
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span>Total Cost:</span>
                  <span className="font-bold">£{totalCost.toFixed(1)}M</span>
                </div>
                <Button
                  className="w-full mt-4"
                  onClick={handleSubmit}
                  disabled={!isFormationValid() || !teamName.trim() || !captain}
                >
                  Create Team
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Player Selection */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Available Players</CardTitle>
              <CardDescription>Select players to build your team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search players..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={positionFilter} onValueChange={setPositionFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="GK">GK</SelectItem>
                    <SelectItem value="DEF">DEF</SelectItem>
                    <SelectItem value="MID">MID</SelectItem>
                    <SelectItem value="FWD">FWD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2 max-h-96 overflow-y-auto">
                {filteredPlayers.map((player) => (
                  <div
                    key={player.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50"
                  >
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
                    <div className="flex items-center gap-3">
                      <span className="font-bold">£{player.price}M</span>
                      <Button size="sm" onClick={() => addPlayer(player)} disabled={!canAddPlayer(player)}>
                        Add
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
