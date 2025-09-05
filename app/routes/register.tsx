// import type { Route } from "./+types/register";
// import { useState } from "react";
// import { Button } from "../components/ui/button";
// import { Input } from "../components/ui/input";
// import { Label } from "../components/ui/label";

// export function meta({}: Route.MetaArgs) {
//   return [{ title: "Register" }];
// }

// interface FormData {
//   fullName: string;
//   email: string;
//   password: string;
// }

// export default function RegisterRoute({}: Route.ComponentProps) {
//   const [formData, setFormData] = useState<FormData>({
//     fullName: "",
//     email: "",
//     password: "",
//   });
//   const [errors, setErrors] = useState<Partial<FormData>>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     // Clear error when user starts typing
//     if (errors[name as keyof FormData]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: undefined,
//       }));
//     }
//   };

//   const validateForm = (): boolean => {
//     const newErrors: Partial<FormData> = {};

//     if (!formData.fullName.trim()) {
//       newErrors.fullName = "Full name is required";
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = "Please enter a valid email address";
//     }

//     if (!formData.password) {
//       newErrors.password = "Password is required";
//     } else if (formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters long";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       // Here you would typically send the data to your backend
//       console.log("Form submitted with data:", formData);

//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       // Reset form after successful submission
//       setFormData({
//         fullName: "",
//         email: "",
//         password: "",
//       });

//       alert("Registration successful!");
//     } catch (error) {
//       console.error("Registration failed:", error);
//       alert("Registration failed. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Create your account
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Join our sport store community
//           </p>
//         </div>

//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="space-y-4">
//             <div>
//               <Label htmlFor="fullName">Full Name</Label>
//               <Input
//                 id="fullName"
//                 name="fullName"
//                 type="text"
//                 required
//                 value={formData.fullName}
//                 onChange={handleInputChange}
//                 className={errors.fullName ? "border-red-500" : ""}
//                 placeholder="Enter your full name"
//               />
//               {errors.fullName && (
//                 <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
//               )}
//             </div>

//             <div>
//               <Label htmlFor="email">Email Address</Label>
//               <Input
//                 id="email"
//                 name="email"
//                 type="email"
//                 required
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 className={errors.email ? "border-red-500" : ""}
//                 placeholder="Enter your email address"
//               />
//               {errors.email && (
//                 <p className="mt-1 text-sm text-red-600">{errors.email}</p>
//               )}
//             </div>

//             <div>
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 name="password"
//                 type="password"
//                 required
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 className={errors.password ? "border-red-500" : ""}
//                 placeholder="Enter your password"
//               />
//               {errors.password && (
//                 <p className="mt-1 text-sm text-red-600">{errors.password}</p>
//               )}
//             </div>
//           </div>

//           <div>
//             <Button type="submit" className="w-full" disabled={isSubmitting}>
//               {isSubmitting ? "Creating Account..." : "Create Account"}
//             </Button>
//           </div>

//           <div className="text-center">
//             <p className="text-sm text-gray-600">
//               Already have an account?{" "}
//               <a
//                 href="/login"
//                 className="font-medium text-blue-600 hover:text-blue-500"
//               >
//                 Sign in here
//               </a>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

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

  const registerBody = {
    fullName,
    email,
    password,
  };

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerBody),
    }
  );
  const result = await response.json();

  return redirect("/login");
}

export default function RegisterRoute({}: Route.ComponentProps) {
  return (
    <div className=" flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card>
          <CardTitle className="text-center text-2xl font-bold text-gray-900">
            Create Account
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            Join us today and start your journey
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
              className="w-full"
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
