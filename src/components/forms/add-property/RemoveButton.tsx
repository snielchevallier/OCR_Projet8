type Props = {
  label: string
  onClick: () => void
}

export default function RemoveButton({ label, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="shrink-0 text-grey-dark transition-colors hover:text-main-red focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-red"
    >
      <svg
        aria-hidden="true"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <line x1="2" y1="2" x2="12" y2="12" />
        <line x1="12" y1="2" x2="2" y2="12" />
      </svg>
    </button>
  )
}
