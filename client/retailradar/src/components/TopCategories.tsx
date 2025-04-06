import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const TopCategoriesChart = ({ data }: { data: { Product_Category: string; count: number }[] }) => {
  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          layout="vertical"
          data={data.sort((a, b) => b.count - a.count)}
          margin={{ left: 100 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="Product_Category" type="category" width={120} />
          <Tooltip formatter={(value) => [value, 'Orders']} />
          <Bar dataKey="count" fill="#6b67a0" name="Orders" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};