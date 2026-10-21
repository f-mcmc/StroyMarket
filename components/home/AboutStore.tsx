import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { styles } from "@/styles/index.styles";

const stats = [
  { value: "17 000 м²", label: "Торговых площадей" },
  { value: "30 000+", label: "Товаров в каталоге" },
  { value: "3 500", label: "Заказов в месяц" },
  { value: "15 лет", label: "На рынке" },
];

export default function AboutStore() {
  return (
    /* Секция выходит из контейнера страницы во всю ширину экрана: поле
       calc(50% - 50vw) — это расстояние от края центрированного контейнера до края
       вьюпорта при любой его ширине. Содержимое — в общем контейнере сайта
       (styles.container), чтобы текст стоял на одной линии с навбаром. */
    <section className="relative mx-[calc(50%-50vw)] bg-[#F2F5F9]">
      <div className={`${styles.container} py-10 lg:py-14`}>
        <div className="lg:w-1/2 lg:pr-10">
          <h2 className="text-xl font-bold text-neutral-900 sm:text-2xl">О нашем магазине</h2>

          <p className="mt-4 text-sm leading-relaxed text-neutral-600">
            «StroyMarket» — крупный оптово-розничный магазин строительных материалов и
            инструментов. Мы работаем с проверенными поставщиками и известными брендами, чтобы вы
            могли найти всё необходимое для стройки и ремонта в одном месте, по честным ценам и с
            быстрой доставкой.
          </p>

          <div className="mt-7 grid grid-cols-2 gap-x-5 gap-y-5 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-xl font-bold text-blue-600 sm:text-2xl">{stat.value}</p>
                <p className="mt-1 text-[11px] leading-tight text-neutral-500">{stat.label}</p>
              </div>
            ))}
          </div>

          <p className="mt-7 text-[13px] leading-relaxed text-neutral-500">
            Наши консультанты помогут подобрать материалы под ваш объект и рассчитать нужный объём,
            а собственный склад и служба доставки избавят от лишнего ожидания. Работаем как с
            частными покупателями, так и со строительными бригадами и подрядчиками.
          </p>

          <Link
            href="/about"
            className="mt-7 inline-flex items-center gap-2 rounded-md bg-[#132a44] px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#1c3b5e]"
          >
            Подробнее о компании
            <ChevronRight size={14} strokeWidth={2.5} />
          </Link>
        </div>

        {/* На десктопе фото прижато к правому краю экрана и занимает всю высоту
            секции; ширина ограничена, чтобы кадр не растягивался на широких экранах. */}
        <div className="relative mt-8 aspect-1047/566 w-full overflow-hidden rounded-xl bg-[#F2F5F9] lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:aspect-auto lg:w-[min(50vw,56rem)] lg:rounded-none">
          <Image
            src="/rasm.png"
            alt="Строительные инструменты в магазине «StroyMarket»"
            fill
            sizes="(max-width: 1024px) 100vw, min(50vw, 896px)"
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
