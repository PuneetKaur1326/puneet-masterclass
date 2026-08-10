import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface ContainerProps {
  children: ReactNode
  className?: string
  id?: string
}

export function Container({ children, className, id }: ContainerProps) {
  return (
    <div
      id={id}
      className={cn("mx-auto w-full max-w-[1280px] px-6 md:px-8", className)}
    >
      {children}
    </div>
  )
}

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
  dark?: boolean
}

export function Section({ children, className, id, dark }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-24 lg:py-32",
        dark ? "bg-[var(--color-foreground)] text-white" : "",
        className
      )}
    >
      {children}
    </section>
  )
}
