import Link from "next/link";
import styles from "@/app/about/about.module.css";
import type { CompanyIntro } from "@/types/company";

/** Первый экран: хлебные крошки, заголовок, лид, текст и фото, уходящее вправо. */
export function AboutHero({ intro }: { intro: CompanyIntro }) {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <div className={styles.aboutContent}>
          <div className={styles.breadcrumbs}>
            <div className={styles.breadcrumbItem}>
              <Link href="/">StroyMarket</Link>
            </div>
            <div className={styles.breadcrumbItem}>{intro.title}</div>
          </div>

          <h1 className={`${styles.text48} ${styles.bold} ${styles.black2}`}>{intro.title}</h1>

          <div className={styles.aboutDesc}>
            <div className={`${styles.text18} ${styles.medium} ${styles.black2}`}>{intro.lead}</div>
          </div>

          <div className={`${styles.richText} ${styles.aboutText}`}>
            {intro.paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className={styles.aboutImg}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={intro.image} alt={intro.imageAlt} className={styles.viewDesktop} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={intro.imageMobile} alt="" aria-hidden="true" className={styles.viewMobile} />
        </div>
      </div>
    </section>
  );
}
