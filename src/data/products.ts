import { Coffee, CoffeeIcon, CreditCard, ShoppingCart } from "lucide-react";

export interface ProductType {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: "all" | "coffee" | "non-coffee";
}

export interface CartItem {
  product: ProductType;
  qty: number;
}

export interface OrdersType {

  id: number;
  customerName: string;
  items: CartItem[];
  total: number;
  timestamp: string;
  status: string;
}

export const categorys = ["coffee", "non-coffee"]

export const products: ProductType[] = [
  {
    id: 1,
    name: "Espresso",
    price: 25000,
    image: "https://www.siamhillscoffee.com/wp-content/uploads/What-is-an-Espresso-%E2%80%93-A-Complete-Guide-%E2%80%93-1.jpg",
    description: "Kopi espresso klasik dengan cita rasa kuat.",
    category: "coffee" as const,
  },
  {
    id: 2,
    name: "Cappuccino",
    price: 30000,
    image: "https://cdn0.tudoreceitas.com/pt/posts/7/7/0/cappuccino_funcional_3077_orig.jpg",
    description: "Kopi cappuccino dengan foam susu lembut.",
    category: "coffee" as const,
  },
  {
    id: 3,
    name: "Caramel Latte",
    price: 32000,
    image: "https://www.nescafe.com/cb/sites/default/files/2023-04/RecipeHero_CaramelLatte_1066x1066.jpg",
    description: "Latte dengan sirup karamel spesial.",
    category: "coffee" as const,
  },
  {
    id: 4,
    name: "Americano",
    price: 27000,
    image: "https://coffeforus.com/wp-content/uploads/2022/12/Americano-coffee-recipe.jpg",
    description: "Kopi hitam dengan rasa ringan dan segar.",
    category: "coffee" as const,
  },
  {
    id: 5,
    name: "Matcha Latte",
    price: 35000,
    image: "https://img.freepik.com/premium-photo/matcha-latte-isolated-white-background_1082220-6561.jpg?w=2000",
    description: "Minuman matcha Jepang dengan susu segar.",
    category: "non-coffee" as const,
  },
  {
    id: 6,
    name: "Vanilla Frappe",
    price: 36000,
    image: "https://coloradojava.com/wp-content/uploads/2021/07/Vanilla-Frappe.jpg",
    description: "Frappe dingin dengan rasa vanilla manis.",
    category: "non-coffee" as const,
  },
];

export const orderSteps = [
  {
    icon: Coffee,
    title: "Pilih Menu",
    desc: "Pilih kopi atau makanan favoritmu dari daftar menu kami.",
  },
  {
    icon: ShoppingCart,
    title: "Ke Halaman Order",
    desc: "Masukkan pesananmu dan isi data dengan mudah.",
  },
  {
    icon: CreditCard,
    title: "Lakukan Pembayaran",
    desc: "Bayar dengan metode yang tersedia, cepat dan aman.",
  },
  {
    icon: CoffeeIcon,
    title: "Ambil Pesanan",
    desc: "Pesanan siap diambil di Rumah Singgah.",
  },
];

export function formatIDR(amount: number): string {
  return amount.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
}