import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface CitySalesData {
  City: string;
  Total_Sales: number;
}

interface CitySalesProps {
  data: CitySalesData[];
}

export const CitySales = ({ data }: CitySalesProps) => {
  const COLORS = ['#56c0da', '#18182c', '#6b67a0'];

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart layout="vertical" data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="City" type="category" width={100} />
          <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Sales']} />
          <Bar dataKey="Total_Sales" name="Sales">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};