type Props = {
  size?: "sm" | "md" | "lg"
}

const sizes = {
  sm: "w-4 h-4 border-2",
  md: "w-8 h-8 border-2",
  lg: "w-12 h-12 border-3",
}

export default function Spinner({ size = "md" }: Props) {
  return (
    <span
      role="status"
      aria-label="Chargement en cours"
      className={`inline-block rounded-full border-grey-light border-t-main-red animate-spin ${sizes[size]}`}
    />
  )
}
