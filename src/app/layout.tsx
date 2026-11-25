import type { Metadata } from "next";
import { Lilita_One, Nunito } from "next/font/google";
import "./globals.css";

const lilitaOne = Lilita_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-lilita",
  display: "swap",
});

const nunito = Nunito({
  weight: ["600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "COCDLE UNLIMITED — Clash of Clans Guessing Game",
  description:
    "Unlimited Wordle-style Clash of Clans guessing game across Troops, Pixel, Description, and Buildings modes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lilitaOne.variable} ${nunito.variable}`}>
      <body className="font-body antialiased selection:bg-[#FFD43B] selection:text-[#1F1209]">
        {children}
      </body>
    </html>
  );
}
