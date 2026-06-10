"use client";

import { useEffect, useState } from "react";

import { BeforeAfter } from "@/components/BeforeAfter";
import { BudgetModal } from "@/components/BudgetModal";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { ParallaxBackground } from "@/components/ParallaxBackground";
import { Services } from "@/components/Services";
import { ContactPerson, GalleryItem, MediaSlide, NavItem, ServiceItem } from "@/types";

const navItems: NavItem[] = [
  { id: "inicio", label: "Início" },
  { id: "servicos", label: "Serviços" },
  { id: "antes-depois", label: "Antes/Depois" },
  { id: "galeria", label: "Galeria" },
  { id: "contato", label: "Contato" },
];

const services: ServiceItem[] = [
  {
    eyebrow: "Crescimento controlado",
    title: "Poda e Corte",
    description:
      "Controle de crescimento, limpeza e modelagem para um jardim mais saudável e seguro.",
  },
  {
    eyebrow: "Preparação do espaço",
    title: "Limpeza de Terreno",
    description:
      "Remoção de excesso de vegetação e preparação do ambiente para novos projetos.",
  },
  {
    eyebrow: "Cuidado recorrente",
    title: "Jardinagem",
    description:
      "Criação, organização e cuidados gerais para manter áreas verdes com beleza e vitalidade.",
  },
  {
    eyebrow: "Design externo",
    title: "Paisagismo",
    description:
      "Composição de canteiros, caminhos e iluminação para valorizar o imóvel com elegância.",
  },
];

const beforeSlides: MediaSlide[] = [
  {
    title: "Vídeo 1 (antes)",
    subtitle: "Clique para reproduzir e ver como estava o espaço.",
    image: "/placeholder-project.svg",
    alt: "Área antes da manutenção com mato alto e gramado irregular.",
    video: "/video1-antes.mp4",
  },
  {
    title: "Vídeo 2 (antes)",
    subtitle: "Clique para reproduzir e ver como estava o espaço.",
    image: "/placeholder-project.svg",
    alt: "Vídeo antes da manutenção no segundo layout.",
    video: "/video2-antes.mp4",
  },
  {
    title: "Vídeo 3 (antes)",
    subtitle: "Clique para reproduzir e ver como estava o espaço.",
    image: "/placeholder-project.svg",
    alt: "Vídeo antes da manutenção no terceiro layout.",
    video: "/video3-antes.mp4",
  },
  {
    title: "Vídeo 4 (antes)",
    subtitle: "Clique para reproduzir e ver como estava o espaço.",
    image: "/placeholder-project.svg",
    alt: "Vídeo antes da manutenção no quarto layout.",
    video: "/video4-antes.mp4",
  },
  {
    title: "Vídeo 5 (antes)",
    subtitle: "Clique para reproduzir e ver como estava o espaço.",
    image: "/placeholder-project.svg",
    alt: "Vídeo antes da manutenção no quinto layout.",
    video: "/video5-antes.mp4",
  },
];

const afterSlides: MediaSlide[] = [
  {
    title: "Vídeo 1 (depois)",
    subtitle: "Clique para reproduzir e conferir o acabamento final.",
    image: "/placeholder-project.svg",
    alt: "Área depois da manutenção com gramado aparado e acabamento limpo.",
    video: "/video1-depois.mp4",
  },
  {
    title: "Vídeo 2 (depois)",
    subtitle: "Clique para reproduzir e conferir o acabamento final.",
    image: "/placeholder-project.svg",
    alt: "Vídeo depois da manutenção no segundo layout.",
    video: "/video2-depois.mp4",
  },
  {
    title: "Vídeo 3 (depois)",
    subtitle: "Clique para reproduzir e conferir o acabamento final.",
    image: "/placeholder-project.svg",
    alt: "Vídeo depois da manutenção no terceiro layout.",
    video: "/video3-depois.mp4",
  },
  {
    title: "Vídeo 4 (depois)",
    subtitle: "Clique para reproduzir e conferir o acabamento final.",
    image: "/placeholder-project.svg",
    alt: "Vídeo depois da manutenção no quarto layout.",
    video: "/video4-depois.mp4",
  },
  {
    title: "Vídeo 5 (depois)",
    subtitle: "Clique para reproduzir e conferir o acabamento final.",
    image: "/placeholder-project.svg",
    alt: "Vídeo depois da manutenção no quinto layout.",
    video: "/video5-depois.mp4",
  },
];

