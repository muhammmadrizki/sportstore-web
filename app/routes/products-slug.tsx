// import type { Product } from "~/modules/product/type";
// import type { Route } from "./+types/products-slug";
// import React from "react";
// import { Form } from "react-router";
// import { Button } from "../components/ui/button";
// import { Input } from "../components/ui/input";

// export function meta({}: Route.MetaArgs) {
//   return [{ title: "(Product Name) - Sport Store" }];
// }

// export async function clientLoader({ params }: Route.ClientLoaderArgs) {
//   const response = await fetch(
//     `${import.meta.env.VITE_BACKEND_API_URL}/products/${params.slug}`
//   );
//   if (!response.ok) {
//     throw new Response("Product not found", { status: 404 });
//   }
//   const product: Product = await response.json();
//   return { product };
// }

// export default function ProductSlugRoute({ loaderData }: Route.ComponentProps) {
//   const { product } = loaderData;
//   const [quantity, setQuantity] = React.useState<number>(1);

//   function decrement() {
//     setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
//   }

//   function increment() {
//     setQuantity((prev) => prev + 1);
//   }

//   function onQuantityChange(e: React.ChangeEvent<HTMLInputElement>) {
//     const value = parseInt(e.target.value, 10);
//     if (Number.isNaN(value) || value < 1) {
//       setQuantity(1);
//       return;
//     }
//     setQuantity(value);
//   }

//   return (
//     <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
//       <div>
//         <div className="overflow-hidden rounded-xl border">
//           {/* eslint-disable-next-line @next/next/no-img-element */}
//           <img
//             src={product.imageUrl}
//             alt={product.name}
//             className="h-full w-full object-cover"
//           />
//         </div>
//       </div>

//       <div className="flex flex-col gap-6">
//         <header className="space-y-2">
//           <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
//             {product.name}
//           </h1>
//           <div className="text-muted-foreground text-sm">
//             SKU: {product.slug}
//           </div>
//           <div className="text-2xl font-bold">${product.price.toFixed(2)}</div>
//         </header>

//         <p className="text-muted-foreground leading-relaxed">
//           {product.description}
//         </p>

//         <Form method="post" action="/cart" className="space-y-4">
//           <input type="hidden" name="productId" value={product.id} />
//           <input type="hidden" name="slug" value={product.slug} />
//           <input type="hidden" name="price" value={product.price} />

//           <div className="flex items-center gap-3">
//             <div className="flex items-center rounded-md border">
//               <Button
//                 type="button"
//                 variant="ghost"
//                 className="h-9 w-9 rounded-none"
//                 onClick={decrement}
//                 aria-label="Decrease quantity"
//               >
//                 −
//               </Button>
//               <Input
//                 className="h-9 w-16 rounded-none border-x-0 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
//                 name="quantity"
//                 inputMode="numeric"
//                 pattern="[0-9]*"
//                 value={quantity}
//                 onChange={onQuantityChange}
//               />
//               <Button
//                 type="button"
//                 variant="ghost"
//                 className="h-9 w-9 rounded-none"
//                 onClick={increment}
//                 aria-label="Increase quantity"
//               >
//                 +
//               </Button>
//             </div>

//             <Button type="submit" className="h-9 px-6">
//               Add to cart
//             </Button>
//           </div>
//         </Form>
//       </div>
//     </div>
//   );
// }

import type { Product } from "~/modules/product/type";
import type { Route } from "./+types/products-slug";
import React from "react";
import { Form } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { formatRupiah } from "../lib/utils";

export function meta({}: Route.MetaArgs) {
  return [{ title: "(Product Name) - Glory Store" }];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/products/${params.slug}`
  );
  if (!response.ok) {
    throw new Response("Product not found", { status: 404 });
  }
  const product: Product = await response.json();
  return { product };
}

export default function ProductSlugRoute({ loaderData }: Route.ComponentProps) {
  const { product } = loaderData;
  const [quantity, setQuantity] = React.useState<number>(1);

  const decrement = () => setQuantity((prev) => Math.max(prev - 1, 1));
  const increment = () => setQuantity((prev) => prev + 1);
  const onQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (Number.isNaN(value) || value < 1) return;
    setQuantity(value);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Image */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition-transform duration-300 hover:shadow-xl">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-6">
          <header className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              {product.name}
            </h1>
            <div className="text-sm text-gray-500">SKU: {product.slug}</div>
            {/* <div className="text-3xl font-semibold text-red-600">
              ${product.price.toFixed(2)}
            </div> */}
            <div className="text-3xl font-semibold text-red-600">
              {formatRupiah(product.price)}
            </div>
          </header>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          <Form method="post" action="/cart" className="space-y-4">
            <input type="hidden" name="productId" value={product.id} />
            <input type="hidden" name="slug" value={product.slug} />
            <input type="hidden" name="price" value={product.price} />

            <div className="flex items-center gap-3">
              <div className="flex items-center rounded-md border border-gray-300">
                <Button
                  type="button"
                  variant="ghost"
                  className="h-10 w-10 rounded-l-md border-r-0 bg-transparent text-gray-700 hover:bg-gray-100"
                  onClick={decrement}
                  aria-label="Decrease quantity"
                >
                  −
                </Button>
                <Input
                  className="h-10 w-16 rounded-none border-x-0 text-center focus:ring-2 focus:ring-red-500"
                  name="quantity"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={quantity}
                  onChange={onQuantityChange}
                />
                <Button
                  type="button"
                  variant="ghost"
                  className="h-10 w-10 rounded-r-md border-l-0 bg-transparent text-gray-700 hover:bg-gray-100"
                  onClick={increment}
                  aria-label="Increase quantity"
                >
                  +
                </Button>
              </div>

              <Button
                type="submit"
                className="h-10 px-6 font-medium bg-red-600 hover:bg-red-700 text-white transition transform hover:-translate-y-0.5 shadow-md"
              >
                Add to cart
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
