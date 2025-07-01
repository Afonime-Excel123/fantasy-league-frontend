"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, Users, Clock, CheckCircle, UserCheck } from "lucide-react"

// Mock data for player requests
const mockPlayerRequests = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@university.edu",
    phone: "+1 (555) 123-4567",
    department: "Computer Science",
    academicYear: "3rd Year",
    gpa: 3.8,
    preferredPosition: "Midfielder",
    secondaryPosition: "Forward",
    experience: "2 years club football",
    availability: "Weekdays after 4 PM, Weekends",
    emergencyContact: "Sarah Johnson - +1 (555) 987-6543",
    submittedAt: "2024-01-15T10:30:00Z",
    status: "pending",
  },
  {
    id: 2,
    name: "Maria Rodriguez",
    email: "maria.rodriguez@university.edu",
    phone: "+1 (555) 234-5678",
    department: "Business Administration",
    academicYear: "2nd Year",
    gpa: 3.6,
    preferredPosition: "Defender",
    secondaryPosition: "Midfielder",
    experience: "High school varsity team captain",
    availability: "Flexible schedule",
    emergencyContact: "Carlos Rodriguez - +1 (555) 876-5432",
    submittedAt: "2024-01-14T14:20:00Z",
    status: "pending",
  },
  {
    id: 3,
    name: "David Chen",
    email: "david.chen@university.edu",
    phone: "+1 (555) 345-6789",
    department: "Engineering",
    academicYear: "4th Year",
    gpa: 3.9,
    preferredPosition: "Goalkeeper",
    secondaryPosition: "None",
    experience: "5 years competitive football",
    availability: "Evenings and weekends",
    emergencyContact: "Linda Chen - +1 (555) 765-4321",
    submittedAt: "2024-01-13T09:15:00Z",
    status: "pending",
  },
]

// Mock data for coaches
const mockCoaches = [
  {
    id: 1,
    name: "Coach Thompson",
    team: "Engineering Eagles",
    department: "Engineering",
    currentRoster: 18,
    maxRoster: 22,
  },
  {
    id: 2,
    name: "Coach Martinez",
    team: "Business Bulldogs",
    department: "Business",
    currentRoster: 20,
    maxRoster: 22,
  },
  {
    id: 3,
    name: "Coach Wilson",
    team: "Science Sharks",
    department: "Sciences",
    currentRoster: 15,
    maxRoster: 22,
  },
]