const galleryItems: GalleryItem[] = [
  {
    title: "Limpeza terreno",
    category: "Antes",
    image: "/cliente1-antes.jpeg",
    alt: "Projeto de jardim frontal com canteiros e gramado aparado.",
  },
  {
    title: "Limpeza",
    category: "Depois",
    image: "/cliente1-depois.jpeg",
    alt: "Área com arbustos podados de forma estratégica.",
  },
  {
    title: "Espaço gourmet verde",
    category: "Antes",
    image: "/cliente2-antes.jpeg",
    alt: "Área gourmet com paisagismo e vegetação ornamental.",
  },
  {
    title: "Canteiro linear",
    category: "Depois",
    image: "/cliente2-depois.jpeg",
    alt: "Canteiro linear com manutenção periódica e acabamento limpo.",
  },
  {
    title: "Entrada valorizada",
    category: "Antes",
    image: "/cliente3-antes.jpeg",
    alt: "Entrada de residência com paisagismo e jardim valorizado.",
  },
  {
    title: "Terreno revitalizado",
    category: "Depois",
    image: "/cliente3-depois.jpeg",
    alt: "Terreno revitalizado após limpeza e manutenção.",
  },
];

const contacts: ContactPerson[] = [
  {
    name: "Araújo",
    phone: "(48) 98834-4799",
    phoneDigits: "5548988344799",
  },
  {
    name: "Duarte",
    phone: "(48) 9653-6538",
    phoneDigits: "554896536538",
  },
];

export function LandingPage() {
  const [activeSection, setActiveSection] = useState<NavItem["id"]>("inicio");
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section]")
    );

    if (!sections.length) {
      return;
    }

    let frame = 0;

    const getTop = (element: HTMLElement) =>
      element.getBoundingClientRect().top + window.scrollY;

    const updateActiveSection = () => {
      const marker = window.scrollY + window.innerHeight * 0.34;
      let current = sections[0]?.id as NavItem["id"];

      for (const section of sections) {
        if (!section.id) {
          continue;
        }
        if (getTop(section) <= marker) {
          current = section.id as NavItem["id"];
        }
      }

      setActiveSection(current);
    };

    const onScroll = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        updateActiveSection();
        frame = 0;
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const handleNavigate = (id: NavItem["id"]) => {
    setActiveSection(id);
    const target = document.getElementById(id);
    if (!target) {
      return;
    }

    const header = document.querySelector<HTMLElement>("[data-navbar]");
    const headerHeight = header?.getBoundingClientRect().height ?? 0;
    const targetTop = target.getBoundingClientRect().top + window.scrollY;
    const offset = headerHeight + 10;

    window.scrollTo({
      top: Math.max(0, targetTop - offset),
      behavior: "smooth",
    });
  };

  return (
    <>
      <ParallaxBackground />
      <Navbar
        items={navItems}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenBudget={() => setIsBudgetOpen(true)}
      />

      <main className="relative overflow-hidden pb-12">
        <Hero
          onTalkToTeam={() => handleNavigate("contato")}
          onViewServices={() => handleNavigate("servicos")}
        />
        <Services items={services} />
        <BeforeAfter beforeSlides={beforeSlides} afterSlides={afterSlides} />
        <Gallery items={galleryItems} />
        <Contact contacts={contacts} />
      </main>

      <Footer />

      <BudgetModal
        isOpen={isBudgetOpen}
        onClose={() => setIsBudgetOpen(false)}
        defaultPhone={contacts[1].phoneDigits}
      />
    </>
  );
}
