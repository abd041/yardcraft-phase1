import { Container } from "@/components/ui/Container";
import Image from "next/image";

export function DesignQrHeader() {
  return (
    <header className="relative z-10 pb-8 sm:pb-10 lg:pb-12 lg:pt-1">
      <Container className="flex flex-col items-center gap-0 px-4 text-center">
        <Image
          src="/images/YardCraftLogo.png"
          alt="YardCraft"
          width={220}
          height={220}
          className="mt-1 block h-[104px] w-[104px] object-contain sm:mt-1.5 sm:h-[120px] sm:w-[120px] lg:mt-0 lg:h-[180px] lg:w-[180px]"
          priority
        />
        <div className="mt-0 text-[9px] font-medium leading-none tracking-[0.28em] uppercase text-muted">
          Outdoor living, crafted with precision
        </div>
      </Container>
    </header>
  );
}
