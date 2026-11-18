import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { requireUnauth, signIn } from "@/modules/auth/actions";
import { GithubLogoIcon } from "@phosphor-icons/react/ssr";

export const instant = false;

export default async function SignInPage() {
  await requireUnauth();

  return (
    <Card className="relative w-full max-w-md rounded-2xl border border-border/70 shadow-xl shadow-black/5">
      <CardHeader className="items-center pt-8 text-center">
        <div
          aria-hidden="true"
          className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-foreground text-background"
        >
          <GithubLogoIcon className="size-7" weight="fill" />
        </div>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Agent Builder
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          Welcome back
        </h1>
        <CardDescription className="mt-1 max-w-xs text-sm">
          Sign in to your account using GitHub.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 pb-8">
        <form action={signIn}>
          <Button
            type="submit"
            variant="outline"
            className="h-11 w-full gap-2 rounded-lg text-sm"
          >
            <GithubLogoIcon className="size-5" aria-hidden="true" />
            Continue with GitHub
          </Button>
        </form>
        <p className="text-center text-xs text-muted-foreground">
          You’ll be redirected to GitHub to authorize your sign-in.
        </p>
      </CardContent>
    </Card>
  );
}