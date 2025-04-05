import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Text } from 'recharts';

export const RevenueSegments = ({ data }: { data: { Customer_Segment: string; Total_Revenue: number }[] }) => {
  const total = data.reduce((sum, item) => sum + item.Total_Revenue, 0);
  const COLORS = ['#56c0da', '#18182c', '#6b67a0'];
  
  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="Total_Revenue"
            nameKey="Customer_Segment"
            label={({ name, value }) => `${name}: $${(value/1000000).toFixed(1)}M`}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
              />
            ))}
          </Pie>
          <Legend />
          <Text 
            x="50%" 
            y="50%" 
            textAnchor="middle" 
            dominantBaseline="middle"
            style={{ fontSize: '14px', fontWeight: 'bold' }}
          >
            ${(total/1000000).toFixed(1)}M
          </Text>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};