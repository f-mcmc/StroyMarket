import type { Metadata } from "next";
import Link from "next/link";
import { FaqList } from "@/components/faq/FaqList";
import { ReferenceSidebar } from "@/components/reference/ReferenceSidebar";
import { getFaqPage } from "@/lib/api/faq";
import { ApiError } from "@/lib/api/errors";
import styles from "./vopros-otvet.module.css";

export const metadata: Metadata = {
  title: "Вопрос-Ответ — интернет-магазин StroyMarket",
  description:
    "Ответы на частые вопросы покупателей «StroyMarket»: возврат товара, доставка и разгрузка, минимальная сумма заказа, рассрочка и кредит, дополнительные услуги и акции.",
};

const FALLBACK_TITLE = "Вопрос-ответ";

function toMessage(error: unknown, fallback: string): string {
  return error instanceof ApiError ? error.message : fallback;
}

/** Хлебные крошки — одни и те же в рабочем и в ошибочном состоянии. */
function FaqBreadcrumbs({ title }: { title: string }) {
  return (
    <div className={styles.breadcrumbs}>
      <div className={styles.breadcrumbItem}>
        <Link href="/">StroyMarket</Link>
      </div>
      <div className={styles.breadcrumbItem}>{title}</div>
    </div>
  );
}

export default async function VoprosOtvetPage() {
  // Контент приходит из API layer (см. lib/api/faq.ts). Если он недоступен —
  // показываем ошибку вместо белого экрана, как на остальных страницах шаблона.
  let content;
  try {
    content = await getFaqPage();
  } catch (error) {
    return (
      <div className={styles.fluidRoot}>
        <section className={styles.blog}>
          <div className={styles.container}>
            <FaqBreadcrumbs title={FALLBACK_TITLE} />
            <h1 className={`${styles.text48} ${styles.bold} ${styles.black2} ${styles.blogTitle}`}>
              {FALLBACK_TITLE}
            </h1>
            <p className={`${styles.stateBox} ${styles.stateError}`}>
              {toMessage(error, "Не удалось загрузить вопросы и ответы. Попробуйте позже.")}
            </p>
          </div>
        </section>
      </div>
    );
  }

  const { title, items, promos, subscribe } = content;

  return (
    <div className={styles.fluidRoot}>
      <section className={styles.blog}>
        <div className={styles.container}>
          <FaqBreadcrumbs title={title} />

          <h1 className={`${styles.text48} ${styles.bold} ${styles.black2} ${styles.blogTitle}`}>
            {title}
          </h1>

          <div className={styles.grid}>
            <div>
              <FaqList items={items} />
            </div>

            <ReferenceSidebar promos={promos} subscribe={subscribe} />
          </div>
        </div>
      </section>
    </div>
  );
}
