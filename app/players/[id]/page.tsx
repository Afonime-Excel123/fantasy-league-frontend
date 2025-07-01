import { PlayerProfilePage } from "@/components/player-profile-page"

export default function PlayerProfile({ params }: { params: { id: string } }) {
  return <PlayerProfilePage playerId={params.id} />
}
