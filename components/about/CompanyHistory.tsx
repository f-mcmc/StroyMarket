import styles from "@/app/about/about.module.css";
import type { CompanyHistoryEntry, CompanyToday } from "@/types/company";

interface CompanyHistoryProps {
  title: string;
  entries: CompanyHistoryEntry[];
  today: CompanyToday;
}

/**
 * Блок «История ООО "StroyMarket"»: сетка 2×2 из карточек-годов, последняя
 * ячейка — карточка «Сегодня» с показателями и фоновой графикой.
 */
export function CompanyHistory({ title, entries, today }: CompanyHistoryProps) {
  const isEmpty = entries.length === 0 && today.stats.length === 0;

  return (
    <section className={styles.history}>
      <div className={styles.container}>
        <h3
          className={`${styles.text33} ${styles.bold} ${styles.black2} ${styles.historyTitle}`}
        >
          {title}
        </h3>

        {isEmpty ? (
          <p className={styles.stateBox}>История компании пока не заполнена.</p>
        ) : (
          <div className={styles.historyGrid}>
            {entries.map((entry) => (
              <div key={entry.id} className={styles.historyCard}>
                <div className={styles.historyCardYear}>
                  <span>{entry.year}</span>
                </div>
                <h3 className={`${styles.text20} ${styles.text16Tablet} ${styles.medium}`}>
                  {entry.title}
                </h3>
                <div className={`${styles.richText} ${styles.historyCardText}`}>
                  <ul>
                    {entry.facts.map((fact, i) => (
                      <li key={i}>
                        {fact.text}
                        <b>{fact.value}</b>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            {today.stats.length > 0 && (
              <div className={`${styles.historyCard} ${styles.todayCard}`}>
                <div className={styles.todayCardTitle}>{today.title}</div>
                <div className={styles.todayCardGrid}>
                  {today.stats.map((stat) => (
                    <div key={stat.id} className={styles.todayCardGroup}>
                      <div className={`${styles.text24} ${styles.bold} ${styles.blue}`}>
                        {stat.value}
                      </div>
                      <div className={styles.text15}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
