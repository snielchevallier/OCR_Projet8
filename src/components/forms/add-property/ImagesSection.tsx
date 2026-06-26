'use client'

import { useRef, useState } from 'react'
import PlusButton from './PlusButton'
import RemoveButton from './RemoveButton'

type Props = {
  className?: string
  onCoverChange: (file: File | null) => void
  onPicturesChange: (files: File[]) => void
}

export default function ImagesSection({ className, onCoverChange, onPicturesChange }: Props) {
  const coverRef = useRef<HTMLInputElement>(null)
  const [coverFile, setCoverFile] = useState<File | null>(null)

  const addPicRef = useRef<HTMLInputElement>(null)
  const [pictures, setPictures] = useState<File[]>([])

  function handleCoverChange(file: File | null) {
    setCoverFile(file)
    onCoverChange(file)
  }

  function addPicture(file: File) {
    const updated = [...pictures, file]
    setPictures(updated)
    onPicturesChange(updated)
  }

  function removePicture(index: number) {
    const updated = pictures.filter((_, i) => i !== index)
    setPictures(updated)
    onPicturesChange(updated)
  }

  return (
    <section
      aria-labelledby="images-heading"
      className={`flex flex-col gap-6 rounded-xl bg-white p-6${className ? ` ${className}` : ''}`}
    >
      <h2 id="images-heading" className="sr-only">Images</h2>

      {/* Image de couverture */}
      <div className="flex flex-col gap-2">
        <label htmlFor="cover" className="text-sm font-normal text-black">
          Image de couverture
        </label>
        <div className="flex items-center gap-2">
          <div
            aria-hidden="true"
            onClick={() => coverRef.current?.click()}
            className="flex-1 cursor-pointer rounded-sm border border-grey-light px-2 py-1.5 text-sm min-h-9"
          />
          <PlusButton
            onClick={() => coverRef.current?.click()}
            aria-label="Choisir l'image de couverture"
          />
        </div>
        {coverFile && (
          <div className="flex items-center justify-between gap-2 text-sm text-grey-dark">
            <span className="truncate">{coverFile.name}</span>
            <RemoveButton
              label={`Supprimer ${coverFile.name}`}
              onClick={() => handleCoverChange(null)}
            />
          </div>
        )}
        <input
          ref={coverRef}
          id="cover"
          type="file"
          accept="image/*"
          className="sr-only"
          tabIndex={-1}
          onChange={(e) => handleCoverChange(e.target.files?.[0] ?? null)}
        />
      </div>

      {/* Images du logement */}
      <div className="flex flex-col gap-2">
        <label htmlFor="add-picture" className="text-sm font-normal text-black">
          Image du logement
        </label>
        <div className="flex items-center gap-2">
          <div
            aria-hidden="true"
            onClick={() => addPicRef.current?.click()}
            className="flex-1 cursor-pointer rounded-sm border border-grey-light px-2 py-1.5 text-sm min-h-9"
          />
          <PlusButton
            onClick={() => addPicRef.current?.click()}
            aria-label="Ajouter une image du logement"
          />
        </div>
        {pictures.length > 0 && (
          <ul className="flex flex-col gap-1">
            {pictures.map((file, i) => (
              <li key={i} className="flex items-center justify-between gap-2 text-sm text-grey-dark">
                <span className="truncate">{file.name}</span>
                <RemoveButton
                  label={`Supprimer ${file.name}`}
                  onClick={() => removePicture(i)}
                />
              </li>
            ))}
          </ul>
        )}
        <input
          ref={addPicRef}
          id="add-picture"
          type="file"
          accept="image/*"
          className="sr-only"
          tabIndex={-1}
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (!file) return
            addPicture(file)
            e.target.value = ''
          }}
        />
      </div>
    </section>
  )
}
