import { CalendarClock, PhoneCall, PackageCheck, Wallet2, ShieldCheck } from "lucide-react";
import Faq from "@/components/faq/faq";
import { styles } from "@/styles/index.styles";

const returnSteps = [
  {
    icon: PhoneCall,
    title: "Свяжитесь с нами",
    description:
      "Позвоните по телефону +998 00 000-00-00 или напишите на demo@stroymarket.example и опишите причину возврата.",
  },
  {
    icon: PackageCheck,
    title: "Подготовьте товар",
    description:
      "Сохраните товарный вид, упаковку и чек. Соберите документы, подтверждающие покупку.",
  },
  {
    icon: CalendarClock,
    title: "Передайте товар",
    description:
      "Привезите товар в пункт самовывоза или согласуйте с менеджером вывоз курьером.",
  },
  {
    icon: Wallet2,
    title: "Получите возврат",
    description:
      "Деньги возвращаются тем же способом, которым была произведена оплата, в течение 10 рабочих дней.",
  },
];

const returnConditions = [
  "С момента покупки прошло не более 14 дней (не считая дня покупки).",
  "Товар не был в употреблении, сохранены его товарный вид и потребительские свойства.",
  "Сохранены пломбы, фабричные ярлыки и заводская упаковка.",
  "Есть документ, подтверждающий факт и условия покупки (чек, накладная).",
];

const nonReturnable = [
  "Товары, изготовленные или раскроенные по индивидуальным размерам заказчика.",
  "Строительные и отделочные материалы в жидком или сыпучем виде, если упаковка была вскрыта.",
  "Электроинструмент со следами эксплуатации при отсутствии заводского брака.",
  "Средства индивидуальной защиты и спецодежда, бывшие в использовании.",
];

const faqItems = [
  {
    question: "Сколько времени рассматривается заявка на возврат?",
    answer:
      "Решение по заявке принимается в течение 3 рабочих дней с момента получения товара и документов.",
  },
  {
    question: "Кто оплачивает доставку при возврате?",
    answer:
      "Если причина возврата — брак или пересорт по вине магазина, доставку оплачиваем мы. В остальных случаях расходы по доставке несёт покупатель.",
  },
  {
    question: "Можно ли обменять товар на другой вместо возврата денег?",
    answer:
      "Да, вы можете оформить обмен на аналогичный товар другого размера, цвета или комплектации при его наличии на складе.",
  },
  {
    question: "Действует ли гарантия, если чек утерян?",
    answer:
      "Да, факт покупки можно подтвердить по номеру заказа в нашей базе или выпиской по карте. Отсутствие чека не является основанием для отказа.",
  },
  {
    question: "На весь ли товар действует гарантия производителя?",
    answer:
      "Гарантия распространяется на товары, для которых производителем установлен гарантийный срок. Срок и условия указаны в гарантийном талоне или на сайте производителя.",
  },
];

function StepRow({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: typeof PhoneCall;
  title: string;
  description: string;
  index: number;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
          <Icon size={18} />
        </div>
        {index < returnSteps.length - 1 && (
          <span aria-hidden className="mt-2 w-px flex-1 bg-neutral-200" />
        )}
      </div>
      <div className="pb-8">
        <h3 className="text-sm font-bold text-neutral-900 sm:text-base">
          {title}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-neutral-600 sm:text-[15px]">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function ReturnPage() {
  return (
    <div className={`${styles.container} py-8 sm:py-12`}>
      <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
        Возврат товара и гарантия
      </h1>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-600 sm:text-base">
        Мы дорожим доверием покупателей и готовы принять товар обратно, если он вам
        не подошёл. Ниже — условия возврата, порядок действий и гарантийные
        обязательства.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-10 sm:mt-12 lg:grid-cols-2 lg:gap-16">
        <section>
          <h2 className="text-lg font-bold text-neutral-900 sm:text-xl">
            Условия возврата
          </h2>
          <ul className="mt-4 space-y-3">
            {returnConditions.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm leading-relaxed text-neutral-600 sm:text-[15px]"
              >
                <ShieldCheck
                  size={18}
                  className="mt-0.5 shrink-0 text-blue-600"
                />
                {item}
              </li>
            ))}
          </ul>

          <h2 className="mt-10 text-lg font-bold text-neutral-900 sm:text-xl">
            Товары, не подлежащие возврату
          </h2>
          <ul className="mt-4 space-y-3">
            {nonReturnable.map((item) => (
              <li
                key={item}
                className="list-disc text-sm leading-relaxed text-neutral-600 marker:text-neutral-400 sm:text-[15px]"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-neutral-900 sm:text-xl">
            Как оформить возврат
          </h2>
          <div className="mt-4">
            {returnSteps.map((step, index) => (
              <StepRow key={step.title} {...step} index={index} />
            ))}
          </div>
        </section>
      </div>

      <section className="mt-4 rounded-lg border border-neutral-200 p-6 sm:mt-6">
        <h2 className="text-lg font-bold text-neutral-900 sm:text-xl">
          Гарантийные обязательства
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-neutral-600 sm:text-base">
          На товары, для которых производителем установлен гарантийный срок,
          гарантия действует с момента передачи товара покупателю. Для
          обращения по гарантии сохраняйте гарантийный талон и кассовый чек.
          При обнаружении заводского брака мы бесплатно отремонтируем, заменим
          товар или вернём деньги — в соответствии с Законом РФ «О защите прав
          потребителей».
        </p>
      </section>

      <div className="mt-14 sm:mt-16">
        <Faq items={faqItems} />
      </div>
    </div>
  );
}
