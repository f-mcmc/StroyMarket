import Link from "next/link";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { NewsletterForm } from "@/components/blog/NewsletterForm";
import { DeliverySlider } from "@/components/dostavka/DeliverySlider";
import { deliveryContent, deliveryPromo } from "@/data/delivery-data";
import { DeliveryBlock } from "@/types/delivery";

export const metadata = {
  title: "Условия доставки — StroyMarket",
  description: "Способы получения заказа: самовывоз, доставка по Ташкенту и Ташкентской области, транспортной компанией и Почтой России.",
};

function renderBlock(block: DeliveryBlock, key: number) {
  switch (block.type) {
    case "heading": {
      const className =
        block.level === 2
          ? "pt-2 text-xl font-semibold text-neutral-900"
          : "pt-2 text-lg font-semibold text-neutral-900";
      const Tag = block.level === 2 ? "h2" : "h3";
      return (
        <Tag key={key} className={className}>
          {block.text}
        </Tag>
      );
    }
    case "paragraph":
      return <p key={key}>{block.text}</p>;
    case "paragraph-lead":
      return (
        <p key={key}>
          <strong className="font-semibold text-neutral-900">{block.lead}</strong>
          {block.text}
        </p>
      );
    case "label":
      return (
        <p key={key} className="font-semibold text-neutral-900">
          {block.text}
        </p>
      );
    case "list":
      return (
        <ul key={key} className="list-disc space-y-1 pl-5">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "hint":
      return (
        <div key={key} className="rounded-xl bg-neutral-50 p-4 text-sm text-neutral-600">
          {block.text}
        </div>
      );
    case "contact":
      return (
        <p key={key}>
          {block.text}{" "}
          <a href={block.phoneHref} className="font-medium text-blue-600 hover:underline">
            {block.phone}
          </a>
          .
        </p>
      );
  }
}

export default function DostavkaPage() {
  return (
    <div className="mx-auto max-w-[1680px] px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "StroyMarket", href: "/" }, { label: "Доставка" }]} />

      <h1 className="mb-6 text-3xl font-bold text-neutral-900 sm:text-4xl">Доставка</h1>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
        <article className="space-y-4 text-base leading-relaxed text-neutral-700">
          {deliveryContent.map((block, i) => renderBlock(block, i))}
        </article>

        <aside className="space-y-6 lg:sticky lg:top-5 lg:self-start">
          <Link href={deliveryPromo.href} className="group relative block overflow-hidden rounded-2xl bg-neutral-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={deliveryPromo.image}
              alt={deliveryPromo.label}
              className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/40 via-transparent p-5">
              <span className="ml-auto rounded-full bg-white px-3 py-1 text-xs font-semibold text-neutral-900">
                {deliveryPromo.badge}
              </span>
              <span className="text-lg font-medium text-white">{deliveryPromo.label}</span>
            </div>
          </Link>

          <NewsletterForm />
        </aside>
      </div>

      <DeliverySlider />
    </div>
  );
}
