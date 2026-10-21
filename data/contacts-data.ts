import type {
  ConsultFormConfig,
  ContactDepartment,
  ContactRegionsBlock,
  ContactRequisites,
  ContactsCard,
  ContactsMap,
} from "@/types/contacts";

/**
 * Контент страницы «Контакты». Держим его здесь, а не в разметке, чтобы компоненты
 * в components/contacts/* работали только с данными: когда появятся реальные
 * эндпоинты, lib/api/contacts.ts начнёт отдавать те же типы с сервера, а UI
 * останется прежним (тот же приём уже применён в data/about-data.ts).
 *
 * Тексты, телефоны, адреса и реквизиты сняты со страницы
 * https://www.stroiopttorg.ru/kontakty/ — это эталон, с которым сверяется вёрстка.
 */

/** Заголовок H1 и последняя крошка. */
export const contactsTitle = "Контакты";

/**
 * Виджет Яндекс.Карт из оригинала. Вынесен в данные, а не в JSX: у боевого
 * бэкенда это, скорее всего, будет настраиваемое поле, а не константа вёрстки.
 */
export const contactsMap: ContactsMap = {
  embedUrl:
    "https://yandex.ru/map-widget/v1/?ll=69.240562%2C41.311081&z=12&lang=ru_RU",
  title: "Карта: ООО «StroyMarket», г. Ташкент (демо)",
};

export const contactsCard: ContactsCard = {
  legalName: "ООО «StroyMarket»",
  address: {
    postalCode: "100000",
    region: "Ташкент",
    locality: "г. Ташкент",
    street: "ул. Примерная, 1 (демо-адрес)",
  },
  phone: { label: "+998 00 000-00-00", tel: "998000000000" },
  email: "demo@stroymarket.example",
  schedule: {
    label: "Ежедневно, с 8:00 до 17:00",
    note: "Без перерыва и выходных",
    machine: "Mo-Su 8:00-18:00",
  },
  callButtonLabel: "Заказать звонок",
};

/** Восемь карточек отделов под картой (сетка 4 колонки × 2 ряда на десктопе). */
export const contactDepartments: ContactDepartment[] = [
  {
    id: "director",
    title: "Генеральный директор:",
    phone: { label: "+998 00 000-00-00 (приемная)", tel: "998000000000" },
  },
  {
    id: "supply",
    title: "Отдел снабжения:",
    phone: { label: "+998 00 000-00-00", tel: "998000000000" },
  },
  {
    id: "sales",
    title: "Отдел сбыта:",
    phone: { label: "+998 00 000-00-00", tel: "998000000000" },
  },
  {
    id: "legal",
    title: "Юридический отдел:",
    phone: { label: "+998 00 000-00-00", tel: "998000000000" },
  },
  {
    id: "accounting",
    title: "Бухгалтерия:",
    phone: { label: "+998 00 000-00-00", tel: "998000000000" },
  },
  {
    id: "delivery",
    title: "Отдел доставки:",
    phone: { label: "+998 00 000-00-00", tel: "998000000000" },
  },
  {
    id: "credit",
    title: "Кредитный отдел:",
    phone: { label: "+998 00 000-00-00", tel: "998000000000" },
  },
  {
    id: "hr",
    title: "Отдел кадров:",
    phone: { label: "+998 00 000-00-00", tel: "998000000000" },
  },
];

export const contactRequisites: ContactRequisites = {
  title: "Реквизиты:",
  text:
    "StroyMarket — демо-проект для портфолио. Реквизиты не указываются: это не действующий магазин.",
};

/** Единый номер и почта для всех региональных представительств. */
const REGION_PHONE = { label: "+998 00 000-00-00", tel: "+998000000000" };
const REGION_EMAIL = "demo@stroymarket.example";

export const contactRegions: ContactRegionsBlock = {
  title: "Работаем по регионам:",
  items: [
    {
      id: "moscow",
      city: "Москва",
      address: "127015, Бумажный пр., 19, стр. 2",
      phone: REGION_PHONE,
      email: REGION_EMAIL,
    },
    {
      id: "stavropol",
      city: "Ставрополь",
      address: "355037, ул. Доваторцев, 38Д",
      phone: REGION_PHONE,
      email: REGION_EMAIL,
    },
    {
      id: "krasnodar",
      city: "Краснодар",
      address: "350002, Северная ул., 490",
      phone: REGION_PHONE,
      email: REGION_EMAIL,
    },
    {
      id: "grozny",
      city: "Грозный",
      address: "364024, ул. Шейха Али Митаева, 17",
      phone: REGION_PHONE,
      email: REGION_EMAIL,
    },
    {
      id: "rostov",
      city: "Ростов-на-Дону",
      address: "344006, Нижнебульварная ул., 6",
      phone: REGION_PHONE,
      email: REGION_EMAIL,
    },
    {
      id: "samara",
      city: "Самара",
      address: "443080, Московское ш., 41",
      phone: REGION_PHONE,
      email: REGION_EMAIL,
    },
  ],
};

export const consultForm: ConsultFormConfig = {
  titleLine1: "У вас есть вопросы?",
  titleLine2: "С радостью ответим на них!",
  fields: [
    { name: "name", label: "Ваше имя", placeholder: "Введите ваше имя", required: true },
    { name: "phone", label: "Номер телефона", placeholder: "+7 (___) ___-__-__", required: true },
    { name: "message", label: "Текст сообщения", placeholder: "Введите ваш вопрос", required: true },
  ],
  submitLabel: "Отправить",
  consentText: "Согласен с обработкой персональных данных в соответствии с",
  consentLinkLabel: "политикой конфиденциальности",
  consentLinkHref: "/privacy-policy",
};
