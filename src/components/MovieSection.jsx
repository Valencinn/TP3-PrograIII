import ErrorMessage from "./ErrorMessage";
import LoadingMessage from "./LoadingMessage";
import MovieCard from "./MovieCard";

export default function MovieSection({ title, movies, loading, error }) {
  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-2xl font-bold text-zinc-950">{title}</h2>
        {!loading && !error ? (
          <span className="text-sm text-zinc-500">{movies.length} titulos</span>
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

