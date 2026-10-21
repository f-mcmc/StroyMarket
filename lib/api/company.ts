import {
  ABOUT_NEWS_LIMIT,
  companyAdvantages,
  companyCertificates,
  companyHistory,
  companyIntro,
  companyReviews,
  companyToday,
} from "@/data/about-data";
import { getPostHref, getPostsByCategory } from "@/data/blog-data";
import type {
  CompanyAdvantage,
  CompanyCertificate,
  CompanyHistoryEntry,
  CompanyIntro,
  CompanyNewsItem,
  CompanyProfile,
  CompanyReviewsBlock,
  CompanyToday,
} from "@/types/company";

/**
 * API layer страницы «О компании» (/about).
 *
 * ─── Что уже есть на бэкенде ────────────────────────────────────────────────
 * В Postman-документации проекта (см. комментарий в lib/api/config.ts) описан
 * только раздел shop: categories / brands / products / carts / cart-items /
 * orders + auth. Разделов «компания», «преимущества», «история», «сертификаты»,
 * «отзывы» и «новости» там нет, и на живом сервере они не отвечают. Выдумывать
 * маршруты («/about/», «/company/») здесь нельзя — это дало бы гарантированные
 * 404 и сломало бы страницу.
 *
 * ─── Как подключить реальный бэкенд ─────────────────────────────────────────
 * Функции ниже — единственное место, которое об этом знает. UI
 * (app/about/page.tsx и components/about/*) работает с типами из types/company.ts
 * и не знает, откуда пришли данные. Когда появится документация, в каждой
 * функции нужно заменить одну строку `return <локальные данные>` на
 *
 *     const dto = await api.get<ApiCompanyIntro>("/<путь из документации>/", { auth: false });
 *     return mapIntro(dto);
 *
 * где `api` — общий клиент из lib/api/client.ts (он уже берёт базовый URL из
 * import blogPosts, см. lib/api/config.ts — хардкодить адрес не нужно),
 * а `mapIntro` — маппер «ответ бэкенда → тип из types/company.ts». Ни разметку,
 * ни пропсы компонентов при этом менять не придётся.
 *
 * Ошибки: клиент кидает ApiError (lib/api/errors.ts) — страница уже ловит его и
 * показывает состояние ошибки, так что дополнительная обработка не нужна.
 */

/** Первый экран: заголовок, лид и текст компании. */
export async function getCompanyIntro(): Promise<CompanyIntro> {
  return companyIntro;
}

/** Карточки блока «Почему именно мы». */
export async function listCompanyAdvantages(): Promise<CompanyAdvantage[]> {
  return companyAdvantages;
}

/** Карточки лет в блоке «История ООО "StroyMarket"». */
export async function listCompanyHistory(): Promise<CompanyHistoryEntry[]> {
  return companyHistory;
}

/** Карточка «Сегодня» с показателями компании. */
export async function getCompanyToday(): Promise<CompanyToday> {
  return companyToday;
}

/** Сертификаты для слайдера. */
export async function listCompanyCertificates(): Promise<CompanyCertificate[]> {
  return companyCertificates;
}

/** Сводный рейтинг и отзывы покупателей. */
export async function getCompanyReviews(): Promise<CompanyReviewsBlock> {
  return companyReviews;
}

/**
 * Последние новости для нижнего слайдера.
 *
 * Единственный блок страницы, у которого источник данных в проекте уже есть:
 * материалы блога живут в data/blog-data.ts и обслуживают /novosti, /stati и
 * главную. Берём их оттуда, а не заводим вторую копию новостей — когда блог
 * переедет на бэкенд, менять придётся только data/blog-data.ts.
 */
export async function listCompanyNews(limit = ABOUT_NEWS_LIMIT): Promise<CompanyNewsItem[]> {
  return getPostsByCategory()
    .slice(0, limit)
    .map((post) => ({
      id: `${post.category}/${post.slug}`,
      href: getPostHref(post),
      image: post.image,
      title: post.title,
      excerpt: post.excerpt,
      date: post.date,
    }));
}

/**
 * Весь контент страницы одним вызовом. Отдельные функции выше сохранены, потому
 * что на реальном бэкенде это, скорее всего, будут разные эндпоинты: тогда здесь
 * останется тот же Promise.all, а страница не заметит разницы.
 */
export async function getCompanyProfile(): Promise<CompanyProfile> {
  const [intro, advantages, history, today, certificates, reviews] = await Promise.all([
    getCompanyIntro(),
    listCompanyAdvantages(),
    listCompanyHistory(),
    getCompanyToday(),
    listCompanyCertificates(),
    getCompanyReviews(),
  ]);

  return { intro, advantages, history, today, certificates, reviews };
}
