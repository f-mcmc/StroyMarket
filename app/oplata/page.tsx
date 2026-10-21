import type { Metadata } from "next";
import Link from "next/link";
import { PaymentContent } from "@/components/payment/PaymentContent";
import { ReferenceSidebar } from "@/components/reference/ReferenceSidebar";
import { getPaymentPage } from "@/lib/api/payment";
import { ApiError } from "@/lib/api/errors";
import styles from "./oplata.module.css";

export const metadata: Metadata = {
  title: "Способы оплаты — StroyMarket",
  description:
    "Оплата банковской картой через ПАО СБЕРБАНК, наличными при получении, сервис «Покупай со Сбером», условия возврата товара и описание процесса передачи данных.",
};

const FALLBACK_TITLE = "Способы оплаты";

function toMessage(error: unknown, fallback: string): string {
  return error instanceof ApiError ? error.message : fallback;
}

/** Хлебные крошки — одни и те же в рабочем и в ошибочном состоянии. */
function PaymentBreadcrumbs({ title }: { title: string }) {
  return (
    <div className={styles.breadcrumbs}>
      <div className={styles.breadcrumbItem}>
        <Link href="/">StroyMarket</Link>
      </div>
      <div className={styles.breadcrumbItem}>{title}</div>
    </div>
  );
}

export default async function OplataPage() {
  // Контент приходит из API layer (см. lib/api/payment.ts). Если он недоступен —
  // показываем ошибку вместо белого экрана, как на /about и /contacts.
  let content;
  try {
    content = await getPaymentPage();
  } catch (error) {
    return (
      <div className={styles.fluidRoot}>
        <section className={styles.blog}>
          <div className={styles.container}>
            <PaymentBreadcrumbs title={FALLBACK_TITLE} />
            <h1 className={`${styles.text48} ${styles.bold} ${styles.black2} ${styles.blogTitle}`}>
              {FALLBACK_TITLE}
            </h1>
            <p className={`${styles.stateBox} ${styles.stateError}`}>
              {toMessage(error, "Не удалось загрузить информацию об оплате. Попробуйте позже.")}
            </p>
          </div>
        </section>
      </div>
    );
  }

  const { title, blocks, promos, subscribe } = content;

  return (
    <div className={styles.fluidRoot}>
      <section className={styles.blog}>
        <div className={styles.container}>
          <PaymentBreadcrumbs title={title} />

          <h1 className={`${styles.text48} ${styles.bold} ${styles.black2} ${styles.blogTitle}`}>
            {title}
          </h1>

          <div className={styles.grid}>
            <div>
              <PaymentContent blocks={blocks} />
            </div>

            <ReferenceSidebar promos={promos} subscribe={subscribe} />
          </div>
        </div>
      </section>
    </div>
  );
}
