import { products } from "../data/products";
import { ProductCard } from "./productCard";

export function ProductList() {
  return (
    <div className="grid grid-cols-3 gap-6 justify-items-start">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
