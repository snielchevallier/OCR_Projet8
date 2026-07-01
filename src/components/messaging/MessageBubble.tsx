type Props = {
  content: string
  time: string
  senderName: string
  isOwn: boolean
}

export default function MessageBubble({ content, time, senderName, isOwn }: Props) {
  if (isOwn) {
    return (
      <div className="flex items-start gap-3 justify-end">
        <div className="text-right max-w-[75%]">
          <p className="text-xs text-grey-dark mb-1.5">{senderName} • {time}</p>
          <div className="bg-dark-orange text-white rounded-2xl px-4 py-3 text-sm leading-relaxed text-left">
            {content}
          </div>
        </div>
        <div className="size-10 shrink-0 rounded-sm bg-grey-dark mt-5" aria-hidden="true" />
      </div>
    )
  }

  return (
    <div className="flex items-start gap-3">
      <div className="size-10 shrink-0 rounded-sm bg-grey-light mt-5" aria-hidden="true" />
      <div className="max-w-[75%]">
        <p className="text-xs text-grey-dark mb-1.5">{senderName} • {time}</p>
        <div className="bg-white rounded-2xl px-4 py-3 text-sm leading-relaxed text-black">
          {content}
        </div>
      </div>
    </div>
  )
}