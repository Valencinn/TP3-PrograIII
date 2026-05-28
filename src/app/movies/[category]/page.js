//carga la pag de cada categoria

import { notFound } from "next/navigation";
import MovieListPage from "@/components/MovieListPage";
import { getMovieCategoryBySlug, movieCategories } from "@/lib/tmdb";

export function generateStaticParams() {
  return movieCategories.map((category) => ({
    category: category.slug,
  }));
}

export default async function MoviesCategoryPage({ params }) {
  const { category: slug } = await params;
  const category = getMovieCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  return <MovieListPage category={category} />;
}

