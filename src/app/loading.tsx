export default function Loading() {
  return (
    <main className="flex flex-1 w-full max-w-278 flex-col py-32 px-16">
      <div className="grid gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-24 rounded-lg bg-gray-200 dark:bg-gray-800 animate-pulse" />
        ))}
      </div>
    </main>
  )
}