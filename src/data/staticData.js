const NO_IMAGE = "https://storage.doubleyoupemuteran.com/public/image/no-image.png";
import activityTrekking from "../assets/astika-image/1_36.jpeg";
import activityWaterfall from "../assets/astika-image/1_18.jpeg";
import activitySnorkeling from "../assets/astika-image/images.jfif";
import activityWeaving from "../assets/astika-image/images1.jfif";
import activityTemple from "../assets/astika-image/images2.jfif";
import activitySilverClass from "../assets/astika-image/images3.png";
import activityScooter from "../assets/astika-image/images4.jfif";
import packageSingle from "../assets/astika-image/1a.jpg";
import packageCouple from "../assets/astika-image/2a.jpg";
import packageGroup from "../assets/astika-image/1_31.jpeg";
import packageSpecial from "../assets/astika-image/3b.jpg";

const activityImages = {
  trekking: activityTrekking,
  waterfall: activityWaterfall,
  swing: activitySnorkeling,
  temple: activityTemple,
  weaving: activityWeaving,
  silverClass: activitySilverClass,
  scooterTour: activityScooter,
};

const packageImages = {
  single: packageSingle,
  couple: packageCouple,
  group: packageGroup,
  special: packageSpecial,
};

// ─── Season Configuration ────────────────────────────────────────────
export const seasonConfig = {
  high: {
    name: "High Season",
    ranges: [
      { startMonth: 4, startDay: 1, endMonth: 4, endDay: 30 },
      { startMonth: 7, startDay: 1, endMonth: 9, endDay: 15 },
      { startMonth: 12, startDay: 15, endMonth: 1, endDay: 9 },
    ],
  },
  low: {
    name: "Low Season",
  },
};

export function getSeasonForDate(date) {
  const m = date.getMonth() + 1;
  const d = date.getDate();

  const inRange = (r) => {
    if (r.startMonth <= r.endMonth) {
      return (m > r.startMonth || (m === r.startMonth && d >= r.startDay))
          && (m < r.endMonth   || (m === r.endMonth   && d <= r.endDay));
    }
    return (m > r.startMonth || (m === r.startMonth && d >= r.startDay))
        || (m < r.endMonth   || (m === r.endMonth   && d <= r.endDay));
  };

  return seasonConfig.high.ranges.some(inRange) ? "high" : "low";
}

// export function getVariantPrice(variant, date) {
//   if (variant.pricing) {
//     const season = getSeasonForDate(date);
//     return variant.pricing[season];
//   }
//   return variant.price;
// }

export function getVariantPrice(variant, date) {
  if (variant.pricing) {
    const season = getSeasonForDate(date);
    return variant.pricing[season] ?? null;
  }

  return variant.price ?? null;
}

export function getMinPrice(product, date) {
  if (!product.variants?.length) return null;
  const prices = product.variants.map((v) => getVariantPrice(v, date));
  return Math.min(...prices);
}

// ─── Products ────────────────────────────────────────────────────────

