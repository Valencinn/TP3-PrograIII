import MovieDetailClient from "@/components/MovieDetailClient";

export default async function MovieDetailPage({ params }) {
  const { id } = await params;

  return <MovieDetailClient id={id} />;
}

