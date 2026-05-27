"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { movieCategories } from "@/lib/tmdb";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
        <Link href="/" className="text-xl font-bold text-zinc-950">
          TMDB Movies
        </Link>

        <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0">
          {movieCategories.map((category) => {
            const href = `/movies/${category.slug}`;
            const isActive = pathname === href;

            return (
              <Link
                key={category.key}
                href={href}
                className={`shrink-0 rounded-md px-3 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-zinc-950 text-white"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950"
                }`}
              >
                {category.title}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}

