import Link from "next/link";
import Image from "next/image";

import { BRAND } from "@/lib/brand";

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

/**
 * @param {"nav" | "icon" | "mark" | "auth"} [variant="nav"] — nav: mark + wordmark; icon: mark only (compact); mark: larger mark; auth: stacked for sign-in.
 */
export function Logo({ variant = "nav", className }) {
  const mark = (imgClass) => (
    <Image
      src="/images/YardCraftLogo.png"
      alt={BRAND.name}
      width={160}
      height={160}
      className={cx("object-contain", imgClass)}
      priority
    />
  );

  if (variant === "icon") {
    return (
      <Link
        href="/"
        className={cx("inline-flex h-9 w-9 items-center justify-center", className)}
        aria-label={`${BRAND.name} home`}
      >
        {mark("h-full w-full object-contain")}
      </Link>
    );
  }

  if (variant === "mark") {
    return (
      <Link href="/" className={cx("inline-flex shrink-0", className)} aria-label={`${BRAND.name} home`}>
        {mark("h-14 w-14 sm:h-[4.5rem] sm:w-[4.5rem]")}
      </Link>
    );
  }

  if (variant === "auth") {
    return (
      <Link
        href="/"
        className={cx("inline-flex flex-col items-center gap-3 text-center", className)}
        aria-label={`${BRAND.name} home`}
      >
        {mark("h-[88px] w-[88px] sm:h-[100px] sm:w-[100px]")}
        <span className="flex flex-col items-center gap-1.5">
          <span className="font-serif text-[1.85rem] font-semibold leading-none tracking-[-0.03em] text-foreground sm:text-[2.1rem]">
            {BRAND.name}
          </span>
          <span className="max-w-[22ch] text-[13px] font-medium leading-snug tracking-[0.02em] text-muted sm:text-sm">
            {BRAND.tagline}
          </span>
        </span>
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className={cx(
        "inline-flex min-w-0 items-center gap-2.5 sm:gap-3.5",
        className,
      )}
      aria-label={`${BRAND.name} home`}
    >
      {mark("h-12 w-12 shrink-0 sm:h-14 sm:w-14 md:h-16 md:w-16 scale-[4.5]")}
      <span className="flex min-w-0 flex-col justify-center leading-[1.05]">
        <span className="font-serif text-[1.35rem] font-semibold tracking-[-0.03em] text-foreground sm:text-2xl md:text-[1.75rem]">
          {BRAND.name}
        </span>
        <span className="mt-1 hidden max-w-[18rem] text-pretty text-[11px] font-medium leading-snug tracking-[0.02em] text-muted sm:block sm:text-xs md:max-w-88">
          {BRAND.tagline}
        </span>
      </span>
    </Link>
  );
}
