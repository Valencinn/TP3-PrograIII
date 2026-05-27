import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Peliculas TMDB",
  description: "App de peliculas con Next.js y TMDB",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
