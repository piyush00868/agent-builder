import { requireAuth } from "@/modules/auth/actions";
import { redirect } from "next/navigation";

export const instant = false;

export default async function Home() {
  await requireAuth();
  redirect("/agents");
}
