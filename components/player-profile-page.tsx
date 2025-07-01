"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ModeToggle } from "@/components/mode-toggle"
import {
  Trophy,
  Star,
  TrendingUp,
  Calendar,
  Target,
  Shield,
  Zap,
  AlertTriangle,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Send,
  ArrowLeft,
  Users,
  Award,
  Activity,
  BarChart3,
  Clock,
  MapPin,
} from "lucide-react"
import Link from "next/link"

// Mock player data
const mockPlayerData = {
  id: "7",
  name: "Kevin De Bruyne",
  shirtNumber: 17,
  team: "Man City",
  department: "Engineering", // University department for campus theme
  position: "MID",
  age: 32,
  nationality: "Belgium",
  height: "181cm",
  weight: "70kg",
  goals: 8,
  assists: 12,
  appearances: 15,
  goalsPerMatch: 0.53,
  assistsPerMatch: 0.8,
  totalFantasyPoints: 195,
  averagePoints: 13.0,
  form: [9, 10, 8, 9, 9, 7, 8, 10, 9, 8],
  status: "available", // available, injured, suspended, doubtful
  injury: null,
  nextFixture: "vs Chelsea (A)",
  fixtureDate: "2024-01-15",
  price: 12.0,
  priceChange: "+0.1",
  ownership: 45.2,
  captaincy: 23.8,
  transfersIn: 125000,
  transfersOut: 89000,
  cleanSheets: 0,
  yellowCards: 2,
  redCards: 0,
  penaltiesMissed: 0,
  saves: 0, // For goalkeepers
  bonus: 15,
  dreamTeamAppearances: 8,
}

// Mock reviews/comments data
const mockReviews = [
  {
    id: 1,
    username: "sarah_j",
    department: "Computer Science",
    rating: 5,
    comment:
      "Absolute legend! His passing is incredible and he's been my captain for weeks. Worth every penny of his price tag.",
    date: "2024-01-10",
    likes: 12,
    dislikes: 1,
    helpful: true,
  },
  {
    id: 2,
    username: "mike_t",
    department: "Engineering",
    rating: 4,
    comment:
      "Great player but quite expensive. His assists are amazing but sometimes he blanks in big games. Still recommended though.",
    date: "2024-01-08",
    likes: 8,
    dislikes: 3,
    helpful: false,
  },
  {
    id: 3,
    username: "emma_k",
    department: "Psychology",
    rating: 5,
    comment:
      "KDB is the king of fantasy football! His creativity and set pieces make him essential. Been in my team all season.",
    date: "2024-01-05",
    likes: 15,
    dislikes: 0,
    helpful: true,
  },
  {
    id: 4,
    username: "alex_m",
    department: "Business",
    rating: 3,
    comment: "Good player but too expensive for my budget. There are better value options in midfield right now.",
    date: "2024-01-03",
    likes: 5,
    dislikes: 8,
    helpful: false,
  },
]

interface PlayerProfilePageProps {
  playerId: string
}

