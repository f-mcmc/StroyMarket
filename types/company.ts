/**
 * Типы контента страницы «О компании» (/about).
 *
 * Это "UI-типы": именно их ожидают компоненты в components/about/*. Форма ответов
 * реального backend хранится отдельно в types/api.ts — так же, как это уже сделано
 * для каталога. Когда появится документация по эндпоинтам компании, маппинг
 * "ответ backend → тип отсюда" пишется один раз в lib/api/company.ts, а разметку
 * трогать не придётся.
 */

/** Первый экран: заголовок, лид-абзац, текст и фото справа. */
export interface CompanyIntro {
  title: string;
  lead: string;
  paragraphs: string[];
  /** Широкое фото для десктопа (>992px). */
  image: string;
  /** Вертикальный кроп того же фото для планшета/мобильного (≤992px). */
  imageMobile: string;
  imageAlt: string;
}

/** Карточка блока «Почему именно мы». */
export interface CompanyAdvantage {
  id: string;
  /** Путь к иконке (public/about/*.svg). */
  icon: string;
  title: string;
  text: string;
}

/** Строка списка внутри карточки истории: текст + выделенное жирным значение. */
export interface CompanyHistoryFact {
  text: string;
  /** Значение, которое в оригинале обёрнуто в <b> и не переносится. */
  value: string;
}

/** Карточка года в блоке «История ООО "StroyMarket"». */
export interface CompanyHistoryEntry {
  id: string;
  year: string;
  title: string;
  facts: CompanyHistoryFact[];
}

/** Показатель в карточке «Сегодня». */
export interface CompanyTodayStat {
  id: string;
  value: string;
  label: string;
}

/** Последняя карточка блока истории — «Сегодня» с четырьмя показателями. */
export interface CompanyToday {
  title: string;
  stats: CompanyTodayStat[];
}

/** Сертификат: картинка + подпись для alt/лайтбокса. */
export interface CompanyCertificate {
  id: string;
  image: string;
  alt: string;
}

/** Отзыв покупателя в слайдере блока «Отзывы». */
export interface CompanyReview {
  id: string;
  author: string;
  /** Дата в готовом к выводу виде (дд.мм.гггг). */
  date: string;
  avatar: string;
  /** Оценка 1..5 — определяет число закрашенных звёзд. */
  rating: number;
  text: string;
}

/** Сводный рейтинг над слайдером отзывов. */
export interface CompanyRatingSummary {
  /** Средняя оценка в готовом к выводу виде («4,9»). */
  average: string;
  /** Число звёзд в шкале (в оригинале — 5). */
  stars: number;
  /** Подпись-ссылка: «312 отзывов • 1172 оценки». */
  countLabel: string;
  /** Ссылка на все отзывы. */
  reviewsUrl: string;
  /** Ссылка на форму «Оставить отзыв». */
  addReviewUrl: string;
}

/** Блок отзывов целиком. */
export interface CompanyReviewsBlock {
  summary: CompanyRatingSummary;
  items: CompanyReview[];
}

/** Карточка новости в нижнем слайдере. */
export interface CompanyNewsItem {
  id: string;
  href: string;
  image: string;
  title: string;
  excerpt: string;
  date: string;
}

/** Всё содержимое страницы «О компании» одним объектом. */
export interface CompanyProfile {
  intro: CompanyIntro;
  advantages: CompanyAdvantage[];
  history: CompanyHistoryEntry[];
  today: CompanyToday;
  certificates: CompanyCertificate[];
  reviews: CompanyReviewsBlock;
}
