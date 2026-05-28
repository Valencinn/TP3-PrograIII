"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import ErrorMessage from "./ErrorMessage";
import LoadingMessage from "./LoadingMessage";
import MovieCard from "./MovieCard";
import { API_KEY, BACKDROP_URL, IMAGE_URL, movieEndpoints } from "@/lib/tmdb";

export default function HomeTrending() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTrendingMovies() {
      if (!API_KEY) {

        //si no hay api key, mostramos error
        setError("Falta configurar api key");
        setLoading(false);
        return;
      }

      //si hay api key probamos la conexion a la api y obtenemos lo pedido en el endpoint
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

  //obtenemos la pelicula destacada(la primera de la lista) ylas siguientes 10 para mostrar en la seccion de tendencia
  const featuredMovie = useMemo(() => movies[0], [movies]);
  const visibleMovies = useMemo(() => movies.slice(0, 10), [movies]);
  const heroBackground = featuredMovie?.backdrop_path
    ? {
      backgroundImage: `linear-gradient(90deg, rgba(8, 12, 36, 0.96), rgba(8, 12, 36, 0.72), rgba(8, 12, 36, 0.92)), url(${BACKDROP_URL}${featuredMovie.backdrop_path})`,
    }
    : undefined;

  //returneamos el componente con la pelicula
  return (
    <section
      className="border-b border-line bg-midnight bg-cover bg-center text-paper"
      style={heroBackground}
    >
      <div className="mx-auto w-full max-w-6xl px-5 pb-12 pt-10 md:pb-16 md:pt-16">
        {loading ? <HomeSkeleton /> : null}
        {error ? <ErrorMessage>{error}</ErrorMessage> : null}
        {!loading && !error && featuredMovie ? (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-center">
            <div className="space-y-7">
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex rounded-full border border-line bg-paper/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-mist backdrop-blur">
                  Tendencia de hoy
                </div>
                <span className="text-sm font-semibold text-paper/55">
                  Actualizado por TMDB
                </span>
              </div>
              <div className="max-w-3xl space-y-4">
                <h1 className="text-4xl font-black leading-tight tracking-normal md:text-6xl">
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
                  className="inline-flex h-11 items-center justify-center rounded-md bg-paper px-5 text-sm font-bold text-night shadow-lg shadow-black/20 transition hover:bg-mist"
                >
                  Abrir pelicula
                </Link>
                <Link
                  href="/movies/tendencia"
                  className="inline-flex h-11 items-center justify-center rounded-md border border-paper/20 px-5 text-sm font-bold text-paper transition hover:bg-paper/10"
                >
                  Ver tendencia
                </Link>
              </div>
            </div>

            <Link
              href={`/movie/${featuredMovie.id}`}
              className="group relative aspect-[2/3] w-full max-w-[320px] overflow-hidden rounded-lg border border-line bg-surface shadow-2xl shadow-black/35 outline-none transition hover:-translate-y-1 hover:border-mist/70 focus-visible:ring-2 focus-visible:ring-mist lg:ml-auto"
            >
              {featuredMovie.poster_path ? (
                <Image
                  src={`${IMAGE_URL}${featuredMovie.poster_path}`}
                  alt={`Poster de ${featuredMovie.title}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 80vw, 320px"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent" />
            </Link>
          </div>
        ) : null}

        {!loading && !error && visibleMovies.length > 0 ? (
          <div className="mt-10">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-mist">
                  Ahora mismo
                </p>
                <h2 className="mt-1 text-2xl font-bold text-paper">
                  Peliculas en tendencia
                </h2>
              </div>
              <span className="rounded-full border border-line bg-paper/10 px-3 py-1 text-sm font-semibold text-paper/80">
                {visibleMovies.length} titulos
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-5">
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
//muestra un esquema de carga meintras obtenemos la data
function HomeSkeleton() {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-end">
      <div className="space-y-5">
        <LoadingMessage>Cargando peliculas en tendencia...</LoadingMessage>
        <div className="h-12 max-w-2xl rounded-md bg-paper/10" />
        <div className="h-24 max-w-3xl rounded-md bg-paper/10" />
      </div>
      <div className="min-h-[280px] rounded-lg border border-paper/15 bg-paper/10" />
    </div>
  );
}
