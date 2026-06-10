import { ArrowRight, Camera, Mail } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import { ContactPerson } from "@/types";

type ContactProps = {
  contacts: ContactPerson[];
};

export function Contact({ contacts }: ContactProps) {
  return (
    <section id="contato" data-section className="pt-24" aria-label="Seção contato">
      <div className="section-shell space-y-10">
        <SectionTitle
          eyebrow="Contato"
          title="Fale Conosco"
          description="Peça um orçamento e nos diga o que você precisa."
        />

        <div className="grid gap-6 xl:grid-cols-2">
          <Reveal className="h-full">
            <div className="glass-panel h-full rounded-[30px] p-6 sm:p-8">
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold text-white">Contatos</h3>
                <p className="text-sm leading-7 text-[#A5A5A5]">
                  Atendimento direto, sem enrolação. Escolha um número e mande uma
                  mensagem informando seu bairro, cidade e o tipo de serviço.
                </p>
              </div>

              <div className="mt-6 space-y-4">
                {contacts.map((contact) => (
                  <div
                    key={contact.phoneDigits}
                    className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-lg font-semibold text-white">{contact.name}</p>
                        <p className="mt-1 text-sm text-[#D8D8D8]">{contact.phone}</p>
                      </div>
                      <a
                        href={createWhatsAppUrl(contact.phoneDigits, "Olá, gostaria de mais informações sobre os serviços da ADN Jardinagem e Manutenção.")}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-[#3BCB66]/25 bg-[#1A7F3C]/25 px-4 py-3 text-sm font-medium text-white transition hover:bg-[#1A7F3C]/35"
                        aria-label={`Abrir conversa no WhatsApp com ${contact.name}`}
                      >
                        WhatsApp
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="h-full">
            <div className="glass-panel h-full rounded-[30px] p-6 sm:p-8">
              <div className="space-y-8">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.22em] text-[#D4A74A]">
                    Resposta rápida
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold text-white">Email</h3>
                    <p className="text-sm leading-7 text-[#A5A5A5]">
                      Para mais informações, entre em contato conosco por e-mail.
                    </p>
                    <a
                      href="mailto:adnjardinagem.contato@gmail.com"
                      className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:bg-white/10"
                      aria-label="Abrir email para ADN Jardinagem e Manutenção"
                    >
                      <Mail className="h-4 w-4 text-[#D4A74A]" />
                      adnjardinagem.contato@gmail.com
                    </a>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold text-white">Instagram</h3>
                    <p className="text-sm leading-7 text-[#A5A5A5]">
                      Siga-nos no Instagram e acompanhe nossos projetos de
                      jardinagem, paisagismo e transformação de espaços verdes.
                    </p>
                    <a
                      href="https://www.instagram.com/adn_jardinagem"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:bg-white/10"
                      aria-label="Abrir perfil do Instagram da ADN Jardinagem e Manutenção"
                    >
                      <Camera className="h-4 w-4 text-[#D4A74A]" />
                      @adn_jardinagem
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