export const accommodations = [
  {
    id: 1,
    name: "Standard Room",
    description:
      "Comfortable standard room with air conditioning, hot/cold shower, and free Wi-Fi access from the terrace. Perfect for solo travelers or couples looking for a cozy stay.",
    product_thumbnail:
      "https://storage.doubleyoupemuteran.com/public/doubleyou/annie-hatuanh-c9zAhh2jNRQ-unsplash.jpg",
    inclusion:
      "<ul><li>Air Conditioning</li><li>Hot/Cold Shower</li><li>Free Wi-Fi</li><li>Daily Housekeeping</li><li>2 Mineral Water Bottles Daily</li></ul>",
    exclusion:
      "<ul><li>Breakfast</li><li>Airport Transfer</li><li>Laundry Service</li></ul>",
    variants: [
      { id: 1, name: "Standard Room", pricing: { low: 350000, high: 450000 }, remaining_qty: 4 },
    ],
    additionals: [
      { id: 1, name: "Extra Bed", price: 100000 },
      { id: 2, name: "Breakfast", price: 50000 },
    ],
    images: [
      {
        image_path:
          "https://storage.doubleyoupemuteran.com/public/doubleyou/annie-hatuanh-c9zAhh2jNRQ-unsplash.jpg",
      },
    ],
  },
  {
    id: 2,
    name: "Deluxe Room",
    description:
      "Spacious deluxe room with premium amenities, sitting area, and a beautiful terrace view of the swimming pool. Ideal for guests seeking extra comfort and space.",
    product_thumbnail:
      "https://storage.doubleyoupemuteran.com/public/doubleyou/spacejoy-RUvW1KGD9a4-unsplash.jpg",
    inclusion:
      "<ul><li>Air Conditioning</li><li>Hot/Cold Shower</li><li>Free Wi-Fi</li><li>Daily Housekeeping</li><li>2 Mineral Water Bottles Daily</li><li>Sitting Area</li><li>Pool View Terrace</li></ul>",
    exclusion:
      "<ul><li>Breakfast</li><li>Airport Transfer</li><li>Laundry Service</li></ul>",
    variants: [
      { id: 2, name: "Deluxe Room", pricing: { low: 500000, high: 650000 }, remaining_qty: 5 },
    ],
    additionals: [
      { id: 3, name: "Extra Bed", price: 100000 },
      { id: 4, name: "Breakfast", price: 50000 },
    ],
    images: [
      {
        image_path:
          "https://storage.doubleyoupemuteran.com/public/doubleyou/spacejoy-RUvW1KGD9a4-unsplash.jpg",
      },
    ],
  },
];

export const activities = [
  {
  id: 1,
  name: "Rice terrace view trekking",
  description:
    "Explore the beautiful rice terraces of Sidemen while enjoying a peaceful trek and breathtaking views of the surrounding mountains and countryside.",
  product_thumbnail: NO_IMAGE,
  inclusion:
    "<ul><li>Guide</li><li>Driver</li><li>Bottle of Water</li></ul>",
  variants: [
    { id: 1, name: "Half Day", remaining_qty: 10 },
    { id: 2, name: "Full Day", remaining_qty: 10 },
  ],
  additionals: [],
  images: [{ image_path: activityImages.trekking }],
},
{
  id: 2,
  name: "Gembleng waterfall",
  description:
    "Discover the natural beauty of Gembleng Waterfall, surrounded by lush greenery, and enjoy a refreshing swim in its natural pools.",
  product_thumbnail: NO_IMAGE,
  inclusion:
    "<ul><li>Guide</li><li>Driver</li></ul>",
  exclusion:
    "<ul><li>Personal Expenses</li><li>Underwater Camera</li></ul>",
  variants: [
    { id: 3, name: "Half Day", remaining_qty: 10 },
    { id: 4, name: "Full Day", remaining_qty: 10 },
  ],
  additionals: [],
  images: [{ image_path: activityImages.waterfall }],
},
{
  id: 3,
  name: "Sidemen Swing",
  description:
    "Enjoy an unforgettable swing experience in Sidemen while taking in panoramic views of the lush green valley and surrounding countryside.",
  product_thumbnail: NO_IMAGE,
  inclusion:
    "<ul><li>Guide</li><li>Driver</li></ul>",
  exclusion:
    "<ul><li>Personal Expenses</li><li>Meals</li></ul>",
  variants: [
    { id: 5, name: "Half Day", remaining_qty: 10 },
    { id: 6, name: "Full Day", remaining_qty: 10 },
  ],
  additionals: [],
  images: [{ image_path: activityImages.swing }],
},
{
  id: 4,
  name: "Local Distillery & Weaving Factory",
  description:
    "Discover the local traditions of Sidemen by visiting a traditional weaving factory and experiencing the unique craftsmanship of the local community.",
  product_thumbnail: NO_IMAGE,
  inclusion:
    "<ul><li>Guide</li><li>Driver</li></ul>",
  exclusion:
    "<ul><li>Personal Expenses</li><li>Meals</li></ul>",
  variants: [
    { id: 7, name: "Half Day", remaining_qty: 10 },
    { id: 8, name: "Full Day", remaining_qty: 10 },
  ],
  additionals: [],
  images: [{ image_path: activityImages.weaving }],
},
{
  id: 5,
  name: "Besakih Temple",
  description:
    "Visit Besakih Temple, known as the Mother Temple of Bali, and discover its sacred temples, rich culture, and beautiful mountain surroundings.",
  product_thumbnail: NO_IMAGE,
  inclusion: "<ul><li>Guide</li><li>Driver</li></ul>",
  exclusion: "<ul><li>Personal Expenses</li><li>Meals</li></ul>",
  variants: [
    { id: 9, name: "Half Day", remaining_qty: 10 },
    { id: 10, name: "Full Day", remaining_qty: 10 },
  ],
  additionals: [],
  images: [{ image_path: activityImages.temple }],
},
{
  id: 6,
  name: "Silver Class",
  description:
    "Learn the art of traditional Balinese silver jewelry making and create your own unique piece with guidance from local artisans.",
  product_thumbnail: NO_IMAGE,
  inclusion: "<ul><li>Guide</li><li>Driver</li></ul>",
  exclusion: "<ul><li>Personal Expenses</li><li>Meals</li></ul>",
  variants: [
    { id: 11, name: "Half Day", remaining_qty: 10 },
    { id: 12, name: "Full Day", remaining_qty: 10 },
  ],
  additionals: [],
  images: [{ image_path: activityImages.silverClass }],
},
{
  id: 7,
  name: "Scooter Tour",
  description:
    "Explore the beautiful countryside of Bali on a thrilling scooter tour. Perfect for adventure seekers who want to experience the scenic landscapes at their own pace.",
  product_thumbnail: NO_IMAGE,
  inclusion: "<ul><li>Guide</li><li>Driver</li></ul>",
  exclusion: "<ul><li>Personal Expenses</li><li>Meals</li></ul>",
  variants: [
    { id: 13, name: "Half Day", remaining_qty: 10 },
    { id: 14, name: "Full Day", remaining_qty: 10 },
  ],
  additionals: [],
  images: [{ image_path: activityImages.scooterTour }],
},
];

