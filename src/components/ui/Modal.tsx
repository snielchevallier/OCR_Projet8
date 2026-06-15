import type { ReactNode } from "react"

type Props = {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export default function Modal({ isOpen, onClose, title, children }: Props) {
  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 border border-dashed border-grey-dark bg-white/80 p-8"
    >
      <h2 id="modal-title" className="text-sm text-grey-dark">Je suis une Modal — {title}</h2>
      <div>{children}</div>
      <button type="button" onClick={onClose} className="mt-4 text-xs text-grey-dark underline">
        Fermer (Escape)
      </button>
    </div>
  )
}