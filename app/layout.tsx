import type { Metadata } from "next";
import Header from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import { ShopProvider } from "@/context/ShopContext";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "StroyMarket",
  description: "Интернет-магазин товаров для строительства и ремонта",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <Providers>
          <ShopProvider>
            <div className="bg-amber-100 px-4 py-1.5 text-center text-xs text-amber-950">
              Демо-проект для портфолио: это не настоящий магазин, заказы не исполняются.
            </div>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </ShopProvider>
        </Providers>
      </body>
    </html>
  );
}
