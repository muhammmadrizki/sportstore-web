import type { Route } from "./+types/products";
import type { Product } from "~/modules/product/type";
import { ProductsGrid } from "../modules/product/grid";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Products Of Sport Store" },
    {
      name: "description",
      content: "Merchandise Sport Store of Manchester United!",
    },
  ];
}

export async function clientLoader() {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/products`
  );
  const products: Product[] = await response.json();

  return { products };
}

export default function ProductsRoute({ loaderData }: Route.ComponentProps) {
  const { products } = loaderData as unknown as { products: Product[] };
  return (
    // <div className="p-6">
    //   <h2 className="text-lg mb-6">Products of Sport Store</h2>
    //   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    //     {products.map((product) => (
    //       <ProductCard key={product.id} product={product} />
    //     ))}
    //   </div>
    // </div>
    <ProductsGrid products={products} />
  );
}
