import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://adnjardinagem.com.br"),
  title: "ADN Jardinagem e Manutenção",
  description:
    "Landing page institucional da ADN Jardinagem e Manutenção com serviços de jardinagem, poda, paisagismo e manutenção periódica.",
  keywords: [
    "jardinagem",
    "manutenção de jardim",
    "paisagismo",
    "poda",
    "limpeza de terreno",
    "ADN Jardinagem e Manutenção",
  ],
  openGraph: {
    title: "ADN Jardinagem e Manutenção",
    description:
      "Planejamento, execução e manutenção periódica para manter seu espaço bonito, saudável e valorizado.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "ADN Jardinagem e Manutenção",
    description:
      "Soluções completas para jardins, manutenção e paisagismo com visual premium e atendimento personalizado.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
