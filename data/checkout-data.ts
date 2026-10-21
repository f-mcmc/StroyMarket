import { DeliveryMethod } from "@/types/order";

export interface CheckoutRegion {
  id: string;
  name: string;
  cities: string[];
}

export const checkoutRegions: CheckoutRegion[] = [
  { id: "kchr", name: "Ташкент", cities: ["Ташкент"] },
  { id: "moscow-region", name: "Московская область", cities: ["Москва", "Химки", "Подольск"] },
  { id: "krasnodar", name: "Краснодарский край", cities: ["Краснодар", "Сочи", "Новороссийск"] },
  { id: "rostov", name: "Ростовская область", cities: ["Ростов-на-Дону", "Таганрог"] },
  { id: "sverdlovsk", name: "Свердловская область", cities: ["Екатеринбург", "Нижний Тагил"] },
  { id: "magadan", name: "Магаданская область", cities: ["Магадан"] },
];

export const deliveryCosts: Record<DeliveryMethod, number> = {
  pickup: 0,
  "store-delivery": 500,
  sdek: 1000,
};

export const pickupAddress = "г. Ташкент, ул. Примерная, 1 (демо-адрес)";

export const mockPvzAddresses: string[] = [
  "г. Москва, ул. Складочная, 3, ПВЗ СДЭК №1",
  "г. Краснодар, ул. Красных Партизан, 4/1, ПВЗ СДЭК №7",
  "г. Ростов-на-Дону, пр-т Стачки, 47, ПВЗ СДЭК №2",
];

export const promoCodes: Record<string, number> = {
  STROY10: 10,
  WANDER5: 5,
};