export function AdminRequestsManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [selectedCoaches, setSelectedCoaches] = useState<{ [key: number]: number }>({})
  const [isApprovalDialogOpen, setIsApprovalDialogOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<any>(null)

  const filteredRequests = mockPlayerRequests.filter((request) => {
    const matchesSearch =
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.preferredPosition.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment = departmentFilter === "all" || request.department === departmentFilter

    return matchesSearch && matchesDepartment
  })

  const handleCoachSelection = (requestId: number, coachId: number) => {
    setSelectedCoaches((prev) => ({
      ...prev,
      [requestId]: coachId,
    }))
  }

  const handleApproval = (request: any) => {
    const selectedCoach = mockCoaches.find((coach) => coach.id === selectedCoaches[request.id])
    if (selectedCoach) {
      setSelectedRequest({ ...request, assignedCoach: selectedCoach })
      setIsApprovalDialogOpen(true)
    }
  }

  const confirmApproval = () => {
    // Here you would make the API call to approve the request
    console.log("Approving request:", selectedRequest)
    setIsApprovalDialogOpen(false)
    setSelectedRequest(null)
  }

  const getPositionBadgeColor = (position: string) => {
    switch (position.toLowerCase()) {
      case "goalkeeper":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "defender":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "midfielder":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "forward":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const departments = [...new Set(mockPlayerRequests.map((req) => req.department))]

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Request Management</h1>
          <p className="text-muted-foreground">Manage certification and player requests</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Total Requests</p>
                <p className="text-2xl font-bold">{mockPlayerRequests.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-yellow-600" />
              <div>
                <p className="text-sm font-medium">Pending</p>
                <p className="text-2xl font-bold">{mockPlayerRequests.filter((r) => r.status === "pending").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm font-medium">Approved</p>
                <p className="text-2xl font-bold">0</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <UserCheck className="h-4 w-4 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Available Coaches</p>
                <p className="text-2xl font-bold">{mockCoaches.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="player-requests" className="space-y-4">
        <TabsList>
          <TabsTrigger value="certification-requests">Certification Requests</TabsTrigger>
          <TabsTrigger value="player-requests">Player Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="certification-requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Certification Requests</CardTitle>
              <CardDescription>Manage coach certification and qualification requests</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No certification requests at this time.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="player-requests" className="space-y-4">
          {/* Search and Filter Controls */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, email, department, or position..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filter by department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Player Requests */}
          <div className="space-y-4">
            {filteredRequests.map((request) => (
              <Card key={request.id}>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Player Information */}
                    <div className="lg:col-span-2 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">{request.name}</h3>
                          <p className="text-sm text-muted-foreground">{request.email}</p>
                          <p className="text-sm text-muted-foreground">{request.phone}</p>
                        </div>
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                          Pending
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <Label className="font-medium">Department</Label>
                          <p>{request.department}</p>
                        </div>
                        <div>
                          <Label className="font-medium">Academic Year</Label>
                          <p>{request.academicYear}</p>
                        </div>
                        <div>
                          <Label className="font-medium">GPA</Label>
                          <p>{request.gpa}</p>
                        </div>
                        <div>
                          <Label className="font-medium">Submitted</Label>
                          <p>{new Date(request.submittedAt).toLocaleDateString()}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="font-medium">Positions</Label>
                        <div className="flex gap-2">
                          <Badge className={getPositionBadgeColor(request.preferredPosition)}>
                            {request.preferredPosition} (Primary)
                          </Badge>
                          {request.secondaryPosition && request.secondaryPosition !== "None" && (
                            <Badge variant="outline" className={getPositionBadgeColor(request.secondaryPosition)}>
                              {request.secondaryPosition} (Secondary)
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 text-sm">
                        <div>
                          <Label className="font-medium">Experience</Label>
                          <p>{request.experience}</p>
                        </div>
                        <div>
                          <Label className="font-medium">Availability</Label>
                          <p>{request.availability}</p>
                        </div>
                        <div>
                          <Label className="font-medium">Emergency Contact</Label>
                          <p>{request.emergencyContact}</p>
                        </div>
                      </div>
                    </div>

                    {/* Coach Assignment */}
                    <div className="space-y-4">
                      <div>
                        <Label className="font-medium">Assign Coach</Label>
                        <Select
                          value={selectedCoaches[request.id]?.toString() || ""}
                          onValueChange={(value) => handleCoachSelection(request.id, Number.parseInt(value))}
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select a coach" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockCoaches.map((coach) => (
                              <SelectItem key={coach.id} value={coach.id.toString()}>
                                <div className="flex flex-col">
                                  <span>{coach.name}</span>
                                  <span className="text-xs text-muted-foreground">
                                    {coach.team} • {coach.currentRoster}/{coach.maxRoster} players
                                  </span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <Button
                        onClick={() => handleApproval(request)}
                        disabled={!selectedCoaches[request.id]}
                        className="w-full"
                      >
                        Approve Request
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredRequests.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">No player requests found matching your criteria.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Approval Confirmation Dialog */}
      <Dialog open={isApprovalDialogOpen} onOpenChange={setIsApprovalDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Request Approval</DialogTitle>
            <DialogDescription>Are you sure you want to approve this player request?</DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Player:</span>
                  <span>{selectedRequest.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Position:</span>
                  <span>{selectedRequest.preferredPosition}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Assigned Coach:</span>
                  <span>{selectedRequest.assignedCoach?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Team:</span>
                  <span>{selectedRequest.assignedCoach?.team}</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                The player will be notified of approval and the assigned coach will receive a notification about the new
                team member.
              </p>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApprovalDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmApproval}>Confirm Approval</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
