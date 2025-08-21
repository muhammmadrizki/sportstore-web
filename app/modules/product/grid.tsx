import type { Product } from "./type";

export function ProductsGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product.id} className="border p-4 rounded-lg shadow-sm">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover mb-4"
          />
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-600 mb-2">{product.description}</p>
          <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}
