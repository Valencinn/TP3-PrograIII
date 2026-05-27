"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import ErrorMessage from "./ErrorMessage";
import LoadingMessage from "./LoadingMessage";
import MovieCard from "./MovieCard";
import { API_KEY, BACKDROP_URL, movieEndpoints } from "@/lib/tmdb";

export default function HomeTrending() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTrendingMovies() {
      if (!API_KEY) {
        setError("Falta configurar api key");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(movieEndpoints.trending);
        setMovies(response.data.results || []);
      } catch (err) {
        setError("No se pudieron cargar las peliculas en tendencia.");
      } finally {
        setLoading(false);
      }
    }

    fetchTrendingMovies();
  }, []);

  const featuredMovie = useMemo(() => movies[0], [movies]);
  const visibleMovies = useMemo(() => movies.slice(0, 10), [movies]);

  return (
    <section className="bg-night text-paper">
      <div className="mx-auto w-full max-w-6xl px-5 pb-10 pt-8 md:pb-14 md:pt-10">
        {loading ? <HomeSkeleton /> : null}
        {error ? <ErrorMessage>{error}</ErrorMessage> : null}

        {!loading && !error && featuredMovie ? (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
            <div className="space-y-6">
              <div className="inline-flex rounded-full border border-paper/15 bg-paper/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-mist">
                Tendencia de hoy
              </div>
              <div className="max-w-3xl space-y-4">
                <h1 className="text-4xl font-bold leading-tight tracking-normal md:text-6xl">
                  {featuredMovie.title}
                </h1>
                <p className="max-w-2xl text-base leading-7 text-paper/75 md:text-lg">
                  {featuredMovie.overview ||
                    "Una de las peliculas mas vistas y comentadas del dia en TMDB."}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/movie/${featuredMovie.id}`}
                  className="inline-flex h-11 items-center justify-center rounded-md bg-paper px-5 text-sm font-bold text-night transition hover:bg-mist"
                >
                  Ver detalle
                </Link>
                <Link
                  href="/movies/tendencia"
                  className="inline-flex h-11 items-center justify-center rounded-md border border-paper/20 px-5 text-sm font-bold text-paper transition hover:bg-paper/10"
                >
                  Ver tendencia
                </Link>
              </div>
            </div>

            <div className="relative min-h-[260px] overflow-hidden rounded-lg border border-paper/15 bg-royal/25 shadow-2xl shadow-black/25">
              {featuredMovie.backdrop_path ? (
                <Image
                  src={`${BACKDROP_URL}${featuredMovie.backdrop_path}`}
                  alt={`Imagen de ${featuredMovie.title}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 360px"
                  className="object-cover"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-sm font-semibold text-paper/75">
                  Puntuacion
                </p>
                <p className="mt-1 text-3xl font-bold">
                  {typeof featuredMovie.vote_average === "number"
                    ? featuredMovie.vote_average.toFixed(1)
                    : "S/P"}
                </p>
              </div>
            </div>
          </div>
        ) : null}

        {!loading && !error && visibleMovies.length > 0 ? (
          <div className="mt-10">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-mist">
                  Ahora mismo
                </p>
                <h2 className="mt-1 text-2xl font-bold text-paper">
                  Peliculas en tendencia
                </h2>
              </div>
              <span className="rounded-full bg-paper/10 px-3 py-1 text-sm font-semibold text-paper/80">
                {visibleMovies.length} titulos
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {visibleMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} variant="dark" />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function HomeSkeleton() {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
      <div className="space-y-5">
        <LoadingMessage>Cargando peliculas en tendencia...</LoadingMessage>
        <div className="h-12 max-w-2xl rounded-md bg-paper/10" />
        <div className="h-24 max-w-3xl rounded-md bg-paper/10" />
      </div>
      <div className="min-h-[260px] rounded-lg border border-paper/15 bg-paper/10" />
    </div>
  );
}
