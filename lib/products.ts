/* ============================================
   FAY COLLECTIBLES — Product Data
   ============================================ */

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  description: string;
  details: string[];
  fabricCare: string[];
  images: string[];
  sizes: string[];
  category: "Tops" | "Bottoms" | "Outerwear" | "Accessories";
  collection: "The Essentials" | "New Season" | "The Edit";
  isNew: boolean;
  isFeatured: boolean;
};

/* ============================================
   Mock Products
   ============================================ */

export const products: Product[] = [
  {
    id: "1",
    slug: "structured-wool-overcoat",
    name: "Structured Wool Overcoat",
    price: 895,
    description:
      "A commanding silhouette in double-faced wool. This overcoat is cut for an intentional, slightly oversized drape that layers effortlessly over tailoring or knitwear. The clean, minimal construction lets the weight and quality of the fabric speak for itself.",
    details: [
      "Double-faced virgin wool",
      "Notch lapel with structured shoulder",
      "Two-button front closure",
      "Welt chest pocket",
      "Fully lined in cupro",
      "Made in Italy",
    ],
    fabricCare: [
      "100% Virgin Wool",
      "Lining: 100% Cupro",
      "Dry clean only",
      "Store on a padded hanger",
    ],
    images: [
      "/images/products/product-1.jpg",
      "/images/products/product-1-alt.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "Outerwear",
    collection: "The Essentials",
    isNew: false,
    isFeatured: true,
  },
  {
    id: "2",
    slug: "silk-blend-relaxed-shirt",
    name: "Silk Blend Relaxed Shirt",
    price: 345,
    description:
      "Fluid and refined, this relaxed-fit shirt is crafted from a silk-cotton blend that drapes with quiet elegance. The slightly dropped shoulder and clean placket give it an effortless quality that transitions from day to evening without compromise.",
    details: [
      "Silk-cotton blend fabric",
      "Relaxed fit with dropped shoulder",
      "Concealed front placket",
      "Single-button barrel cuffs",
      "Back yoke with box pleat",
      "Made in Portugal",
    ],
    fabricCare: [
      "70% Cotton, 30% Silk",
      "Hand wash cold or dry clean",
      "Iron on low heat",
      "Do not tumble dry",
    ],
    images: [
      "/images/products/product-2.jpg",
      "/images/products/product-2-alt.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "Tops",
    collection: "New Season",
    isNew: true,
    isFeatured: true,
  },
  {
    id: "3",
    slug: "tailored-wide-leg-trouser",
    name: "Tailored Wide-Leg Trouser",
    price: 425,
    description:
      "A study in proportion. These wide-leg trousers are cut from a structured wool-blend with a high rise and clean front pleat that creates a strong, elongated line. The generous leg opening balances perfectly against fitted tops and structured outerwear.",
    details: [
      "Wool-blend structured fabric",
      "High-rise with double pleat front",
      "Wide-leg silhouette",
      "Side slash pockets",
      "Single welt back pockets",
      "Zip fly with hook-and-bar closure",
      "Made in Italy",
    ],
    fabricCare: [
      "80% Wool, 20% Polyamide",
      "Dry clean recommended",
      "Steam to remove wrinkles",
      "Store folded or on a clamp hanger",
    ],
    images: [
      "/images/products/product-3.jpg",
      "/images/products/product-3-alt.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "Bottoms",
    collection: "The Essentials",
    isNew: false,
    isFeatured: true,
  },
  {
    id: "4",
    slug: "cashmere-half-zip-knit",
    name: "Cashmere Half-Zip Knit",
    price: 545,
    description:
      "Pure cashmere, zero excess. This half-zip knit is spun from two-ply Mongolian cashmere in a fine gauge that sits close to the body without clinging. The ribbed collar and cuffs add subtle structure to an otherwise fluid piece.",
    details: [
      "Two-ply Mongolian cashmere",
      "Fine gauge knit",
      "Half-zip with metal hardware",
      "Ribbed collar, cuffs, and hem",
      "Regular fit",
      "Made in Scotland",
    ],
    fabricCare: [
      "100% Cashmere",
      "Hand wash in cold water with cashmere detergent",
      "Lay flat to dry",
      "Store folded, never on a hanger",
    ],
    images: [
      "/images/products/product-4.jpg",
      "/images/products/product-4-alt.jpg",
    ],
    sizes: ["S", "M", "L", "XL"],
    category: "Tops",
    collection: "The Essentials",
    isNew: false,
    isFeatured: false,
  },
  {
    id: "5",
    slug: "leather-minimal-belt",
    name: "Leather Minimal Belt",
    price: 195,
    description:
      "Pared back to its purest form. This belt is cut from a single piece of full-grain Italian leather with a slim, brushed-silver buckle. The understated profile makes it a foundational piece that anchors any look without competing for attention.",
    details: [
      "Full-grain Italian leather",
      "Brushed silver-tone buckle",
      "30mm width",
      "Five-hole adjustment",
      "Tonal edge painting",
      "Made in Italy",
    ],
    fabricCare: [
      "100% Full-Grain Cowhide Leather",
      "Wipe clean with a soft cloth",
      "Condition with leather balm periodically",
      "Store flat or loosely rolled",
    ],
    images: [
      "/images/products/product-5.jpg",
      "/images/products/product-5-alt.jpg",
    ],
    sizes: ["S", "M", "L"],
    category: "Accessories",
    collection: "The Essentials",
    isNew: false,
    isFeatured: false,
  },
  {
    id: "6",
    slug: "double-breasted-blazer",
    name: "Double-Breasted Blazer",
    price: 695,
    description:
      "Authority, tailored. This double-breasted blazer is constructed from a seasonless wool-crepe with a slightly nipped waist and peak lapel. It borrows from menswear tradition but is recut with sharper, modern proportions that feel entirely current.",
    details: [
      "Wool-crepe suiting fabric",
      "Peak lapel with double-breasted closure",
      "Padded shoulders for structure",
      "Functional sleeve buttons",
      "Double welt front pockets",
      "Interior welt pocket",
      "Half-canvas construction",
      "Made in Italy",
    ],
    fabricCare: [
      "100% Virgin Wool",
      "Lining: 100% Viscose",
      "Dry clean only",
      "Store on a shaped hanger",
    ],
    images: [
      "/images/products/product-6.jpg",
      "/images/products/product-6-alt.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "Outerwear",
    collection: "New Season",
    isNew: true,
    isFeatured: true,
  },
  {
    id: "7",
    slug: "ribbed-knit-tank",
    name: "Ribbed Knit Tank",
    price: 165,
    description:
      "Essential layering, elevated. This ribbed knit tank is made from a compact cotton-blend that holds its shape wear after wear. The high neckline and slim cut make it as effective under a blazer as it is on its own.",
    details: [
      "Compact ribbed cotton-blend knit",
      "High round neckline",
      "Slim fit through the body",
      "Clean armhole finish",
      "Reinforced shoulder seams",
      "Made in Portugal",
    ],
    fabricCare: [
      "90% Cotton, 10% Elastane",
      "Machine wash cold on gentle cycle",
      "Lay flat to dry",
      "Do not bleach",
    ],
    images: [
      "/images/products/product-7.jpg",
      "/images/products/product-7-alt.jpg",
    ],
    sizes: ["XS", "S", "M", "L"],
    category: "Tops",
    collection: "The Edit",
    isNew: true,
    isFeatured: false,
  },
  {
    id: "8",
    slug: "draped-midi-skirt",
    name: "Draped Midi Skirt",
    price: 385,
    description:
      "Movement captured in fabric. This midi skirt is cut from a fluid satin-back crepe that catches the light as it moves. The bias-cut construction creates a natural drape that skims the body, landing at a flattering mid-calf length.",
    details: [
      "Satin-back crepe fabric",
      "Bias-cut construction",
      "Concealed side zip",
      "Elasticated back waistband panel",
      "Midi length, hits mid-calf",
      "Made in France",
    ],
    fabricCare: [
      "100% Triacetate",
      "Dry clean only",
      "Cool iron on reverse side",
      "Store on a padded skirt hanger",
    ],
    images: [
      "/images/products/product-8.jpg",
      "/images/products/product-8-alt.jpg",
    ],
    sizes: ["XS", "S", "M", "L"],
    category: "Bottoms",
    collection: "New Season",
    isNew: true,
    isFeatured: false,
  },
  {
    id: "9",
    slug: "oversized-cotton-tee",
    name: "Oversized Cotton Tee",
    price: 95,
    description:
      "The definitive wardrobe staple, reworked. This oversized tee is cut from a heavyweight organic cotton jersey that has substance and presence. The dropped shoulder and extended body length give it a relaxed, intentional silhouette that pairs with everything.",
    details: [
      "Heavyweight organic cotton jersey (280 GSM)",
      "Oversized fit with dropped shoulder",
      "Ribbed crew neckline",
      "Extended body length",
      "Side-seam construction",
      "Made in Portugal",
    ],
    fabricCare: [
      "100% Organic Cotton",
      "Machine wash cold",
      "Tumble dry low",
      "Will soften with each wash",
    ],
    images: [
      "/images/products/product-9.jpg",
      "/images/products/product-9-alt.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    category: "Tops",
    collection: "The Essentials",
    isNew: false,
    isFeatured: false,
  },
  {
    id: "10",
    slug: "leather-structured-tote",
    name: "Leather Structured Tote",
    price: 595,
    description:
      "Carry everything, reveal nothing. This structured tote is crafted from smooth, full-grain leather with a rigid base that keeps its shape whether full or empty. The clean lines and absence of visible hardware give it a quiet authority.",
    details: [
      "Full-grain smooth leather",
      "Rigid base construction",
      "Unlined interior with suede finish",
      "Interior zip pocket and slip pocket",
      "Magnetic top closure",
      "Reinforced handles with 22cm drop",
      "Protective metal feet",
      "Made in Italy",
    ],
    fabricCare: [
      "100% Full-Grain Leather",
      "Wipe with a damp cloth",
      "Apply leather conditioner every 3-6 months",
      "Store stuffed with tissue in dust bag",
    ],
    images: [
      "/images/products/product-10.jpg",
      "/images/products/product-10-alt.jpg",
    ],
    sizes: ["One Size"],
    category: "Accessories",
    collection: "The Edit",
    isNew: false,
    isFeatured: true,
  },
  {
    id: "11",
    slug: "slim-tailored-trouser",
    name: "Slim Tailored Trouser",
    price: 365,
    description:
      "Precision meets ease. These slim tailored trousers are cut from a stretch-wool blend that moves with you without losing its pressed silhouette. The mid-rise sits comfortably at the waist, and the tapered leg creates a clean, modern line from hip to ankle.",
    details: [
      "Stretch-wool blend suiting",
      "Mid-rise with flat front",
      "Slim tapered leg",
      "Side slash pockets",
      "Single jetted back pockets with button",
      "Extended hook-and-bar closure",
      "Made in Italy",
    ],
    fabricCare: [
      "96% Wool, 4% Elastane",
      "Dry clean recommended",
      "Steam or press on wool setting",
      "Store on a clamp hanger",
    ],
    images: [
      "/images/products/product-11.jpg",
      "/images/products/product-11-alt.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "Bottoms",
    collection: "The Edit",
    isNew: false,
    isFeatured: false,
  },
  {
    id: "12",
    slug: "wool-cashmere-scarf",
    name: "Wool Cashmere Scarf",
    price: 225,
    description:
      "Warmth without weight. This generously sized scarf is woven from a wool-cashmere blend that is impossibly soft against the skin. The raw-edge finish and tonal palette keep it minimal, letting the quality of the yarn do all the talking.",
    details: [
      "Wool-cashmere blend",
      "Generously sized: 200cm x 70cm",
      "Raw-edge finish",
      "Tonal brand label",
      "Lightweight yet insulating",
      "Made in Scotland",
    ],
    fabricCare: [
      "70% Wool, 30% Cashmere",
      "Dry clean or hand wash cold",
      "Lay flat to dry away from direct heat",
      "Store folded in a breathable bag",
    ],
    images: [
      "/images/products/product-12.jpg",
      "/images/products/product-12-alt.jpg",
    ],
    sizes: ["One Size"],
    category: "Accessories",
    collection: "New Season",
    isNew: true,
    isFeatured: false,
  },
];

/* ============================================
   Helper Functions
   ============================================ */

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(category: Product["category"]): Product[] {
  return products.filter((product) => product.category === category);
}

export function getProductsByCollection(
  collection: Product["collection"]
): Product[] {
  return products.filter((product) => product.collection === collection);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.isFeatured);
}

export function getNewArrivals(): Product[] {
  return products.filter((product) => product.isNew);
}
