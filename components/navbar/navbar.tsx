"use client";

import { Suspense, useEffect, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, Gift, User, BarChart3, Heart, ShoppingCart, Menu, X } from "lucide-react";
import Logo1 from "@/src/svg/logo1.svg";
import { styles } from "@/styles/index.styles";
import { useShop } from "@/context/ShopContext";
import { CatalogButton, DesktopCatalogMenu, MobileCatalogMenu } from "./CatalogMenu";
import { MobileNavDrawer } from "./MobileNavDrawer";

// Ссылки в верхней тонкой строке
const topLinks = [
  { label: "О компании", href: "/about" },
  { label: "Оплата", href: "/payment" },
  { label: "Доставка", href: "/dostavka" },
  { label: "Возврат", href: "/return" },
  { label: "Отзывы", href: "/reviews" },
  { label: "Вопрос-ответ", href: "/faq" },
  { label: "Новости", href: "/blog" },
  { label: "Контакты", href: "/contacts" },
];

function Logo() {
  return (
    <Link href="/" className="flex shrink-0 items-center">
      <Image
        src={Logo1}
        alt="STROYMARKET"
        // Собственный размер SVG — 215×54. Раньше его вписывали в 166×34 через
        // object-contain, и картинка сжималась с пустыми полями по бокам. Теперь
        // ширина задаётся классом, высота — по пропорциям; на широких экранах
        // логотип крупнее, как в эталоне.
        width={215}
        height={54}
        className="h-auto w-[132px] object-contain lg:w-[166px] 2xl:w-[214px]"
        priority
      />
    </Link>
  );
}

/**
 * Общая высота кнопки «Каталог» и строки поиска — чтобы они стояли на одной линии
 * и не «гуляли» по высоте от паддингов. На широких экранах — 52px, как в эталоне.
 */
const CONTROL_HEIGHT = "h-10 2xl:h-[52px]";

/**
 * Состояние всплывающих меню шапки («Каталог», мобильное боковое меню):
 * открывается кнопкой, закрывается повторным нажатием, Escape, кликом по
 * затемнению или при смене страницы.
 */
function usePopupMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Закрываем меню при переходе на другую страницу (правка состояния во время
  // рендера — тот же приём, что и в SearchBarInner).
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return { open, toggle: () => setOpen((value) => !value), close: () => setOpen(false) };
}

/**
 * Поиск по каталогу.
 *
 * Отправляет пользователя на /search?q=..., где результаты грузит хук
 * useProductSearch (React Query → lib/api/products.ts → backend). Сам навбар в
 * сеть не ходит — он только хранит введённый текст и меняет URL.
 *
 * Запрос живёт в URL, поэтому строка восстанавливается при переходе по прямой
 * ссылке и после перезагрузки страницы результатов.
 */
function SearchBarInner({ placeholder }: { placeholder: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryFromUrl = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(queryFromUrl);

  /**
   * Синхронизация с адресной строкой: прямая ссылка, «назад/вперёд», перезагрузка.
   * Правим состояние прямо во время рендера (рекомендованный React способ вместо
   * setState в useEffect — тот вызывает лишний каскадный ререндер).
   */
  const [syncedUrlQuery, setSyncedUrlQuery] = useState(queryFromUrl);
  if (syncedUrlQuery !== queryFromUrl) {
    setSyncedUrlQuery(queryFromUrl);
    setQuery(queryFromUrl);
  }

  function submitSearch() {
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitSearch();
  }

  /**
   * Enter обрабатываем явно, а не полагаемся только на неявную отправку формы:
   * в некоторых окружениях (встроенные webview, автоматизация) неявная отправка
   * не срабатывает, и поиск бы «молчал».
   */
  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      submitSearch();
    }
  }

  function handleClear() {
    setQuery("");
    // Если сейчас открыты результаты — возвращаем страницу в пустое состояние.
    if (queryFromUrl) router.push("/search");
  }

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className={`${CONTROL_HEIGHT} flex min-w-0 flex-1 items-stretch overflow-hidden rounded-lg border-2 border-blue-600 bg-white`}
    >
      <input
        type="text"
        name="q"
        placeholder={placeholder}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="Поиск товаров"
        className="w-full min-w-0 bg-transparent px-4 py-2 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none"
      />
      {query ? (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Очистить поиск"
          className="flex shrink-0 items-center justify-center px-2 text-neutral-400 transition-colors hover:text-neutral-700"
        >
          <X size={16} />
        </button>
      ) : null}
      <button
        type="submit"
        aria-label="Искать"
        className="flex items-center justify-center bg-blue-600 px-5 text-white transition-colors hover:bg-blue-700 shrink-0"
      >
        <Search size={18} />
      </button>
    </form>
  );
}

