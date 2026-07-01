function SendIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  )
}

export default function MessageInput() {
  return (
    <div className="border-t border-grey-light px-4 py-3 shrink-0">
      <div className="flex items-end gap-3">
        <textarea
          placeholder="Envoyer un message"
          aria-label="Écrire un message"
          rows={1}
          className="flex-1 resize-none bg-transparent text-sm text-black placeholder:text-grey-dark outline-none min-h-6 max-h-32 py-1"
        />
        <button
          type="button"
          aria-label="Envoyer le message"
          className="size-10 shrink-0 rounded-full bg-dark-orange text-white flex items-center justify-center hover:bg-main-red transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-red"
        >
          <SendIcon />
        </button>
      </div>
    </div>
  )
}