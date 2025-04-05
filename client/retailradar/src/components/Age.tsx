import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const AgeDistribution = ({ data }: { data: { age_group: string; count: number }[] }) => {
  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="age_group" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#6b67a0" name="Customers" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};