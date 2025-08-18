import type { Route } from "./+types/home";
import { Link } from "react-router-dom";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sport Store Web" },
    { name: "description", content: "Merchandise Sport Store!" },
  ];
}

export async function clientLoader() {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/products`
  );
  const products = await response.json();
  console.log({ products });

  return products;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const products = loaderData;

  return (
    <div className="min-h-screen flex flex-col bg-[#7f3b3b] text-black">
      {/* Header */}
      <header className="flex justify-between items-center p-4">
        <div>
          <h1 className="text-2xl font-bold">GLORY STORE</h1>
        </div>
        <nav className="flex gap-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/login" className="hover:underline">
            Login
          </Link>
        </nav>
      </header>

      <ul>
        {products.map((product: any) => {
          return <li key={product.id}>{product.name}</li>;
        })}
      </ul>
    </div>
  );
}
