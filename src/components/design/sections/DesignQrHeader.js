import { Container } from "@/components/ui/Container";
import Image from "next/image";

import { BRAND } from "@/lib/brand";

export function DesignQrHeader() {
  return (
    <header className="relative z-10 pb-8 sm:pb-10 lg:pb-12 lg:pt-1">
      <Container className="flex flex-col items-center gap-0 px-4 text-center">
        <Image
          src="/images/YardCraftLogo.png"
          alt={BRAND.name}
          width={260}
          height={260}
          className="mt-1 block h-[124px] w-[124px] object-contain drop-shadow-[0_12px_40px_rgba(0,0,0,0.35)] sm:mt-1.5 sm:h-[144px] sm:w-[144px] lg:mt-0 lg:h-[200px] lg:w-[200px]"
          priority
        />
        <div className="mt-3 max-w-[min(22rem,90vw)] text-pretty font-serif text-[0.9375rem] font-semibold leading-snug tracking-[-0.015em] text-foreground/95 sm:mt-4 sm:text-lg sm:leading-snug lg:text-xl">
          {BRAND.tagline}
        </div>
      </Container>
    </header>
  );
}
