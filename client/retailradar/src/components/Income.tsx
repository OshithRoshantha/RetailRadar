import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

interface IncomeData {
  Income: string;
  count: number;
}

interface IncomeDistributionProps {
  data: IncomeData[];
}

export const IncomeDistribution = ({ data }: IncomeDistributionProps) => {
  const COLORS = ['#56c0da', '#18182c', '#6b67a0'];

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="Income" type="category" width={80} />
          <Tooltip />
          <Legend />
          <Bar 
            dataKey="count" 
            name="Customers"
            radius={[0, 4, 4, 0]}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};