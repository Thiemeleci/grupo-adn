"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { cn } from "@/lib/utils";
import { GalleryItem } from "@/types";

type GalleryProps = {
  items: GalleryItem[];
};

export function Gallery({ items }: GalleryProps) {
  const plugin = useMemo(() => Autoplay({ delay: 3600, stopOnInteraction: false }), []);
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true }, [plugin]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  return (
    <section id="galeria" data-section className="pt-24" aria-label="Seção galeria">
      <div className="section-shell space-y-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle
            eyebrow="Galeria"
            title="Galeria de Projetos"
            description="Conheça alguns dos nossos trabalhos."
          />

          <Reveal>
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#D8D8D8]">
              Carrossel de imagens
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="glass-panel rounded-[32px] p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-lg font-semibold text-white">
                  Confira alguns dos nossos trabalhos
                </p>
                <p className="mt-1 text-sm text-[#A5A5A5]">
                  Arraste para o lado ou use os botões.
                </p>
              </div>

              <div className="hidden items-center gap-2 sm:flex">
                <button
                  type="button"
                  onClick={scrollPrev}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
                  aria-label="Imagem anterior da galeria"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={scrollNext}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
                  aria-label="Próxima imagem da galeria"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="overflow-hidden" ref={emblaRef}>
              <div className="-ml-4 flex">
                {items.map((item) => (
                  <div
                    key={item.title}
                    className="min-w-0 flex-[0_0_100%] pl-4 sm:flex-[0_0_50%] xl:flex-[0_0_33.333%] 2xl:flex-[0_0_25%]"
                  >
                    <div className="group relative aspect-[4/4.4] overflow-hidden rounded-[26px] border border-white/10">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        loading="lazy"
                        className="object-cover transition duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <span className="inline-flex rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.22em] text-[#D4A74A]">
                          {item.category}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {items.map((item, index) => (
                  <button
                    key={`${item.title}-${index}`}
                    type="button"
                    onClick={() => emblaApi?.scrollTo(index)}
                    className={cn(
                      "h-2.5 rounded-full transition",
                      selectedIndex === index ? "w-7 bg-[#D4A74A]" : "w-2.5 bg-white/25"
                    )}
                    aria-label={`Ir para a imagem ${index + 1} da galeria`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2 sm:hidden">
                <button
                  type="button"
                  onClick={scrollPrev}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
                  aria-label="Imagem anterior da galeria no mobile"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={scrollNext}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
                  aria-label="Próxima imagem da galeria no mobile"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
