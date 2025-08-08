"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import moment from "moment";
import { useState } from "react";
import { toast } from "sonner";

function AddExpense({ paramsId, refreshData }) {
  const [name, setName] = useState();
  const [amount, setAmount] = useState();

  const addNewExpense = async () => {
    const result = await db
      .insert(Expenses)
      .values({
        name: name,
        amount: amount,
        budgetId: paramsId,
        createdAt: moment().format("DD/MM/YYYY"),
      })
      .returning({ insertedId: Budgets.id });
    setName("");
    setAmount("");

    if (result) {
      refreshData();
      toast.success("Expense added successfully!");
    }
  };

  return (
    <div className="border p-5 rounded-lg">
      <h2 className="font-bold text-lg">Add Expense</h2>
      <div className="mt-3">
        <h2 className="text-black font-medium my-1">Expense Name</h2>
        <Input
          value={name}
          type="text"
          placeholder="e.g Bedroom Decore"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-3">
        <h2 className="text-black font-medium my-1">Expense Amount</h2>
        <Input
          value={amount}
          type="number"
          placeholder="e.g 1200"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <Button
        onClick={() => addNewExpense()}
        disabled={!(name && amount)}
        className="mt-5 w-full bg-indigo-700 hover:bg-indigo-800 cursor-pointer"
      >
        Add New Expense
      </Button>
    </div>
  );
}

export default AddExpense;