export const packages = [
  {
    id: 1,
    name: "Single Package",
    description:
      "Enjoy a peaceful rice field trekking experience through the beautiful countryside of Bali. Perfect for solo travelers who want to explore the scenic rice fields at their own pace.",
    product_thumbnail: NO_IMAGE,
    inclusion:
      "<ul><li>Guide</li><li>Bottle of Water</li></ul>",
    variants: [
      {
        id: 1,
        name: "Single Package",
        pricing: { low: 75000, high: 75000 },
        remaining_qty: 3,
      },
    ],
    additionals: [],
    images: [{ image_path: packageImages.single }],
  },
  {
    id: 2,
    name: "Couple Package",
    description:
      "Explore Bali beautiful rice fields together with a relaxing trekking experience. Perfect for couples, friends, or small groups of up to 3 people looking to enjoy the peaceful countryside and stunning scenery.",
    product_thumbnail: NO_IMAGE,
    inclusion:
      "<ul><li>Guide</li><li>Bottle of Water</li></ul>",
    variants: [
      {
        id: 2,
        name: "Couple Package 2 persons",
        pricing: { low: 75000, high: 75000 },
        remaining_qty: 3,
      },
      {
        id: 3,
        name: "Couple Package 3 persons",
        pricing: { low: 75000, high: 75000 },
        remaining_qty: 3,
      },
    ],
    additionals: [],
    images: [{ image_path: packageImages.couple }],
  },
  {
    id: 3,
    name: "Group package",
    description:
      "Experience the beauty of Bali countryside with your friends or family. Designed for groups of 4 to 10 people, this rice field trekking experience offers a fun and memorable way to discover the scenic landscapes of Bali together.",
    product_thumbnail: NO_IMAGE,
    inclusion:
      "<ul><li>Guide</li><li>Bottle of Water</li></ul>",
    variants: [
      {
        id: 4,
        name: "Group Package 4 persons",
        pricing: { low: 75000, high: 75000 },
        remaining_qty: 3,
      },
      {
        id: 5,
        name: "Group Package 5 persons",
        pricing: { low: 75000, high: 75000 },
        remaining_qty: 3,
      },
      {
        id: 6,
        name: "Group Package 6 persons",
        pricing: { low: 75000, high: 75000 },
        remaining_qty: 3,
      },
      {
        id: 7,
        name: "Group Package 7 persons",
        pricing: { low: 75000, high: 75000 },
        remaining_qty: 3,
      },
      {
        id: 8,
        name: "Group Package 8 persons",
        pricing: { low: 75000, high: 75000 },
        remaining_qty: 3,
      },
      {
        id: 9,
        name: "Group Package 9 persons",
        pricing: { low: 75000, high: 75000 },
        remaining_qty: 3,
      },
      {
        id: 10,
        name: "Group Package 10 persons",
        pricing: { low: 75000, high: 75000 },
        remaining_qty: 3,
      },
    ],
    additionals: [],
    images: [{ image_path: packageImages.group }],
  },
  {
    id: 4,
    name: "Special Package",
    description:
      "Make your rice field trekking experience even more special with our 2-hour package, including entrance tickets and a bottle of water for each person. Enjoy a longer and more complete countryside experience at a great value.",
    product_thumbnail: NO_IMAGE,
    inclusion:
      "<ul><li>Guide</li><li>Bottle of Water</li></ul>",
    variants: [
      {
        id: 11,
        name: "Rice field trekking for 1 person for 2 hours",
        pricing: { low: 200000, high: 200000 },
        remaining_qty: 3,
      },
      {
        id: 12,
        name: "Rice field trekking for 2 person for 2 hours",
        pricing: { low: 400000, high: 400000 },
        remaining_qty: 3,
      },
    ],
    additionals: [{ id: 1, name: "Each Additional hour", price: 50000 }],
    images: [{ image_path: packageImages.special }],
  },
];

