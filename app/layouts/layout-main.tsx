import { Outlet } from "react-router";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import type { UserAuthMe } from "~/modules/user/type";
import { getSession } from "../sessions";
import type { Route } from "./+types/layout-main";

// const navigationLinks = [
//   { to: "/", text: "Home" },
//   { to: "/products", text: "Products" },
//   { to: "/register", text: "Register" },
//   { to: "/login", text: "Login" },
//   { to: "/dashboard", text: "Dashboard" },
// ];
const navigationLinks = [
  { to: "/", text: "Home" },
  { to: "/products", text: "Products" },
  { to: "/dashboard", text: "Dashboard" },
];

export async function loader({ request }: Route.ClientLoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/auth/me`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const user: UserAuthMe = await response.json();
  return { user };
}

export default function LayoutMain({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {/* <Header navigationLinks={navigationLinks} user={user} /> */}
      {/* will either be home.tsx or settings.tsx */}
      <main className="flex-[1]">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
