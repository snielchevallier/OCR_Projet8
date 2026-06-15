import AddPropertyForm from "@/components/forms/AddPropertyForm"

export default function AjouterLogementPage() {
  // TODO: vérifier le rôle owner/admin (en plus de la protection du layout)
  return (
    <main className="p-8">
      <h1>Ajouter un logement</h1>
      <AddPropertyForm />
    </main>
  )
}
