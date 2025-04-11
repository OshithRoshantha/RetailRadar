import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface SalesData {
  YearMonth: string;
  Sales: number;
}

interface PredictionsData {
  predictions: {
    YearMonth: {
      [key: string]: string;
    };
    Sales: {
      [key: string]: number;
    };
  };
}

const SalesPredictions: React.FC<{ data: PredictionsData }> = ({ data }) => {
  const transformData = (): SalesData[] => {
    const yearMonths = Object.values(data.predictions.YearMonth);
    const sales = Object.values(data.predictions.Sales);
    
    return yearMonths.map((ym, index) => ({
      YearMonth: ym,
      Sales: sales[index]
    }));
  };

  const salesData = transformData();
  const totalSales = salesData.reduce((sum, item) => sum + item.Sales, 0);
  const averageSales = totalSales / salesData.length;
  const maxSales = Math.max(...salesData.map(item => item.Sales));
  const minSales = Math.min(...salesData.map(item => item.Sales));

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="sales-predictions-container">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Sales Predictions</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Total Predicted</h3>
          <p className="text-2xl font-bold text-blue-600">{formatCurrency(totalSales)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Average Monthly</h3>
          <p className="text-2xl font-bold text-green-600">{formatCurrency(averageSales)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Highest Month</h3>
          <p className="text-2xl font-bold text-purple-600">{formatCurrency(maxSales)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Lowest Month</h3>
          <p className="text-2xl font-bold text-red-600">{formatCurrency(minSales)}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Monthly Sales Trend</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="YearMonth" />
              <YAxis 
                tickFormatter={(value) => `$${value / 1000000}M`}
                width={80}
              />
              <Tooltip 
                formatter={(value) => [formatCurrency(Number(value)), 'Sales']}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Legend />
              <Bar 
                dataKey="Sales" 
                fill="#4f46e5" 
                name="Predicted Sales"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Detailed Predictions</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Month
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Predicted Sales
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  vs Average
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {salesData.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.YearMonth}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(item.Sales)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                      item.Sales >= averageSales ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {item.Sales >= averageSales ? '+' : ''}
                      {((item.Sales - averageSales) / averageSales * 100).toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesPredictions;