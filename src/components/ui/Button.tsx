import Link from "next/link"
import type { ButtonHTMLAttributes } from "react"

type Variant = "primary" | "secondary" | "ghost"

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  /** Si fourni, rend un `<Link>` Next.js au lieu d'un `<button>`. Les props HTML button sont alors ignorées. */
  href?: string
}

const variants: Record<Variant, string> = {
  primary:   "bg-dark-orange text-white hover:bg-main-red",
  secondary: "border border-dark-orange text-dark-orange hover:bg-light-orange",
  ghost:     "text-main-red hover:underline",
}

const base = "inline-flex items-center justify-center px-8 py-2.5 rounded-lg text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-red"

export default function Button({ variant = "primary", href, children, className, ...props }: Props) {
  const cls = `${base} ${variants[variant]}${className ? ` ${className}` : ""}`

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    )
  }

  return (
    <button {...props} className={cls}>
      {children}
    </button>
  )
}
