export default function ErrorMessage({
  children = "ERROR: not able to load",
}) {
  return (
    <p className="rounded-md border border-mist/30 bg-paper/10 px-4 py-3 text-sm font-semibold text-paper shadow-xl shadow-black/10">
      {children}
    </p>
  );
}
