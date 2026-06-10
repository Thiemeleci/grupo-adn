import Image from "next/image";
import { ArrowRight, CheckCircle2, MessageCircleMore } from "lucide-react";

import { Reveal } from "@/components/Reveal";

type HeroProps = {
  onTalkToTeam: () => void;
  onViewServices: () => void;
};

const serviceHighlights = [
  "Jardinagem",
  "Poda e Corte",
  "Manutenção",
  "Paisagismo",
  "Limpeza de Terreno",
];

export function Hero({ onTalkToTeam, onViewServices }: HeroProps) {
  return (
    <section
      id="inicio"
      data-section
      className="relative overflow-hidden pt-28 sm:pt-32"
      aria-label="Seção inicial"
    >
      <div className="section-shell">
        <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <Reveal className="relative" y={40}>
            <div className="relative flex flex-col items-center justify-center gap-7 rounded-[34px] py-6 sm:py-10 lg:min-h-[660px]">
              <div className="relative mx-auto flex h-[380px] w-full max-w-[520px] -translate-y-6 items-center justify-center sm:h-[460px] sm:max-w-[620px] sm:-translate-y-10">
                <Image
                  src="/original1.png"
                  alt="Logo oficial ADN Jardinagem e Manutenção"
                  width={720}
                  height={720}
                  priority
                  className="relative h-auto w-[88%] bg-transparent drop-shadow-[0_26px_70px_rgba(0,0,0,0.55)] sm:w-[92%]"
                />
              </div>

              <div className="flex w-full max-w-[420px] flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <button
                  type="button"
                  onClick={onTalkToTeam}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#D4A74A]/35 bg-gradient-to-r from-[#8C6A22] to-[#D4A74A] px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.01] hover:shadow-[0_16px_34px_rgba(182,138,46,0.28)] sm:w-auto"
                  aria-label="Ir para a seção de contato"
                >
                  <MessageCircleMore className="h-4 w-4" />
                  Fale com a equipe
                </button>
                <button
                  type="button"
                  onClick={onViewServices}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10 sm:w-auto"
                  aria-label="Ir para a seção de serviços"
                >
                  Ver serviços
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} y={30}>
            <div className="space-y-5">
              <div className="glass-panel rounded-[30px] p-6 sm:p-8">
                <div className="space-y-5">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#D4A74A]">
                      Jardinagem e Manutenção
                    </p>
                    <p className="mt-4 text-base leading-8 text-[#D8D8D8]">
                      Planejamento, execução e manutenção periódica para manter seu
                      espaço sempre bonito, saudável e valorizado.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="glass-soft rounded-[22px] p-4">
                      <p className="text-base font-semibold text-white">Detalhe</p>
                      <p className="mt-2 text-sm leading-7 text-[#A5A5A5]">
                        Acabamento caprichado e atenção técnica em cada etapa.
                      </p>
                    </div>
                    <div className="glass-soft rounded-[22px] p-4">
                      <p className="text-base font-semibold text-white">Rotina</p>
                      <p className="mt-2 text-sm leading-7 text-[#A5A5A5]">
                        Planos semanais ou mensais pensados para sua necessidade.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-panel rounded-[30px] p-6 sm:p-8">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#D4A74A]">
                      Nossos Serviços
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[#A5A5A5]">
                      Do básico ao completo, com foco em resultado visual, segurança
                      e manutenção inteligente.
                    </p>
                  </div>
                </div>

                <ul className="mt-5 space-y-3">
                  {serviceHighlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-center justify-between rounded-[20px] border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-[#D8D8D8]"
                    >
                      <span className="font-medium text-white">{item}</span>
                      <CheckCircle2 className="h-4 w-4 text-[#3BCB66]" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
