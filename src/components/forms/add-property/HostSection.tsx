'use client'

import { useRef, useState } from 'react'
import PlusButton from './PlusButton'
import RemoveButton from './RemoveButton'

type Props = {
  className?: string
  onHostPhotoChange: (file: File | null) => void
}

const inputCls =
  'mt-1 p-2 block w-full border border-grey-light rounded-sm text-sm font-normal' +
  ' focus:outline-none focus-visible:ring-2 focus-visible:ring-main-red focus-visible:ring-offset-2'

export default function HostSection({ className, onHostPhotoChange }: Props) {
  const photoRef = useRef<HTMLInputElement>(null)
  const [photoFile, setPhotoFile] = useState<File | null>(null)

  function handlePhotoChange(file: File | null) {
    setPhotoFile(file)
    onHostPhotoChange(file)
  }

  return (
    <section
      aria-labelledby="host-heading"
      className={`flex flex-col gap-4 rounded-xl bg-white p-6${className ? ` ${className}` : ''}`}
    >
      <h2 id="host-heading" className="sr-only">Hôte</h2>

      {/* Nom de l'hôte */}
      <div>
        <label htmlFor="host_name" className="block text-sm font-normal text-black">
          Nom de l'hôte
        </label>
        <input
          type="text"
          id="host_name"
          name="host_name"
          required
          className={inputCls}
        />
      </div>

      {/* Photo de profil */}
      <div className="flex flex-col gap-2">
        <label htmlFor="host_picture" className="text-sm font-normal text-black">
          Photo de profil
        </label>
        <div className="flex items-center gap-2">
          <div
            aria-hidden="true"
            onClick={() => photoRef.current?.click()}
            className="flex-1 cursor-pointer rounded-sm border border-grey-light px-2 py-1.5 text-sm min-h-9"
          />
          <PlusButton
            onClick={() => photoRef.current?.click()}
            aria-label="Choisir la photo de profil"
          />
        </div>
        {photoFile && (
          <div className="flex items-center justify-between gap-2 text-sm text-grey-dark">
            <span className="truncate">{photoFile.name}</span>
            <RemoveButton
              label={`Supprimer ${photoFile.name}`}
              onClick={() => handlePhotoChange(null)}
            />
          </div>
        )}
        <input
          ref={photoRef}
          id="host_picture"
          type="file"
          accept="image/*"
          className="sr-only"
          tabIndex={-1}
          onChange={(e) => handlePhotoChange(e.target.files?.[0] ?? null)}
        />
      </div>
    </section>
  )
}
