import Link from "next/link";
import Image from "next/image";
import { IMAGE_URL } from "@/lib/tmdb";

//componente para mostrar cards
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
    <Link
      href={`/movie/${movie.id}`}
      aria-label={`Ver detalle de ${movie.title}`}
      className={`group relative block aspect-[2/3] overflow-hidden rounded-lg border outline-none transition duration-300 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-mist ${isDark
        ? "border-paper/10 bg-surface shadow-xl shadow-black/25 hover:border-mist/70"
        : "border-paper/10 bg-surface shadow-xl shadow-black/20 hover:border-mist/70"
        }`}
    >
      <Image
        src={poster}
        alt={`Poster de ${movie.title}`}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        className="object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/15 to-transparent opacity-95 transition group-hover:opacity-80" />
      <div className="absolute right-2 top-2 rounded-full border border-paper/15 bg-midnight/80 px-2.5 py-1 text-xs font-bold text-paper shadow-sm backdrop-blur">
        {rating}
      </div>
      <div className="absolute inset-x-0 bottom-0 p-3">
        <h3 className="line-clamp-2 text-sm font-bold leading-snug text-paper drop-shadow md:text-base">
          {movie.title}
        </h3>
      </div>
    </Link>
  );
}