export const transport = [
  {
    id: 1,
    name: "Sidemen Pick-up and Drop-off",
    description:
      "Ask us for your special offer",
  },
  {
    id: 2,
    name: "Amed Harbor Pick-up and Drop-off",
    description:
      "Ask us for your special offer",
  },
  {
    id: 3,
    name: "Airport Harbor Pick-up and Drop-off",
    description: "Ask us for your special offer",
  },
  {
    id: 4,
    name: "Ubud Harbor Pick-up and Drop-off",
    description: "Ask us for your special offer",
  },
  {
    id: 5,
    name: "Uluwatu Harbor Pick-up and Drop-off",
    description: "Ask us for your special offer",
  },
  {
    id: 6,
    name: "Sanur Harbor Pick-up and Drop-off",
    description: "Ask us for your special offer",
  },
  {
    id: 7,
    name: "Nusa Dua Harbor Pick-up and Drop-off",
    description: "Ask us for your special offer",
  },
  {
    id: 8,
    name: "Penglipuran Harbor Pick-up and Drop-off",
    description: "Ask us for your special offer",
  },
  {
    id: 9,
    name: "Besakih Temple Pick-up and Drop-off",
    description: "Ask us for your special offer",
  },
  {
    id: 10,
    name: "Lempuyang Temple Pick-up and Drop-off",
    description: "Ask us for your special offer",
  },
  {
    id: 11,
    name: "Uluwatu Temple Pick-up and Drop-off",
    description: "Ask us for your special offer",
  },
  {
    id: 12,
    name: "GWK Bali Pick-up and Drop-off",
    description: "Ask us for your special offer",
  },
  {
    id: 13,
    name: "Seminyak Pick-up and Drop-off",
    description: "Ask us for your special offer",
  },
  {
    id: 14,
    name: "Canggu Pick-up and Drop-off",
    description: "Ask us for your special offer",
  },
  {
    id: 15,
    name: "Tanah Tot Pick-up and Drop-off",
    description: "Ask us for your special offer",
  },
  {
    id: 16,
    name: "Monkey Forest Pick-up and Drop-off",
    description: "Ask us for your special offer",
  },
];

export const rental = [
  {
    id: 1,
    name: "Scooter Rental (Daily)",
    description: "Scooter/motorbike rental for a day",
  },
  {
    id: 2,
    name: "Car Rental (Daily)",
    description: "Car rental with or without driver",
  },
  {
    id: 3,
    name: "Bicycle Rental (Daily)",
    description: "Bicycle rental for exploring Pemuteran area",
  },
];
