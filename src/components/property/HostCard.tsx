import type { User } from "@/types/user"

type Props = {
  host: Pick<User, "id" | "name" | "picture">
}

export default function HostCard({ host }: Props) {
  return (
    <div className="border border-dashed border-grey-dark p-4">
      <span className="text-sm text-grey-dark">Je suis la HostCard — hôte : {host.name}</span>
    </div>
  )
}