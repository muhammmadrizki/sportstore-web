import type { Route } from "./+types/login";
import { Form, redirect } from "react-router";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Login" }];
}

export async function clientAction({ request }: Route.ActionArgs) {
  //   const session = await getSession(request.headers.get("Cookie"));
  //   if (session.has("token")) {
  //     return redirect("/dashboard");
  //   }

  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");

  const loginBody = {
    email,
    password,
  };

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginBody),
    }
  );
  const result = await response.json();
  console.log(result);

  //   const token = await response.json();

  //   session.set("token", token);

  return redirect("/dashboard");
}

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
