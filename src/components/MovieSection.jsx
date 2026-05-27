import ErrorMessage from "./ErrorMessage";
import LoadingMessage from "./LoadingMessage";
import MovieCard from "./MovieCard";

export default function MovieSection({ title, movies, loading, error }) {
  return (
    <section className="space-y-4">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-royal">
            Catalogo
          </p>
          <h2 className="mt-1 text-3xl font-bold text-night">{title}</h2>
        </div>
        {!loading && !error ? (
          <span className="rounded-full bg-royal/10 px-3 py-1 text-sm font-semibold text-royal">
            {movies.length} titulos
          </span>
        ) : null}
      </div>

      {loading ? <LoadingMessage /> : null}
      {error ? <ErrorMessage /> : null}

      {!loading && !error ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : null}
    </section>
  );
}
