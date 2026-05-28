//componente para mostrar un mensaje de carga mientras se obtiene la data de la api

export default function LoadingMessage({ children = "Loading..." }) {
  return (
    <p className="rounded-md border border-line bg-paper/10 px-4 py-3 text-sm font-semibold text-paper/75 shadow-xl shadow-black/10">
      {children}
    </p>
  );
}
