type Props = { className?: string }

const EQUIPMENTS = [
  'Micro-Ondes',      'Clic-clac',
  'Douche italienne', 'Four',
  'Frigo',            'Rangements',
  'WIFI',             'Lit',
  'Parking',          'Bouilloire',
  'Sèche Cheveux',    'SDB',
  'Machine à laver',  'Toilettes sèches',
  'Cuisine équipée',  'Cintres',
  'Télévision',       'Baie vitrée',
  'Chambre Séparée',  'Hotte',
  'Climatisation',    'Baignoire',
  'Frigo Américain',  'Vue Parc',
]

export default function EquipmentsSection({ className }: Props) {
  return (
    <section
      aria-labelledby="equipments-heading"
      className={`rounded-xl bg-white p-6${className ? ` ${className}` : ''}`}
    >
      <h2 id="equipments-heading" className="mb-4 text-base font-semibold text-black">
        Équipements
      </h2>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
        {EQUIPMENTS.map((equipment) => {
          const id = `equipment-${equipment.toLowerCase().replace(/[\s'àâéèêëîïôùûüç]/g, (c) =>
            ({ ' ': '-', "'": '', à: 'a', â: 'a', é: 'e', è: 'e', ê: 'e', ë: 'e', î: 'i', ï: 'i', ô: 'o', ù: 'u', û: 'u', ü: 'u', ç: 'c' }[c] ?? c)
          )}`
          return (
            <li key={equipment} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={id}
                name="equipments"
                value={equipment}
                className="h-4 w-4 cursor-pointer accent-main-red"
              />
              <label htmlFor={id} className="cursor-pointer text-sm text-black">
                {equipment}
              </label>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
