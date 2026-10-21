/**
 * Типы контента страницы «Контакты» (/contacts).
 *
 * Это "UI-типы": именно их ожидают компоненты в components/contacts/*. Форма ответов
 * реального backend хранится отдельно в types/api.ts — так же, как это уже сделано
 * для каталога и страницы «О компании» (types/company.ts). Когда появится
 * документация по эндпоинтам контактов, маппинг "ответ backend → тип отсюда"
 * пишется один раз в lib/api/contacts.ts, а разметку трогать не придётся.
 */

/** Строка адреса, разбитая на части микроразметки schema.org/PostalAddress. */
export interface ContactAddress {
  postalCode: string;
  region: string;
  locality: string;
  street: string;
}

/** Телефон: отображаемый вид + нормализованный номер для `tel:`. */
export interface ContactPhone {
  /** Как показываем: «+998 00 000-00-00». */
  label: string;
  /** Как уходит в href: «88782284272». */
  tel: string;
}

/** График работы в карточке контактов. */
export interface ContactSchedule {
  /** Первая строка: «Ежедневно, с 8:00 до 17:00». */
  label: string;
  /** Вторая строка под <br>: «Без перерыва и выходных». */
  note: string;
  /** Машиночитаемый формат для <time datetime> (schema.org/openingHours). */
  machine: string;
}

/** Белая карточка поверх карты: реквизиты головного офиса. */
export interface ContactsCard {
  /** Заголовок карточки: «ООО «StroyMarket»». */
  legalName: string;
  address: ContactAddress;
  phone: ContactPhone;
  email: string;
  schedule: ContactSchedule;
  /** Подпись кнопки под карточкой. */
  callButtonLabel: string;
}

/** Блок с картой. В оригинале — виджет Яндекс.Карт в <iframe>. */
export interface ContactsMap {
  /** URL виджета. Не хардкодится в JSX — приходит сюда из data/api-слоя. */
  embedUrl: string;
  /** Подпись для screen-reader'ов и атрибута title у <iframe>. */
  title: string;
}

/** Карточка отдела в сетке под картой («Генеральный директор», «Бухгалтерия», …). */
export interface ContactDepartment {
  id: string;
  /** Название отдела с двоеточием. */
  title: string;
  phone: ContactPhone;
}

/** Серый блок «Реквизиты:» справа от сетки отделов. */
export interface ContactRequisites {
  title: string;
  /** Сплошной текст реквизитов, как в оригинале. */
  text: string;
}

/** Карточка города в блоке «Работаем по регионам:». */
export interface ContactRegion {
  id: string;
  city: string;
  /** Вторая строка карточки — почтовый адрес. */
  address: string;
  phone: ContactPhone;
  email: string;
}

/** Заголовок и подпись блока регионов. */
export interface ContactRegionsBlock {
  title: string;
  items: ContactRegion[];
}

/** Поле формы обратной связи в секции «У вас есть вопросы?». */
export interface ConsultFormField {
  name: "name" | "phone" | "message";
  label: string;
  placeholder: string;
  required: boolean;
}

/** Секция «У вас есть вопросы? С радостью ответим на них!». */
export interface ConsultFormConfig {
  /** Первая строка заголовка (до <br>). */
  titleLine1: string;
  /** Вторая строка заголовка (после <br>). */
  titleLine2: string;
  fields: ConsultFormField[];
  submitLabel: string;
  consentText: string;
  consentLinkLabel: string;
  consentLinkHref: string;
}

/** Всё содержимое страницы «Контакты» одним объектом. */
export interface ContactsPageContent {
  /** Заголовок H1 и подпись хлебных крошек. */
  title: string;
  map: ContactsMap;
  card: ContactsCard;
  departments: ContactDepartment[];
  requisites: ContactRequisites;
  regions: ContactRegionsBlock;
  consult: ConsultFormConfig;
}

/** Тело запроса формы обратной связи. */
export interface ConsultRequestPayload {
  name: string;
  phone: string;
  message: string;
}

/** Ответ на отправку формы обратной связи. */
export interface ConsultRequestResult {
  ok: boolean;
  message: string;
}
