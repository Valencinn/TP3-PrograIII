//layout

import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Frame",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className="h-full antialiased"
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
