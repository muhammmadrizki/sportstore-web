import { getSession } from "../sessions";
import type { Route } from "./+types/dashboard";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Dashboard" }];
}

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  // console.log(session);

  const token = session.get("token");
  console.log({ token });

  return null;
}

export default function DashboardRoute({}: Route.ComponentProps) {
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
