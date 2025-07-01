"use client"

import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AlertTriangle, X, Check, Ban, HelpCircle, Info } from "lucide-react"

interface EliminatedPlayerStatusProps {
  status: "available" | "injured" | "suspended" | "eliminated" | "doubtful"
  reason?: string | null
  showTooltip?: boolean
  size?: "sm" | "md" | "lg"
}

export function EliminatedPlayerStatus({
  status,
  reason,
  showTooltip = true,
  size = "md",
}: EliminatedPlayerStatusProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "injured":
        return {
          icon: AlertTriangle,
          label: "Injured",
          variant: "destructive" as const,
          color: "text-red-500",
          bgColor: "bg-red-50 dark:bg-red-900/20",
          borderColor: "border-red-200 dark:border-red-800",
        }
      case "suspended":
        return {
          icon: Ban,
          label: "Suspended",
          variant: "destructive" as const,
          color: "text-red-500",
          bgColor: "bg-red-50 dark:bg-red-900/20",
          borderColor: "border-red-200 dark:border-red-800",
        }
      case "eliminated":
        return {
          icon: X,
          label: "Eliminated",
          variant: "secondary" as const,
          color: "text-gray-500",
          bgColor: "bg-gray-50 dark:bg-gray-900/20",
          borderColor: "border-gray-200 dark:border-gray-800",
        }
      case "doubtful":
        return {
          icon: HelpCircle,
          label: "Doubtful",
          variant: "secondary" as const,
          color: "text-yellow-500",
          bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
          borderColor: "border-yellow-200 dark:border-yellow-800",
        }
      default:
        return {
          icon: Check,
          label: "Available",
          variant: "outline" as const,
          color: "text-green-500",
          bgColor: "bg-green-50 dark:bg-green-900/20",
          borderColor: "border-green-200 dark:border-green-800",
        }
    }
  }

  const config = getStatusConfig(status)
  const IconComponent = config.icon

  const iconSize = size === "sm" ? "h-3 w-3" : size === "lg" ? "h-5 w-5" : "h-4 w-4"
  const badgeSize = size === "sm" ? "text-xs px-2 py-1" : size === "lg" ? "text-sm px-3 py-2" : "text-xs px-2 py-1"

  const StatusBadge = () => (
    <Badge
      variant={config.variant}
      className={`flex items-center space-x-1 ${badgeSize} ${
        status === "eliminated" ? "bg-gray-500 text-white" : status === "doubtful" ? "bg-yellow-500 text-white" : ""
      }`}
    >
      <IconComponent className={iconSize} />
      <span>{config.label}</span>
    </Badge>
  )

  const StatusIcon = () => (
    <div className={`rounded-full p-2 ${config.bgColor} border ${config.borderColor}`}>
      <IconComponent className={`${iconSize} ${config.color}`} />
    </div>
  )

  if (!showTooltip || !reason) {
    return <StatusBadge />
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="cursor-help">
            <StatusBadge />
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <IconComponent className="h-4 w-4" />
              <p className="font-medium">
                {status === "injured" && "🏥 Injury Update"}
                {status === "suspended" && "⚠️ Suspension Details"}
                {status === "eliminated" && "❌ Elimination Notice"}
                {status === "doubtful" && "❓ Fitness Status"}
              </p>
            </div>
            <p className="text-sm">{reason}</p>
            {status !== "available" && (
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-400 flex items-center space-x-1">
                  <Info className="h-3 w-3" />
                  <span>Cannot be selected for fantasy team</span>
                </p>
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

// Utility component for overlay status on player cards
export function EliminatedPlayerOverlay({
  status,
  reason,
}: {
  status: string
  reason?: string | null
}) {
  if (status === "available") return null

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "injured":
        return <AlertTriangle className="h-6 w-6 text-red-500" />
      case "suspended":
        return <Ban className="h-6 w-6 text-red-500" />
      case "eliminated":
        return <X className="h-6 w-6 text-gray-500" />
      case "doubtful":
        return <HelpCircle className="h-6 w-6 text-yellow-500" />
      default:
        return null
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="absolute inset-0 bg-gray-900/30 dark:bg-gray-100/10 rounded-lg flex items-center justify-center cursor-help">
            <div className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg border-2 border-gray-200 dark:border-gray-600">
              {getStatusIcon(status)}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <div className="space-y-2">
            <p className="font-medium">
              {status === "injured" && "🏥 Player Injured"}
              {status === "suspended" && "⚠️ Player Suspended"}
              {status === "eliminated" && "❌ Player Eliminated"}
              {status === "doubtful" && "❓ Fitness Doubt"}
            </p>
            {reason && <p className="text-sm">{reason}</p>}
            <p className="text-xs text-gray-400 mt-2">This player cannot be selected</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
