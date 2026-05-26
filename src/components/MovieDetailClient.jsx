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
        setError("Falta configurar NEXT_PUBLIC_TMDB_API_KEY.");
        setLoading(false);
        return;
      }

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
      <main className="mx-auto w-full max-w-6xl px-5 py-10">
        <LoadingMessage>Cargando pelicula...</LoadingMessage>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto w-full max-w-6xl px-5 py-10">
        <ErrorMessage>{error}</ErrorMessage>
        <BackLink />
      </main>
    );
  }

  if (!movie) {
    return null;
  }

  const poster = movie.poster_path
    ? `${IMAGE_URL}${movie.poster_path}`
    : "/file.svg";
  const backdrop = movie.backdrop_path
    ? `${BACKDROP_URL}${movie.backdrop_path}`
    : null;
  const genres = movie.genres?.map((genre) => genre.name).join(", ") || "Sin generos";

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950">
      <section
        className="border-b border-zinc-200 bg-zinc-900 bg-cover bg-center"
        style={
          backdrop
            ? {
                backgroundImage: `linear-gradient(90deg, rgba(9, 9, 11, 0.92), rgba(9, 9, 11, 0.7)), url(${backdrop})`,
              }
            : undefined
        }
      >
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-10 text-white md:grid-cols-[220px_1fr] md:py-14">
          <Image
            src={poster}
            alt={`Poster de ${movie.title}`}
            width={220}
            height={330}
            className="w-full max-w-[220px] rounded-lg border border-white/10 object-cover shadow-2xl"
          />
          <div className="flex flex-col justify-center gap-5">
            <BackLink light />
            <div>
              <h1 className="text-4xl font-bold tracking-normal md:text-5xl">
                {movie.title}
              </h1>
              {movie.tagline ? (
                <p className="mt-3 text-lg text-zinc-200">{movie.tagline}</p>
              ) : null}
            </div>
            <p className="max-w-3xl text-base leading-7 text-zinc-100">
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

function DetailItem({ label, value }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
      <dt className="text-sm font-medium text-zinc-500">{label}</dt>
      <dd className="mt-2 text-base font-semibold text-zinc-950">{value}</dd>
    </div>
  );
}

function BackLink({ light = false }) {
  return (
    <Link
      href="/"
      className={`inline-flex w-fit items-center rounded-md px-3 py-2 text-sm font-semibold transition ${
        light
          ? "bg-white/10 text-white hover:bg-white/20"
          : "mt-4 bg-zinc-950 text-white hover:bg-zinc-800"
      }`}
    >
      Volver al inicio
    </Link>
  );
}
