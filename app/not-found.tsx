import type { Metadata } from "next";
import Link from "next/link";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Страница не найдена — StroyMarket",
  description: "Запрашиваемая страница не найдена. Перейдите в каталог или на главную страницу.",
};

/**
 * Страница 404 — порт блока `.error404` с https://www.stroiopttorg.ru.
 *
 * Next.js показывает её и для несуществующих адресов, и для явных вызовов
 * `notFound()` — они уже есть в проекте (app/products/[id], app/catalog/[...path],
 * app/stocks/[id]), но до сих пор рендерили стандартную заглушку Next.js.
 *
 * Файл лежит в корне app/, поэтому страница рисуется внутри общего layout —
 * с существующими Header и Footer, как в оригинале.
 */
export default function NotFound() {
  return (
    <div className={styles.fluidRoot}>
      <section className={styles.blog}>
        <div className={styles.container}>
          <div className={styles.breadcrumbs}>
            <div className={styles.breadcrumbItem}>
              <Link href="/">StroyMarket</Link>
            </div>
            <div className={styles.breadcrumbItem}>Страница не найдена</div>
          </div>

          <h1 className={`${styles.text48} ${styles.bold} ${styles.black2}`}>Страница не найдена</h1>

          <div className={styles.inner}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/404/404.svg" alt="404" className={styles.img} width={615} height={281} />

            <div className={`${styles.desc} ${styles.text18}`}>
              Запрашиваемая страница не найдена. Возможно она была удалена, либо её адрес был
              изменен. Попробуйте воспользоваться поиском.
            </div>

            <div className={styles.nav}>
              <Link href="/catalog" className={`${styles.btn} ${styles.btnLight}`}>
                <span>В каталог</span>
              </Link>
              <Link href="/" className={`${styles.btn} ${styles.btnBlue}`}>
                <span>На главную</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
