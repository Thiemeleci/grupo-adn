export type SectionId = "inicio" | "servicos" | "antes-depois" | "galeria" | "contato";

export type NavItem = {
  id: SectionId;
  label: string;
};

export type ServiceItem = {
  title: string;
  description: string;
  eyebrow: string;
};

export type MediaSlide = {
  title: string;
  subtitle: string;
  image: string;
  alt: string;
  video?: string;
};

export type GalleryItem = {
  title: string;
  image: string;
  alt: string;
  category: string;
};

export type ContactPerson = {
  name: string;
  phone: string;
  phoneDigits: string;
};

export type BudgetFormState = {
  name: string;
  location: string;
  propertyType: string;
  serviceType: string;
  area: string;
  notes: string;
  contactPerson: string;
};
