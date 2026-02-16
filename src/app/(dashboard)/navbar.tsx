"use client";

import { Menu } from "lucide-react";
import { useState } from "react";

import { UserButton } from "@/features/auth/components/user-button";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full flex items-center p-4 h-[68px]">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="size-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-[300px]">
          <div className="flex flex-col h-full" onClick={() => setOpen(false)}>
            <Logo />
            <SidebarRoutes />
          </div>
        </SheetContent>
      </Sheet>
      <div className="ml-auto">
        <UserButton />
      </div>
    </nav>
  );
};
