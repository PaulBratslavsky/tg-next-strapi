"use client";
import Link from "next/link";
import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { StrapiUserData } from "@/data/services/user";
import { AuthButton, AuthUserNavButton } from "@/components/auth";
import { Drawer, DrawerContent, DrawerTrigger, DrawerTitle } from "@/components/ui/drawer";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const menuItems = [
  { id: 1, label: "Home", href: "/" },
  { id: 2, label: "Products", href: "/products" },
  { id: 3, label: "About", href: "/about" },
  { id: 4, label: "Contact", href: "/contact" },
];

interface HeaderProps {
  user: StrapiUserData | null;
}

export function Header({ user }: HeaderProps) {
  // Drawer open state (controlled for accessibility)
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="font-extrabold text-2xl tracking-tight text-primary select-none">
          minimal.
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-2">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative after:content-[''] after:block after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:origin-left after:rounded-full"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-4 ">
          {/* Divider */}
          <span className="hidden md:inline-block h-6 w-px bg-border mx-2" />

          {/* Auth/User */}
          {user ? (
            <AuthUserNavButton user={user} redirectPath="/profile" className="hidden sm:flex" />
          ) : (
            <AuthButton />
          )}

          {/* Cart Button */}
          <button className="relative rounded-full p-2 hover:bg-muted transition-colors group">
            <ShoppingCart className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
          </button>

          {/* Mobile menu button (Drawer trigger) */}
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <button
                className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Open menu"
                onClick={() => setOpen(true)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </DrawerTrigger>
            <DrawerContent className="md:hidden p-6 pt-8 space-y-8">
              <DrawerTitle asChild>
                <VisuallyHidden>Mobile Menu</VisuallyHidden>
              </DrawerTitle>
              <nav className="flex flex-col gap-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="flex flex-col gap-4 border-t pt-6">
                {user ? (
                  <AuthUserNavButton user={user} redirectPath="/profile" />
                ) : (
                  <AuthButton />
                )}
                <button className="relative rounded-full p-2 hover:bg-muted transition-colors self-start">
                  <ShoppingCart className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
                </button>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
}
