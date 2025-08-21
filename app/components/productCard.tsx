import { type Product } from "../data/products";

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition">
      <img
        src={product.imageUrl.trim()}
        alt={product.name}
        className="w-full h-64 object-cover rounded-xl"
        onError={(e) => {
          e.currentTarget.src =
            "https://via.placeholder.com/584x779?text=Image+Not+Available";
        }}
      />
      <h3 className="text-lg font-semibold mt-3">{product.name}</h3>
      <p className="text-sm text-gray-600 line-clamp-2">
        {product.description}
      </p>
      <p className="text-red-600 font-bold mt-2">
        Rp {product.price.toLocaleString("id-ID")}
      </p>
    </div>
  );
}
