import Link from "next/link";
import { movieCategories } from "@/lib/tmdb";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50">
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-10 md:py-14">
          <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            TMDB con Next.js
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-normal text-zinc-950 md:text-5xl">
            Peliculas organizadas por paginas
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">
            Cada acceso del navbar abre una pagina distinta y hace un pedido a
            su endpoint correspondiente de TMDB.
          </p>
        </div>
      </section>

      <div className="mx-auto grid w-full max-w-6xl gap-4 px-5 py-10 sm:grid-cols-2 lg:grid-cols-3">
        {movieCategories.map((category) => (
          <Link
            key={category.key}
            href={`/movies/${category.slug}`}
            className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <h2 className="text-xl font-bold text-zinc-950">
              {category.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              {category.description}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
