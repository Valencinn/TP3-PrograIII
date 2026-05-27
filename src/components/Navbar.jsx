"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { movieCategories } from "@/lib/tmdb";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="sticky top-0 z-20 border-b border-paper/15 bg-night/90 shadow-lg shadow-night/15 backdrop-blur-xl">
      <nav className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-3 lg:flex-row lg:items-center lg:justify-between">
        <Link
          href="/"
          className="flex w-fit items-center gap-3 text-xl font-bold text-paper"
        >
          <span className="rounded-full bg-royal/10 px-2 py-1">Frame</span> 
        </Link>

        <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0">
          <Link
            href="/"
            className={`shrink-0 rounded-md px-3 py-2 text-sm font-semibold transition ${isHome
                ? "bg-paper text-night shadow-sm"
                : "text-paper/75 hover:bg-paper/10 hover:text-paper"
              }`}
          >
            Inicio
          </Link>
          {movieCategories.map((category) => {
            const href = `/movies/${category.slug}`;
            const isActive = pathname === href;

            return (
              <Link
                key={category.key}
                href={href}
                className={`shrink-0 rounded-md px-3 py-2 text-sm font-semibold transition ${isActive
                    ? "bg-paper text-night shadow-sm"
                    : "text-paper/75 hover:bg-paper/10 hover:text-paper"
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
