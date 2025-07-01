import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertTriangle, Ban, Check, X } from "lucide-react"

interface Player {
  id: number
  name: string
  team: string
  position: string
  goals: number
  assists: number
  cleanSheets: number
  cost: number
  totalPoints: number
  form: number[]
  status: string
  injury: string | null
  nextFixture: string
  ownership: number
}

const mockPlayers: Player[] = [
  {
    id: 1,
    name: "Erling Haaland",
    team: "Man City",
    position: "FWD",
    goals: 27,
    assists: 5,
    cleanSheets: 0,
    cost: 14.0,
    totalPoints: 250,
    form: [8, 9, 7, 9, 10],
    status: "available",
    injury: null,
    nextFixture: "vs Arsenal",
    ownership: 65.2,
  },
  {
    id: 2,
    name: "Mo Salah",
    team: "Liverpool",
    position: "MID",
    goals: 19,
    assists: 11,
    cleanSheets: 0,
    cost: 13.0,
    totalPoints: 230,
    form: [6, 7, 8, 8, 9],
    status: "available",
    injury: null,
    nextFixture: "vs Tottenham",
    ownership: 50.1,
  },
  {
    id: 3,
    name: "Trent Alexander-Arnold",
    team: "Liverpool",
    position: "DEF",
    goals: 2,
    assists: 7,
    cleanSheets: 10,
    cost: 8.5,
    totalPoints: 180,
    form: [7, 6, 5, 7, 8],
    status: "available",
    injury: null,
    nextFixture: "vs Tottenham",
    ownership: 40.5,
  },
  {
    id: 4,
    name: "Son Heung-min",
    team: "Tottenham",
    position: "FWD",
    goals: 15,
    assists: 6,
    cleanSheets: 0,
    cost: 9.8,
    totalPoints: 170,
    form: [5, 8, 6, 7, 7],
    status: "available",
    injury: null,
    nextFixture: "vs Liverpool",
    ownership: 35.8,
  },
  {
    id: 5,
    name: "Kevin De Bruyne",
    team: "Man City",
    position: "MID",
    goals: 8,
    assists: 15,
    cleanSheets: 0,
    cost: 12.5,
    totalPoints: 200,
    form: [9, 8, 7, 6, 8],
    status: "available",
    injury: null,
    nextFixture: "vs Arsenal",
    ownership: 45.3,
  },
  {
    id: 6,
    name: "Harry Kane",
    team: "Bayern Munich",
    position: "FWD",
    goals: 22,
    assists: 4,
    cleanSheets: 0,
    cost: 11.5,
    totalPoints: 210,
    form: [7, 9, 8, 7, 9],
    status: "injured",
    injury: "Ankle injury - expected back in 2 weeks",
    nextFixture: "vs Unknown",
    ownership: 30.2,
  },
  {
    id: 7,
    name: "Bruno Fernandes",
    team: "Man United",
    position: "MID",
    goals: 10,
    assists: 9,
    cleanSheets: 0,
    cost: 9.0,
    totalPoints: 185,
    form: [6, 7, 9, 6, 7],
    status: "available",
    injury: null,
    nextFixture: "vs Newcastle",
    ownership: 28.7,
  },
  {
    id: 8,
    name: "Bukayo Saka",
    team: "Arsenal",
    position: "MID",
    goals: 12,
    assists: 7,
    cleanSheets: 0,
    cost: 10.5,
    totalPoints: 195,
    form: [8, 7, 6, 8, 7],
    status: "available",
    injury: null,
    nextFixture: "vs Man City",
    ownership: 42.1,
  },
  {
    id: 9,
    name: "Alisson Becker",
    team: "Liverpool",
    position: "GKP",
    goals: 0,
    assists: 0,
    cleanSheets: 12,
    cost: 5.5,
    totalPoints: 150,
    form: [6, 5, 7, 6, 8],
    status: "available",
    injury: null,
    nextFixture: "vs Tottenham",
    ownership: 22.5,
  },
  {
    id: 10,
    name: "Kieran Trippier",
    team: "Newcastle",
    position: "DEF",
    goals: 1,
    assists: 8,
    cleanSheets: 9,
    cost: 7.0,
    totalPoints: 160,
    form: [5, 6, 8, 7, 6],
    status: "available",
    injury: null,
    nextFixture: "vs Man United",
    ownership: 20.9,
  },
  {
    id: 11,
    name: "James Maddison",
    team: "Tottenham",
    position: "MID",
    goals: 7,
    assists: 5,
    cleanSheets: 0,
    cost: 8.0,
    totalPoints: 140,
    form: [4, 6, 5, 7, 6],
    status: "injured",
    injury: "Knee injury - expected back in 4 weeks",
    nextFixture: "vs Unknown",
    ownership: 15.4,
  },
  {
    id: 12,
    name: "Ollie Watkins",
    team: "Aston Villa",
    position: "FWD",
    goals: 14,
    assists: 8,
    cleanSheets: 0,
    cost: 8.5,
    totalPoints: 175,
    form: [7, 6, 8, 5, 9],
    status: "available",
    injury: null,
    nextFixture: "vs Wolves",
    ownership: 18.6,
  },
  {
    id: 13,
    name: "Marcus Rashford",
    team: "Man United",
    position: "FWD",
    goals: 8,
    assists: 3,
    cleanSheets: 0,
    cost: 9.5,
    totalPoints: 165,
    form: [6, 4, 0, 0, 0],
    status: "suspended",
    injury: "Red card suspension - 2 matches remaining",
    nextFixture: "Suspended",
    ownership: 25.3,
  },
  {
    id: 14,
    name: "Reece James",
    team: "Chelsea",
    position: "DEF",
    goals: 2,
    assists: 4,
    cleanSheets: 8,
    cost: 6.0,
    totalPoints: 145,
    form: [0, 0, 0, 7, 8],
    status: "eliminated",
    injury: "Team eliminated from cup competition",
    nextFixture: "Eliminated",
    ownership: 19.8,
  },
]

const getStatusBadge = (status: string, injury: string | null) => {
  switch (status) {
    case "injured":
      return (
        <Badge variant="destructive" className="flex items-center space-x-1 bg-red-500 text-white">
          <AlertTriangle className="h-3 w-3" />
          <span>Injured</span>
        </Badge>
      )
    case "suspended":
      return (
        <Badge variant="destructive" className="flex items-center space-x-1 bg-orange-500 text-white">
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
    default:
      return (
        <Badge variant="outline" className="text-green-600 border-green-600 bg-green-50">
          <Check className="h-3 w-3 mr-1" />
          Available
        </Badge>
      )
  }
}

const PlayerPoolBrowser = () => {
  return (
    <Table>
      <TableCaption>A list of available players.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">Avatar</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Team</TableHead>
          <TableHead>Position</TableHead>
          <TableHead>Cost</TableHead>
          <TableHead>Total Points</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Next Fixture</TableHead>
          <TableHead className="text-right">Ownership</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockPlayers.map((player) => (
          <TableRow key={player.id}>
            <TableCell>
              <Avatar>
                <AvatarImage src={`https://avatar.vercel.sh/${player.name}.png`} />
                <AvatarFallback>{player.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell>{player.name}</TableCell>
            <TableCell>{player.team}</TableCell>
            <TableCell>{player.position}</TableCell>
            <TableCell>{player.cost}</TableCell>
            <TableCell>{player.totalPoints}</TableCell>
            <TableCell>{getStatusBadge(player.status, player.injury)}</TableCell>
            <TableCell>{player.nextFixture}</TableCell>
            <TableCell className="text-right">{player.ownership}%</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default PlayerPoolBrowser