/** Оболочка формы поиска — используется и как fallback Suspense, чтобы не было скачка вёрстки. */
function SearchBarShell({ placeholder, children }: { placeholder: string; children?: ReactNode }) {
  return (
    <form
      role="search"
      className={`${CONTROL_HEIGHT} flex min-w-0 flex-1 items-stretch overflow-hidden rounded-lg border-2 border-blue-600 bg-white`}
    >
      {children ?? (
        <>
          <input
            type="text"
            name="q"
            placeholder={placeholder}
            aria-label="Поиск товаров"
            readOnly
            className="w-full min-w-0 bg-transparent px-4 py-2 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none"
          />
          <span className="flex shrink-0 items-center justify-center bg-blue-600 px-5 text-white">
            <Search size={18} />
          </span>
        </>
      )}
    </form>
  );
}

/**
 * Форма поиска. `useSearchParams` внутри требует Suspense-границы, иначе
 * production-сборка статических страниц падает (Next.js: "Missing Suspense boundary
 * with useSearchParams") — навбар лежит в корневом layout и рендерится на всех
 * страницах, поэтому граница здесь обязательна.
 */
function SearchBar({ placeholder }: { placeholder: string }) {
  return (
    <Suspense fallback={<SearchBarShell placeholder={placeholder} />}>
      <SearchBarInner placeholder={placeholder} />
    </Suspense>
  );
}

function CountBadge({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <span className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
      {count > 9 ? "9+" : count}
    </span>
  );
}

function OrderCallButton() {
  return (
    <button className="whitespace-nowrap rounded border border-transparent bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600 transition-colors hover:bg-blue-100">
      ЗАКАЗАТЬ ЗВОНОК
    </button>
  );
}

