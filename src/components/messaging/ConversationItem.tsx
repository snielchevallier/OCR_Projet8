type Props = {
  name: string
  preview: string
  time: string
  unread: boolean
  isSelected: boolean
  onClick: () => void
}

export default function ConversationItem({ name, preview, time, unread, isSelected, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={isSelected ? "true" : undefined}
      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-grey-light focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-main-red ${isSelected ? "bg-grey-light" : ""}`}
    >
      <div className="size-12 shrink-0 rounded-sm bg-grey-light" aria-hidden="true" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-sm text-black truncate">{name}</span>
          <span className="text-xs text-grey-dark shrink-0">{time}</span>
        </div>
        <div className="flex items-center justify-between gap-2 mt-0.5">
          <span className="text-xs text-grey-dark truncate">{preview}</span>
          {unread && (
            <span
              className="size-2 rounded-full bg-main-red shrink-0"
              aria-label="Message non lu"
            />
          )}
        </div>
      </div>
    </button>
  )
}
