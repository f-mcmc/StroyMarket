import {
  consultForm,
  contactDepartments,
  contactRegions,
  contactRequisites,
  contactsCard,
  contactsMap,
  contactsTitle,
} from "@/data/contacts-data";
import type {
  ConsultFormConfig,
  ConsultRequestPayload,
  ConsultRequestResult,
  ContactDepartment,
  ContactRegionsBlock,
  ContactRequisites,
  ContactsCard,
  ContactsMap,
  ContactsPageContent,
} from "@/types/contacts";
import { api } from "./client";

/**
 * API layer страницы «Контакты» (/contacts).
 *
 * ─── Что уже есть на бэкенде ────────────────────────────────────────────────
 * В Postman-документации проекта (см. комментарий в lib/api/config.ts) описан
 * только раздел shop: categories / brands / products / carts / cart-items /
 * orders + auth. Разделов «контакты», «отделы», «регионы» и «обратная связь»
 * там нет, и на живом сервере они не отвечают. Выдумывать маршруты
 * («/contacts/», «/feedback/») здесь нельзя — это дало бы гарантированные 404
 * и сломало бы страницу.
 *
 * ─── Как подключить реальный бэкенд ─────────────────────────────────────────
 * Функции ниже — единственное место, которое об этом знает. UI
 * (app/contacts/page.tsx и components/contacts/*) работает с типами из
 * types/contacts.ts и не знает, откуда пришли данные. Когда появится
 * документация, в каждой функции нужно заменить одну строку
 * `return <локальные данные>` на
 *
 *     const dto = await api.get<ApiContactsCard>("/<путь из документации>/", { auth: false });
 *     return mapContactsCard(dto);
 *
 * где `api` — общий клиент из lib/api/client.ts (он уже берёт базовый URL из
 * NEXT_PUBLIC_API_URL, см. lib/api/config.ts — хардкодить адрес не нужно),
 * а `mapContactsCard` — маппер «ответ бэкенда → тип из types/contacts.ts».
 * Ни разметку, ни пропсы компонентов при этом менять не придётся.
 *
 * Ошибки: клиент кидает ApiError (lib/api/errors.ts) — страница уже ловит его и
 * показывает состояние ошибки, так что дополнительная обработка не нужна.
 */

/** Заголовок страницы (H1 и последняя хлебная крошка). */
export async function getContactsTitle(): Promise<string> {
  return contactsTitle;
}

/** Блок с картой: URL виджета и подпись. */
export async function getContactsMap(): Promise<ContactsMap> {
  return contactsMap;
}

/** Белая карточка поверх карты: адрес, телефон, email, график работы. */
export async function getContactsCard(): Promise<ContactsCard> {
  return contactsCard;
}

/** Карточки отделов под картой. */
export async function listContactDepartments(): Promise<ContactDepartment[]> {
  return contactDepartments;
}

/** Серый блок «Реквизиты:». */
export async function getContactRequisites(): Promise<ContactRequisites> {
  return contactRequisites;
}

/** Блок «Работаем по регионам:». */
export async function getContactRegions(): Promise<ContactRegionsBlock> {
  return contactRegions;
}

/** Конфигурация формы обратной связи (подписи полей, плейсхолдеры, ссылка на политику). */
export async function getConsultForm(): Promise<ConsultFormConfig> {
  return consultForm;
}

/**
 * Весь контент страницы одним вызовом. Отдельные функции выше сохранены, потому
 * что на реальном бэкенде это, скорее всего, будут разные эндпоинты: тогда здесь
 * останется тот же Promise.all, а страница не заметит разницы.
 */
export async function getContactsPage(): Promise<ContactsPageContent> {
  const [title, map, card, departments, requisites, regions, consult] = await Promise.all([
    getContactsTitle(),
    getContactsMap(),
    getContactsCard(),
    listContactDepartments(),
    getContactRequisites(),
    getContactRegions(),
    getConsultForm(),
  ]);

  return { title, map, card, departments, requisites, regions, consult };
}

/**
 * Путь эндпоинта формы обратной связи. Пока его нет в документации, поэтому он
 * не «зашит» в код, а читается из переменной окружения (см. .env.example).
 * Как только бэкенд отдаст маршрут — достаточно прописать
 * NEXT_PUBLIC_CONSULT_ENDPOINT=/feedback/ и ничего в UI не менять.
 */
const CONSULT_ENDPOINT = process.env.NEXT_PUBLIC_CONSULT_ENDPOINT?.trim();

/**
 * Отправка формы «У вас есть вопросы?».
 *
 * Если эндпоинт настроен — уходит обычный POST через общий клиент (с ApiError на
 * не-2xx, который форма показывает пользователем). Если нет — заявка никуда не
 * уходит, и функция честно возвращает это в `ok: false`, а не имитирует успех.
 */
export async function submitConsultRequest(
  payload: ConsultRequestPayload
): Promise<ConsultRequestResult> {
  if (!CONSULT_ENDPOINT) {
    return {
      ok: false,
      message:
        "Форма обратной связи ещё не подключена к серверу. Позвоните нам по телефону +998 00 000-00-00 — мы ответим сразу.",
    };
  }

  await api.post(CONSULT_ENDPOINT, payload, { auth: false });

  return { ok: true, message: "Спасибо! Мы получили ваш вопрос и свяжемся с вами в ближайшее время." };
}
