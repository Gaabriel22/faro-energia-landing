import { cn } from "@/lib/utils"

type SectionIntroProps = {
  eyebrow: string
  title: string
  description?: string
  className?: string
  align?: "start" | "center"
}

export function SectionIntro({
  align = "start",
  className,
  description,
  eyebrow,
  title,
}: SectionIntroProps) {
  return (
    <header
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <p className="mb-5 text-xs font-bold tracking-[0.18em] uppercase">
        {eyebrow}
      </p>
      <h2 className="font-heading text-headline text-balance">{title}</h2>
      {description ? (
        <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-current/72">
          {description}
        </p>
      ) : null}
    </header>
  )
}
