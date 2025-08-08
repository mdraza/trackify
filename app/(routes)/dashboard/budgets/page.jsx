import Link from "next/link";
import BudgetList from "./_components/BudgetList";
import { ArrowLeft } from "lucide-react";

function Budget() {
  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold ">
        <Link href={"/dashboard"} className="flex items-center gap-2">
          <ArrowLeft /> <span>My Budget</span>
        </Link>
      </h2>
      <BudgetList />
    </div>
  );
}

export default Budget;
