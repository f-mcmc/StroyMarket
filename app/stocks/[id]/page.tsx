import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { stocks } from "@/data/stocks";
import { NewsletterForm } from "@/components/blog/NewsletterForm";
import { styles } from "@/styles/index.styles";

interface StockDetailProps {
  params: Promise<{ id: string }>;
}

export default async function StockDetailPage({ params }: StockDetailProps) {
  const { id } = await params;
  const stock = stocks.find((s) => s.id === id);

  if (!stock) {
    notFound();
  }

  const otherStocks = stocks.filter((s) => s.id !== id).slice(0, 2);

  return (
    <div className={`${styles.container} min-w-0 py-6 bg-white font-sans text-gray-900`}>
      {/* Хлебные крошки */}
      <nav className="text-xs text-gray-500 mb-4 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap py-1">
        <Link href="/" className="hover:text-blue-600">StroyMarket</Link>
        <span>/</span>
        <Link href="/stocks" className="hover:text-blue-600">Акции</Link>
        <span>/</span>
        <span className="text-gray-400 truncate">{stock.title}</span>
      </nav>

      <h1 className="text-xl sm:text-2xl font-bold tracking-tight mb-6">
        {stock.title}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Основной контент акции */}
        <div className="lg:col-span-8 rounded-xl border border-gray-200 shadow-sm p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="rounded bg-blue-600 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
              {stock.badge}
            </span>
            <span className="text-xs text-gray-400">Действует до {stock.validUntil}</span>
          </div>

          {stock.description.map((paragraph, index) => (
            <p key={index} className="text-sm text-gray-600 leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}

          <div className="relative aspect-[2/1] w-full overflow-hidden rounded-lg bg-gray-50 mb-6">
            <Image
              src={stock.image}
              alt={stock.title}
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover"
              priority
            />
          </div>

          <h2 className="text-lg font-bold tracking-tight mb-3">{stock.offerTitle}</h2>
          {stock.offerText.map((paragraph, index) => (
            <p key={index} className="text-sm text-gray-600 leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}

          {stock.promoCode && (
            <div>
              <p className="text-sm font-semibold text-gray-800 mb-2">Промокод для скидки:</p>
              <span className="inline-block rounded-lg border border-dashed border-blue-400 bg-blue-50 px-4 py-2 text-sm font-bold tracking-wider text-blue-700">
                {stock.promoCode}
              </span>
            </div>
          )}
        </div>

        {/* Боковая колонка */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {otherStocks.map((other) => (
            <Link
              key={other.id}
              href={`/stocks/${other.id}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative aspect-[2/1] w-full overflow-hidden bg-gray-50">
                <Image
                  src={other.image}
                  alt={other.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute left-2 top-2 rounded bg-blue-600 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  {other.discountLabel}
                </span>
              </div>
              <div className="p-3">
                <h3 className="text-xs font-semibold text-gray-800 transition-colors group-hover:text-blue-600 line-clamp-2">
                  {other.title}
                </h3>
              </div>
            </Link>
          ))}

          <NewsletterForm />
        </div>
      </div>
    </div>
  );
}
