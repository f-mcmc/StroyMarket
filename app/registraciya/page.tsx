import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthPromoPanel } from "@/components/auth/AuthPromoPanel";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata = {
  title: "Регистрация — StroyMarket",
};

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-[1680px] px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "StroyMarket", href: "/" }, { label: "Регистрация" }]} />

      <h1 className="mb-6 text-3xl font-bold text-neutral-900 sm:text-4xl">Регистрация</h1>

      <AuthCard
        form={<RegisterForm />}
        promo={
          <AuthPromoPanel title="Уже есть аккаунт?" ctaLabel="Авторизоваться" ctaHref="/my-account">
            <p>
              Перейдите к <strong className="font-semibold text-neutral-900">авторизации</strong>{" "}
              если у вас уже есть зарегистрированный аккаунт.
            </p>
          </AuthPromoPanel>
        }
      />
    </div>
  );
}
