'use client'

import { useState } from 'react'
import PlusButton from './PlusButton'
import RemoveButton from './RemoveButton'

type Props = {
  className?: string
  onTagsChange: (tags: string[]) => void
}

export default function CategoriesSection({ className, onTagsChange }: Props) {
  const [tags, setTags] = useState<string[]>([])
  const [input, setInput] = useState('')

  function addTag() {
    const trimmed = input.trim()
    if (!trimmed || tags.includes(trimmed)) return
    const updated = [...tags, trimmed]
    setTags(updated)
    onTagsChange(updated)
    setInput('')
  }

  function removeTag(index: number) {
    const updated = tags.filter((_, i) => i !== index)
    setTags(updated)
    onTagsChange(updated)
  }

  return (
    <section
      aria-labelledby="categories-heading"
      className={`flex flex-col gap-4 rounded-xl bg-white p-6${className ? ` ${className}` : ''}`}
    >
      <h2 id="categories-heading" className="text-base font-semibold text-black">
        Catégories
      </h2>

      {tags.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <li
              key={tag}
              className="flex items-center gap-1.5 rounded-lg bg-grey-light px-4 py-2 text-sm text-black"
            >
              <span>{tag}</span>
              <RemoveButton
                label={`Supprimer le tag ${tag}`}
                onClick={() => removeTag(i)}
              />
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor="new-tag" className="text-sm font-normal text-black">
          Ajouter une catégorie personnalisée
        </label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            id="new-tag"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addTag()
              }
            }}
            placeholder="Nouveau tag"
            className="flex-1 rounded-sm border border-grey-light px-2 py-1.5 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-main-red focus-visible:ring-offset-2"
          />
          <PlusButton onClick={addTag} aria-label="Ajouter le tag" />
        </div>
      </div>
    </section>
  )
}
