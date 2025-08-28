"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user;

  return (
    <nav className="sticky top-0 z-40 w-full backdrop-blur bg-background/60 border-b">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Mystry Message
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {session ? (
            <>
              <span className="hidden sm:block text-sm text-muted-foreground">
                {user.username || user.email}
              </span>
              <Button onClick={() => signOut()} variant="outline">
                Logout
              </Button>
            </>
          ) : (
            <Link href="/sign-in">
              <Button variant={"outline"}>Login</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
