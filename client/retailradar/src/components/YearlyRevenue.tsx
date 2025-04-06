import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const YearlyRevenueChart = ({ data }: { data: { tempYear: number; Total_Revenue: number }[] }) => {
  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="tempYear" />
          <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
          <Tooltip 
            formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Revenue']}
            labelFormatter={(label) => `Year: ${label}`}
          />
          <Area 
            type="monotone" 
            dataKey="Total_Revenue" 
            stroke="#18182c" 
            fill="#18182c" 
            fillOpacity={0.7}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};