type Props = {
  label: string
}

export default function TagBadge({ label }: Props) {
  return (
    <span className="inline-block rounded-lg bg-grey-light 
    px-4 py-2 
    text-sm text-black">
      {label}
    </span>
  )
}
