import Link from "next/link";

function BudgetItem({ budget }) {
  const budgetPercentage = ((budget.totalSpend / budget.amount) * 100).toFixed(
    2
  );

  return (
    <Link href={`/dashboard/expenses/${budget.id}`}>
      <div className="p-5 rounded-lg border hover:shadow-md cursor-pointer mb-5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl p-2 px-4 bg-slate-100 rounded-full">
              {budget.icon}
            </h2>
            <div>
              <h2 className="font-semibold">{budget.name}</h2>
              <h2 className="text-sm text-gray-500">{budget.totalItem} Item</h2>
            </div>
          </div>
          <h2 className="font-bold text-indigo-700 text-lg">
            ${budget.amount}
          </h2>
        </div>
        <div className="mt-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm text-slate-400">
              ${budget.totalSpend ? budget.totalSpend : 0} Spend
            </h2>
            <h2 className="text-sm text-slate-400">
              ${budget.amount - budget.totalSpend} Remaining
            </h2>
          </div>
          <div className="w-full bg-slate-300 h-2 rounded-full">
            <div
              style={{ width: `${budgetPercentage}%` }}
              className={`bg-indigo-700 h-2 rounded-full`}
            ></div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BudgetItem;
