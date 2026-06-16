type Props = { title: string; description: string }

export default function HowItWorksCard({ title, description }: Props) {
  return (
    <div className="bg-dark-orange rounded-2xl p-8 min-h-52 text-white">
      <h3 className="font-bold text-lg mb-6">{title}</h3>
      <p className="text-sm leading-relaxed">{description}</p>
    </div>
  )
}
