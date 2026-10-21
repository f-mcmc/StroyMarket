import Link from "next/link";
import Image from "next/image";
import { stocks } from "@/data/stocks";
import { styles } from "@/styles/index.styles";

export const metadata = {
  title: "Акции - StroyMarket",
  description: "Действующие акции и специальные предложения - Интернет-магазин товаров для строительства и ремонта",
};

export default function StocksPage() {
  return (
    <main className={`${styles.container} min-w-0 py-8`}>
      <div className="mb-8 border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Все акции
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Действующие акции и специальные предложения.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stocks.map((stock) => (
          <Link
            key={stock.id}
            href={`/stocks/${stock.id}`}
            className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
          >
            <div className="relative aspect-[2/1] w-full overflow-hidden bg-gray-50">
              <Image
                src={stock.image}
                alt={stock.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute left-2 top-2 rounded bg-blue-600 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                {stock.discountLabel}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-4">
              <h3 className="mb-3 flex-1 text-sm font-semibold text-gray-800 transition-colors group-hover:text-blue-600">
                {stock.title}
              </h3>
              <span className="text-xs font-bold text-blue-600">
                Подробнее об акции &rarr;
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
