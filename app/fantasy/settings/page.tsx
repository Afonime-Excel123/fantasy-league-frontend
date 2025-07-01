"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function FantasySettingsPage() {
  const router = useRouter()

  const [profile, setProfile] = useState({
    fullName: "John Doe",
    email: "johndoe@example.com",
    teamName: "Campus Warriors",
  })

  const [avatar, setAvatar] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  const handleLogout = () => {
    fetch("/auth/logout", {
      method: "POST",
      credentials: "include",
    }).then(() => router.push("/auth/login"))
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => setAvatar(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>User Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={avatar ?? "/default-avatar.png"} />
              <AvatarFallback>{profile.fullName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <Input type="file" accept="image/*" onChange={handleAvatarChange} />
              <p className="text-xs text-muted-foreground">Upload profile picture</p>
            </div>
          </div>

          <div className="grid gap-4">
            <Input
              name="fullName"
              value={profile.fullName}
              onChange={handleInputChange}
              placeholder="Full Name"
            />
            <Input
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              placeholder="Email"
              type="email"
            />
            <Input
              name="teamName"
              value={profile.teamName}
              onChange={handleInputChange}
              placeholder="Team Name"
            />
            <Button className="w-full">Save Changes</Button>
            <Button variant="destructive" className="w-full" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