export default function Header() {
  const { cartCount, favoritesCount, compareCount } = useShop();
  const catalog = usePopupMenu();
  const mobileNav = usePopupMenu();

  return (
    <header className="w-full font-sans">
      {/* ================= MOBILE (< md) ================= */}
      <div className="block border-b border-neutral-200 bg-white md:hidden">
        <div className="flex items-center justify-between gap-2 bg-neutral-900 px-3 py-2.5 text-white">
          <button
            type="button"
            onClick={mobileNav.toggle}
            aria-label="Меню"
            aria-expanded={mobileNav.open}
            className="shrink-0"
          >
            <Menu size={22} />
          </button>
          <a href="tel:998000000000" className="whitespace-nowrap text-sm font-semibold">
            +998 00 000-00-00
          </a>
          <OrderCallButton />
        </div>

        <div className="flex items-center justify-between gap-2 px-3 py-3">
          <Logo />
          <div className="flex items-center gap-3 text-neutral-700">
            <Link href="/my-account" aria-label="Войти">
              <User size={20} />
            </Link>
            <Link href="/compare" aria-label="Сравнение" className="relative">
              <BarChart3 size={20} />
              <CountBadge count={compareCount} />
            </Link>
            <Link href="/favorites" aria-label="Избранное" className="relative">
              <Heart size={20} />
              <CountBadge count={favoritesCount} />
            </Link>
            <Link href="/cart" aria-label="Корзина" className="relative">
              <ShoppingCart size={20} />
              <CountBadge count={cartCount} />
            </Link>
          </div>
        </div>

        <MobileNavDrawer
          open={mobileNav.open}
          onClose={mobileNav.close}
          links={topLinks}
          footer={
            <div className="flex flex-col items-start gap-3">
              <span className="text-xs text-neutral-500">Ежедневно, с 8:00 до 18:00</span>
              <a href="tel:998000000000" className="text-lg font-bold text-neutral-900">
                +998 00 000-00-00
              </a>
              <OrderCallButton />
            </div>
          }
        />

        <div className="relative z-40 flex items-center gap-2 px-3 pb-3">
          <CatalogButton className={CONTROL_HEIGHT} open={catalog.open} onToggle={catalog.toggle} />
          <SearchBar placeholder="Поиск..." />
          {catalog.open ? <MobileCatalogMenu onClose={catalog.close} /> : null}
        </div>
      </div>


      {/* ================= DESKTOP (md+) ================= */}
      <div className="hidden md:block">
        {/* Верхняя светлая строка с контактами и ссылками */}
        <div className="border-b border-neutral-200 bg-white text-xs text-neutral-600 2xl:text-sm">
          <div className={`${styles.container} flex items-center justify-between gap-6 py-2 2xl:py-2.5`}>
            <nav className="flex min-w-0 flex-wrap items-center gap-x-5 gap-y-1 lg:flex-nowrap xl:gap-x-6 2xl:gap-x-[30px]">
              {topLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="whitespace-nowrap text-neutral-500 transition-colors hover:text-neutral-900"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex shrink-0 items-center gap-5 2xl:gap-6">
              <span className="hidden whitespace-nowrap text-neutral-500 xl:inline">
                Ежедневно, с 8:00 до 18:00
              </span>
              <a href="tel:998000000000" className="whitespace-nowrap text-sm font-bold text-neutral-900 2xl:text-base">
                +998 00 000-00-00
              </a>
              <OrderCallButton />
            </div>
          </div>
        </div>

        {/* Основная плашка с логотипом, каталогом, поиском и иконками */}
        <div className="relative z-40 border-b border-neutral-200 bg-white py-3.5 2xl:py-7">
          {catalog.open ? <DesktopCatalogMenu onClose={catalog.close} /> : null}
          <div className={`${styles.container} flex items-center justify-between gap-4 lg:gap-6 2xl:gap-[38px]`}>
            <Logo />
            <CatalogButton className={CONTROL_HEIGHT} open={catalog.open} onToggle={catalog.toggle} />
            <SearchBar placeholder="Найти среди 50000 товаров. Например: Дрель Bosch" />

            <div className="flex shrink-0 items-center gap-4 text-xs font-medium text-neutral-700 lg:gap-6 2xl:gap-[27px] 2xl:text-sm">
              <Link href="/stocks" aria-label="Все акции" className="flex flex-col items-center gap-1 hover:text-blue-600 2xl:gap-1.5">
                <Gift size={22} className="2xl:size-6" />
                <span className="hidden lg:inline">Все акции</span>
              </Link>
              <Link href="/my-account" aria-label="Войти" className="flex flex-col items-center gap-1 hover:text-blue-600 2xl:gap-1.5">
                <User size={22} className="2xl:size-6" />
                <span className="hidden lg:inline">Войти</span>
              </Link>
              <Link href="/compare" aria-label="Сравнение" className="relative flex flex-col items-center gap-1 hover:text-blue-600 2xl:gap-1.5">
                <BarChart3 size={22} className="2xl:size-6" />
                <span className="hidden lg:inline">Сравнение</span>
                <CountBadge count={compareCount} />
              </Link>
              <Link href="/favorites" aria-label="Избранное" className="relative flex flex-col items-center gap-1 hover:text-blue-600 2xl:gap-1.5">
                <Heart size={22} className="2xl:size-6" />
                <span className="hidden lg:inline">Избранное</span>
                <CountBadge count={favoritesCount} />
              </Link>
              <Link href="/cart" aria-label="Корзина" className="relative flex flex-col items-center gap-1 hover:text-blue-600 2xl:gap-1.5">
                <ShoppingCart size={22} className="2xl:size-6" />
                <span className="hidden lg:inline">Корзина</span>
                <CountBadge count={cartCount} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
