import { Link, Outlet } from "react-router";
import type { Route } from "./+types/layout-main";
import { getSession } from "../sessions";
import type { UserAuthMe } from "~/modules/user/type";

const navigationLinksDefault = [
  { to: "/", text: "Home" },
  { to: "/products", text: "Products" },
  { to: "/register", text: "Register" },
  { to: "/login", text: "Login" },
  { to: "/cart", text: "Cart" },
  { to: "/dashboard", text: "Dashboard" },
];

const navigationLinksAuth = [
  { to: "/", text: "Home" },
  { to: "/products", text: "Products" },
  { to: "/logout", text: "Logout" },
  { to: "/cart", text: "Cart" },
  { to: "/dashboard", text: "Dashboard" },
];

export async function loader({ request }: Route.ClientLoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/auth/me`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  const user: UserAuthMe = await response.json();
  const isAuthenticated = token ? true : false;
  const navigationLinks = isAuthenticated
    ? navigationLinksAuth
    : navigationLinksDefault;
  return { user, navigationLinks };
}

export default function LayoutMain({ loaderData }: Route.ComponentProps) {
  const { user, navigationLinks } = loaderData;

  return (
    <>
      <header className="flex justify-between items-center p-4 bg-[#7f3b3b] text-white">
        <Link to="/" className="hover:underline font-bold text-2xl">
          SportStore
        </Link>

        {/* Navigation Links */}
        <nav className="flex space-x-6 text-sm md:text-base">
          {navigationLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="hover:underline transition-colors duration-200"
            >
              {link.text}
            </Link>
          ))}
          {user.fullName && (
            <span className="ml-4 text-black">{user.fullName}</span>
          )}
        </nav>
      </header>
      <main className="flex-[1]">
        <Outlet />
      </main>
      <footer>
        <div className="flex justify-center m-5">
          <p>
            &copy; {new Date().getFullYear()} Created by. Muhammad Rizki Kurnia
            Putra
          </p>
        </div>
      </footer>
    </>
  );
}
