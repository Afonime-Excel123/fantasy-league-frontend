"use client"

import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AlertTriangle, X, Check, Ban, HelpCircle } from "lucide-react"

interface Player {
  id: number
  name: string
  position: "GK" | "DEF" | "MID" | "FWD"
  team: string
  price: number
  points: number
  status: "available" | "injured" | "suspended" | "eliminated" | "doubtful"
  eliminationReason: string | null
}

interface EliminatedPlayerCardProps {
  player: Player
  isSelected: boolean
  canAdd: boolean
  teamCount: number
  isEliminated: boolean
  onToggle: () => void
}

export function EliminatedPlayerCard({
  player,
  isSelected,
  canAdd,
  teamCount,
  isEliminated,
  onToggle,
}: EliminatedPlayerCardProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "injured":
        return (
          <Badge variant="destructive" className="flex items-center space-x-1">
            <AlertTriangle className="h-3 w-3" />
            <span>Injured</span>
          </Badge>
        )
      case "suspended":
        return (
          <Badge variant="destructive" className="flex items-center space-x-1">
            <Ban className="h-3 w-3" />
            <span>Suspended</span>
          </Badge>
        )
      case "eliminated":
        return (
          <Badge variant="secondary" className="flex items-center space-x-1 bg-gray-500 text-white">
            <X className="h-3 w-3" />
            <span>Eliminated</span>
          </Badge>
        )
      case "doubtful":
        return (
          <Badge variant="secondary" className="flex items-center space-x-1 bg-yellow-500 text-white">
            <HelpCircle className="h-3 w-3" />
            <span>Doubtful</span>
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="text-green-600 border-green-600">
            Available
          </Badge>
        )
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "injured":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "suspended":
        return <Ban className="h-4 w-4 text-red-500" />
      case "eliminated":
        return <X className="h-4 w-4 text-gray-500" />
      case "doubtful":
        return <HelpCircle className="h-4 w-4 text-yellow-500" />
      default:
        return <Check className="h-4 w-4 text-green-500" />
    }
  }

  const cardClasses = `
    p-4 rounded-lg border cursor-pointer transition-all relative
    ${
      isSelected
        ? "bg-green-50 dark:bg-green-900/20 border-green-500"
        : isEliminated
          ? "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 opacity-60 cursor-not-allowed"
          : canAdd
            ? "bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
            : "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 opacity-50 cursor-not-allowed"
    }
    ${isEliminated ? "grayscale" : ""}
  `

  const PlayerCardContent = () => (
    <div className={cardClasses} onClick={onToggle}>
      {/* Elimination Overlay */}
      {isEliminated && (
        <div className="absolute inset-0 bg-gray-900/20 dark:bg-gray-100/10 rounded-lg flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg">{getStatusIcon(player.status)}</div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3
              className={`font-medium ${isEliminated ? "text-gray-500 dark:text-gray-400" : "text-gray-900 dark:text-white"}`}
            >
              {player.name}
            </h3>
            {isSelected && !isEliminated && <Check className="h-4 w-4 text-green-600" />}
            {isEliminated && <div className="flex items-center space-x-1">{getStatusIcon(player.status)}</div>}
          </div>

          <p
            className={`text-sm ${isEliminated ? "text-gray-400 dark:text-gray-500" : "text-gray-600 dark:text-gray-400"}`}
          >
            {player.team}
          </p>

          <div className="flex items-center space-x-2 mt-2">
            <Badge variant="outline" className={`text-xs ${isEliminated ? "border-gray-400 text-gray-400" : ""}`}>
              £{player.price}m
            </Badge>
            <Badge variant="secondary" className={`text-xs ${isEliminated ? "bg-gray-300 text-gray-500" : ""}`}>
              {player.points} pts
            </Badge>
            {isEliminated && getStatusBadge(player.status)}
          </div>
        </div>

        {teamCount >= 3 && !isSelected && !isEliminated && (
          <div className="text-xs text-red-500 flex items-center">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Team limit
          </div>
        )}
      </div>
    </div>
  )

  // Wrap with tooltip if player is eliminated
  if (isEliminated && player.eliminationReason) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <PlayerCardContent />
            </div>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs">
            <div className="space-y-1">
              <p className="font-medium">
                {player.status === "injured" && "🏥 Injury Update"}
                {player.status === "suspended" && "⚠️ Suspension"}
                {player.status === "eliminated" && "❌ Eliminated"}
                {player.status === "doubtful" && "❓ Fitness Doubt"}
              </p>
              <p className="text-sm">{player.eliminationReason}</p>
              <p className="text-xs text-gray-400 mt-2">Cannot be selected for fantasy team</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return <PlayerCardContent />
}
