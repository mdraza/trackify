import { db } from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Trash } from "lucide-react";
import { toast } from "sonner";

function ExpenseListTable({ expensesList, refreshData }) {
  const deleteExpense = async (expense) => {
    const result = await db
      .delete(Expenses)
      .where(eq(Expenses.id, expense.id))
      .returning();

    if (result) {
      refreshData();
      toast.error("Expense deleted!");
    }
  };

  return (
    <div className="border p-5 rounded-lg mt-5">
      <h2 className="text-lg font-semibold">Latest Expense List</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 bg-slate-200 px-3 py-2 mt-3">
        <h2 className="font-semibold">Name</h2>
        <h2 className="font-semibold">Amount</h2>
        <h2 className="font-semibold">Date</h2>
        <h2 className="font-semibold">Action</h2>
      </div>
      {expensesList?.map((expense, index) => (
        <div
          key={index}
          className="grid grid-cols-2 lg:grid-cols-4 bg-slate-50 px-3 py-2 border-b"
        >
          <h2>{expense.name}</h2>
          <h2>{expense.amount}</h2>
          <h2>{expense.createdAt}</h2>
          <h2>
            <Trash
              onClick={() => deleteExpense(expense)}
              className="text-red-500 cursor-pointer"
            />
          </h2>
        </div>
      ))}
    </div>
  );
}

export default ExpenseListTable;
