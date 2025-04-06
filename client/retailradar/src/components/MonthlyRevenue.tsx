import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const MonthlyRevenue = ({ data }: { data: { Month: string; Total_Revenue: number }[] }) => {
  const monthOrder = ['January', 'February', 'March', 'April', 'May', 'June', 
                     'July', 'August', 'September', 'October', 'November', 'December'];
  
  const sortedData = [...data].sort((a, b) => 
    monthOrder.indexOf(a.Month) - monthOrder.indexOf(b.Month));
  
  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={sortedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Month" />
          <YAxis />
          <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Revenue']} />
          <Legend />
          <Line type="monotone" dataKey="Total_Revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};