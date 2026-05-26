export default function LoadingMessage({ children = "Cargando peliculas..." }) {
  return (
    <p className="rounded-md border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-600 shadow-sm">
      {children}
    </p>
  );
}

