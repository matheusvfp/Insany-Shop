import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { CartProvider } from "@/contexts/cartContext"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "InsanyShop - O melhor do e-commerce",
  description: "Desafio de Frontend da Insany.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}