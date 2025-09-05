import type { Route } from "./+types/home";
import { ProductsGrid } from "../modules/product/grid";

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

  return { products };
}

// export default function HomeRoute({ loaderData }: Route.ComponentProps) {
//   const products = loaderData;

//   //     <ul>
//   //       {products.map((product: any) => {
//   //         return <li key={product.id}>{product.name}</li>;
//   //       })}
//   //     </ul>
//   //   </div>
//   // );
//   return (
//     <>
//       {/* Main Content */}
//       <main className="p-6">
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
//           {products.map((product: any) => (
//             <div
//               key={product.id}
//               className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition"
//             >
//               <img
//                 src={product.imageUrl.trim()} // 👈 trim spasi
//                 alt={product.name}
//                 className="w-full h-64 object-cover rounded-xl"
//                 onError={(e) => {
//                   e.currentTarget.src =
//                     "https://via.placeholder.com/584x779?text=Image+Not+Available";
//                 }}
//               />
//               <h3 className="text-lg font-semibold mt-3">{product.name}</h3>
//               <p className="text-sm text-gray-600 line-clamp-2">
//                 {product.description}
//               </p>
//               <p className="text-red-600 font-bold mt-2">
//                 Rp {product.price.toLocaleString("id-ID")}
//               </p>
//             </div>
//           ))}
//         </div>
//       </main>
//     </>
//   );
export default function HomeRoute({ loaderData }: Route.ComponentProps) {
  const { products } = loaderData;
  return (
    <main className="p-6">
      {/* <ProductList products={products} /> */}
      <ProductsGrid products={products} />
    </main>
  );
}
