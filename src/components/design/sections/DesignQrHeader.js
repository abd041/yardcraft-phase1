import { Container } from "@/components/ui/Container";
import Image from "next/image";

export function DesignQrHeader() {
  return (
    <header className="relative z-10">
      <Container className="flex flex-col items-center gap-1.5 text-center">
        <Image
          src="/images/YardCraftLogo.png"
          alt="YardCraft"
          width={150}
          height={150}
          className="mt-3"
          priority
        />
        <div className="mb-3 text-[9px] font-medium tracking-[0.28em] uppercase text-muted/85 sm:text-[10px]">
          Outdoor living, crafted with precision
        </div>
      </Container>
    </header>
  );
}

