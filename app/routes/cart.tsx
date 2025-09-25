import { destroySession, getSession } from "../sessions";
import type { Route } from "./+types/cart";
// import type { UserAuthMe } from "../modules/user/type";
// import { Card } from "../components/ui/card";
import { redirect } from "react-router";
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

export default function CartRoute({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-xs">
        <h1>Shopping Cart</h1>
        <pre>{JSON.stringify(loaderData, null, 2)}</pre>
        {/* <Card>
          {/* <h2>{user.fullName}</h2>
          <p>{user.email}</p> */}
        {/* </Card> */} *
      </div>
    </div>
  );
}
