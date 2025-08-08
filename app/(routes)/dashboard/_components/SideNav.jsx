"use client";

import { UserButton } from "@clerk/nextjs";
import { LayoutGrid, PiggyBank, ReceiptText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SideNav() {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Budgets",
      icon: PiggyBank,
      path: "/dashboard/budgets",
    },
    {
      id: 3,
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expenses",
    },
  ];

  const path = usePathname();

  return (
    <div className="h-screen border shadow-sm p-5">
      <Link href={"/"}>
        <Image
          src={
            "https://s3.ca-central-1.amazonaws.com/logojoy/logos/227213901/noBgColor.png"
          }
          width={160}
          height={100}
          alt="logo"
          className="mb-3 inline-block"
        />
      </Link>
      <div className="mt-5">
        {menuList.map((menu) => (
          <Link
            key={menu.id}
            href={menu.path}
            className={`flex gap-2 mb-2 items-center text-gray-500 font-medium p-5 rounded-md cursor-pointer hover:text-indigo-700 hover:bg-indigo-100 ${
              menu.path === path ? "bg-indigo-100 text-indigo-700" : ""
            }`}
          >
            <menu.icon />
            {menu.name}
          </Link>
        ))}
      </div>
      <div className="fixed bottom-10 p-5 flex items-center gap-2 cursor-pointer">
        <UserButton />
        Profile
      </div>
    </div>
  );
}

export default SideNav;
