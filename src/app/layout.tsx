import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MdCatchingPokemon } from "react-icons/md";
import style from "./layout.module.css"
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokédex",
  description: "Descubra informações detalhadas sobre todos os Pokémon, incluindo habilidades, evoluções e tipos. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <div className={style.iconBackground}>
            <MdCatchingPokemon color="#F7F7F7" />
          </div>
          {children}
        </main>
      </body>
    </html>
  );
}
