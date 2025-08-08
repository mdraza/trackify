"use client";

import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { useEffect, useState } from "react";
import { use } from "react";
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpense from "../_components/AddExpense";
import ExpenseListTable from "../_components/ExpenseListTable";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PenBox, Trash } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import EditBudget from "../_components/EditBudget";
import Link from "next/link";

function page({ params, refreshData }) {
  const [budgetInfo, setBudgetInfo] = useState([]);
  const [expensesList, setExpensesList] = useState([]);

  const { user } = useUser();
  const { id } = use(params);
  const route = useRouter();

  useEffect(() => {
    user && getBudgetInfo();
  }, [user]);

  const getBudgetInfo = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`Sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .where(eq(Budgets.id, id))
      .groupBy(Budgets.id);

    setBudgetInfo(result[0]);
    getExpensesList();
  };

  const getExpensesList = async () => {
    const result = await db
      .select()
      .from(Expenses)
      .where(eq(Expenses.budgetId, id))
      .orderBy(desc(Expenses.id));

    setExpensesList(result);
  };

  const deleteBudget = async () => {
    const deleteExpensesResult = await db
      .delete(Expenses)
      .where(eq(Expenses.budgetId, id))
      .returning();

    if (deleteExpensesResult) {
      const result = await db
        .delete(Budgets)
        .where(eq(Budgets.id, id))
        .returning();

      toast.error("Budget deleted!");
      route.replace("/dashboard/budgets");
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold flex justify-between items-center">
        <Link href={"/dashboard"} className="flex items-center gap-2">
          <ArrowLeft /> <span>Expenses</span>
        </Link>

        <div className="flex gap-2 items-center">
          <EditBudget
            budgetInfo={budgetInfo}
            refreshData={() => getBudgetInfo()}
          />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="bg-red-600 hover:bg-red-700 cursor-pointer">
                <Trash /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your budget including the expenses and remove your data from
                  our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="cursor-pointer">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="cursor-pointer"
                  onClick={() => deleteBudget()}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-7 gap-5">
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <div className="w-full h-[150px] bg-slate-200 rounded-lg animate-pulse"></div>
        )}
        <AddExpense
          paramsId={id}
          user={user}
          refreshData={() => getBudgetInfo()}
        />
      </div>
      <div className="">
        <ExpenseListTable
          expensesList={expensesList}
          refreshData={() => getBudgetInfo()}
        />
      </div>
    </div>
  );
}

export default page;
