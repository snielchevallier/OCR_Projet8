export default function LoginForm() {
  return (
    <form className="w-90 mx-auto mt-4 gap-4 flex flex-col">
      <div className="mb-2">
        <label htmlFor="email" className="block text-sm font-normal text-black">
          Adresse email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="mt-1 p-2 block w-full
                border border-grey-light rounded-sm
                text-sm font-normal
                focus:outline-none focus:ring-2 focus:ring-main-red focus:ring-offset-2"
          placeholder="Votre adresse email"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="password" className="block text-sm font-normal text-black">
          Mot de passe
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className="mt-1 p-2 block w-full
                border border-grey-light rounded-sm
                text-sm font-normal
                focus:outline-none focus:ring-2 focus:ring-main-red focus:ring-offset-2"
          placeholder="Votre mot de passe"
        />
      </div>
      <button
        type="submit"
        className="
              w-full py-2 px-4 
              bg-main-red text-white text-base font-medium
              rounded-xl 
              hover:bg-orange/90 
              focus:outline-none focus:ring-2 focus:ring-main-red focus:ring-offset-2"
      >
        Se connecter
      </button>
    </form>
  )
}