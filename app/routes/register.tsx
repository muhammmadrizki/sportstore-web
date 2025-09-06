import type { Route } from "./+types/register";
import { useState } from "react";
import { Form, redirect } from "react-router";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Card, CardDescription, CardTitle } from "../components/ui/card";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Register" }];
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();

  const fullName = formData.get("fullName");
  const email = formData.get("email");
  const password = formData.get("password");
  console.log({
    fullName,
    email,
    password,
  });
  return null;

  const registerBody = {
    fullName,
    email,
    password,
  };
}

//   const response = await fetch(
//     `${import.meta.env.VITE_BACKEND_API_URL}/auth/register`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(registerBody),
//     }
//   );
//   const result = await response.json();

//   return redirect("/login");
// }

export default function RegisterRoute({}: Route.ComponentProps) {
  return (
    <div className=" flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card>
          <CardTitle className="text-center text-2xl font-bold text-gray-900">
            Create Account
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            Become a member and start your experience with us{" "}
          </CardDescription>

          <Form method="POST" className="space-y-4 p-4">
            <div className="space-y-2">
              <Label
                htmlFor="fullName"
                className="text-sm font-medium text-gray-700"
              >
                Full Name
              </Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
                className="w-full"
              />
            </div>

            <Button
              type="submit"
              // disabled={isSubmitting}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              size="lg"
            >
              {/* {isSubmitting ? "Creating Account..." : "Create Account"} */}
              Create Account
            </Button>
          </Form>
        </Card>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-primary hover:text-primary/80"
            >
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
