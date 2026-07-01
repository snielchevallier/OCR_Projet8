import Link from "next/link"
import AddPropertyForm from "@/components/forms/AddPropertyForm"

export default function AjouterLogementPage() {
  return (
    <main>
      <div className="px-4 pt-6 sm:px-8">
        <Link
          href="/logements"
          className="inline-flex items-center gap-2 rounded-xl bg-grey-light px-4 py-4 text-sm text-grey-dark transition-colors focus-visible:ring-1 focus-visible:ring-main-red"
        >
          <span aria-hidden="true">←</span>
          Retour
        </Link>
      </div>

      <div className="mt-6 px-4 pb-16 sm:px-8">
        <AddPropertyForm />
      </div>
    </main>
  )
}
