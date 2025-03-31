"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navlinks({
  links,
}: {
  links: {
    href: string;
    label: string;
  }[];
}) {
  const pathname = usePathname();
  return (
    <>
      {links.length > 0 && links.map(({ href, label }) => {
        return (
          <Link
            href={href}
            key={href}
            className={`${
              pathname === href ? "text-primary" : "text-muted-foreground"
            } hover:text-primary px-3 py-2 rounded-md text-sm font-medium`}
          >
            {label}
          </Link>
        );
      })}
    </>
  );
}
