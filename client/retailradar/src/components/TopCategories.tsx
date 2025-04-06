import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const COLORS = ['#56c0da', '#18182c', '#6b67a0'];

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
          <Bar dataKey="count" name="Orders">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};