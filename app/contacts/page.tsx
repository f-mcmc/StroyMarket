import type { Metadata } from "next";
import Link from "next/link";
import { ConsultSection } from "@/components/contacts/ConsultSection";
import { ContactPlaces } from "@/components/contacts/ContactPlaces";
import { ContactRegions } from "@/components/contacts/ContactRegions";
import { ContactsMapCard } from "@/components/contacts/ContactsMapCard";
import { getContactsPage } from "@/lib/api/contacts";
import { ApiError } from "@/lib/api/errors";
import styles from "./contacts.module.css";

export const metadata: Metadata = {
  title: "Контакты — StroyMarket",
  description:
    "Адрес, телефоны отделов, email и график работы ООО «StroyMarket», а также контакты представительств в Москве, Ставрополе, Краснодаре, Грозном, Ростове-на-Дону и Самаре.",
};

const FALLBACK_TITLE = "Контакты";

function toMessage(error: unknown, fallback: string): string {
  return error instanceof ApiError ? error.message : fallback;
}

/** Хлебные крошки страницы — одни и те же в рабочем и в ошибочном состоянии. */
function ContactsBreadcrumbs({ title }: { title: string }) {
  return (
    <div className={styles.breadcrumbs}>
      <div className={styles.breadcrumbItem}>
        <Link href="/">StroyMarket</Link>
      </div>
      <div className={styles.breadcrumbItem}>{title}</div>
    </div>
  );
}

export default async function ContactsPage() {
  // Контент страницы приходит из API layer (см. lib/api/contacts.ts). Если он
  // недоступен — показываем ошибку вместо белого экрана, как на /about.
  let content;
  try {
    content = await getContactsPage();
  } catch (error) {
    return (
      <div className={styles.fluidRoot}>
        <section className={styles.contacts}>
          <div className={styles.container}>
            <ContactsBreadcrumbs title={FALLBACK_TITLE} />
            <h1 className={`${styles.text48} ${styles.bold} ${styles.black2}`}>{FALLBACK_TITLE}</h1>
            <p className={`${styles.stateBox} ${styles.stateError}`}>
              {toMessage(error, "Не удалось загрузить контакты. Попробуйте позже.")}
            </p>
          </div>
        </section>
      </div>
    );
  }

  const { title, map, card, departments, requisites, regions, consult } = content;

  return (
    <div className={styles.fluidRoot}>
      <section className={styles.contacts}>
        <div className={styles.container}>
          <ContactsBreadcrumbs title={title} />

          <h1 className={`${styles.text48} ${styles.bold} ${styles.black2}`}>{title}</h1>

          <ContactsMapCard map={map} card={card} />
          <ContactPlaces departments={departments} requisites={requisites} />
          <ContactRegions regions={regions} />
        </div>
      </section>

      <ConsultSection config={consult} />
    </div>
  );
}
