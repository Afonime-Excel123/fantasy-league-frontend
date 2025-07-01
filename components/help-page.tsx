"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  HelpCircle,
  Users,
  Trophy,
  Settings,
  Mail,
  Phone,
  MessageCircle,
  ChevronDown,
  ChevronRight,
  Book,
  Zap,
} from "lucide-react"

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
  tags: string[]
}

const mockFAQs: FAQItem[] = [
  {
    id: "1",
    question: "How do I create my fantasy team?",
    answer:
      "To create your fantasy team, go to the 'Create Team' page from your dashboard. You'll have a budget to select players from different positions. Make sure to pick players from all required positions: Goalkeeper, Defenders, Midfielders, and Forwards.",
    category: "fantasy",
    tags: ["team", "create", "budget", "players"],
  },
  {
    id: "2",
    question: "When can I make transfers?",
    answer:
      "You can make transfers between gameweeks. The transfer window typically opens after matches are completed and closes before the next gameweek deadline. Check the fixtures page for specific deadlines.",
    category: "fantasy",
    tags: ["transfers", "gameweek", "deadline"],
  },
  {
    id: "3",
    question: "How does the scoring system work?",
    answer:
      "Players earn points based on their real match performance: Goals (6 points for forwards, 8 for midfielders, 10 for defenders/GK), Assists (3 points), Clean sheets (4 points for defenders/GK), and bonus points for exceptional performances.",
    category: "scoring",
    tags: ["points", "goals", "assists", "clean sheet"],
  },
  {
    id: "4",
    question: "What happens if my player gets injured?",
    answer:
      "If your player gets injured, they'll be marked as unavailable and won't earn points. You'll receive a notification and should consider transferring them out. Injured players are highlighted in red on your team page.",
    category: "players",
    tags: ["injury", "unavailable", "transfer", "notification"],
  },
  {
    id: "5",
    question: "How do I join a league?",
    answer:
      "You can join public leagues from the Leaderboard page or create/join private leagues with friends using league codes. Each league has its own standings and prizes.",
    category: "leagues",
    tags: ["league", "join", "private", "public", "code"],
  },
  {
    id: "6",
    question: "Can I change my team captain?",
    answer:
      "Yes, you can change your captain anytime before the gameweek deadline. Your captain earns double points, so choose wisely! Go to your team page and click on a player to make them captain.",
    category: "fantasy",
    tags: ["captain", "double points", "deadline"],
  },
  {
    id: "7",
    question: "What are the different user roles?",
    answer:
      "There are three main roles: Players (create fantasy teams), Coaches (manage real teams and approve player requests), and Admins (manage the entire system, users, and competitions).",
    category: "account",
    tags: ["roles", "player", "coach", "admin"],
  },
  {
    id: "8",
    question: "How do I reset my password?",
    answer:
      "Go to the login page and click 'Forgot Password'. Enter your email address and you'll receive a reset link. You can also change your password from the Settings page when logged in.",
    category: "account",
    tags: ["password", "reset", "email", "settings"],
  },
]

const categories = [
  { id: "all", name: "All Topics", icon: Book },
  { id: "fantasy", name: "Fantasy Teams", icon: Trophy },
  { id: "players", name: "Player Management", icon: Users },
  { id: "scoring", name: "Scoring System", icon: Zap },
  { id: "leagues", name: "Leagues", icon: Trophy },
  { id: "account", name: "Account & Settings", icon: Settings },
]

export function HelpPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null)

  const filteredFAQs = mockFAQs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Help Center</h1>
          <p className="text-gray-600 dark:text-gray-400">Find answers to common questions and get support</p>
        </div>

        {/* Search */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search for help topics, questions, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 text-lg py-3"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon
                  const count =
                    category.id === "all"
                      ? mockFAQs.length
                      : mockFAQs.filter((faq) => faq.category === category.id).length
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "ghost"}
                      className={`w-full justify-start ${
                        selectedCategory === category.id
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "hover:bg-green-50 dark:hover:bg-green-900/20"
                      }`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      <span className="flex-1 text-left">{category.name}</span>
                      <Badge variant="secondary" className="ml-2">
                        {count}
                      </Badge>
                    </Button>
                  )
                })}
              </CardContent>
            </Card>

            {/* Quick Contact */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm mt-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  Need More Help?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Support
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Support
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Live Chat
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-green-600" />
                  Frequently Asked Questions
                  <Badge variant="outline" className="ml-2">
                    {filteredFAQs.length} results
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredFAQs.length > 0 ? (
                  filteredFAQs.map((faq) => (
                    <div key={faq.id} className="border border-gray-200 dark:border-gray-700 rounded-lg">
                      <button
                        onClick={() => toggleFAQ(faq.id)}
                        className="w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-900 dark:text-white pr-4">{faq.question}</h3>
                          {expandedFAQ === faq.id ? (
                            <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          )}
                        </div>
                        <div className="flex gap-2 mt-2">
                          {faq.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </button>
                      {expandedFAQ === faq.id && (
                        <div className="px-4 pb-4">
                          <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No results found</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Try adjusting your search terms or browse different categories.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Start Guide */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book className="w-5 h-5 text-green-600" />
                  Quick Start Guide
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">1. Create Your Team</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Start by creating your fantasy team with the allocated budget.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">2. Join Leagues</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Compete with friends in private leagues or join public competitions.
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">3. Make Transfers</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Buy and sell players between gameweeks to optimize your team.
                    </p>
                  </div>
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">4. Track Progress</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Monitor your team's performance and climb the leaderboards.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
