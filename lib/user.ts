/* ============================================
   FAY COLLECTIBLES — Mock User Data
   ============================================ */

export type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
};

export type Address = {
  id: string;
  label: string;
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
};

export type OrderItem = {
  id: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
  slug: string;
};

export type Order = {
  id: string;
  orderNumber: string;
  date: string;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  trackingNumber?: string;
  deliveryDate?: string;
};

export type WishlistItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  category: string;
  sizes: string[];
};

/* ============================================
   Mock Data
   ============================================ */

export const mockUser: UserProfile = {
  firstName: "Amara",
  lastName: "Osei",
  email: "amara.osei@email.com",
  phone: "+233 24 456 7890",
  dateOfBirth: "1994-03-15",
  gender: "Female",
};

export const mockAddresses: Address[] = [
  {
    id: "addr-1",
    label: "Home",
    firstName: "Amara",
    lastName: "Osei",
    addressLine1: "24 Independence Avenue",
    addressLine2: "Ridge Residential",
    city: "Accra",
    state: "Greater Accra",
    postalCode: "GA-123",
    country: "Ghana",
    phone: "+233 24 456 7890",
    isDefault: true,
  },
  {
    id: "addr-2",
    label: "Office",
    firstName: "Amara",
    lastName: "Osei",
    addressLine1: "5th Floor, One Airport Square",
    city: "Accra",
    state: "Greater Accra",
    postalCode: "GA-058",
    country: "Ghana",
    phone: "+233 30 277 1234",
    isDefault: false,
  },
];

export const mockOrders: Order[] = [
  {
    id: "ord-1",
    orderNumber: "FAY-20250187",
    date: "2025-02-10",
    status: "Delivered",
    items: [
      {
        id: "2",
        name: "Silk Blend Relaxed Shirt",
        size: "M",
        price: 345,
        quantity: 1,
        image: "/images/products/silk-blend-relaxed-shirt/1.jpg",
        slug: "silk-blend-relaxed-shirt",
      },
      {
        id: "5",
        name: "Leather Minimal Belt",
        size: "M",
        price: 195,
        quantity: 1,
        image: "/images/products/leather-minimal-belt/1.jpg",
        slug: "leather-minimal-belt",
      },
    ],
    subtotal: 540,
    shipping: 0,
    total: 540,
    trackingNumber: "FAY1234567890",
    deliveryDate: "2025-02-18",
  },
  {
    id: "ord-2",
    orderNumber: "FAY-20250203",
    date: "2025-01-28",
    status: "Shipped",
    items: [
      {
        id: "1",
        name: "Structured Wool Overcoat",
        size: "S",
        price: 895,
        quantity: 1,
        image: "/images/products/structured-wool-overcoat/1.jpg",
        slug: "structured-wool-overcoat",
      },
    ],
    subtotal: 895,
    shipping: 0,
    total: 895,
    trackingNumber: "FAY0987654321",
  },
  {
    id: "ord-3",
    orderNumber: "FAY-20250089",
    date: "2024-12-15",
    status: "Delivered",
    items: [
      {
        id: "3",
        name: "Tailored Wide-Leg Trouser",
        size: "S",
        price: 425,
        quantity: 1,
        image: "/images/products/tailored-wide-leg-trouser/1.jpg",
        slug: "tailored-wide-leg-trouser",
      },
      {
        id: "7",
        name: "Ribbed Knit Tank",
        size: "S",
        price: 165,
        quantity: 2,
        image: "/images/products/ribbed-knit-tank/1.jpg",
        slug: "ribbed-knit-tank",
      },
    ],
    subtotal: 755,
    shipping: 0,
    total: 755,
    deliveryDate: "2024-12-23",
  },
];

export const mockWishlist: WishlistItem[] = [
  {
    id: "6",
    slug: "double-breasted-blazer",
    name: "Double-Breasted Blazer",
    price: 695,
    image: "/images/products/double-breasted-blazer/1.jpg",
    category: "Outerwear",
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: "4",
    slug: "cashmere-half-zip-knit",
    name: "Cashmere Half-Zip Knit",
    price: 545,
    image: "/images/products/cashmere-half-zip-knit/1.jpg",
    category: "Tops",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "8",
    slug: "draped-midi-skirt",
    name: "Draped Midi Skirt",
    price: 385,
    image: "/images/products/draped-midi-skirt/1.jpg",
    category: "Bottoms",
    sizes: ["XS", "S", "M"],
  },
  {
    id: "10",
    slug: "leather-structured-tote",
    name: "Leather Structured Tote",
    price: 595,
    image: "/images/products/leather-structured-tote/1.jpg",
    category: "Accessories",
    sizes: ["One Size"],
  },
];
