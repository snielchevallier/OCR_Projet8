type Props = {
  label: string
}

export default function TagBadge({ label }: Props) {
  return (
    <span className="border border-dashed border-grey-dark px-2 py-1 text-xs text-grey-dark">
      Je suis un TagBadge — {label}
    </span>
  )
}