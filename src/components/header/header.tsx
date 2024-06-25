"use client";
import { CircleUser, Menu, Landmark, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { Button } from "../ui/button";
import { MENU_NAMES } from "@/constants/menuNames";
import { signOut } from "next-auth/react";

export const Header = () => {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b justify-between bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <div className="flex items-center gap-2 text-lg font-semibold md:text-base">
          <Landmark className="h-6 w-6" />
          <span className="sr-only">Banco</span>
        </div>
        {MENU_NAMES.map((item) => (
          <Link
            key={item.name}
            href={item.link}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            {item.name}
          </Link>
        ))}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Fechar menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link href="#" className="flex items-center gap-2 text-lg font-semibold">
              <Landmark className="h-6 w-6" />
              <span className="sr-only">Banco</span>
            </Link>
            {MENU_NAMES.map((item) => (
              <Link key={item.name} href={item.link} className="text-muted-foreground hover:text-foreground">
                {item.name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Fechar menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
