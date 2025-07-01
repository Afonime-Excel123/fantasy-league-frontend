"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ModeToggle } from "@/components/mode-toggle"
import {
  Trophy,
  Users,
  Target,
  Shield,
  Zap,
  Star,
  CheckCircle,
  ArrowLeft,
  UserPlus,
  Shirt,
  GraduationCap,
  Clock,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

// Department options
const departments = [
  "Computer Science",
  "Engineering",
  "Business Administration",
  "Psychology",
  "Biology",
  "Chemistry",
  "Physics",
  "Mathematics",
  "English Literature",
  "History",
  "Political Science",
  "Economics",
  "Communications",
  "Art & Design",
  "Music",
  "Education",
  "Medicine",
  "Law",
  "Architecture",
  "Environmental Science",
]

// Position options with descriptions
const positions = [
  { value: "GK", label: "Goalkeeper (GK)", icon: Shield, description: "Last line of defense" },
  { value: "CB", label: "Centre-Back (CB)", icon: Target, description: "Central defender" },
  { value: "LB", label: "Left-Back (LB)", icon: Target, description: "Left side defender" },
  { value: "RB", label: "Right-Back (RB)", icon: Target, description: "Right side defender" },
  { value: "CDM", label: "Defensive Midfielder (CDM)", icon: Zap, description: "Defensive midfield anchor" },
  { value: "CM", label: "Central Midfielder (CM)", icon: Zap, description: "Box-to-box midfielder" },
  { value: "CAM", label: "Attacking Midfielder (CAM)", icon: Zap, description: "Creative playmaker" },
  { value: "LM", label: "Left Midfielder (LM)", icon: Zap, description: "Left wing midfielder" },
  { value: "RM", label: "Right Midfielder (RM)", icon: Zap, description: "Right wing midfielder" },
  { value: "LW", label: "Left Winger (LW)", icon: Star, description: "Left attacking winger" },
  { value: "RW", label: "Right Winger (RW)", icon: Star, description: "Right attacking winger" },
  { value: "ST", label: "Striker (ST)", icon: Star, description: "Main goal scorer" },
  { value: "CF", label: "Centre Forward (CF)", icon: Star, description: "Central attacking player" },
]

interface FormData {
  fullName: string
  department: string
  preferredPosition: string
  shirtNumber: string
  experience: string
  motivation: string
  availability: string
}

export function PlayerRequestForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    department: "",
    preferredPosition: "",
    shirtNumber: "",
    experience: "",
    motivation: "",
    availability: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.department) {
      newErrors.department = "Please select your department"
    }

    if (!formData.preferredPosition) {
      newErrors.preferredPosition = "Please select your preferred position"
    }

    if (!formData.shirtNumber.trim()) {
      newErrors.shirtNumber = "Shirt number is required"
    } else {
      const shirtNum = Number.parseInt(formData.shirtNumber)
      if (isNaN(shirtNum) || shirtNum < 1 || shirtNum > 99) {
        newErrors.shirtNumber = "Shirt number must be between 1 and 99"
      }
    }

    if (!formData.experience.trim()) {
      newErrors.experience = "Please describe your football experience"
    }

    if (!formData.motivation.trim()) {
      newErrors.motivation = "Please explain why you want to join the team"
    }

    if (!formData.availability) {
      newErrors.availability = "Please select your availability"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setShowSuccessDialog(true)
  }

  const getPositionIcon = (positionValue: string) => {
    const position = positions.find((p) => p.value === positionValue)
    if (!position) return null
    const IconComponent = position.icon
    return <IconComponent className="h-4 w-4" />
  }

  const resetForm = () => {
    setFormData({
      fullName: "",
      department: "",
      preferredPosition: "",
      shirtNumber: "",
      experience: "",
      motivation: "",
      availability: "",
    })
    setErrors({})
    setShowSuccessDialog(false)
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
                  <UserPlus className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">Join Your Department Team</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Apply to play real football</p>
                </div>
              </div>
            </div>
            <ModeToggle />
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center space-x-4 text-green-600 dark:text-green-400 mb-4">
            <Trophy className="h-12 w-12" />
            <Users className="h-12 w-12" />
            <Target className="h-12 w-12" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to Represent Your Department?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Join your department's football team and compete in the inter-departmental league. Show your skills on the
            pitch and bring glory to your academic family!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Application Form */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shirt className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span>Player Application Form</span>
                </CardTitle>
                <CardDescription>
                  Fill out this form to apply for your department's football team. Your coach will review your
                  application and contact you soon.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                      <GraduationCap className="h-5 w-5 text-green-600" />
                      <span>Personal Information</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-gray-700 dark:text-gray-300">
                          Full Name *
                        </Label>
                        <Input
                          id="fullName"
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange("fullName", e.target.value)}
                          className={`bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 ${
                            errors.fullName ? "border-red-500 dark:border-red-400" : ""
                          }`}
                        />
                        {errors.fullName && <p className="text-sm text-red-500 dark:text-red-400">{errors.fullName}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="department" className="text-gray-700 dark:text-gray-300">
                          Department *
                        </Label>
                        <Select
                          value={formData.department}
                          onValueChange={(value) => handleInputChange("department", value)}
                        >
                          <SelectTrigger
                            className={`bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 ${
                              errors.department ? "border-red-500 dark:border-red-400" : ""
                            }`}
                          >
                            <SelectValue placeholder="Select your department" />
                          </SelectTrigger>
                          <SelectContent>
                            {departments.map((dept) => (
                              <SelectItem key={dept} value={dept}>
                                {dept}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.department && (
                          <p className="text-sm text-red-500 dark:text-red-400">{errors.department}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Football Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                      <Trophy className="h-5 w-5 text-green-600" />
                      <span>Football Information</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="preferredPosition" className="text-gray-700 dark:text-gray-300">
                          Preferred Position *
                        </Label>
                        <Select
                          value={formData.preferredPosition}
                          onValueChange={(value) => handleInputChange("preferredPosition", value)}
                        >
                          <SelectTrigger
                            className={`bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 ${
                              errors.preferredPosition ? "border-red-500 dark:border-red-400" : ""
                            }`}
                          >
                            <SelectValue placeholder="Select your preferred position" />
                          </SelectTrigger>
                          <SelectContent>
                            {positions.map((position) => (
                              <SelectItem key={position.value} value={position.value}>
                                <div className="flex items-center space-x-2">
                                  <position.icon className="h-4 w-4" />
                                  <span>{position.label}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {formData.preferredPosition && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {positions.find((p) => p.value === formData.preferredPosition)?.description}
                          </p>
                        )}
                        {errors.preferredPosition && (
                          <p className="text-sm text-red-500 dark:text-red-400">{errors.preferredPosition}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="shirtNumber" className="text-gray-700 dark:text-gray-300">
                          Preferred Shirt Number *
                        </Label>
                        <Input
                          id="shirtNumber"
                          type="number"
                          min="1"
                          max="99"
                          placeholder="1-99"
                          value={formData.shirtNumber}
                          onChange={(e) => handleInputChange("shirtNumber", e.target.value)}
                          className={`bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 ${
                            errors.shirtNumber ? "border-red-500 dark:border-red-400" : ""
                          }`}
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Choose a number between 1-99 (subject to availability)
                        </p>
                        {errors.shirtNumber && (
                          <p className="text-sm text-red-500 dark:text-red-400">{errors.shirtNumber}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                      <Star className="h-5 w-5 text-green-600" />
                      <span>Additional Information</span>
                    </h3>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="experience" className="text-gray-700 dark:text-gray-300">
                          Football Experience *
                        </Label>
                        <Textarea
                          id="experience"
                          placeholder="Describe your football experience, previous teams, achievements, etc."
                          value={formData.experience}
                          onChange={(e) => handleInputChange("experience", e.target.value)}
                          className={`bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 ${
                            errors.experience ? "border-red-500 dark:border-red-400" : ""
                          }`}
                          rows={3}
                        />
                        {errors.experience && (
                          <p className="text-sm text-red-500 dark:text-red-400">{errors.experience}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="motivation" className="text-gray-700 dark:text-gray-300">
                          Why do you want to join the team? *
                        </Label>
                        <Textarea
                          id="motivation"
                          placeholder="Tell us why you want to represent your department and what you can bring to the team..."
                          value={formData.motivation}
                          onChange={(e) => handleInputChange("motivation", e.target.value)}
                          className={`bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 ${
                            errors.motivation ? "border-red-500 dark:border-red-400" : ""
                          }`}
                          rows={3}
                        />
                        {errors.motivation && (
                          <p className="text-sm text-red-500 dark:text-red-400">{errors.motivation}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="availability" className="text-gray-700 dark:text-gray-300">
                          Training Availability *
                        </Label>
                        <Select
                          value={formData.availability}
                          onValueChange={(value) => handleInputChange("availability", value)}
                        >
                          <SelectTrigger
                            className={`bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 ${
                              errors.availability ? "border-red-500 dark:border-red-400" : ""
                            }`}
                          >
                            <SelectValue placeholder="Select your availability" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="weekdays">Weekdays Only</SelectItem>
                            <SelectItem value="weekends">Weekends Only</SelectItem>
                            <SelectItem value="both">Both Weekdays & Weekends</SelectItem>
                            <SelectItem value="flexible">Flexible Schedule</SelectItem>
                            <SelectItem value="limited">Limited Availability</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.availability && (
                          <p className="text-sm text-red-500 dark:text-red-400">{errors.availability}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-semibold py-3"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Submitting Application...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <UserPlus className="h-5 w-5" />
                          <span>Submit Application</span>
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Information Sidebar */}
          <div className="space-y-6">
            {/* Coach Review Notice */}
            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-800 dark:text-green-200">
                  <Clock className="h-5 w-5" />
                  <span>Application Review</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-green-700 dark:text-green-300">
                  <p className="text-sm">
                    <strong>Your department coach will review your application</strong> and contact you within 3-5
                    business days.
                  </p>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3" />
                      <span>Application submitted</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-3 w-3" />
                      <span>Coach review (3-5 days)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-3 w-3" />
                      <span>Tryout invitation (if selected)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Trophy className="h-3 w-3" />
                      <span>Team selection</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team Information */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span>Team Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">Training Schedule</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Tuesday & Thursday: 6:00 PM - 8:00 PM
                    <br />
                    Saturday: 10:00 AM - 12:00 PM
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">Season Duration</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">September - May (Academic Year)</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">Requirements</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Current student enrollment</li>
                    <li>• Medical clearance</li>
                    <li>• Commitment to training</li>
                    <li>• Team spirit & sportsmanship</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Position Guide */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span>Position Guide</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">
                      <strong>Goalkeeper:</strong> Shot-stopping, distribution
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-red-600" />
                    <span className="text-sm">
                      <strong>Defenders:</strong> Tackling, heading, positioning
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-purple-600" />
                    <span className="text-sm">
                      <strong>Midfielders:</strong> Passing, vision, stamina
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-green-600" />
                    <span className="text-sm">
                      <strong>Forwards:</strong> Finishing, pace, movement
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-blue-800 dark:text-blue-200">
                  <AlertCircle className="h-5 w-5" />
                  <span>Need Help?</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-blue-700 dark:text-blue-300 text-sm">
                  <p>
                    <strong>Sports Office:</strong>
                    <br />
                    sports@university.edu
                    <br />
                    (555) 123-4567
                  </p>
                  <p>
                    <strong>Office Hours:</strong>
                    <br />
                    Mon-Fri: 9:00 AM - 5:00 PM
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900/20 rounded-full">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <DialogTitle className="text-center">Application Submitted Successfully!</DialogTitle>
            <DialogDescription className="text-center">
              Thank you for applying to join your department's football team.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">What happens next?</h4>
              <div className="space-y-2 text-sm text-green-700 dark:text-green-300">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-3 w-3" />
                  <span>Your application has been sent to your department coach</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-3 w-3" />
                  <span>You'll receive an email confirmation shortly</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-3 w-3" />
                  <span>Coach will contact you within 3-5 business days</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Application Summary</h4>
              <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <p>
                  <strong>Name:</strong> {formData.fullName}
                </p>
                <p>
                  <strong>Department:</strong> {formData.department}
                </p>
                <p>
                  <strong>Position:</strong> {positions.find((p) => p.value === formData.preferredPosition)?.label}
                </p>
                <p>
                  <strong>Shirt Number:</strong> #{formData.shirtNumber}
                </p>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button variant="outline" onClick={resetForm} className="flex-1">
                Submit Another
              </Button>
              <Button
                onClick={() => setShowSuccessDialog(false)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                Done
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
