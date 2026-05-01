import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-3">
      <Image
        src="/images/YardCraftLogo.png"
        alt="YardCraft"
        width={120}
        height={120}
        className="h-[120px] w-[120px] object-contain"
        priority
      />
    </Link>
  );
}
