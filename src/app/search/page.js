import SearchResults from "@/components/SearchResults";

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const query =
    typeof params?.query === "string" ? params.query.trim() : "";

  return (
    <main className="min-h-screen text-paper">
      <section className="border-b border-line bg-midnight/80">
        <div className="mx-auto w-full max-w-6xl px-5 py-10 text-paper md:py-14">
          <p className="text-sm font-bold uppercase tracking-wide text-mist">
            Buscador
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-normal md:text-5xl">
            Encontrar peliculas
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-paper/75">
            Usa el buscador para encontrar titulos de TMDB y abrir su ficha con
            un click.
          </p>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl px-5 py-10">
        <SearchResults query={query} />
      </div>
    </main>
  );
}
