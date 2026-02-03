import type { Product } from "~/modules/product/type";
import type { Route } from "./+types/products-slug";
import React from "react";
import { Form, redirect } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { formatRupiah } from "../lib/utils";
import type { AddCartItem } from "../modules/cart/schema";
import { getSession, destroySession } from "../sessions";

export function meta({}: Route.MetaArgs) {
  return [{ title: "(Product Name) - Glory Store" }];
}

/* =========================
   CLIENT LOADER
========================= */
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  try {
    console.log("Loading product with slug:", params.slug);

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/products/${params.slug}`,
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

/* =========================
   ACTION ADD TO CART
========================= */
export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");

  // 🔐 Cek login
  if (!token) {
    return redirect("/login");
  }

  const formData = await request.formData();

  const productId = String(formData.get("productId"));
  const quantity = Number(formData.get("quantity"));

  // ✅ Validasi input
  if (!productId || !quantity || quantity < 1) {
    session.flash("error", "Invalid product or quantity");
    return redirect(request.url);
  }

  const addCartItemData: AddCartItem = {
    productId,
    quantity,
  };

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/cart/items`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(addCartItemData),
      },
    );

    // ❌ Token expired → logout
    if (response.status === 401) {
      return redirect("/login", {
        headers: { "Set-Cookie": await destroySession(session) },
      });
    }

    // ❌ Validation / business error
    if (!response.ok) {
      const error = await response.json();
      console.error("Cart error:", error);

      session.flash("error", error.message || "Failed to add item to cart");
      return redirect(request.url);
    }

    // ✅ Success
    return redirect("/cart");
  } catch (error) {
    console.error("Add cart error:", error);
    session.flash("error", "Server error");
    return redirect(request.url);
  }
}

/* =========================
   COMPONENT
========================= */
export default function ProductSlugRoute({ loaderData }: Route.ComponentProps) {
  const { product } = loaderData;

  const [quantity, setQuantity] = React.useState<number>(1);

  const decrement = () => setQuantity((prev) => Math.max(prev - 1, 1));
  const increment = () => setQuantity((prev) => prev + 1);

  const onQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (Number.isNaN(value) || value < 1) return;
    setQuantity(value);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* IMAGE */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg hover:shadow-xl transition">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* PRODUCT INFO */}
        <div className="flex flex-col gap-6">
          <header className="space-y-2">
            <h1 className="text-2xl font-bold md:text-3xl text-gray-900">
              {product.name}
            </h1>

            <div className="text-sm text-gray-500">SKU: {product.slug}</div>

            <div className="text-3xl font-semibold text-red-600">
              {formatRupiah(product.price * quantity)}
            </div>
          </header>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          {/* FORM ADD TO CART */}
          <Form method="post" className="space-y-4">
            <input type="hidden" name="productId" value={product.id} />

            <div className="flex items-center gap-3">
              {/* QUANTITY CONTROL */}
              <div className="flex items-center rounded-md border border-gray-300">
                <Button
                  type="button"
                  variant="ghost"
                  className="h-10 w-10 rounded-l-md hover:bg-gray-100"
                  onClick={decrement}
                >
                  −
                </Button>

                <Input
                  type="number"
                  min={1}
                  name="quantity"
                  value={quantity}
                  onChange={onQuantityChange}
                  className="h-10 w-16 text-center border-x-0"
                />

                <Button
                  type="button"
                  variant="ghost"
                  className="h-10 w-10 rounded-r-md hover:bg-gray-100"
                  onClick={increment}
                >
                  +
                </Button>
              </div>

              {/* SUBMIT */}
              <Button
                type="submit"
                className="h-10 px-6 bg-red-600 hover:bg-red-700 text-white shadow-md"
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
