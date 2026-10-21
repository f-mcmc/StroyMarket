import { BlogCategory, BlogPost } from "@/types/blog";

export const blogCategories: BlogCategory[] = [
  { slug: "novosti", label: "Новости", href: "/novosti" },
  { slug: "obzory", label: "Обзоры", href: "/obzory" },
  { slug: "sovety", label: "Советы", href: "/sovety" },
  { slug: "stati", label: "Статьи", href: "/stati" },
];

const GENERIC_UPDATE_EXCERPT =
  "С радостью сообщаем вам о крупном пополнении нашего каталога инструментов.";

const GENERIC_UPDATE_BODY = [
  "С радостью сообщаем вам о крупном пополнении нашего каталога инструментов.",
  "В продаже появились новые позиции ручного и электроинструмента, расходных материалов и оснастки — ассортимент пополняется, чтобы вы могли найти всё нужное для стройки и ремонта в одном месте.",
  "Следите за обновлениями в блоге — мы регулярно рассказываем о новинках, акциях и полезных советах.",
];

export const blogPosts: BlogPost[] = [
  {
    slug: "gotovim-gazon-k-sezonu",
    category: "novosti",
    title: "Готовим газон к сезону",
    excerpt:
      "Пока трава только просыпается — самое время присмотреться к технике, которая сэкономит вам часы жизни этим летом.",
    date: "29 апреля 2026",
    sortDate: "2026-04-29",
    image:
      "https://www.stroiopttorg.ru/wp-content/uploads/2026/04/gazonokosilki.-blog-kopija-3-605x264.jpeg",
    content: [
      "**Это то, что будет в тренде через пару недель.**",
      "Пока трава только просыпается — самое время присмотреться к технике, которая сэкономит вам часы жизни этим летом.",
      "Газонокосилки с витрины — не просто железо. Это помощник, который не спорит, не жалуется на жару и не просит выходной.",
      "Какую выберете?\nАккумуляторную — для тихого утра\nБензиновую — для заросшего участка",
      "Приходите смотреть, щупать, сравнивать.\n**Сезон близко!**",
    ],
  },
  {
    slug: "yelektronnaya-karta-skidok",
    category: "novosti",
    title: "Электронная карта скидок!",
    excerpt:
      "Теперь совершать покупки в ООО «StroyMarket» стало еще удобнее! Для вашего удобства мы запускаем электронную карту скидок.",
    date: "21 ноября 2023",
    sortDate: "2023-11-21",
    image:
      "https://www.stroiopttorg.ru/wp-content/uploads/2023/11/a3yvumf88f9wzheh332i45vzglr13x2k-605x317.webp",
    content: [
      "Теперь совершать покупки в ООО «StroyMarket» стало еще удобнее! Для вашего удобства мы запускаем электронную карту скидок.",
      "Электронная дисконтная карта имеет все преимущества обычной пластиковой карты, но при этом её не нужно носить с собой и невозможно потерять — она всегда под рукой в вашем телефоне.",
      "Оформить карту можно у нас в магазине или на сайте — просто оставьте заявку, и мы свяжемся с вами.",
    ],
  },
  {
    slug: "58388",
    category: "novosti",
    title: "Хватит мечтать, пора покупать!",
    excerpt:
      "Кредит от ОТП БАНК. Получайте товар сразу, а платите — потом.",
    date: "НОВОСТИ 21 ноября 2023",
    sortDate: " 2023-11-20",
    image:
      "https://www.stroiopttorg.ru/wp-content/uploads/2023/11/ifqyvfkwj0x6xt6g2vu2ac72wus6okv0-396x330.webp",
    content: [
      "**Кредит от ОТП БАНК**",
      "Получайте товар сразу, а платите — потом.",
      "Как оформить онлайн заявку в интернет магазине через \"ОТП Банк\"",
      "1. Добавьте товар в корзину.",
      "2. Перейдите в корзину и нажмите кнопку «В кредит ОТП БАНК»",
      "3. Заполните короткую онлайн-заявку где указываете цену, название номера и категорию – Билеты и туры (решение в течении 2 мин) результат узнаете на экране монитора.",
      "4. После одобрения необходимо подписать кредитный договор с помощью смс либо курьером банка.",
      "5. Для назначения способа подписания, с Вами свяжется колл-центр Банка в течении 10 мин.",
      "6. После подписания договора, обращаетесь в магазин для получения товара удобным для Вас способом.",
      "**Условия**",
      "1. Кредит доступен гражданам РФ, возрастом от 20 до 69 лет",
      "2. Сумма кредита от 2 000 до 300 000 ₽",
      "3. Срок кредита от 3 до 36 месяцев",
      "4. Первоначальный взнос от 0 до 99%",
      "**Способы погашения**",
      "Помните, кредит можно погасить досрочно. Сервис предоставляет – АО \"ОТП Банк\" Лицензия на осуществление банковских операций № 2766 от 27.11.2014 года. Юридический адрес: 125171, г. Москва, Ленинградское шоссе, д. 16А, стр. 2. Единый многоканальный справочный телефон: +7 (495) 775-4-775, 8 800 100-55-55",
    ],
  },
  {
    slug: "kak-vybrat-yelektrodrel-praktichesk",
    category: "stati",
    title: "Как выбрать электродрель: Практическое руководство для покупателей",
    excerpt: GENERIC_UPDATE_EXCERPT,
    date: "3 октября 2023",
    sortDate: "2023-10-03",
    image: "https://www.stroiopttorg.ru/wp-content/uploads/2023/10/news4.webp",
    content: [
      "Электродрель — один из самых универсальных инструментов в арсенале любого мастера. При выборе стоит обратить внимание на мощность, наличие ударного режима, тип патрона и максимальный диаметр сверления.",
      "Для бытовых задач достаточно компактной сетевой или аккумуляторной модели, а для интенсивной стройки лучше присмотреться к профессиональным дрелям-шуруповёртам с ударным механизмом.",
      ...GENERIC_UPDATE_BODY,
    ],
  },
  {
    slug: "masshtabnoe-obnovlenie-kataloga-inst-2-3-4",
    category: "novosti",
    title: "Масштабное обновление каталога инструментов15",
    excerpt: GENERIC_UPDATE_EXCERPT,
    date: "1 октября 2023",
    sortDate: "2023-10-01",
    image: "https://www.stroiopttorg.ru/wp-content/uploads/2023/10/news4.webp",
    content: GENERIC_UPDATE_BODY,
  },
  {
    slug: "masshtabnoe-obnovlenie-kataloga-inst-6",
    category: "novosti",
    title: "Масштабное обновление каталога инструментов16",
    excerpt: GENERIC_UPDATE_EXCERPT,
    date: "1 октября 2023",
    sortDate: "2023-10-01",
    image: "https://www.stroiopttorg.ru/wp-content/uploads/2023/10/news.webp",
    content: GENERIC_UPDATE_BODY,
  },
  {
    slug: "masshtabnoe-obnovlenie-kataloga-inst-2-2-4",
    category: "novosti",
    title: "Масштабное обновление каталога инструментов14",
    excerpt: GENERIC_UPDATE_EXCERPT,
    date: "1 октября 2023",
    sortDate: "2023-10-01",
    image: "https://www.stroiopttorg.ru/wp-content/uploads/2023/10/news3.webp",
    content: GENERIC_UPDATE_BODY,
  },
  {
    slug: "masshtabnoe-obnovlenie-kataloga-inst-2-6",
    category: "novosti",
    title: "Масштабное обновление каталога инструментов13",
    excerpt: GENERIC_UPDATE_EXCERPT,
    date: "1 октября 2023",
    sortDate: "2023-10-01",
    image: "https://www.stroiopttorg.ru/wp-content/uploads/2023/10/news2.webp",
    content: GENERIC_UPDATE_BODY,
  },
  {
    slug: "masshtabnoe-obnovlenie-kataloga-inst-5",
    category: "novosti",
    title: "Масштабное обновление каталога инструментов17",
    excerpt: GENERIC_UPDATE_EXCERPT,
    date: "1 октября 2023",
    sortDate: "2023-10-01",
    image: "https://www.stroiopttorg.ru/wp-content/uploads/2023/10/news.webp",
    content: GENERIC_UPDATE_BODY,
  },
  {
    slug: "masshtabnoe-obnovlenie-kataloga-inst-2-3-3",
    category: "novosti",
    title: "Масштабное обновление каталога инструментов12",
    excerpt: GENERIC_UPDATE_EXCERPT,
    date: "1 октября 2023",
    sortDate: "2023-10-01",
    image: "https://www.stroiopttorg.ru/wp-content/uploads/2023/10/news4.webp",
    content: GENERIC_UPDATE_BODY,
  },
  {
    slug: "masshtabnoe-obnovlenie-kataloga-inst-2-2-3",
    category: "novosti",
    title: "Масштабное обновление каталога инструментов11",
    excerpt: GENERIC_UPDATE_EXCERPT,
    date: "1 октября 2023",
    sortDate: "2023-10-01",
    image: "https://www.stroiopttorg.ru/wp-content/uploads/2023/10/news3.webp",
    content: GENERIC_UPDATE_BODY,
  },
  {
    slug: "masshtabnoe-obnovlenie-kataloga-inst-2-5",
    category: "novosti",
    title: "Масштабное обновление каталога инструментов10",
    excerpt: GENERIC_UPDATE_EXCERPT,
    date: "1 октября 2023",
    sortDate: "2023-10-01",
    image: "https://www.stroiopttorg.ru/wp-content/uploads/2023/10/news2.webp",
    content: GENERIC_UPDATE_BODY,
  },
  {
    slug: "masshtabnoe-obnovlenie-kataloga-inst-4",
    category: "novosti",
    title: "Масштабное обновление каталога инструментов9",
    excerpt: GENERIC_UPDATE_EXCERPT,
    date: "1 октября 2023",
    sortDate: "2023-10-01",
    image: "https://www.stroiopttorg.ru/wp-content/uploads/2023/10/news.webp",
    content: GENERIC_UPDATE_BODY,
  },
  {
    slug: "masshtabnoe-obnovlenie-kataloga-inst-2-3-2",
    category: "novosti",
    title: "Масштабное обновление каталога инструментов8",
    excerpt: GENERIC_UPDATE_EXCERPT,
    date: "1 октября 2023",
    sortDate: "2023-10-01",
    image: "https://www.stroiopttorg.ru/wp-content/uploads/2023/10/news4.webp",
    content: GENERIC_UPDATE_BODY,
  },
  {
    slug: "masshtabnoe-obnovlenie-kataloga-inst-2-2-2",
    category: "obzory",
    title: "Масштабное обновление каталога инструментов7",
    excerpt: GENERIC_UPDATE_EXCERPT,
    date: "1 октября 2023",
    sortDate: "2023-10-01",
    image: "https://www.stroiopttorg.ru/wp-content/uploads/2023/10/news3.webp",
    content: GENERIC_UPDATE_BODY,
  },
  {
    slug: "masshtabnoe-obnovlenie-kataloga-inst-2-4",
    category: "novosti",
    title: "Масштабное обновление каталога инструментов6",
    excerpt: GENERIC_UPDATE_EXCERPT,
    date: "1 октября 2023",
    sortDate: "2023-10-01",
    image: "https://www.stroiopttorg.ru/wp-content/uploads/2023/10/news2.webp",
    content: GENERIC_UPDATE_BODY,
  },
  {
    slug: "masshtabnoe-obnovlenie-kataloga-inst-3",
    category: "novosti",
    title: "Масштабное обновление каталога инструментов5",
    excerpt: GENERIC_UPDATE_EXCERPT,
    date: "1 октября 2023",
    sortDate: "2023-10-01",
    image: "https://www.stroiopttorg.ru/wp-content/uploads/2023/10/news.webp",
    content: GENERIC_UPDATE_BODY,
  },
  {
    slug: "masshtabnoe-obnovlenie-kataloga-inst-2-3",
    category: "novosti",
    title: "Масштабное обновление каталога инструментов4",
    excerpt: GENERIC_UPDATE_EXCERPT,
    date: "1 октября 2023",
    sortDate: "2023-10-01",
    image: "https://www.stroiopttorg.ru/wp-content/uploads/2023/10/news4.webp",
    content: GENERIC_UPDATE_BODY,
  },
  {
    slug: "masshtabnoe-obnovlenie-kataloga-inst-2-2",
    category: "novosti",
    title: "Масштабное обновление каталога инструментов3",
    excerpt: GENERIC_UPDATE_EXCERPT,
    date: "1 октября 2023",
    sortDate: "2023-10-01",
    image: "https://www.stroiopttorg.ru/wp-content/uploads/2023/10/news3.webp",
    content: GENERIC_UPDATE_BODY,
  },
  {
    slug: "masshtabnoe-obnovlenie-kataloga-inst-2",
    category: "novosti",
    title: "Масштабное обновление каталога инструментов2",
    excerpt: `${GENERIC_UPDATE_EXCERPT}2`,
    date: "1 октября 2023",
    sortDate: "2023-10-01",
    image: "https://www.stroiopttorg.ru/wp-content/uploads/2023/10/news2.webp",
    content: GENERIC_UPDATE_BODY,
  },
  {
    slug: "masshtabnoe-obnovlenie-kataloga-inst",
    category: "sovety",
    title: "Масштабное обновление каталога инструментов",
    excerpt: GENERIC_UPDATE_EXCERPT,
    date: "1 октября 2023",
    sortDate: "2023-10-01",
    image: "https://www.stroiopttorg.ru/wp-content/uploads/2023/10/news.webp",
    content: GENERIC_UPDATE_BODY,
  },
];

export const BLOG_PAGE_SIZE = 12;

export function getPostHref(post: Pick<BlogPost, "category" | "slug">): string {
  return `/${post.category}/${post.slug}`;
}

export function getPostsByCategory(category?: BlogPost["category"]): BlogPost[] {
  const posts = category ? blogPosts.filter((p) => p.category === category) : blogPosts;
  return [...posts].sort((a, b) => (a.sortDate < b.sortDate ? 1 : -1));
}

export function getCategoryCounts(): Record<BlogPost["category"], number> {
  const counts = { novosti: 0, obzory: 0, sovety: 0, stati: 0 } as Record<
    BlogPost["category"],
    number
  >;
  for (const post of blogPosts) counts[post.category] += 1;
  return counts;
}

export function findPost(category: string, slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.category === category && p.slug === slug);
}

export function getRelatedPosts(current: BlogPost, count = 8): BlogPost[] {
  return blogPosts.filter((p) => p.slug !== current.slug).slice(0, count);
}