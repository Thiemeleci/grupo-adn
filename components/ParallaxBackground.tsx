"use client";

import Image from "next/image";

export function ParallaxBackground() {
  const backgroundImageUrl =
    "https://casaeconstrucao.org/wp-content/uploads/2024/02/6-arbusto-buxinho-Florear.jpg";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#020503]"
    >
      <div
        className="absolute inset-[-8%] opacity-45 will-change-transform"
        style={{ transform: "translate3d(0, 0, 0) scale(1.08)" }}
      >
        <Image
          src={backgroundImageUrl}
          alt=""
          fill
          priority
          className="object-cover blur-[2px]"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(59,203,102,0.22),transparent_18%),radial-gradient(circle_at_80%_10%,rgba(212,167,74,0.16),transparent_18%),linear-gradient(180deg,rgba(2,5,3,0.4),rgba(2,5,3,0.82))]" />
      <div className="absolute inset-0 bg-black/48" />
    </div>
  );
}
