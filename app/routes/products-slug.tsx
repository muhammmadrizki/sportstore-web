import type { Product } from "~/modules/product/type";
import type { Route } from "./+types/products-slug";
import React from "react";
import { Form, redirect } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { formatRupiah } from "../lib/utils";
import type { AddCartItem } from "~/modules/cart/schema";
import { getSession, destroySession } from "~/sessions";

export function meta({}: Route.MetaArgs) {
  return [{ title: "(Product Name) - Glory Store" }];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  try {
    console.log("Loading product with slug:", params.slug);
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/products/${params.slug}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const product: Product = await response.json();
    return { product };
  } catch (error) {
    console.error("Error loading product:", error);
    throw error;
  }
}

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");

  if (!session.has("token")) {
    return redirect("/login");
  }

  const formData = await request.formData();

  const addCartItemData: AddCartItem = {
    productId: String(formData.get("productId")),
    quantity: Number(formData.get("quantity")),
  };

  const response = await fetch(
    `${process.env.VITE_BACKEND_API_URL}/cart/items`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(addCartItemData),
    }
  );

  if (!response.ok) {
    session.flash("error", "Failed to add item to cart");
    return redirect("/login", {
      headers: { "Set-Cookie": await destroySession(session) },
    });
  }

  return redirect("/cart");
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
              {formatRupiah(product.price * quantity)}
            </div>
          </header>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          <Form method="post" className="space-y-4">
            {/* action="/cart" */}
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
