type Props = {
  onClick: () => void
  'aria-label': string
}

export default function PlusButton({ onClick, 'aria-label': ariaLabel }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="rounded-lg bg-dark-orange p-2 text-white transition-colors 
      hover:bg-main-red 
      focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-red
      cursor-pointer"
    >
      <svg
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <line x1="8" y1="2" x2="8" y2="14" />
        <line x1="2" y1="8" x2="14" y2="8" />
      </svg>
    </button>
  )
}
