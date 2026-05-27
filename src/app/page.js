import Link from "next/link";
import HomeTrending from "@/components/HomeTrending";
import { movieCategories } from "@/lib/tmdb";

export default function Home() {
  return (
    <main className="min-h-screen bg-paper text-night">
      <HomeTrending />

      <section className="mx-auto w-full max-w-6xl px-5 py-10 md:py-12">
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-royal">
              Explorar
            </p>
            <h2 className="mt-1 text-3xl font-bold text-night">
              Categorias de peliculas
            </h2>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {movieCategories.map((category) => (
            <Link
              key={category.key}
              href={`/movies/${category.slug}`}
              className="group min-h-40 rounded-lg border border-night/10 bg-paper-soft p-5 shadow-sm shadow-night/10 transition hover:-translate-y-1 hover:border-royal/40 hover:bg-white hover:shadow-lg hover:shadow-night/15"
            >
              <div className="flex h-full flex-col justify-between gap-6">
                <span className="h-2 w-12 rounded-full bg-mist transition group-hover:w-16 group-hover:bg-royal" />
                <div>
                  <h3 className="text-lg font-bold text-night transition group-hover:text-royal">
                    {category.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-ink-muted">
                    {category.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