export function PlayerProfilePage({ playerId }: PlayerProfilePageProps) {
  const [newComment, setNewComment] = useState("")
  const [newRating, setNewRating] = useState(5)
  const [reviews, setReviews] = useState(mockReviews)

  const player = mockPlayerData // In real app, fetch by playerId

  const getPositionIcon = (position: string) => {
    switch (position) {
      case "GK":
        return <Shield className="h-5 w-5 text-blue-600" />
      case "DEF":
        return <Target className="h-5 w-5 text-red-600" />
      case "MID":
        return <Zap className="h-5 w-5 text-purple-600" />
      case "FWD":
        return <Star className="h-5 w-5 text-green-600" />
      default:
        return null
    }
  }

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
            <AlertTriangle className="h-3 w-3" />
            <span>Suspended</span>
          </Badge>
        )
      case "doubtful":
        return (
          <Badge variant="secondary" className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
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

  const getFormAverage = (form: number[]) => {
    return (form.reduce((sum, score) => sum + score, 0) / form.length).toFixed(1)
  }

  const handleSubmitReview = () => {
    if (newComment.trim()) {
      const review = {
        id: reviews.length + 1,
        username: "you",
        department: "Engineering", // Current user's department
        rating: newRating,
        comment: newComment,
        date: new Date().toISOString().split("T")[0],
        likes: 0,
        dislikes: 0,
        helpful: false,
      }
      setReviews([review, ...reviews])
      setNewComment("")
      setNewRating(5)
    }
  }

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
            onClick={() => interactive && onRatingChange && onRatingChange(star)}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/players">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Players
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="bg-green-600 dark:bg-green-500 p-2 rounded-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">Player Profile</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Detailed player information</p>
                </div>
              </div>
            </div>
            <ModeToggle />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile */}
          <div className="lg:col-span-2 space-y-6">
            {/* Player Header */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
                  <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={`/placeholder.svg?height=80&width=80`} alt={player.name} />
                      <AvatarFallback className="text-2xl font-bold bg-green-600 text-white">
                        {player.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{player.name}</h1>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-lg px-3 py-1">
                            #{player.shirtNumber}
                          </Badge>
                          {getStatusBadge(player.status)}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          {getPositionIcon(player.position)}
                          <span>{player.position}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{player.team}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{player.department}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">{player.goals}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Goals</p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{player.assists}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Assists</p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {player.totalFantasyPoints}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Points</p>
                    </div>
                    <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                        {player.goalsPerMatch.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Goals/Match</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Stats */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span>Detailed Statistics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="performance" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                    <TabsTrigger value="form">Form</TabsTrigger>
                    <TabsTrigger value="info">Player Info</TabsTrigger>
                  </TabsList>

                  <TabsContent value="performance" className="mt-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Appearances</span>
                          <span className="font-medium">{player.appearances}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Goals per Match</span>
                          <span className="font-medium">{player.goalsPerMatch.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Assists per Match</span>
                          <span className="font-medium">{player.assistsPerMatch.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Average Points</span>
                          <span className="font-medium">{player.averagePoints.toFixed(1)}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Yellow Cards</span>
                          <span className="font-medium">{player.yellowCards}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Red Cards</span>
                          <span className="font-medium">{player.redCards}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Bonus Points</span>
                          <span className="font-medium">{player.bonus}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Dream Team</span>
                          <span className="font-medium">{player.dreamTeamAppearances}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Price</span>
                          <span className="font-medium">£{player.price}m</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Price Change</span>
                          <span
                            className={`font-medium ${player.priceChange.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                          >
                            {player.priceChange}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Ownership</span>
                          <span className="font-medium">{player.ownership}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Captaincy</span>
                          <span className="font-medium">{player.captaincy}%</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="form" className="mt-6">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-3 flex items-center space-x-2">
                          <TrendingUp className="h-4 w-4" />
                          <span>Recent Form (Last 10 Games)</span>
                        </h4>
                        <div className="flex items-center space-x-2 mb-4">
                          {player.form.map((score, index) => (
                            <div
                              key={index}
                              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                                score >= 8 ? "bg-green-500" : score >= 6 ? "bg-yellow-500" : "bg-red-500"
                              }`}
                            >
                              {score}
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Form Average:</span>
                          <span className="font-medium text-lg">{getFormAverage(player.form)}</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3">Ownership Trend</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Current Ownership</span>
                            <span>{player.ownership}%</span>
                          </div>
                          <Progress value={player.ownership} className="h-2" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <p className="text-xl font-bold text-green-600 dark:text-green-400">
                            {player.transfersIn.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Transfers In</p>
                        </div>
                        <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                          <p className="text-xl font-bold text-red-600 dark:text-red-400">
                            {player.transfersOut.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Transfers Out</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="info" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-medium">Personal Information</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Age</span>
                            <span className="font-medium">{player.age}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Nationality</span>
                            <span className="font-medium">{player.nationality}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Height</span>
                            <span className="font-medium">{player.height}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Weight</span>
                            <span className="font-medium">{player.weight}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium">Next Fixture</h4>
                        <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{player.nextFixture}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{player.fixtureDate}</p>
                            </div>
                            <Calendar className="h-6 w-6 text-gray-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  <Star className="mr-2 h-4 w-4" />
                  Add to Watchlist
                </Button>
                <Button variant="outline" className="w-full">
                  <Trophy className="mr-2 h-4 w-4" />
                  Make Captain
                </Button>
                <Button variant="outline" className="w-full">
                  <Users className="mr-2 h-4 w-4" />
                  Compare Players
                </Button>
              </CardContent>
            </Card>

            {/* Player Rating */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span>Community Rating</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold">4.2</div>
                  {renderStars(4)}
                  <p className="text-sm text-gray-600 dark:text-gray-400">Based on {reviews.length} reviews</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Reviews Section */}
        <Card className="mt-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              <span>Player Reviews & Comments</span>
              <Badge variant="secondary">{reviews.length}</Badge>
            </CardTitle>
            <CardDescription>Share your thoughts and read what other managers think</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Add Review */}
            <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <h4 className="font-medium mb-4">Write a Review</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Rating</label>
                  {renderStars(newRating, true, setNewRating)}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Your Review</label>
                  <Textarea
                    placeholder="Share your experience with this player..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="bg-white dark:bg-gray-700"
                  />
                </div>
                <Button onClick={handleSubmitReview} className="bg-green-600 hover:bg-green-700 text-white">
                  <Send className="mr-2 h-4 w-4" />
                  Submit Review
                </Button>
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-green-600 text-white text-sm">
                          {review.username === "you" ? "Y" : review.username[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">
                            {review.username === "you" ? "You" : `@${review.username}`}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {review.department}
                          </Badge>
                          {review.username === "you" && (
                            <Badge variant="secondary" className="text-xs">
                              Your Review
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          {renderStars(review.rating)}
                          <span className="text-sm text-gray-600 dark:text-gray-400">{review.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">{review.comment}</p>
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400">
                      <ThumbsUp className="mr-1 h-3 w-3" />
                      {review.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400">
                      <ThumbsDown className="mr-1 h-3 w-3" />
                      {review.dislikes}
                    </Button>
                    {review.helpful && (
                      <Badge variant="outline" className="text-xs text-green-600 border-green-600">
                        Helpful
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
