import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./layouts/layout-main.tsx", [
    index("routes/home.tsx"),
    route("products", "./routes/products.tsx"),
    route("products/:slug", "./routes/products-slug.tsx"),

    //.....
    route("register", "./routes/register.tsx"), // POST /auth/register
    route("logout", "./routes/logout.tsx"),
    route("login", "./routes/login.tsx"), // POST /auth/login
    route("dashboard", "./routes/dashboard.tsx"), // GET /auth/me
  ]),
] satisfies RouteConfig;
