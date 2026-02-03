import { destroySession, getSession } from "../sessions";
import type { Route } from "./+types/cart";
import { Form, redirect } from "react-router";

// import type { UserAuthMe } from "../modules/user/type";
// import { Card } from "../components/ui/card";
import type { Cart } from "../modules/cart/schema";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Cart" }];
}

export async function loader({ request }: Route.ClientLoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (!session.has("token")) {
    return redirect("/login");
  }
  const token = session.get("token");
  console.info("dashboard:token", token);

  const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/cart`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return redirect("/login", {
      headers: { "Set-Cookie": await destroySession(session) },
    });
  }

  const cart: Cart = await response.json();
  return { cart };
}
// export async function action({ request }: Route.ActionArgs) {
//   const session = await getSession(request.headers.get("Cookie"));

//   if (!session.has("token")) {
//     return redirect("/login");
//   }

//   const token = session.get("token");
//   const formData = await request.formData();

//   const cartItemId = formData.get("cartItemId");

//   if (!cartItemId || typeof cartItemId !== "string") {
//     throw new Error("Invalid cart item id");
//   }

//   await fetch(
//     `${import.meta.env.VITE_BACKEND_API_URL}/cart/items/${cartItemId}`,
//     {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     },
//   );

//   return null;
// }
export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (!session.has("token")) {
    return redirect("/login");
  }

  const token = session.get("token");
  const formData = await request.formData();

  const intent = formData.get("intent");
  const cartItemId = formData.get("cartItemId");

  if (!cartItemId || typeof cartItemId !== "string") {
    throw new Error("Invalid cart item id");
  }

  // REMOVE ITEM
  if (intent === "remove") {
    await fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/cart/items/${cartItemId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return null;
  }

  // INCREMENT / DECREMENT
  if (intent === "increment" || intent === "decrement") {
    await fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/cart/items/${cartItemId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          action: intent,
        }),
      },
    );

    return null;
  }

  return null;
}

export default function CartRoute({ loaderData }: Route.ComponentProps) {
  const { cart } = loaderData;

  if (!cart || cart.items.length === 0) {
    return (
      <div className="mx-auto max-w-4xl py-16 text-center">
        <h1 className="text-2xl font-semibold">Your cart is empty</h1>
      </div>
    );
  }

  const total = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* ITEMS */}
        <div className="md:col-span-2 space-y-6">
          {/* {cart.items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 rounded-xl border p-4 shadow-sm"
            >
              <img
                src={item.product.imageUrl}
                alt={item.product.name}
                className="h-24 w-24 rounded-lg object-cover"
              />

              <div className="flex flex-1 flex-col gap-2">
                <h2 className="font-semibold">{item.product.name}</h2>

                <p className="text-sm text-gray-500">
                  Price: Rp {item.product.price.toLocaleString("id-ID")}
                </p>

                <div className="flex items-center gap-4">
                  <span className="text-sm">Qty: {item.quantity}</span>

                  <span className="font-medium text-red-600">
                    Rp{" "}
                    {(item.product.price * item.quantity).toLocaleString(
                      "id-ID"
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))} */}
          {cart.items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 rounded-xl border p-4 shadow-sm"
            >
              <img
                src={item.product.imageUrl}
                alt={item.product.name}
                className="h-24 w-24 rounded-lg object-cover"
              />

              <div className="flex flex-1 flex-col gap-2">
                <h2 className="font-semibold">{item.product.name}</h2>

                <p className="text-sm text-gray-500">
                  Price: Rp {item.product.price.toLocaleString("id-ID")}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {/* DECREMENT */}
                    <Form method="post">
                      <input type="hidden" name="cartItemId" value={item.id} />
                      <input type="hidden" name="intent" value="decrement" />
                      <button
                        type="submit"
                        className="rounded bg-gray-200 px-2 py-1 hover:bg-gray-300"
                      >
                        -
                      </button>
                    </Form>

                    <span className="w-8 text-center">{item.quantity}</span>

                    {/* INCREMENT */}
                    <Form method="post">
                      <input type="hidden" name="cartItemId" value={item.id} />
                      <input type="hidden" name="intent" value="increment" />
                      <button
                        type="submit"
                        className="rounded bg-gray-200 px-2 py-1 hover:bg-gray-300"
                      >
                        +
                      </button>
                    </Form>
                  </div>

                  <span className="font-medium text-red-600">
                    Rp{" "}
                    {(item.product.price * item.quantity).toLocaleString(
                      "id-ID",
                    )}
                  </span>
                </div>

                {/* REMOVE BUTTON */}
                <Form method="post">
                  <input type="hidden" name="cartItemId" value={item.id} />
                  <input type="hidden" name="intent" value="remove" />
                  <button
                    type="submit"
                    className="mt-2 inline-flex items-center rounded-md bg-red-100 px-3 py-1.5 text-sm font-medium text-red-700 transition hover:bg-red-200"
                  >
                    Remove
                  </button>
                </Form>
              </div>
            </div>
          ))}
        </div>

        {/* SUMMARY */}
        <div className="rounded-xl border p-6 shadow-sm h-fit">
          <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>

          <div className="flex justify-between text-sm mb-2">
            <span>Subtotal</span>
            <span>Rp {total.toLocaleString("id-ID")}</span>
          </div>

          <div className="flex justify-between text-sm mb-4">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <div className="flex justify-between text-lg font-bold border-t pt-4">
            <span>Total</span>
            <span>Rp {total.toLocaleString("id-ID")}</span>
          </div>

          <button className="mt-6 w-full rounded-lg bg-red-600 py-3 text-white font-semibold hover:bg-red-700">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
