export default function ErrorMessage({
  children = "No se pudieron cargar los datos.",
}) {
  return (
    <p className="rounded-md border border-royal/30 bg-night px-4 py-3 text-sm font-semibold text-paper shadow-sm shadow-night/15">
      {children}
    </p>
  );
}
