import { Container } from "@/components/ui/Container";
import Image from "next/image";

export function DesignQrHeader() {
  return (
    <header className="relative z-10">
      <Container className="flex flex-col items-center gap-2 text-center">
        <Image
          src="/images/YardCraftLogo.png"
          alt="YardCraft"
          width={150}
          height={150}
          className="mt-4"
          priority
        />
        <div className="mb-4 text-[9px] font-medium tracking-[0.28em] uppercase text-muted/90 sm:text-[10px]">
          Outdoor living, crafted with precision
        </div>
      </Container>
    </header>
  );
}

