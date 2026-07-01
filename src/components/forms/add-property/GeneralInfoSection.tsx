type Props = { className?: string }

const inputCls =
  "mt-1 p-2 block w-full border border-grey-light rounded-sm text-sm font-normal" +
  " focus:outline-none focus-visible:ring-2 focus-visible:ring-main-red focus-visible:ring-offset-2"

const labelCls = "block text-sm font-normal text-black"

export default function GeneralInfoSection({ className }: Props) {
  return (
    <section
      aria-labelledby="general-info-heading"
      className={`flex flex-col gap-4 rounded-xl bg-white p-6${className ? ` ${className}` : ""}`}
    >
      <h2 id="general-info-heading" className="sr-only">Informations générales</h2>

      <div>
        <label htmlFor="title" className={labelCls}>
          Titre de la propriété
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          placeholder="Ex : Appartement cosy au coeur de paris"
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="description" className={labelCls}>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={5}
          placeholder="Décrivez votre propriété en détail..."
          className={`${inputCls} resize-y`}
        />
      </div>

      <div>
        <label htmlFor="zipcode" className={labelCls}>
          Code postal
        </label>
        <input
          type="text"
          id="zipcode"
          name="zipcode"
          required
          inputMode="numeric"
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="location" className={labelCls}>
          Localisation
        </label>
        <input
          type="text"
          id="location"
          name="location"
          required
          className={inputCls}
        />
      </div>
    </section>
  )
}
