'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="flex flex-1 w-full max-w-278 flex-col items-center justify-center py-32 px-16 gap-4">
      <p className="text-red-600 dark:text-red-400">{error.message || 'Une erreur est survenue'}</p>
      <button
        onClick={reset}
        className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 focus-visible:outline focus-visible:outline-2"
      >
        Réessayer
      </button>
    </main>
  )
}