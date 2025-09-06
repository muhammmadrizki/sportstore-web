// import type { Route } from "./+types/login";
// // import type { Route } from "../+types/register";

// export function meta({}: Route.MetaArgs) {
//   return [{ title: "Login" }];
// }

// // export async function clientLoader() {
// //   const response = await fetch(
// //     `${import.meta.env.VITE_BACKEND_API_URL}/products`
// //   );
// //   const products = await response.json();

// //   return { products };
// // }

// // export default function HomeRoute({ loaderData }: Route.ComponentProps) {
// //   const products = loaderData;

// //   //     <ul>
// //   //       {products.map((product: any) => {
// //   //         return <li key={product.id}>{product.name}</li>;
// //   //       })}
// //   //     </ul>
// //   //   </div>
// //   // );
// //   return (
// //     <>
// //       {/* Main Content */}
// //       <main className="p-6">
// //         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
// //           {products.map((product: any) => (
// //             <div
// //               key={product.id}
// //               className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition"
// //             >
// //               <img
// //                 src={product.imageUrl.trim()} // 👈 trim spasi
// //                 alt={product.name}
// //                 className="w-full h-64 object-cover rounded-xl"
// //                 onError={(e) => {
// //                   e.currentTarget.src =
// //                     "https://via.placeholder.com/584x779?text=Image+Not+Available";
// //                 }}
// //               />
// //               <h3 className="text-lg font-semibold mt-3">{product.name}</h3>
// //               <p className="text-sm text-gray-600 line-clamp-2">
// //                 {product.description}
// //               </p>
// //               <p className="text-red-600 font-bold mt-2">
// //                 Rp {product.price.toLocaleString("id-ID")}
// //               </p>
// //             </div>
// //           ))}
// //         </div>
// //       </main>
// //     </>
// //   );
// export default function LoginRoute({}: Route.ComponentProps) {
//   return (
//     <div>
//       <h1>Login</h1>
//     </div>
//   );
// }
import type { Route } from "./+types/login";
import { Form, redirect } from "react-router";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { commitSession, getSession } from "../sessions";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Login" }];
}

// export async function action({ request }: Route.ActionArgs) {
//   const session = await getSession(request.headers.get("Cookie"));
//   if (session.has("token")) {
//     return redirect("/dashboard");
//   }

//   const formData = await request.formData();

//   const email = formData.get("email");
//   const password = formData.get("password");

//   const loginBody = {
//     email,
//     password,
//   };

//   const response = await fetch(
//     `${import.meta.env.VITE_BACKEND_API_URL}/auth/login`,
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(loginBody),
//     }
//   );
//   const token = await response.json();

//   session.set("token", token);

//   return redirect("/dashboard", {
//     headers: {
//       "Set-Cookie": await commitSession(session),
//     },
//   });
// }

// export default function LoginRoute({}: Route.ComponentProps) {
//   return (
//     <div className="mx-auto w-full max-w-md space-y-6">
//       <header className="space-y-1">
//         <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
//         <p className="text-sm text-muted-foreground">
//           Continue to your account
//         </p>
//       </header>

//       <Form method="POST" className="space-y-4">
//         <div className="space-y-2">
//           <Label htmlFor="email">Email</Label>
//           <Input
//             id="email"
//             name="email"
//             type="email"
//             autoComplete="email"
//             required
//           />
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="password">Password</Label>
//           <Input
//             id="password"
//             name="password"
//             type="password"
//             autoComplete="new-password"
//             required
//           />
//         </div>

//         <Button type="submit" className="w-full">
//           Login
//         </Button>
//       </Form>
//     </div>
//   );
// }

export default function LoginRoute({}: Route.ComponentProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-8 transition-all duration-300 hover:shadow-2xl">
        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-500">Continue to your account</p>
        </div>

        {/* Form */}
        <Form method="POST" className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 block"
            >
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 block"
            >
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Login
          </Button>
        </Form>

        {/* Footer Link */}
        <div className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-red-600 hover:underline font-medium"
          >
            Register here
          </a>
        </div>
      </div>
    </div>
  );
}
