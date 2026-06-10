"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { NavItem } from "@/types";

type NavbarProps = {
  items: NavItem[];
  activeSection: string;
  onNavigate: (id: NavItem["id"]) => void;
  onOpenBudget: () => void;
};

export function Navbar({
  items,
  activeSection,
  onNavigate,
  onOpenBudget,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!drawerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", onPointerDown);
    }

    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [isOpen]);

  const handleNavigate = (id: NavItem["id"]) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <>
      <header data-navbar className="fixed inset-x-0 top-0 z-40">
        <div className="section-shell pt-3 sm:pt-5">
          <div
            className={cn(
              "flex items-center justify-between rounded-full border px-3 py-2 transition duration-500 sm:px-4",
              isScrolled
                ? "glass-panel border-white/10"
                : "border-transparent bg-transparent"
            )}
          >
            <button
              type="button"
              onClick={() => handleNavigate("inicio")}
              className="rounded-full px-2 py-1 text-left"
              aria-label="Voltar para a seção início"
            >
              <p className="text-lg font-semibold tracking-wide text-white">ADN</p>
              <p className="text-xs text-[#A5A5A5]">Jardinagem e Manutenção</p>
            </button>

            <nav
              className="hidden items-center gap-1 rounded-full border border-white/5 bg-white/[0.03] p-1 lg:flex"
              aria-label="Seções principais"
            >
              {items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavigate(item.id)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm text-[#D8D8D8] transition hover:text-white",
                    activeSection === item.id &&
                      "bg-white/10 text-white shadow-[inset_0_0_0_1px_rgba(212,167,74,0.24)]"
                  )}
                  aria-current={activeSection === item.id ? "page" : undefined}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenBudget}
                className="hidden rounded-full border border-[#D4A74A]/35 bg-gradient-to-r from-[#8C6A22] to-[#D4A74A] px-5 py-3 text-sm font-medium text-white transition hover:scale-[1.02] hover:shadow-[0_16px_34px_rgba(182,138,46,0.24)] sm:inline-flex"
                aria-label="Abrir modal para solicitar orçamento"
              >
                Solicitar Orçamento
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden"
                aria-label="Abrir menu mobile"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/55 backdrop-blur-sm transition duration-300 lg:hidden",
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        aria-hidden={!isOpen}
      >
        <div
          ref={drawerRef}
          className={cn(
            "glass-panel absolute right-0 top-0 h-full w-[82vw] max-w-sm rounded-l-[32px] border-r-0 p-5 transition duration-300",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold text-white">ADN Jardinagem</p>
              <p className="text-sm text-[#A5A5A5]">Atendimento premium</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5"
              aria-label="Fechar menu mobile"
            >
              <X className="h-4 w-4 text-white" />
            </button>
          </div>

          <nav className="flex flex-col gap-2" aria-label="Navegação mobile">
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigate(item.id)}
                className={cn(
                  "rounded-2xl px-4 py-3 text-left text-base text-[#D8D8D8] transition hover:bg-white/5 hover:text-white",
                  activeSection === item.id && "bg-white/10 text-white"
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => {
              onOpenBudget();
              setIsOpen(false);
            }}
            className="mt-8 inline-flex w-full items-center justify-center rounded-full border border-[#D4A74A]/35 bg-gradient-to-r from-[#8C6A22] to-[#D4A74A] px-5 py-3 text-sm font-medium text-white"
          >
            Solicitar Orçamento
          </button>
        </div>
      </div>
    </>
  );
}
