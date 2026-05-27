export default function ErrorMessage({
  children = "ERROR: not able to load",
}) {
  return (
    <p className="rounded-md border border-royal/30 bg-night px-4 py-3 text-sm font-semibold text-paper shadow-sm shadow-night/15">
      {children}
    </p>
  );
}
