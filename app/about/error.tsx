"use client";

import { useEffect } from "react";
import styles from "./about.module.css";

/**
 * Граница ошибок страницы «О компании»: показывает сообщение вместо белого
 * экрана и даёт повторить запрос, не перезагружая всё приложение.
 */
export default function AboutError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error("Ошибка страницы «О компании»:", error);
  }, [error]);

  return (
    <div className={styles.fluidRoot}>
      <div className={styles.container}>
        <div className={styles.breadcrumbs}>
          <div className={styles.breadcrumbItem}>StroyMarket</div>
          <div className={styles.breadcrumbItem}>О компании</div>
        </div>

        <h1 className={`${styles.text48} ${styles.bold} ${styles.black2}`}>О компании</h1>

        <p className={`${styles.stateBox} ${styles.stateError}`}>
          {error.message || "Не удалось загрузить страницу. Попробуйте ещё раз."}
        </p>

        <button
          type="button"
          onClick={() => retry()}
          className={styles.btnBlue}
          style={{ marginTop: "1.25em" }}
        >
          Повторить
        </button>
      </div>
    </div>
  );
}
