import LoadingMessage from "@/components/LoadingMessage";

export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-10">
      <LoadingMessage>Cargando pelicula...</LoadingMessage>
    </main>
  );
}

