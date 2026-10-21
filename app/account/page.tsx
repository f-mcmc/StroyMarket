import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { AccountDashboard } from "@/components/account/AccountDashboard";

export const metadata = {
  title: "Личный кабинет — StroyMarket",
};

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-[1680px] px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "StroyMarket", href: "/" }, { label: "Личный кабинет" }]} />

      <h1 className="mb-6 text-3xl font-bold text-neutral-900 sm:text-4xl">Личный кабинет</h1>

      <AccountDashboard />
    </div>
  );
}
