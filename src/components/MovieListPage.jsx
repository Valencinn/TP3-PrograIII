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

        //si no hay api key, mostramos error
        setError("Falta configurar api key.");
        setLoading(false);
        return;
      }

      //si hay api key probamos la conexion a la api y obtenemos lo pedido en el endpoint
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
    <main className="min-h-screen text-paper">
      <section className="border-b border-line bg-midnight/80">
        <div className="mx-auto w-full max-w-6xl px-5 py-10 text-paper md:py-14">
          <p className="text-sm font-bold uppercase tracking-wide text-mist">
            Coleccion
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-normal md:text-5xl">
            {category.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-paper/75">
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
