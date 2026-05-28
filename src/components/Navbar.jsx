"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { movieCategories } from "@/lib/tmdb";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const isHome = pathname === "/";
  const isSearch = pathname === "/search";


  //es la busqueda, cuando clickeamos la lupa: busca el valor de lo pedido, busca el query como parametro
  function handleSubmit(event) {
    event.preventDefault();
    const query = search.trim();

    if (!query) {
      return;
    }

    router.push(`/search?query=${encodeURIComponent(query)}`);
    setSearch("");
  }

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-midnight/80 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <nav className="grid w-full gap-3 px-5 py-3 lg:grid-cols-[minmax(220px,1fr)_auto_minmax(220px,1fr)] lg:items-center">
        <Link
          href="/"
          className="flex w-fit items-center gap-3 text-paper lg:justify-self-start"
        >
          <span className="grid h-9 w-9 place-items-center rounded-md bg-paper text-sm font-black text-night shadow-lg shadow-black/20">
            F
          </span>
          <span className="text-xl font-bold">Frame</span>
        </Link>

        <div className="flex gap-1.5 overflow-x-auto pb-1 lg:justify-self-center lg:pb-0">
          <Link
            href="/"
            className={`shrink-0 rounded-md px-3 py-2 text-sm font-semibold transition ${isHome
              ? "bg-paper text-night shadow-sm"
              : "text-paper/65 hover:bg-paper/10 hover:text-paper"
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
                  : "text-paper/65 hover:bg-paper/10 hover:text-paper"
                  }`}
              >
                {category.title}
              </Link>
            );
          })}
        </div>

        <form
          onSubmit={handleSubmit}
          className={`flex h-11 w-full items-center gap-2 rounded-md border px-2 transition lg:max-w-[340px] lg:justify-self-end ${isSearch
            ? "border-mist bg-paper text-night shadow-sm"
            : "border-line bg-paper/10 text-paper focus-within:border-mist focus-within:bg-paper focus-within:text-night"
            }`}
        >
          <label htmlFor="movie-search" className="sr-only">
            Buscar peliculas
          </label>
          <input
            id="movie-search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar peliculas"
            className="min-w-0 flex-1 bg-transparent px-2 text-sm font-semibold outline-none placeholder:text-current/55"
          />
          <button
            type="submit"
            aria-label="Buscar peliculas"
            className="grid h-8 w-8 place-items-center rounded-md text-paper transition hover:bg-royal disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!search.trim()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
              aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </form>
      </nav>
    </header>
  );
}
