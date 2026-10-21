import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export const metadata = {
  title: "Восстановление пароля — StroyMarket",
};

export default function ResetPasswordPage() {
  return (
    <div className="mx-auto max-w-[1680px] px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[{ label: "StroyMarket", href: "/" }, { label: "Восстановление пароля" }]}
      />

      <h1 className="mb-6 text-3xl font-bold text-neutral-900 sm:text-4xl">
        Восстановление пароля
      </h1>

      <ResetPasswordForm />
    </div>
  );
}
