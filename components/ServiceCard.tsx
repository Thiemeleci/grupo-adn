import { ReactNode } from "react";

import { Reveal } from "@/components/Reveal";

type ServiceCardProps = {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  delay?: number;
};

export function ServiceCard({
  icon,
  eyebrow,
  title,
  description,
  delay = 0,
}: ServiceCardProps) {
  return (
    <Reveal delay={delay}>
      <article className="glass-panel group h-full rounded-[28px] p-5 transition duration-500 hover:-translate-y-1.5 hover:border-[#3BCB66]/30 hover:shadow-[0_26px_60px_rgba(5,12,7,0.5)]">
        <div className="flex h-full flex-col gap-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1A7F3C] to-[#D4A74A] text-white shadow-[0_12px_30px_rgba(45,170,79,0.22)] transition duration-500 group-hover:scale-105">
            {icon}
          </div>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#D4A74A]">
              {eyebrow}
            </p>
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <p className="text-sm leading-7 text-[#A5A5A5]">{description}</p>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
