"use client"

import { useEffect, useRef } from "react"

type Props = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  subtitle?: string
  confirmLabel: string
  cancelLabel: string
}

export default function Modal({ isOpen, onClose, onConfirm, title, subtitle, confirmLabel, cancelLabel }: Props) {
  const cancelRef = useRef<HTMLButtonElement>(null)
  const confirmRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) return
    cancelRef.current?.focus()

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") { onClose(); return }
      if (e.key !== "Tab") return
      const first = confirmRef.current
      const last = cancelRef.current
      if (!first || !last) return
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl px-8 py-6 shadow-lg flex flex-col items-center gap-6 min-w-64"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <h2 id="modal-title" className="text-base font-medium text-black">{title}</h2>
          {subtitle && <p className="text-sm text-grey-dark">{subtitle}</p>}
        </div>
        <div className="flex gap-4">
          <button
            ref={confirmRef}
            type="button"
            onClick={() => { onConfirm(); onClose() }}
            className="px-6 py-2 rounded-full bg-main-red text-white text-sm font-medium hover:bg-dark-orange transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-red"
          >
            {confirmLabel}
          </button>
          <button
            ref={cancelRef}
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-full border border-main-red text-main-red text-sm font-medium hover:bg-red-50 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-red"
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
