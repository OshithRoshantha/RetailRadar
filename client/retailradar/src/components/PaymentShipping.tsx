import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

export const PaymentShippingCharts = ({ 
  paymentData, 
  shippingData 
}: { 
  paymentData: { Payment_Method: string; count: number }[];
  shippingData: { Shipping_Method: string; count: number }[];
}) => {
  return (
    <div className="chart-container">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        <div style={{ flex: 1, minWidth: 300 }}>
          <h4>Payment Methods</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={paymentData}
                dataKey="count"
                nameKey="Payment_Method"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                <Cell fill="#56c0da" />
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div style={{ flex: 1, minWidth: 300 }}>
          <h4>Shipping Methods</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={shippingData}
                dataKey="count"
                nameKey="Shipping_Method"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                <Cell fill="#6b67a0" />
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};