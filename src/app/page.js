import Link from "next/link";
import { movieCategories } from "@/lib/tmdb";

export default function Home() {
  return (
    <main className="min-h-screen bg-paper text-night">
      <section className="border-b border-night/10 bg-night">
        <div className="mx-auto w-full max-w-6xl px-5 py-10 text-paper md:py-14">
          <p className="text-sm font-semibold uppercase tracking-wide text-mist">
            TMDB con Next.js
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-normal md:text-5xl">
            Peliculas organizadas por paginas
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-paper/75">
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
            className="group rounded-lg border border-night/10 bg-paper-soft p-5 shadow-sm shadow-night/10 transition hover:-translate-y-1 hover:border-royal/40 hover:shadow-lg hover:shadow-night/15"
          >
            <h2 className="text-xl font-bold text-night transition group-hover:text-royal">
              {category.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-ink-muted">
              {category.description}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
