export default function ErrorMessage({
  children = "No se pudieron cargar los datos.",
}) {
  return (
    <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      {children}
    </p>
  );
}

