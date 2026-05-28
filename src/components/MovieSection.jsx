import ErrorMessage from "./ErrorMessage";
import LoadingMessage from "./LoadingMessage";
import MovieCard from "./MovieCard";

//componente para mostar seccion de peliculas
export default function MovieSection({
  title,
  movies,
  loading,
  error,
  eyebrow = "Catalogo",
  emptyMessage = "No hay peliculas para mostrar.",
}) {
  return (
    <section className="space-y-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-mist">
            {eyebrow}
          </p>
          <h2 className="mt-1 text-3xl font-bold text-paper">{title}</h2>
        </div>
        {!loading && !error ? (
          <span className="rounded-full border border-line bg-paper/10 px-3 py-1 text-sm font-semibold text-paper/80">
            {movies.length} titulos
          </span>
        ) : null}
      </div>

      {loading ? <LoadingMessage /> : null}
      {error ? <ErrorMessage /> : null}

      {!loading && !error && movies.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-5">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : null}

      {!loading && !error && movies.length === 0 ? (
        <div className="rounded-lg border border-line bg-paper/10 px-5 py-8 text-center text-sm font-semibold text-paper/70 shadow-xl shadow-black/10">
          {emptyMessage}
        </div>
      ) : null}
    </section>
  );
}
