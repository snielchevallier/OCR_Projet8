"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { BLUR_PLACEHOLDER } from "@/lib/image"

type Props = {
  images: string[]
  initialIndex: number
  title: string
  onClose: () => void
}

type Direction = "next" | "prev" | null

export default function Carousel({ images, initialIndex, title, onClose }: Props) {
  const [current, setCurrent] = useState(initialIndex)
  const [direction, setDirection] = useState<Direction>(null)
  const [overlayVisible, setOverlayVisible] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const total = images.length

  const prev = useCallback(() => {
    setDirection("prev")
    setCurrent((i) => (i - 1 + total) % total)
  }, [total])

  const next = useCallback(() => {
    setDirection("next")
    setCurrent((i) => (i + 1) % total)
  }, [total])

  // Fade-in de l'overlay au montage
  useEffect(() => {
    const id = requestAnimationFrame(() => setOverlayVisible(true))
    return () => cancelAnimationFrame(id)
  }, [])

  // Focus le bouton fermer à l'ouverture
  useEffect(() => {
    closeButtonRef.current?.focus()
  }, [])

  // Empêche le scroll du body pendant que le carrousel est ouvert
  useEffect(() => {
    const original = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = original }
  }, [])

  // Navigation clavier : ←/→ + Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [onClose, prev, next])

  // Focus trap dans la dialog
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return
      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute("disabled"))
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }

    dialog.addEventListener("keydown", handleTab)
    return () => dialog.removeEventListener("keydown", handleTab)
  }, [])

  const slideClass =
    direction === "next" ? "animate-slide-from-right"
    : direction === "prev" ? "animate-slide-from-left"
    : "animate-fade-in"

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Carrousel photos — ${title}`}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/92 transition-opacity duration-200 ${overlayVisible ? "opacity-100" : "opacity-0"}`}
    >
      {/* Bouton fermer */}
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        aria-label="Fermer le carrousel"
        className="absolute right-4 top-4 rounded-full p-2 text-white hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
      >
        <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Compteur */}
      <p
        aria-live="polite"
        aria-atomic="true"
        className="absolute top-5 left-1/2 -translate-x-1/2 text-sm text-white/80 tabular-nums"
      >
        {current + 1} / {total}
      </p>

      {/* Image courante — key force le remontage pour rejouer l'animation */}
      <div
        key={current}
        className={`relative mx-auto h-[75vh] w-full max-w-5xl px-20 ${slideClass}`}
      >
        <Image
          src={images[current]}
          alt={`Photo ${current + 1} sur ${total} de ${title}`}
          fill
          className="object-contain"
          sizes="(min-width: 1024px) 80vw, 100vw"
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
          priority
        />
      </div>

      {/* Bouton précédent */}
      {total > 1 && (
        <button
          type="button"
          onClick={prev}
          aria-label="Photo précédente"
          className="absolute left-3 rounded-full bg-white/15 p-3 text-white hover:bg-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        >
          <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}

      {/* Bouton suivant */}
      {total > 1 && (
        <button
          type="button"
          onClick={next}
          aria-label="Photo suivante"
          className="absolute right-3 rounded-full bg-white/15 p-3 text-white hover:bg-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        >
          <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}
    </div>
  )
}