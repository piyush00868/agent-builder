"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function signIn() {
  const result = await auth.api.signInSocial({
    body: {
      provider: "github",
      callbackURL: "/agents",
    },
    headers: await headers(),
  });

  if (!result.url) {
    throw new Error("Could not start GitHub sign-in.");
  }

  redirect(result.url);
}

export async function signOut() {
  await auth.api.signOut({ headers: await headers() });
  redirect("/");
}

export async function requireAuth() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/sign-in");
  }

  return session.user;
}

export async function requireUnauth() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session) {
    redirect("/agents");
  }
}
