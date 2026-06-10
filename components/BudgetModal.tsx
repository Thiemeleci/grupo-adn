"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

import { buildBudgetMessage, createWhatsAppUrl } from "@/lib/whatsapp";
import { BudgetFormState } from "@/types";

type BudgetModalProps = {
  isOpen: boolean;
  onClose: () => void;
  defaultPhone: string;
};

const initialForm: BudgetFormState = {
  name: "",
  location: "",
  propertyType: "",
  serviceType: "",
  area: "",
  notes: "",
  contactPerson: "Duarte (48) 9653-6538",
};

const inputClassName =
  "mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#6F756F] focus:border-[#3BCB66]/40 focus:ring-2 focus:ring-[#3BCB66]/10";

export function BudgetModal({
  isOpen,
  onClose,
  defaultPhone,
}: BudgetModalProps) {
  const [form, setForm] = useState<BudgetFormState>(initialForm);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = createWhatsAppUrl(defaultPhone, buildBudgetMessage(form));
    window.open(url, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-md"
          aria-hidden={!isOpen}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="budget-modal-title"
            className="glass-panel max-h-[92vh] w-full max-w-3xl overflow-auto rounded-[32px] p-5 sm:p-7"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-[#D4A74A]">
                  Solicitar orçamento
                </p>
                <h2 id="budget-modal-title" className="mt-3 text-3xl font-semibold text-white">
                  Solicitar Orçamento
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5"
                aria-label="Fechar modal de orçamento"
              >
                <X className="h-4 w-4 text-white" />
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="text-sm text-[#D8D8D8]">
                  Nome
                </label>
                <input
                  id="name"
                  required
                  aria-label="Seu nome"
                  className={inputClassName}
                  placeholder="Seu nome"
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="location" className="text-sm text-[#D8D8D8]">
                    Local do serviço
                  </label>
                  <input
                    id="location"
                    required
                    aria-label="Local do serviço"
                    className={inputClassName}
                    placeholder="Bairro / Cidade"
                    value={form.location}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, location: event.target.value }))
                    }
                  />
                </div>

                <div>
                  <label htmlFor="propertyType" className="text-sm text-[#D8D8D8]">
                    Tipo de imóvel
                  </label>
                  <select
                    id="propertyType"
                    required
                    aria-label="Tipo de imóvel"
                    className={inputClassName}
                    value={form.propertyType}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        propertyType: event.target.value,
                      }))
                    }
                  >
                    <option value="">Selecione</option>
                    <option value="Residencial">Residencial</option>
                    <option value="Comercial">Comercial</option>
                    <option value="Condomínio">Condomínio</option>
                    <option value="Chácara / Sítio">Chácara / Sítio</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="serviceType" className="text-sm text-[#D8D8D8]">
                    Serviço desejado
                  </label>
                  <select
                    id="serviceType"
                    required
                    aria-label="Serviço desejado"
                    className={inputClassName}
                    value={form.serviceType}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        serviceType: event.target.value,
                      }))
                    }
                  >
                    <option value="">Selecione</option>
                    <option value="Jardinagem">Jardinagem</option>
                    <option value="Poda e Corte">Poda e Corte</option>
                    <option value="Manutenção">Manutenção</option>
                    <option value="Paisagismo">Paisagismo</option>
                    <option value="Limpeza de Terreno">Limpeza de Terreno</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="area" className="text-sm text-[#D8D8D8]">
                    Área aproximada
                  </label>
                  <input
                    id="area"
                    aria-label="Área aproximada"
                    className={inputClassName}
                    placeholder="Ex: 120m²"
                    value={form.area}
                    onChange={(event) => setForm((current) => ({ ...current, area: event.target.value }))}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="notes" className="text-sm text-[#D8D8D8]">
                  Observações
                </label>
                <textarea
                  id="notes"
                  aria-label="Observações adicionais"
                  className={`${inputClassName} min-h-32 resize-y`}
                  placeholder="Ex.: detalhes do local, preferências, pets, melhor horário para visita..."
                  value={form.notes}
                  onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="contactPerson" className="text-sm text-[#D8D8D8]">
                    Contato responsável
                  </label>
                  <select
                    id="contactPerson"
                    aria-label="Contato responsável"
                    className={inputClassName}
                    value={form.contactPerson}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        contactPerson: event.target.value,
                      }))
                    }
                  >
                    <option value="Duarte (48) 9653-6538">Duarte (48) 9653-6538</option>
                    <option value="Araújo (48) 98834-4799">Araújo (48) 98834-4799</option>
                  </select>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-sm font-medium text-white">Observação</p>
                  <p className="mt-2 text-sm leading-7 text-[#A5A5A5]">
                    Após o início da conversa, envie fotos do local para facilitar a
                    avaliação e agilizar o orçamento.
                  </p>
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full border border-[#D4A74A]/35 bg-gradient-to-r from-[#8C6A22] to-[#D4A74A] px-5 py-3 text-sm font-medium text-white transition hover:scale-[1.01]"
                >
                  Enviar para WhatsApp
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
