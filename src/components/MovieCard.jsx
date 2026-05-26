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
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="relative aspect-[2/3] bg-zinc-100">
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
          <h3 className="line-clamp-2 text-base font-semibold text-zinc-950">
            {movie.title}
          </h3>
          <p className="text-sm text-zinc-600">
            Estreno: {movie.release_date || "Sin fecha"}
          </p>
          <p className="text-sm font-medium text-zinc-800">
            Puntuacion: {rating}
          </p>
        </div>
        <Link
          href={`/movie/${movie.id}`}
          className="mt-auto inline-flex h-10 items-center justify-center rounded-md bg-zinc-950 px-4 text-sm font-semibold text-white transition hover:bg-zinc-800"
        >
          Ver detalle
        </Link>
      </div>
    </article>
  );
}
