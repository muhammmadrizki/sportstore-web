import type { Product } from "./type";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "../../components/ui/card";
import { Link } from "react-router-dom";

export function ProductsGrid({ products }: { products: Product[] }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <li key={product.id}>
          <Link to={`/products/${product.slug}`} className="block">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md"
                />
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <p className="text-gray-600 mb-2">{product.description}</p>
                <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
              </CardContent>
            </Card>
          </Link>
        </li>
      ))}
    </ul>
  );
}
