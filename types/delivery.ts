export interface DeliveryImage {
  thumb: string;
  full: string;
}

export interface DeliveryPromo {
  image: string;
  label: string;
  badge: string;
  href: string;
}

export type DeliveryBlock =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  /** Paragraph that opens with a bold lead-in, e.g. "**ООО «StroyMarket»** предлагает..." */
  | { type: "paragraph-lead"; lead: string; text: string }
  /** Short standalone bold line, e.g. "Режим работы:" */
  | { type: "label"; text: string }
  | { type: "list"; items: string[] }
  | { type: "hint"; text: string }
  | { type: "contact"; text: string; phone: string; phoneHref: string };
