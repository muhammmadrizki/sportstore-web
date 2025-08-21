// import { product } from "../data/products";
// import { ProductCard } from "./productCard";

// export function ProductList() {
//   return (
//     <div className="grid grid-cols-3 gap-6 justify-items-start">
//       {products.map((product) => (
//         <ProductCard key={product.id} product={product} />
//       ))}
//     </div>
//   );
// }
import { ProductCard } from "./productCard";
import type { Product } from "../data/products";

type Props = {
  products: Product[];
};

export function ProductList({ products }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
