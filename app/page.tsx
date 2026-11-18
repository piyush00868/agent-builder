import {
  Card,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { UserButton } from "@/modules/auth/components/user-button";
import { requireAuth } from "@/modules/auth/actions";

export const instant = false;

export default async function Home() {
  const user = await requireAuth();

  return (
    <main className="relative flex min-h-screen flex-1 items-center justify-center bg-muted/40 px-4 py-12">
      <div className="absolute right-4 top-4 flex items-center gap-2">
        <ModeToggle />
        <UserButton user={user} />
      </div>

      <Card className="w-full max-w-md rounded-2xl border border-border/70 shadow-xl shadow-black/5">
        <CardHeader className="pt-8 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Agent Builder
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">
            Welcome, {user.name}
          </h1>
          <CardDescription className="mt-1 text-sm">
            You’re signed in as {user.email}.
          </CardDescription>
        </CardHeader>
      </Card>
    </main>
  );
}