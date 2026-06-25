import Link from "next/link"
import PropertyGallery from "@/components/property/PropertyGallery"
import HostCard from "@/components/property/HostCard"
import TagBadge from "@/components/property/TagBadge"
import { getProperty } from "@/actions/properties"

type Props = {
  params: Promise<{ idSlug: string }>
  searchParams: Promise<{ from?: string }>
}

export default async function PropertyDetailPage({ params, searchParams }: Props) {
  const { idSlug } = await params
  const { from } = await searchParams
  const id = idSlug.split("--")[0]
  const property = await getProperty(id)

  const allowedRoutes = ["/", "/logements", "/favoris"]
  const backHref = from && allowedRoutes.includes(from) ? from : "/logements"
  const backLabel =
    backHref === "/" ? "Retour à l'accueil"
    : backHref === "/favoris" ? "Retour aux favoris"
    : "Retour aux annonces"

  return (
    <main>
      <div className="px-4 pt-6 sm:px-8">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 rounded-xl bg-grey-light px-4 py-4 text-sm text-grey-dark transition-colors focus-visible:ring-1 focus-visible:ring-main-red"
        >
          <span aria-hidden="true">←</span>
          {backLabel}
        </Link>
      </div>

      <div className="mt-6 px-4 pb-16 sm:px-8">
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[1fr_360px] lg:items-start">

          {/* Colonne principale : gallery + infos */}
          <div className="flex flex-col gap-8">
            <PropertyGallery
              pictures={property.pictures}
              cover={property.cover}
              title={property.title}
            />

            <div className="flex flex-col gap-8 rounded-xl bg-white p-6 lg:p-8">
              <div>
                <h1 className="text-2xl font-bold text-black sm:text-3xl">{property.title}</h1>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-grey-dark">
                  <svg
                    aria-hidden="true"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {property.location}
                </p>
              </div>

              <p className="text-base leading-relaxed text-black">{property.description}</p>

              <section aria-labelledby="equipments-heading">
                <h2 id="equipments-heading" className="mb-4 text-xl font-semibold text-black">
                  Équipements
                </h2>
                <ul className="flex flex-wrap gap-3" aria-label="Liste des équipements">
                  {property.equipments.map((equipment) => (
                    <li key={equipment}>
                      <TagBadge label={equipment} />
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="tags-heading">
                <h2 id="tags-heading" className="mb-4 text-xl font-semibold text-black">
                  Catégorie
                </h2>
                <ul className="flex flex-wrap gap-3" aria-label="Liste des catégories">
                  {property.tags.map((tag) => (
                    <li key={tag}>
                      <TagBadge label={tag} />
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          {/* Colonne droite : HostCard sticky */}
          <div className="lg:sticky lg:top-8">
            <HostCard
              host={property.host}
              rating={Math.round(property.rating_avg)}
            />
          </div>

        </div>
      </div>
    </main>
  )
}