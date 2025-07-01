"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Users, Clock, ArrowRight, X, Ban, HelpCircle } from "lucide-react"
import Link from "next/link"

interface EliminatedPlayer {
  id: number
  name: string
  position: "GK" | "DEF" | "MID" | "FWD"
  team: string
  status: "injured" | "suspended" | "eliminated" | "doubtful"
  eliminationReason: string
  expectedReturn?: string
}

interface EliminatedPlayerWarningModalProps {
  isOpen: boolean
  onClose: () => void
  eliminatedPlayers: EliminatedPlayer[]
  nextMatchweek: string
  daysUntilDeadline: number
}

export function EliminatedPlayerWarningModal({
  isOpen,
  onClose,
  eliminatedPlayers,
  nextMatchweek,
  daysUntilDeadline,
}: EliminatedPlayerWarningModalProps) {
  const [showDetails, setShowDetails] = useState(false)

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
        return <AlertTriangle className="h-4 w-4 text-red-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "injured":
        return <Badge variant="destructive">Injured</Badge>
      case "suspended":
        return <Badge variant="destructive">Suspended</Badge>
      case "eliminated":
        return (
          <Badge variant="secondary" className="bg-gray-500 text-white">
            Eliminated
          </Badge>
        )
      case "doubtful":
        return (
          <Badge variant="secondary" className="bg-yellow-500 text-white">
            Doubtful
          </Badge>
        )
      default:
        return <Badge variant="destructive">Unavailable</Badge>
    }
  }

  const getUrgencyLevel = () => {
    if (daysUntilDeadline <= 1) return "critical"
    if (daysUntilDeadline <= 3) return "high"
    return "medium"
  }

  const getUrgencyColor = () => {
    const urgency = getUrgencyLevel()
    switch (urgency) {
      case "critical":
        return "text-red-600 dark:text-red-400"
      case "high":
        return "text-orange-600 dark:text-orange-400"
      default:
        return "text-yellow-600 dark:text-yellow-400"
    }
  }

  const getUrgencyBackground = () => {
    const urgency = getUrgencyLevel()
    switch (urgency) {
      case "critical":
        return "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
      case "high":
        return "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800"
      default:
        return "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <div className={`p-2 rounded-full ${getUrgencyBackground()}`}>
              <AlertTriangle className={`h-5 w-5 ${getUrgencyColor()}`} />
            </div>
            <span>Team Update Required</span>
          </DialogTitle>
          <DialogDescription className="text-left">
            {eliminatedPlayers.length === 1
              ? "One of your players is no longer active. Please replace them before the next matchweek."
              : `${eliminatedPlayers.length} of your players are no longer active. Please replace them before the next matchweek.`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Urgency Alert */}
          <div className={`p-4 rounded-lg border ${getUrgencyBackground()}`}>
            <div className="flex items-center space-x-2 mb-2">
              <Clock className={`h-4 w-4 ${getUrgencyColor()}`} />
              <span className={`font-medium ${getUrgencyColor()}`}>
                {daysUntilDeadline <= 1 ? "Deadline Today!" : `${daysUntilDeadline} days until deadline`}
              </span>
            </div>
            <p className={`text-sm ${getUrgencyColor()}`}>
              Next matchweek: <span className="font-medium">{nextMatchweek}</span>
            </p>
          </div>

          {/* Affected Players Summary */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                <span className="font-medium text-gray-900 dark:text-white">
                  Affected Players ({eliminatedPlayers.length})
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowDetails(!showDetails)} className="text-xs">
                {showDetails ? "Hide Details" : "Show Details"}
              </Button>
            </div>

            {/* Player List */}
            <div className="space-y-2">
              {eliminatedPlayers.slice(0, showDetails ? eliminatedPlayers.length : 2).map((player) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between p-2 bg-white dark:bg-gray-700 rounded"
                >
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(player.status)}
                    <div>
                      <p className="font-medium text-sm">{player.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {player.position} • {player.team}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">{getStatusBadge(player.status)}</div>
                </div>
              ))}

              {!showDetails && eliminatedPlayers.length > 2 && (
                <div className="text-center py-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowDetails(true)}
                    className="text-xs text-gray-600 dark:text-gray-400"
                  >
                    +{eliminatedPlayers.length - 2} more players
                  </Button>
                </div>
              )}
            </div>

            {/* Detailed Reasons (when expanded) */}
            {showDetails && (
              <div className="mt-4 space-y-2">
                <h4 className="font-medium text-sm text-gray-900 dark:text-white">Status Details:</h4>
                {eliminatedPlayers.map((player) => (
                  <div
                    key={`${player.id}-detail`}
                    className="text-xs text-gray-600 dark:text-gray-400 pl-4 border-l-2 border-gray-200 dark:border-gray-600"
                  >
                    <span className="font-medium">{player.name}:</span> {player.eliminationReason}
                    {player.expectedReturn && (
                      <span className="block text-green-600 dark:text-green-400">
                        Expected return: {player.expectedReturn}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Impact Warning */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-3 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-900 dark:text-blue-100">Impact on Your Team:</p>
                <p className="text-blue-700 dark:text-blue-300">
                  These players will score 0 points until replaced. Your team performance may be significantly affected.
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex space-x-2 sm:space-x-0">
          <Button variant="outline" onClick={onClose} className="sm:mr-2">
            Remind Me Later
          </Button>
          <Link href="/edit-team" className="flex-1 sm:flex-none">
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold" onClick={onClose}>
              <Users className="h-4 w-4 mr-2" />
              Edit Team Now
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </DialogFooter>

        {/* Quick Stats Footer */}
        <div className="border-t pt-3 mt-4">
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
            <span>Team Status: {eliminatedPlayers.length} issues found</span>
            <span>Action Required: Replace players</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
