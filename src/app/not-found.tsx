import Button from "@/components/ui/Button"

export default function NotFound() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-8xl font-bold text-main-red">404</h1>
      <p className="mt-4 text-black max-w-sm">
        Il semble que la page que vous cherchez ait pris des vacances… ou n'ait jamais existé.
      </p>
      <div className="mt-8 flex flex-col gap-3 w-40">
        <Button href="/">Accueil</Button>
        <Button href="/logements">Logements</Button>
      </div>
    </main>
  )
}
