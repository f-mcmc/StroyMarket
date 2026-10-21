import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutShowcase } from "@/components/about/AboutShowcase";
import { CompanyHistory } from "@/components/about/CompanyHistory";
import { WhyUs } from "@/components/about/WhyUs";
import { companyHistoryTitle } from "@/data/about-data";
import { getCompanyProfile, listCompanyNews } from "@/lib/api/company";
import { ApiError } from "@/lib/api/errors";
import type { CompanyNewsItem } from "@/types/company";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "О компании — StroyMarket",
  description:
    "«StroyMarket» — крупнейшая оптово-розничная компания по продаже строительных и отделочных материалов. История компании, сертификаты и отзывы покупателей.",
};

function toMessage(error: unknown, fallback: string): string {
  return error instanceof ApiError ? error.message : fallback;
}

export default async function AboutPage() {
  // Контент страницы и новости приходят из разных источников (см. lib/api/company.ts),
  // поэтому ошибка одного блока не должна ронять всю страницу.
  const [profileResult, newsResult] = await Promise.allSettled([
    getCompanyProfile(),
    listCompanyNews(),
  ]);

  if (profileResult.status === "rejected") {
    return (
      <div className={styles.fluidRoot}>
        <div className={styles.container}>
          <div className={styles.breadcrumbs}>
            <div className={styles.breadcrumbItem}>StroyMarket</div>
            <div className={styles.breadcrumbItem}>О компании</div>
          </div>
          <h1 className={`${styles.text48} ${styles.bold} ${styles.black2}`}>О компании</h1>
          <p className={`${styles.stateBox} ${styles.stateError}`}>
            {toMessage(profileResult.reason, "Не удалось загрузить информацию о компании. Попробуйте позже.")}
          </p>
        </div>
      </div>
    );
  }

  const profile = profileResult.value;
  const news: CompanyNewsItem[] = newsResult.status === "fulfilled" ? newsResult.value : [];
  const newsError =
    newsResult.status === "rejected"
      ? toMessage(newsResult.reason, "Не удалось загрузить новости. Попробуйте позже.")
      : null;

  return (
    <div className={styles.fluidRoot}>
      <AboutHero intro={profile.intro} />
      <WhyUs advantages={profile.advantages} />
      <CompanyHistory
        title={companyHistoryTitle}
        entries={profile.history}
        today={profile.today}
      />
      <AboutShowcase
        certificates={profile.certificates}
        reviews={profile.reviews}
        news={news}
        newsError={newsError}
      />
    </div>
  );
}
