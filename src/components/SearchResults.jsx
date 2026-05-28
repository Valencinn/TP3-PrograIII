"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import MovieSection from "./MovieSection";
import { API_KEY, getMovieSearchEndpoint } from "@/lib/tmdb";

export default function SearchResults({ query }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(Boolean(query));
  const [error, setError] = useState(null);

  useEffect(() => {

    //si no hay query, no hacemos nada
    async function fetchMovies() {
      if (!query) {
        setMovies([]);
        setLoading(false);
        setError(null);
        return;
      }

      //si no hay api key, mostramos error
      if (!API_KEY) {
        setError("Falta configurar api key.");
        setLoading(false);
        return;
      }

      //si hay api key probamos la conexion a la api y obtenemos lo pedido en el endpoint
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(getMovieSearchEndpoint(query));
        setMovies(response.data.results || []);
      } catch (err) {
        setError("No se pudo completar la busqueda.");
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [query]);

  //si no hay query, mostramos mensaje
  return (
    <MovieSection
      title={query ? `Resultados para "${query}"` : "Busca una pelicula"}
      movies={movies}
      loading={loading}
      error={error}
      eyebrow="Busqueda"
      emptyMessage={
        query
          ? "No encontramos peliculas con ese nombre."
          : "Escribi una pelicula en el buscador del navbar."
      }
    />
  );
}
