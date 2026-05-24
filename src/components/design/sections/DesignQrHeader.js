import { Container } from "@/components/ui/Container";
import Image from "next/image";

import { BRAND } from "@/lib/brand";

export function DesignQrHeader() {
  return (
    <header className="relative z-10 pb-0 max-md:pb-0 md:pb-1">
      <Container className="flex flex-col items-center px-4 pt-2 text-center max-md:pt-1.5 max-md:pb-0 sm:pt-3">
        <Image
          src="/images/YardCraftLogo.png"
          alt={BRAND.name}
          width={260}
          height={260}
          priority
          className="h-[3.25rem] w-auto sm:h-[4.25rem] lg:h-[5.25rem]"
        />
      </Container>
    </header>
  );
}
