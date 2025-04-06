import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#56c0da', '#18182c', '#6b67a0', '#C70039 '];

export const OrderStatusChart = ({ data }: { data: { Order_Status: string; count: number }[] }) => {
  const total = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="count"
            nameKey="Order_Status"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value, name, props) => [
            `${value} (${(props.payload.percent * 100).toFixed(1)}%)`,
            name
          ]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};