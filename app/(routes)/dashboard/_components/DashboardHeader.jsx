"use client";

import { UserButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Button } from "@/components/ui/button";

function DashboardHeader() {
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleMenu = () => {
    setToggleMenu((menu) => !menu);
  };
  console.log(toggleMenu);
  return (
    <div className="p-5 flex justify-between items-center border-b">
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div onClick={handleMenu}>
              {!toggleMenu ? (
                <Menu className="cursor-pointer text-lg" />
              ) : (
                <X className="cursor-pointer text-lg" />
              )}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              <Link href={"/"}>
                <Image
                  src={
                    "https://s3.ca-central-1.amazonaws.com/logojoy/logos/227213901/noBgColor.png"
                  }
                  width={120}
                  height={70}
                  alt="logo"
                  className="inline-block"
                />
              </Link>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={"/dashboard"}>Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/dashboard/budgets"}>Budgets</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/dashboard/expenses"}>Expenses</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="hidden md:block"></div>
      <div>
        <UserButton />
      </div>
    </div>
  );
}

export default DashboardHeader;
