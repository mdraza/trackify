"use client";

import { db } from "@/utils/dbConfig";
import DashboardHeader from "./_components/DashboardHeader";
import SideNav from "./_components/SideNav";
import { Budgets } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";
import { Hamburger, HamburgerIcon, HamIcon, Menu } from "lucide-react";

function DashboardLayout({ children }) {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    user && checkUserBudget();
  }, [user]);

  const checkUserBudget = async () => {
    const result = await db
      .select()
      .from(Budgets)
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress));

    if (result?.length === 0) {
      router.replace("/dashboard/budgets");
    }
  };
  return (
    <div>
      <div className="fixed hidden md:block md:w-64">
        <SideNav />
      </div>
      <div className="md:ml-64">
        <DashboardHeader />
        {children}
        <Toaster />
      </div>
    </div>
  );
}

export default DashboardLayout;
