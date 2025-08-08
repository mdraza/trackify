import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function BarChartDashboard({ budgetList }) {
  return (
    <div className=" border p-5 rounded-lg">
      <h2 className="font-semibold mb-5 text-lg">Activity</h2>
      <ResponsiveContainer width={"80%"} height={300}>
        <BarChart
          width={500}
          height={300}
          data={budgetList}
          margin={{ top: 8 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalSpend" stackId="a" fill="#4845d2" />
          <Bar dataKey="amount" stackId="a" fill="#c2c2ff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartDashboard;
