import { BudgetFormState } from "@/types";

const digitsOnly = (value: string) => value.replace(/\D/g, "");

export const createWhatsAppUrl = (phone: string, message: string) => {
  const formattedPhone = digitsOnly(phone);
  return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
};

export const buildBudgetMessage = (form: BudgetFormState) => {
  const lines = [
    "Olá, gostaria de solicitar um orçamento.",
    "",
    `Nome: ${form.name || "-"}`,
    `Local: ${form.location || "-"}`,
    `Tipo de imóvel: ${form.propertyType || "-"}`,
    `Serviço: ${form.serviceType || "-"}`,
    `Área: ${form.area || "-"}`,
    `Observações: ${form.notes || "-"}`,
  ];

  return lines.join("\n");
};
