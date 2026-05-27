import Link from "next/link";
import Image from "next/image";
import { IMAGE_URL } from "@/lib/tmdb";

export default function MovieCard({ movie, variant = "light" }) {
  const poster = movie.poster_path
    ? `${IMAGE_URL}${movie.poster_path}`
    : "/file.svg";
  const rating =
    typeof movie.vote_average === "number"
      ? movie.vote_average.toFixed(1)
      : "Sin puntuar";
  const isDark = variant === "dark";

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-lg border shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${isDark
        ? "border-paper/10 bg-paper/95 shadow-black/20 hover:border-mist/60 hover:bg-white"
        : "border-night/10 bg-paper-soft shadow-night/10 hover:border-royal/40 hover:shadow-night/15"
        }`}
    >
      <div className="relative aspect-[2/3] bg-mist/25">
        <Image
          src={poster}
          alt={`Poster de ${movie.title}`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover"
        />
        <div className="absolute right-2 top-2 rounded-full bg-night/90 px-2.5 py-1 text-xs font-bold text-paper shadow-sm">
          {rating}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="space-y-2">
          <h3 className="line-clamp-2 text-base font-semibold text-night transition group-hover:text-royal">
            {movie.title}
          </h3>
          <p className="text-sm text-ink-muted">
            Estreno: {movie.release_date || "Sin fecha"}
          </p>
        </div>
      </div>
    </article >
  );
}
