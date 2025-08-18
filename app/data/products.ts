// app/data/products.ts

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  createdAt: string;
  updatedAt: string;
};

export const products: Product[] = [
  {
    id: "01K2CPAZ0JA7M904BX02NB8HK4",
    slug: "manchester-united-home-jersey-2025",
    name: "Manchester United Home Jersey 2025",
    description: "Official Manchester United home jersey for the 2025 season",
    imageUrl:
      "https://mufc-live.cdn.scayle.cloud/images/139fbaa87bc74a30fa9de0bb0c14cd9d.jpg?brightness=1&width=584&height=779&quality=70&bg=ffffff",
    price: 1938100,
    createdAt: "2025-08-11T13:50:21.714Z",
    updatedAt: "2025-08-11T13:50:21.714Z",
  },
  {
    id: "01K2CPAZ6AJKBWKJRB1NHE3SXF",
    slug: "manchester-united-away-jersey-2025",
    name: "Manchester United Away Jersey 2025",
    description: "Official Manchester United away jersey for the 2025 season",
    imageUrl:
      "https://mufc-live.cdn.scayle.cloud/images/d331a1fb4396017cd187e4154da95840.jpg?brightness=1&width=584&height=779&quality=70&bg=ffffff",
    price: 1938100,
    createdAt: "2025-08-11T13:50:21.899Z",
    updatedAt: "2025-08-11T13:50:21.899Z",
  },
  {
    id: "01K2CPAZ9T9CA2PKSWCEH2085F",
    slug: "mu-keychain",
    name: "Manchester United Keychain",
    description: "Keychain iconic Manchester United",
    imageUrl:
      "https://mufc-live.cdn.scayle.cloud/images/d067e7984846362835dcbd09ac460fde.jpg?brightness=1&width=584&height=779&quality=70&bg=ffffff",
    price: 1099000,
    createdAt: "2025-08-11T13:50:22.010Z",
    updatedAt: "2025-08-11T13:50:22.010Z",
  },
  {
    id: "01K2CPAZDAES4YN4NET3FTH25M",
    slug: "mu-training-wear-short",
    name: "MU training wear short",
    description: "Official 2025 season training short wear",
    imageUrl:
      "https://mufc-live.cdn.scayle.cloud/images/d6415aec7046065b8bd7017c04c16335.jpg?brightness=1&width=584&height=779&quality=70&bg=ffffff",
    price: 866500,
    createdAt: "2025-08-11T13:50:22.122Z",
    updatedAt: "2025-08-11T13:50:22.122Z",
  },
  {
    id: "01K2CPAZGVZ15RJMPYNJ0QX88B",
    slug: "mu-x-adidas-futur-icons-black",
    name: "MU x Adidas Futur Icons Black",
    description: "Casual MU shirt for everyday wear.",
    imageUrl:
      "https://mufc-live.cdn.scayle.cloud/images/499261d4bd317b576a13d2d1fcf20ce5.jpg?brightness=1&width=584&height=779&quality=70&bg=ffffff",
    price: 752500,
    createdAt: "2025-08-11T13:50:22.235Z",
    updatedAt: "2025-08-11T13:50:22.235Z",
  },
  {
    id: "01K2CPAZMCG5532ZQJZKVQ5YYR",
    slug: "wayne-rooney-teenage-kicks-book",
    name: "Wayne Rooney, Teenage Kicks Book",
    description: "Manchester United player Wayne Rooney book",
    imageUrl:
      "https://mufc-live.cdn.scayle.cloud/images/eda92dc66626b0b3fae93b64c8118abb.jpg?brightness=1&width=922&height=1230&quality=70&bg=ffffff",
    price: 456100,
    createdAt: "2025-08-11T13:50:22.348Z",
    updatedAt: "2025-08-11T13:50:22.348Z",
  },
];
