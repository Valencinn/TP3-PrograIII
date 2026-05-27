"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import MovieSection from "./MovieSection";
import { API_KEY } from "@/lib/tmdb";

export default function MovieListPage({ category }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      if (!API_KEY) {
        setError("Falta configurar NEXT_PUBLIC_TMDB_API_KEY.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(category.endpoint);
        setMovies(response.data.results || []);
      } catch (err) {
        setError("No se pudieron cargar los datos.");
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [category.endpoint]);

  return (
    <main className="min-h-screen bg-zinc-50">
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-8 md:py-12">
          <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Endpoint propio de TMDB
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-normal text-zinc-950 md:text-5xl">
            {category.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">
            {category.description}
          </p>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl px-5 py-10">
        <MovieSection
          title={category.title}
          movies={movies}
          loading={loading}
          error={error}
        />
      </div>
    </main>
  );
}

