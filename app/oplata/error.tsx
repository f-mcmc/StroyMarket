"use client";

import { useEffect } from "react";
import Link from "next/link";
import styles from "./oplata.module.css";

/**
 * Граница ошибок страницы «Способы оплаты»: показывает сообщение вместо белого
 * экрана и даёт повторить запрос, не перезагружая всё приложение.
 *
 * В Next.js 16 стабильный проп — `retry()`: он заново выполняет запросы страницы,
 * тогда как `reset()` только очищает состояние границы (см. docs/error.md).
 */
export default function OplataError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error("Ошибка страницы «Способы оплаты»:", error);
  }, [error]);

  return (
    <div className={styles.fluidRoot}>
      <section className={styles.blog}>
        <div className={styles.container}>
          <div className={styles.breadcrumbs}>
            <div className={styles.breadcrumbItem}>
              <Link href="/">StroyMarket</Link>
            </div>
            <div className={styles.breadcrumbItem}>Способы оплаты</div>
          </div>

          <h1 className={`${styles.text48} ${styles.bold} ${styles.black2} ${styles.blogTitle}`}>
            Способы оплаты
          </h1>

          <p className={`${styles.stateBox} ${styles.stateError}`}>
            {error.message || "Не удалось загрузить страницу. Попробуйте ещё раз."}
          </p>

          <button
            type="button"
            onClick={() => retry()}
            className={styles.btnBlue}
            style={{ marginTop: "1.25em", width: "13.0625em" }}
          >
            <span>Повторить</span>
          </button>
        </div>
      </section>
    </div>
  );
}
