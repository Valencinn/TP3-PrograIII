import Link from "next/link";
import HomeTrending from "@/components/HomeTrending";
import { movieCategories } from "@/lib/tmdb";

export default function Home() {
  return (
    <main className="min-h-screen text-paper">
      <HomeTrending />

      <section className="mx-auto w-full max-w-6xl px-5 py-10 md:py-14">
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-mist">
              Explorar
            </p>
            <h2 className="mt-1 text-3xl font-bold text-paper">
              Categorias de peliculas
            </h2>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {movieCategories.map((category) => (
            <Link
              key={category.key}
              href={`/movies/${category.slug}`}
              className="group min-h-40 rounded-lg border border-line bg-paper/10 p-5 shadow-xl shadow-black/10 outline-none backdrop-blur transition hover:-translate-y-1 hover:border-mist/60 hover:bg-paper/15 focus-visible:ring-2 focus-visible:ring-mist"
            >
              <div className="flex h-full flex-col justify-between gap-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="h-2 w-12 rounded-full bg-mist transition group-hover:w-16 group-hover:bg-royal" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-paper transition group-hover:text-mist">
                    {category.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-paper/60">
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
