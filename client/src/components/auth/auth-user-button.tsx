import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { StrapiUserData } from "@/types";

import { AuthLogoutButton } from "./auth-logout-button";

export function AuthUserNavButton({ user, redirectPath, className } : { readonly user: StrapiUserData, readonly redirectPath: string, readonly className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {user?.username}
      <Button asChild className="w-8 h-8 rounded-full">
        <Link href={redirectPath} className="cursor-pointer">
          {user?.username[0].toLocaleUpperCase()}
        </Link>
      </Button>
      <AuthLogoutButton />
    </div>
  );
}