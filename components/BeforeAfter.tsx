"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { cn } from "@/lib/utils";
import { MediaSlide } from "@/types";

type BeforeAfterProps = {
  beforeSlides: MediaSlide[];
  afterSlides: MediaSlide[];
};

type ShowcasePanelProps = {
  badge: string;
  title: string;
  slides: MediaSlide[];
  accent?: "green" | "gold";
};

function ShowcasePanel({
  badge,
  title,
  slides,
  accent = "gold",
}: ShowcasePanelProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoPoster, setVideoPoster] = useState<string | null>(null);
  const totalSlides = Math.max(slides.length, 1);
  const currentSlide = slides[selectedIndex] ?? slides[0];
  const currentVideo = currentSlide?.video ?? null;

  const goPrev = useCallback(() => {
    setSelectedIndex((current) => (current - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goNext = useCallback(() => {
    setSelectedIndex((current) => (current + 1) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    setIsPlaying(false);
  }, [selectedIndex, currentVideo]);

  useEffect(() => {
    if (!currentVideo) {
      setVideoPoster(null);
      return;
    }

    let canceled = false;
    const video = document.createElement("video");
    video.preload = "metadata";
    video.muted = true;
    video.playsInline = true;
    video.src = currentVideo;

    const capture = () => {
      if (canceled) {
        return;
      }

      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth || 1280;
      canvas.height = video.videoHeight || 720;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setVideoPoster(null);
        return;
      }

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      try {
        const dataUrl = canvas.toDataURL("image/jpeg", 0.82);
        setVideoPoster(dataUrl);
      } catch {
        setVideoPoster(null);
      }
    };

    const onLoadedMetadata = () => {
      try {
        video.currentTime = Math.min(0.12, (video.duration || 1) / 10);
      } catch {
        capture();
      }
    };

    const onSeeked = () => capture();
    const onLoadedData = () => capture();

    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("seeked", onSeeked);
    video.addEventListener("loadeddata", onLoadedData);

    return () => {
      canceled = true;
      video.pause();
      video.removeAttribute("src");
      video.load();
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("loadeddata", onLoadedData);
    };
  }, [currentVideo]);

  const slideKey = useMemo(
    () => `${badge}-${selectedIndex}-${currentSlide?.title ?? "slide"}`,
    [badge, selectedIndex, currentSlide?.title]
  );

  return (
    <article className="glass-panel rounded-[30px] p-5 sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span
            className={cn(
              "inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em]",
              accent === "gold"
                ? "border-[#D4A74A]/30 bg-[#D4A74A]/10 text-[#F1C76D]"
                : "border-[#3BCB66]/30 bg-[#3BCB66]/10 text-[#7AE596]"
            )}
          >
            {badge}
          </span>
          <h3 className="mt-4 text-2xl font-semibold text-white">{title}</h3>
          <p className="mt-2 text-sm leading-7 text-[#A5A5A5]">
            Use as setas para avançar ou voltar.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goPrev}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
            aria-label={`Voltar no painel ${badge.toLowerCase()}`}
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
            aria-label={`Avançar no painel ${badge.toLowerCase()}`}
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-[26px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={slideKey}
            initial={{ opacity: 0, y: 14, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.99 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/3] overflow-hidden rounded-[26px] border border-white/10"
          >
            {currentSlide ? (
              <>
                {currentSlide.video ? (
                  <div className="absolute inset-0">
                    {isPlaying ? (
                      <video
                        key={`${currentSlide.video}-play`}
                        className="absolute inset-0 h-full w-full object-cover"
                        src={currentSlide.video}
                        poster={videoPoster ?? currentSlide.image}
                        controls
                        preload="metadata"
                        playsInline
                        autoPlay
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsPlaying(true)}
                        className="absolute inset-0"
                        aria-label={`Reproduzir vídeo ${badge.toLowerCase()}`}
                      >
                        <Image
                          src={videoPoster ?? currentSlide.image}
                          alt={currentSlide.alt}
                          fill
                          unoptimized
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 44vw"
                        />
                        <div className="absolute inset-0 bg-black/25" />
                        <span className="absolute left-1/2 top-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/45 p-5 text-white shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
                          <Play className="h-6 w-6" />
                        </span>
                      </button>
                    )}
                  </div>
                ) : (
                  <Image
                    src={currentSlide.image}
                    alt={currentSlide.alt}
                    fill
                    loading="lazy"
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 44vw"
                  />
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 pb-16">
                  <p className="text-lg font-semibold text-white">{currentSlide.title}</p>
                  <p className="mt-1 text-sm text-[#D8D8D8]">{currentSlide.subtitle}</p>
                </div>
              </>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {slides.map((slide, index) => (
            <span
              key={`${slide.title}-${index}`}
              className={cn(
                "h-2.5 rounded-full transition",
                selectedIndex === index
                  ? accent === "gold"
                    ? "w-7 bg-[#D4A74A]"
                    : "w-7 bg-[#3BCB66]"
                  : "w-2.5 bg-white/25"
              )}
              aria-hidden="true"
            />
          ))}
        </div>
        <p className="text-xs uppercase tracking-[0.25em] text-[#A5A5A5]">
          {selectedIndex + 1} / {slides.length}
        </p>
      </div>
    </article>
  );
}

export function BeforeAfter({ beforeSlides, afterSlides }: BeforeAfterProps) {
  return (
    <section
      id="antes-depois"
      data-section
      className="pt-24"
      aria-label="Seção antes e depois"
    >
      <div className="section-shell space-y-10">
        <SectionTitle
          eyebrow="Transformações"
          title="Antes e Depois"
          description="Confira a transformação dos espaços que cuidamos."
        />

        <div className="grid gap-6 xl:grid-cols-2">
          <Reveal>
            <ShowcasePanel badge="ANTES" title="Antes da manutenção" slides={beforeSlides} />
          </Reveal>
          <Reveal delay={0.08}>
            <ShowcasePanel
              badge="DEPOIS"
              title="Depois da manutenção"
              slides={afterSlides}
              accent="green"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
