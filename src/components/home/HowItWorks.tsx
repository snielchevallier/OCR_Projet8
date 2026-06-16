import HowItWorksCard from "./HowItWorksCard"

const steps = [
  {
    title: "Recherchez",
    description: "Entrez votre destination, vos dates et laissez Kasa faire le reste",
  },
  {
    title: "Réservez",
    description: "Profitez d'une plateforme sécurisée et de profils d'hôtes vérifiés.",
  },
  {
    title: "Vivez l'expérience",
    description: "Installez-vous, profitez de votre séjour, et sentez-vous chez vous, partout.",
  },
]

export default function HowItWorks() {
  return (
    <section className="px-4 md:px-8 py-12 md:py-16">
      <div className="bg-white rounded-2xl p-6 md:p-10">
        <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-black">
          Comment ça marche ?
        </h2>
        <p className="mt-4 text-sm md:text-base text-grey-dark max-w-lg mx-auto">
          Que vous partiez pour un week-end improvisé, des vacances en famille
          ou un voyage professionnel, Kasa vous aide à trouver un lieu qui vous ressemble.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {steps.map((step) => (
          <HowItWorksCard key={step.title} {...step} />
        ))}
      </div>
      </div>
    </section>
  )
}
