"use client";

import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type RevealProps = PropsWithChildren<{
  className?: string;
  delay?: number;
  y?: number;
  scale?: number;
}>;

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  scale = 1,
}: RevealProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y, scale }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
