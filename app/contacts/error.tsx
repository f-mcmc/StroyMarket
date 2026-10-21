"use client";

import { useEffect } from "react";
import Link from "next/link";
import styles from "./contacts.module.css";

/**
 * Граница ошибок страницы «Контакты»: показывает сообщение вместо белого
 * экрана и даёт повторить запрос, не перезагружая всё приложение.
 */
export default function ContactsError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error("Ошибка страницы «Контакты»:", error);
  }, [error]);

  return (
    <div className={styles.fluidRoot}>
      <section className={styles.contacts}>
        <div className={styles.container}>
          <div className={styles.breadcrumbs}>
            <div className={styles.breadcrumbItem}>
              <Link href="/">StroyMarket</Link>
            </div>
            <div className={styles.breadcrumbItem}>Контакты</div>
          </div>

          <h1 className={`${styles.text48} ${styles.bold} ${styles.black2}`}>Контакты</h1>

          <p className={`${styles.stateBox} ${styles.stateError}`}>
            {error.message || "Не удалось загрузить страницу. Попробуйте ещё раз."}
          </p>

          <button
            type="button"
            onClick={() => retry()}
            className={styles.btnBlue}
            style={{ marginTop: "1.25em" }}
          >
            <span>Повторить</span>
          </button>
        </div>
      </section>
    </div>
  );
}
