import PropertyGallery from "@/components/property/PropertyGallery"
import HostCard from "@/components/property/HostCard"
import TagBadge from "@/components/property/TagBadge"

type Props = {
  params: Promise<{ idSlug: string }>
}

export default async function PropertyDetailPage({ params }: Props) {
  const { idSlug } = await params
  // TODO: extraire l'id → idSlug.split('--')[0], puis appeler getProperty(id)

  return (
    <main className="p-8">
      <p className="text-sm text-grey-dark">← Retour aux annonces</p>
      <p className="mt-4 text-sm text-grey-dark">Je suis la page Détail logement — param: {idSlug}</p>

      <div className="mt-4 border border-dashed border-grey-dark p-4">
        <PropertyGallery pictures={[]} cover="" title={idSlug} />
      </div>

      <div className="mt-4 grid grid-cols-[1fr_auto] gap-8">
        <div className="border border-dashed border-grey-dark p-4">
          <p className="text-sm text-grey-dark">Titre · Localisation · Description</p>
          <div className="mt-2">
            <p className="text-xs text-grey-dark">Équipements :</p>
            <TagBadge label="Exemple équipement" />
          </div>
          <div className="mt-2">
            <p className="text-xs text-grey-dark">Catégorie :</p>
            <TagBadge label="Exemple catégorie" />
          </div>
        </div>
        <HostCard host={{ id: 0, name: "Hôte debug", picture: null }} />
      </div>
    </main>
  )
}
