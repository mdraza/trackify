import { PiggyBank, ReceiptText, Wallet } from "lucide-react";

function CardInfo({ budgetList }) {
  const totalAmount = budgetList.reduce(
    (sum, item) => sum + parseInt(item.amount),
    0
  );

  const totalSpend = budgetList.reduce((sum, item) => sum + item.totalSpend, 0);

  return (
    <div className="mt-7">
      {budgetList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-7 border rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-sm mb-1">Total Budget</h2>
              <h2 className="text-2xl font-semibold">${totalAmount}</h2>
            </div>
            <PiggyBank className="bg-indigo-700 p-3 h-12 w-12 rounded-full text-white" />
          </div>
          <div className="p-7 border rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-sm mb-1">Total Spend</h2>
              <h2 className="text-2xl font-semibold">${totalSpend}</h2>
            </div>
            <ReceiptText className="bg-indigo-700 p-3 h-12 w-12 rounded-full text-white" />
          </div>
          <div className="p-7 border rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-sm mb-1">Number of Budget</h2>
              <h2 className="text-2xl font-semibold">{budgetList?.length}</h2>
            </div>
            <Wallet className="bg-indigo-700 p-3 h-12 w-12 rounded-full text-white" />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((item, index) => (
            <div
              className="w-full rounded-lg h-[120px] bg-slate-200 animate-pulse "
              key={index}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CardInfo;
