"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/modules/auth/actions";
import { CaretDownIcon, SignOutIcon } from "@phosphor-icons/react";

type UserButtonProps = {
  user: {
    name?: string | null;
    email: string;
    image?: string | null;
  };
};

export function UserButton({ user }: UserButtonProps) {
  const initial =
    user.name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Open account menu"
        className="flex min-w-0 items-center gap-2 rounded-lg border border-border/60 bg-card px-2 py-1.5 text-left transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
      >
        <Avatar>
          {user.image ? (
            <AvatarImage src={user.image} alt={user.name ?? "User avatar"} />
          ) : null}
          <AvatarFallback>{initial}</AvatarFallback>
        </Avatar>

        <span className="flex min-w-0 flex-col items-start">
          {user.name ? (
            <span className="max-w-40 truncate text-xs font-medium text-foreground">
              {user.name}
            </span>
          ) : null}
          <span
            className="max-w-40 truncate text-xs text-muted-foreground"
            title={user.email}
          >
            {user.email}
          </span>
        </span>

        <CaretDownIcon
          className="size-3 shrink-0 text-muted-foreground"
          aria-hidden="true"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal">
            {user.name ? (
              <p className="truncate font-medium text-foreground">{user.name}</p>
            ) : null}
            <p className="truncate text-muted-foreground">{user.email}</p>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <SignOutIcon aria-hidden="true" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}