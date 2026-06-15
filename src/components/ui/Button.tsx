import type { ButtonHTMLAttributes } from "react"

type Variant = "primary" | "secondary" | "ghost"

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
}

export default function Button({ variant = "primary", children, ...props }: Props) {
  return (
    <button
      {...props}
      className="border border-dashed border-grey-dark px-4 py-2 text-sm text-grey-dark"
    >
      [Button:{variant}] {children}
    </button>
  )
}