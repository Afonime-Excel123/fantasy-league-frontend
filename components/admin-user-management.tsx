"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ModeToggle } from "@/components/mode-toggle"
import {
  Users,
  Shield,
  UserCheck,
  User,
  Search,
  Filter,
  ArrowLeft,
  Save,
  AlertTriangle,
  CheckCircle,
  Crown,
  UserCog,
  Mail,
  Activity,
} from "lucide-react"
import Link from "next/link"

// Mock user data
const mockUsers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@university.edu",
    role: "Admin",
    department: "Computer Science",
    joinDate: "2024-01-15",
    lastActive: "2 hours ago",
    status: "Active",
    teamCount: 3,
  },
  {
    id: 2,
    name: "Alex Martinez",
    email: "alex.martinez@university.edu",
    role: "Coach",
    department: "Business",
    joinDate: "2024-02-03",
    lastActive: "1 day ago",
    status: "Active",
    teamCount: 1,
  },
  {
    id: 3,
    name: "Emma Kim",
    email: "emma.kim@university.edu",
    role: "User",
    department: "Psychology",
    joinDate: "2024-02-10",
    lastActive: "3 hours ago",
    status: "Active",
    teamCount: 2,
  },
  {
    id: 4,
    name: "Jake Rodriguez",
    email: "jake.rodriguez@university.edu",
    role: "User",
    department: "Biology",
    joinDate: "2024-01-28",
    lastActive: "5 minutes ago",
    status: "Active",
    teamCount: 1,
  },
  {
    id: 5,
    name: "Mike Thompson",
    email: "mike.thompson@university.edu",
    role: "Coach",
    department: "Engineering",
    joinDate: "2024-01-20",
    lastActive: "1 hour ago",
    status: "Active",
    teamCount: 4,
  },
  {
    id: 6,
    name: "Lisa Chen",
    email: "lisa.chen@university.edu",
    role: "User",
    department: "Art & Design",
    joinDate: "2024-02-15",
    lastActive: "2 days ago",
    status: "Inactive",
    teamCount: 1,
  },
  {
    id: 7,
    name: "David Wilson",
    email: "david.wilson@university.edu",
    role: "User",
    department: "Mathematics",
    joinDate: "2024-02-08",
    lastActive: "4 hours ago",
    status: "Active",
    teamCount: 2,
  },
  {
    id: 8,
    name: "Rachel Green",
    email: "rachel.green@university.edu",
    role: "Admin",
    department: "Administration",
    joinDate: "2024-01-10",
    lastActive: "30 minutes ago",
    status: "Active",
    teamCount: 0,
  },
]

type UserRole = "User" | "Coach" | "Admin"

interface UserType {
  id: number
  name: string
  email: string
  role: UserRole
  department: string
  joinDate: string
  lastActive: string
  status: string
  teamCount: number
}

export function AdminUserManagement() {
  const [users, setUsers] = useState<UserType[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [pendingChanges, setPendingChanges] = useState<Record<number, UserRole>>({})
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null)

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case "Admin":
        return <Crown className="h-4 w-4" />
      case "Coach":
        return <UserCheck className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case "Admin":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      case "Coach":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getStatusBadgeColor = (status: string) => {
    return status === "Active"
      ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      : "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
  }

  const handleRoleChange = (userId: number, newRole: UserRole) => {
    setPendingChanges((prev) => ({
      ...prev,
      [userId]: newRole,
    }))
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  const saveChanges = () => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (pendingChanges[user.id] ? { ...user, role: pendingChanges[user.id] } : user)),
    )
    setPendingChanges({})
    setShowConfirmDialog(false)
  }

  const hasChanges = Object.keys(pendingChanges).length > 0

  const roleStats = {
    total: users.length,
    admins: users.filter((u) => u.role === "Admin").length,
    coaches: users.filter((u) => u.role === "Coach").length,
    users: users.filter((u) => u.role === "User").length,
    active: users.filter((u) => u.status === "Active").length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/admin">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Admin
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="bg-green-600 dark:bg-green-500 p-2 rounded-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">User Management</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Manage user roles and permissions</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-green-600 border-green-600">
                <Shield className="h-3 w-3 mr-1" />
                Administrator
              </Badge>
              <ModeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{roleStats.total}</div>
              <p className="text-xs text-muted-foreground">Registered users</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Administrators</CardTitle>
              <Crown className="h-4 w-4 text-red-600 dark:text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{roleStats.admins}</div>
              <p className="text-xs text-muted-foreground">Admin users</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Coaches</CardTitle>
              <UserCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{roleStats.coaches}</div>
              <p className="text-xs text-muted-foreground">Coach users</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Regular Users</CardTitle>
              <User className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{roleStats.users}</div>
              <p className="text-xs text-muted-foreground">Standard users</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Activity className="h-4 w-4 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{roleStats.active}</div>
              <p className="text-xs text-muted-foreground">Recently active</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <UserCog className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span>User Role Management</span>
                </CardTitle>
                <CardDescription>Manage user roles and permissions across the platform</CardDescription>
              </div>
              {hasChanges && (
                <Button
                  onClick={() => setShowConfirmDialog(true)}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes ({Object.keys(pendingChanges).length})
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search users by name, email, or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Coach">Coach</SelectItem>
                    <SelectItem value="User">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Users Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Current Role</TableHead>
                    <TableHead>New Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Teams</TableHead>
                    <TableHead>Last Active</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow
                      key={user.id}
                      className={pendingChanges[user.id] ? "bg-yellow-50 dark:bg-yellow-900/10" : ""}
                    >
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-green-600 dark:text-green-400">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Joined {new Date(user.joinDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{user.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{user.department}</span>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getRoleBadgeColor(user.role)} flex items-center space-x-1 w-fit`}>
                          {getRoleIcon(user.role)}
                          <span>{user.role}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={pendingChanges[user.id] || user.role}
                          onValueChange={(value: UserRole) => handleRoleChange(user.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="User">
                              <div className="flex items-center space-x-2">
                                <User className="h-4 w-4" />
                                <span>User</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="Coach">
                              <div className="flex items-center space-x-2">
                                <UserCheck className="h-4 w-4" />
                                <span>Coach</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="Admin">
                              <div className="flex items-center space-x-2">
                                <Crown className="h-4 w-4" />
                                <span>Admin</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        {pendingChanges[user.id] && (
                          <div className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                            {user.role} → {pendingChanges[user.id]}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeColor(user.status)}>{user.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-medium">{user.teamCount}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{user.lastActive}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No users found matching your criteria</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <span>Confirm Role Changes</span>
            </DialogTitle>
            <DialogDescription>
              You are about to change the roles for {Object.keys(pendingChanges).length} user(s). This action will
              update their permissions immediately.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            {Object.entries(pendingChanges).map(([userId, newRole]) => {
              const user = users.find((u) => u.id === Number.parseInt(userId))
              if (!user) return null
              return (
                <div
                  key={userId}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getRoleBadgeColor(user.role)}>{user.role}</Badge>
                    <span>→</span>
                    <Badge className={getRoleBadgeColor(newRole)}>{newRole}</Badge>
                  </div>
                </div>
              )
            })}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Cancel
            </Button>
            <Button onClick={saveChanges} className="bg-green-600 hover:bg-green-700 text-white">
              <CheckCircle className="h-4 w-4 mr-2" />
              Confirm Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
