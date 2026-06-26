type Props = { label: string }

export default function DateSeparator({ label }: Props) {
  return (
    <div className="flex items-center gap-4 my-2" role="separator" aria-label={label}>
      <div className="flex-1 h-px bg-grey-light" aria-hidden="true" />
      <span className="text-xs text-grey-dark shrink-0">{label}</span>
      <div className="flex-1 h-px bg-grey-light" aria-hidden="true" />
    </div>
  )
}