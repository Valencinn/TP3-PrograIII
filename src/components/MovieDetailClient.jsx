"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import ErrorMessage from "./ErrorMessage";
import LoadingMessage from "./LoadingMessage";
import {
  API_KEY,
  BACKDROP_URL,
  IMAGE_URL,
  getMovieDetailEndpoint,
} from "@/lib/tmdb";

export default function MovieDetailClient({ id }) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      if (!API_KEY) {

        //si no hay api key, mostramos error
        setError("Falta configurar api key");
        setLoading(false);
        return;
      }

      // si hay api key probamos endpoint
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(getMovieDetailEndpoint(id));
        setMovie(response.data);
      } catch (err) {
        setError("No se pudieron cargar los datos.");
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen px-5 py-10 text-paper">
        <div className="mx-auto w-full max-w-6xl">
          <LoadingMessage>Cargando pelicula...</LoadingMessage>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen px-5 py-10 text-paper">
        <div className="mx-auto w-full max-w-6xl">
          <ErrorMessage>{error}</ErrorMessage>
          <BackLink />
        </div>
      </main>
    );
  }

  //si no hay pelicula no mostramos
  if (!movie) {
    return null;
  }

  //info para mostrar
  const poster = movie.poster_path
    ? `${IMAGE_URL}${movie.poster_path}`
    : "/file.svg";
  const backdrop = movie.backdrop_path
    ? `${BACKDROP_URL}${movie.backdrop_path}`
    : null;
  const genres = movie.genres?.map((genre) => genre.name).join(", ") || "Sin generos";

  return (
    <main className="min-h-screen text-paper">
      <section
        className="border-b border-line bg-midnight bg-cover bg-center"
        style={
          backdrop
            ? {
              backgroundImage: `linear-gradient(90deg, rgba(8, 12, 36, 0.96), rgba(8, 12, 36, 0.72), rgba(8, 12, 36, 0.92)), url(${backdrop})`,
            }
            : undefined
        }
      >
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-10 text-paper md:grid-cols-[240px_1fr] md:py-16">
          <Image
            src={poster}
            alt={`Poster de ${movie.title}`}
            width={240}
            height={360}
            className="w-full max-w-[240px] rounded-lg border border-line object-cover shadow-2xl shadow-black/40"
          />
          <div className="flex flex-col justify-center gap-5">
            <BackLink light />
            <div>
              <h1 className="text-4xl font-black tracking-normal md:text-6xl">
                {movie.title}
              </h1>
              {movie.tagline ? (
                <p className="mt-3 text-lg text-paper/80">{movie.tagline}</p>
              ) : null}
            </div>
            <p className="max-w-3xl text-base leading-7 text-paper/80">
              {movie.overview || "Esta pelicula no tiene descripcion disponible."}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-4 px-5 py-8 sm:grid-cols-2 lg:grid-cols-4">
        <DetailItem label="Fecha de estreno" value={movie.release_date || "Sin fecha"} />
        <DetailItem
          label="Duracion"
          value={movie.runtime ? `${movie.runtime} minutos` : "Sin duracion"}
        />
        <DetailItem
          label="Puntuacion"
          value={
            typeof movie.vote_average === "number"
              ? `${movie.vote_average.toFixed(1)} (${movie.vote_count} votos)`
              : "Sin puntuar"
          }
        />
        <DetailItem label="Generos" value={genres} />
        <DetailItem
          label="Idioma original"
          value={movie.original_language?.toUpperCase() || "Sin dato"}
        />
        <DetailItem label="Estado" value={movie.status || "Sin estado"} />
        <DetailItem
          label="Popularidad"
          value={
            typeof movie.popularity === "number"
              ? movie.popularity.toFixed(0)
              : "Sin dato"
          }
        />
        <DetailItem
          label="Presupuesto"
          value={
            movie.budget
              ? new Intl.NumberFormat("es-AR", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              }).format(movie.budget)
              : "Sin dato"
          }
        />
      </section>
    </main>
  );
}

//componente detalle!
function DetailItem({ label, value }) {
  return (
    <div className="rounded-lg border border-line bg-paper/10 p-4 shadow-xl shadow-black/10">
      <dt className="text-sm font-semibold text-mist">{label}</dt>
      <dd className="mt-2 text-base font-semibold text-paper">{value}</dd>
    </div>
  );
}

//componente paara vooler atras
function BackLink({ light = false }) {
  return (
    <Link
      href="/"
      className={`inline-flex w-fit items-center rounded-md px-3 py-2 text-sm font-semibold transition ${light
        ? "bg-paper/10 text-paper hover:bg-paper/20"
        : "mt-4 bg-paper text-night hover:bg-mist"
        }`}
    >
      Volver al inicio
    </Link>
  );
}
