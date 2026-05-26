"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import MovieSection from "@/components/MovieSection";
import { API_KEY, movieEndpoints } from "@/lib/tmdb";

const MOVIE_SECTIONS = [
  {
    key: "trending",
    title: "Peliculas en tendencia",
    endpoint: movieEndpoints.trending,
  },
  {
    key: "popular",
    title: "Peliculas populares",
    endpoint: movieEndpoints.popular,
  },
  {
    key: "topRated",
    title: "Mejor puntuadas",
    endpoint: movieEndpoints.topRated,
  },
  {
    key: "nowPlaying",
    title: "En cartelera",
    endpoint: movieEndpoints.nowPlaying,
  },
  {
    key: "upcoming",
    title: "Proximos estrenos",
    endpoint: movieEndpoints.upcoming,
  },
];

export default function Home() {
  const [sections, setSections] = useState(
    MOVIE_SECTIONS.reduce((acc, section) => {
      acc[section.key] = { movies: [], loading: true, error: null };
      return acc;
    }, {})
  );

  useEffect(() => {
    async function fetchSections() {
      if (!API_KEY) {
        setSections((current) =>
          Object.fromEntries(
            Object.entries(current).map(([key, value]) => [
              key,
              {
                ...value,
                loading: false,
                error: "Falta configurar NEXT_PUBLIC_TMDB_API_KEY.",
              },
            ])
          )
        );
        return;
      }

      await Promise.all(
        MOVIE_SECTIONS.map(async (section) => {
          try {
            setSections((current) => ({
              ...current,
              [section.key]: { movies: [], loading: true, error: null },
            }));

            const response = await axios.get(section.endpoint);
            setSections((current) => ({
              ...current,
              [section.key]: {
                movies: response.data.results || [],
                loading: false,
                error: null,
              },
            }));
          } catch (err) {
            setSections((current) => ({
              ...current,
              [section.key]: {
                movies: [],
                loading: false,
                error: "No se pudieron cargar los datos.",
              },
            }));
          }
        })
      );
    }

    fetchSections();
  }, []);

  return (
    <main className="min-h-screen bg-zinc-50">

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-5 py-10">
        {MOVIE_SECTIONS.map((section) => (
          <MovieSection
            key={section.key}
            title={section.title}
            movies={sections[section.key]?.movies || []}
            loading={sections[section.key]?.loading}
            error={sections[section.key]?.error}
          />
        ))}
      </div>
    </main>
  );
}
