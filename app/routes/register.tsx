import type { Route } from "./+types/register";
import { Form, redirect, useActionData } from "react-router";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Card, CardContent } from "../components/ui/card";
import { z } from "zod";

// META
export function meta({}: Route.MetaArgs) {
  return [{ title: "Register" }];
}

// VALIDATION WITH ZOD VALIDATION

export const registerValidation = () => {
  return z
    .object({
      fullName: z.string().min(3, "Full name is required"),
      email: z.string().email("Invalid Email Format"),
      password: z.string().min(8, "Password must be at least 8 characters"),
      confirmPassword: z
        .string()
        .min(8, "Confirm password must be at least 8 characters"),
      phoneNumber: z
        .string()
        .min(14, "Phone number must be at least 14 characters"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Confirmation password is incorrect",
      path: ["confirmPassword"],
    });
};

// CLIENT ACTION

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());

  const schema = registerValidation();
  const parsed = schema.safeParse(data);

  // ZOD FAILED
  if (!parsed.success) {
    return {
      fieldErrors: parsed.error.format(),
    };
  }

  const registerBody = {
    fullName: parsed.data.fullName,
    email: parsed.data.email,
    password: parsed.data.password,
    phoneNumber: parsed.data.phoneNumber,
  };
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/auth/register`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerBody),
    },
  );

  const result = await response.json();

  // BACKEND FAILED
  if (!response.ok) {
    return {
      serverError: result.message || "Register failed",
    };
  }

  // SUCCESS
  return redirect("/login");
}

// COMPONENT UI
export default function RegisterRoute() {
  const actionData = useActionData<{
    fieldErrors?: any;
    serverError?: string;
  }>();

  const errors = actionData?.fieldErrors || {};
  const serverError = actionData?.serverError;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md border border-gray-200 shadow-md">
        <CardContent className="pt-8 pb-6 px-8">
          <h2 className="text-2xl font-semibold text-center mb-1">
            Create your account
          </h2>
          <p className="text-center text-gray-500 mb-6 text-sm">
            Enter your email below to create your account
          </p>

          {/* SERVER ERROR */}
          {serverError && (
            <p className="text-red-600 text-sm text-center mb-4">
              {serverError}
            </p>
          )}

          <Form method="post" className="space-y-4">
            {/* FULL NAME */}
            <div className="space-y-1">
              <Label>Full Name</Label>
              <Input name="fullName" placeholder="John Doe" />
              {errors.fullName?._errors && (
                <p className="text-red-500 text-sm">
                  {errors.fullName._errors[0]}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div className="space-y-1">
              <Label>Email</Label>
              <Input name="email" type="email" placeholder="m@example.com" />
              {errors.email?._errors && (
                <p className="text-red-500 text-sm">
                  {errors.email._errors[0]}
                </p>
              )}
            </div>
            {/* PHONE NUMBER */}
            <div className="space-y-1">
              <Label>Phone Number</Label>
              <Input name="phoneNumber" placeholder="+62 812-3456-7890" />
              {errors.phoneNumber?._errors && (
                <p className="text-red-500 text-sm">
                  {errors.phoneNumber._errors[0]}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="space-y-1">
              <Label>Password</Label>
              <Input name="password" type="password" />
              {errors.password?._errors && (
                <p className="text-red-500 text-sm">
                  {errors.password._errors[0]}
                </p>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="space-y-1">
              <Label>Confirm Password</Label>
              <Input name="confirmPassword" type="password" />
              {errors.confirmPassword?._errors && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword._errors[0]}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-800"
            >
              Create Account
            </Button>
          </Form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <a href="/signin" className="text-black hover:underline">
              Sign in
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
