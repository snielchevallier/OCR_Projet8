'use client'

import { useState } from 'react'
import Button from "@/components/ui/Button"
import GeneralInfoSection from "@/components/forms/add-property/GeneralInfoSection"
import ImagesSection from "@/components/forms/add-property/ImagesSection"
import HostSection from "@/components/forms/add-property/HostSection"
import EquipmentsSection from "@/components/forms/add-property/EquipmentsSection"
import CategoriesSection from "@/components/forms/add-property/CategoriesSection"

export default function AddPropertyForm() {
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [pictures, setPictures] = useState<File[]>([])
  const [hostPhoto, setHostPhoto] = useState<File | null>(null)
  const [tags, setTags] = useState<string[]>([])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const textData = Object.fromEntries(formData)
        console.log({
          ...textData,
          equipments: formData.getAll('equipments'),
          cover: coverFile?.name ?? null,
          pictures: pictures.map((f) => f.name),
          host_picture: hostPhoto?.name ?? null,
          tags,
        })
      }}
      className="flex flex-col gap-6"
    >

      <div className="flex items-center justify-between">
        <h1 className="text-xl text-black sm:text-2xl">Ajouter une propriété</h1>
        <Button type="submit">Ajouter</Button>
      </div>

      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2">
        <GeneralInfoSection className="lg:row-span-2" />
        <ImagesSection
          onCoverChange={setCoverFile}
          onPicturesChange={setPictures}
        />
        <HostSection onHostPhotoChange={setHostPhoto} />
        <EquipmentsSection />
        <CategoriesSection onTagsChange={setTags} />
      </div>
    </form>
  )
}
