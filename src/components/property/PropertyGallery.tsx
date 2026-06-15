type Props = {
  pictures: string[]
  cover: string
  title: string
}

export default function PropertyGallery({ pictures, cover, title }: Props) {
  return (
    <div className="border border-dashed border-grey-dark p-4">
      <span className="text-sm text-grey-dark">
        Je suis la PropertyGallery (mosaïque) — {pictures.length + 1} images pour &quot;{title}&quot;
      </span>
    </div>
  )
}