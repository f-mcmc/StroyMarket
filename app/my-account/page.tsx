import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthPromoPanel } from "@/components/auth/AuthPromoPanel";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata = {
  title: "Авторизация — StroyMarket",
};

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-[1680px] px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "StroyMarket", href: "/" }, { label: "Авторизация" }]} />

      <h1 className="mb-6 text-3xl font-bold text-neutral-900 sm:text-4xl">Авторизация</h1>

      <AuthCard
        form={<LoginForm />}
        promo={
          <AuthPromoPanel
            title="Еще нет аккаунта?"
            ctaLabel="Зарегистрироваться"
            ctaHref="/registraciya"
          >
            <p>
              <strong className="font-semibold text-neutral-900">Регистрация на сайте</strong>{" "}
              позволяет получить доступ к статусу и истории вашего заказа. Просто заполните поля
              ниже, и вы получите учетную запись.
            </p>
            <p>
              Мы запрашиваем у вас только информацию, необходимую для того, чтобы сделать процесс
              покупки более быстрым и легким.
            </p>
          </AuthPromoPanel>
        }
      />
    </div>
  );
}
