type Props = {
  propertyId: string
  isFavorite?: boolean
}

export default function FavoriteButton({ propertyId, isFavorite = false }: Props) {
  return (
    <button
      type="button"
      aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
      className="border border-dashed border-grey-dark p-2 text-xs text-grey-dark"
    >
      Je suis FavoriteButton — id: {propertyId} — favori: {String(isFavorite)}
    </button>
  )
}