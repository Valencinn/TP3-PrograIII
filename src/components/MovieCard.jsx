import Link from "next/link";
import Image from "next/image";
import { IMAGE_URL } from "@/lib/tmdb";

export default function MovieCard({ movie }) {
  const poster = movie.poster_path
    ? `${IMAGE_URL}${movie.poster_path}`
    : "/file.svg";
  const rating =
    typeof movie.vote_average === "number"
      ? movie.vote_average.toFixed(1)
      : "Sin puntuar";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-night/10 bg-paper-soft shadow-sm shadow-night/10 transition hover:-translate-y-1 hover:border-royal/40 hover:shadow-lg hover:shadow-night/15">
      <div className="relative aspect-[2/3] bg-mist/25">
        <Image
          src={poster}
          alt={`Poster de ${movie.title}`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="space-y-2">
          <h3 className="line-clamp-2 text-base font-semibold text-night transition group-hover:text-royal">
            {movie.title}
          </h3>
          <p className="text-sm text-ink-muted">
            Estreno: {movie.release_date || "Sin fecha"}
          </p>
          <p className="text-sm font-semibold text-royal">
            Puntuacion: {rating}
          </p>
        </div>
        <Link
          href={`/movie/${movie.id}`}
          className="mt-auto inline-flex h-10 items-center justify-center rounded-md bg-night px-4 text-sm font-semibold text-paper transition hover:bg-royal"
        >
          Ver detalle
        </Link>
      </div>
    </article>
  );
}
