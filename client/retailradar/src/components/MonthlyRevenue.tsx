import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const monthAbbreviations: Record<string, string> = {
  'January': 'JAN',
  'February': 'FEB',
  'March': 'MAR',
  'April': 'APR',
  'May': 'MAY',
  'June': 'JUN',
  'July': 'JUL',
  'August': 'AUG',
  'September': 'SEP',
  'October': 'OCT',
  'November': 'NOV',
  'December': 'DEC'
};

const monthOrder = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];

export const MonthlyRevenueChart = ({ data }: { data: { Month: string; Total_Revenue: number }[] }) => {
  const processedData = monthOrder.map(month => {
    const found = data.find(item => item.Month === month);
    return found || { Month: month, Total_Revenue: 0 };
  });

  const formatMonthTick = (month: string) => monthAbbreviations[month] || month.slice(0, 3).toUpperCase();

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={processedData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="Month" tickFormatter={formatMonthTick} tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} domain={['dataMin - 1000000', 'dataMax + 1000000']} />
          <Tooltip 
            formatter={(value: number) => [`$${value.toLocaleString('en-US')}`, 'Revenue']}
            labelFormatter={(label) => monthAbbreviations[label] || label}
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '4px', padding: '10px' }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="Total_Revenue" 
            stroke="#6b67a0" 
            strokeWidth={3}
            dot={{ r: 5, strokeWidth: 2 }}
            activeDot={{ r: 8, stroke: '#6b67a0', strokeWidth: 2, fill: '#fff' }}
            name="Revenue"
            connectNulls={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};