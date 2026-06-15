import PropertyGrid from "@/components/property/PropertyGrid"

export default function FavorisPage() {
  return (
    <main className="p-8">
      <h1>Mes favoris</h1>
      {/* TODO: récupérer les favoris via getFavorites(userId) */}
      <PropertyGrid properties={[]} />
    </main>
  )
}
