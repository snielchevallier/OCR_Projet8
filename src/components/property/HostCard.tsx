import Image from "next/image"
import Link from "next/link"
import type { User } from "@/types/user"
import { BLUR_PLACEHOLDER } from "@/lib/image"

type Props = {
  host: Pick<User, "id" | "name" | "picture">
  rating: number
}

export default function HostCard({ host, rating }: Props) {
  return (
    <aside aria-label="Informations sur l'hôte" className="flex flex-col gap-6 rounded-2xl bg-white p-6">
      <h2 className="text-xl font-semibold text-black">Votre hôte</h2>

      <div className="flex items-center gap-4">
        <div className="relative size-16 shrink-0 overflow-hidden rounded-full">
          {host.picture ? (
            <Image
              src={host.picture}
              alt={`Photo de ${host.name}`}
              fill
              className="object-cover"
              sizes="64px"
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
            />
          ) : (
            <div className="size-full bg-grey-dark flex items-center justify-center" aria-hidden="true">
              <span className="text-xl font-semibold text-white select-none">
                {host.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-lg font-medium text-black">{host.name}</span>
          <div className="flex items-center gap-1" aria-label={`Note : ${rating} sur 5`}>
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="text-main-red"
            >
              <path d="M10 1l2.39 5.26L18 7.27l-4 3.9.94 5.5L10 14.02 5.06 16.67l.94-5.5-4-3.9 5.61-.01z" />
            </svg>
            <span className="text-lg font-medium text-black">{rating}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          className="w-full rounded-lg bg-main-red py-3 text-center font-medium text-white transition-colors hover:bg-dark-orange focus-visible:ring-2 focus-visible:ring-main-red focus-visible:ring-offset-2"
        >
          Contacter l&apos;hôte
        </button>
        <Link
          href="/messagerie"
          className="w-full rounded-lg bg-main-red py-3 text-center font-medium text-white transition-colors hover:bg-dark-orange focus-visible:ring-2 focus-visible:ring-main-red focus-visible:ring-offset-2"
        >
          Envoyer un message
        </Link>
      </div>
    </aside>
  )
}
