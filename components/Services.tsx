import { Scissors, Shovel, Sprout, Trees } from "lucide-react";

import { SectionTitle } from "@/components/SectionTitle";
import { ServiceCard } from "@/components/ServiceCard";
import { ServiceItem } from "@/types";

type ServicesProps = {
  items: ServiceItem[];
};

const icons = [
  <Scissors key="poda" className="h-6 w-6" />,
  <Shovel key="limpeza" className="h-6 w-6" />,
  <Sprout key="jardinagem" className="h-6 w-6" />,
  <Trees key="paisagismo" className="h-6 w-6" />,
];

export function Services({ items }: ServicesProps) {
  return (
    <section id="servicos" data-section className="pt-24" aria-label="Seção de serviços">
      <div className="section-shell space-y-10">
        <SectionTitle
          eyebrow="Serviços"
          title="Soluções completas para seu jardim"
          description="Mais beleza, segurança e valorização para sua área externa."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item, index) => (
            <ServiceCard
              key={item.title}
              icon={icons[index]}
              eyebrow={item.eyebrow}
              title={item.title}
              description={item.description}
              delay={index * 0.08}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
