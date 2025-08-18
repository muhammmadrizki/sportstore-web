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

  // return (
  //   <div className="min-h-screen flex flex-col bg-[#7f3b3b] text-black">
  //     {/* Header */}
  //     <header className="flex justify-between items-center p-4">
  //       <div>
  //         <h1 className="text-2xl font-bold">GLORY STORE</h1>
  //       </div>
  //       <nav className="flex gap-4">
  //         <Link to="/" className="hover:underline">
  //           Home
  //         </Link>
  //         <Link to="/login" className="hover:underline">
  //           Login
  //         </Link>
  //       </nav>
  //     </header>

  //     <ul>
  //       {products.map((product: any) => {
  //         return <li key={product.id}>{product.name}</li>;
  //       })}
  //     </ul>
  //   </div>
  // );
  return (
    <div className="min-h-screen flex flex-col bg-[#7f3b3b] text-white">
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

      {/* Main Content */}
      <main className="p-6">
        <h2 className="text-lg mb-6">Store for MAN UTD apparel</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {products.map((product: any) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition"
            >
              <img
                src={product.imageUrl.trim()} // 👈 trim spasi
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
          ))}
        </div>
      </main>
    </div>
  );
}
