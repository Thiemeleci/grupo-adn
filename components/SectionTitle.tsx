import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionTitleProps) {
  return (
    <Reveal
      className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}
    >
      <div className="space-y-3">
        {eyebrow ? (
          <span className="inline-flex rounded-full border border-[#D4A74A]/25 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-[#D4A74A]">
            {eyebrow}
          </span>
        ) : null}
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.7rem]">
          {title}
        </h2>
        <p className="text-sm leading-7 text-[#A5A5A5] sm:text-base">
          {description}
        </p>
      </div>
    </Reveal>
  );
}
