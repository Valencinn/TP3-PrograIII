export default function LoadingMessage({ children = "Cargando peliculas..." }) {
  return (
    <p className="rounded-md border border-royal/20 bg-paper-soft px-4 py-3 text-sm font-medium text-ink-muted shadow-sm shadow-night/10">
      {children}
    </p>
  );
}
