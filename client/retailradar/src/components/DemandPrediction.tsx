import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

interface DemandData {
  Product_Category: string;
  Sales: number;
}

interface DemandPredictions {
  nextWeek: {
    Product_Category: { [key: string]: string };
    Sales: { [key: string]: number };
  };
  nextMonth: {
    Product_Category: { [key: string]: string };
    Sales: { [key: string]: number };
  };
}

const COLORS = ['#56c0da', '#18182c', '#6b67a0', '#56c0da', '#18182c'];

const DemandPrediction: React.FC<{ data: DemandPredictions }> = ({ data }) => {
  const transformData = (timeFrame: 'nextWeek' | 'nextMonth'): DemandData[] => {
    const categories = Object.values(data[timeFrame].Product_Category);
    const sales = Object.values(data[timeFrame].Sales);
    
    return categories.map((category, index) => ({
      Product_Category: category,
      Sales: sales[index]
    }));
  };

  const nextWeekData = transformData('nextWeek');
  const nextMonthData = transformData('nextMonth');

  const totalNextWeek = nextWeekData.reduce((sum, item) => sum + item.Sales, 0);
  const totalNextMonth = nextMonthData.reduce((sum, item) => sum + item.Sales, 0);

  const formatNumber = (value: number): string => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  return (
    <div className="demand-prediction-container space-y-8">
        <h2 className="text-2xl font-bold text-gray-800">Demand Predictions</h2>
        <p className="text-gray-600">Forecasted product demand for upcoming periods.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Next Week Demand</h3>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Total: {formatNumber(totalNextWeek)} units
            </div>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={nextWeekData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis 
                  dataKey="Product_Category" 
                  type="category" 
                  width={80}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  formatter={(value) => [`${value} units`, 'Demand']}
                  labelFormatter={(label) => `Category: ${label}`}
                />
                <Bar dataKey="Sales" name="Demand">
                  {nextWeekData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Top Performing Categories</h4>
            <div className="space-y-2">
              {[...nextWeekData]
                .sort((a, b) => b.Sales - a.Sales)
                .slice(0, 3)
                .map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-gray-700">{item.Product_Category}</span>
                    <span className="font-medium">{formatNumber(item.Sales)} units</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Next Month Demand</h3>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              Total: {formatNumber(totalNextMonth)} units
            </div>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={nextMonthData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis 
                  dataKey="Product_Category" 
                  type="category" 
                  width={80}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  formatter={(value) => [`${value} units`, 'Demand']}
                  labelFormatter={(label) => `Category: ${label}`}
                />
                <Bar dataKey="Sales" name="Demand">
                  {nextMonthData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Top Performing Categories</h4>
            <div className="space-y-2">
              {[...nextMonthData]
                .sort((a, b) => b.Sales - a.Sales)
                .slice(0, 3)
                .map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-gray-700">{item.Product_Category}</span>
                    <span className="font-medium">{formatNumber(item.Sales)} units</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mt-5">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Demand Comparison</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Next Week
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Next Month
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Growth
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {nextWeekData.map((weekItem, index) => {
                const monthItem = nextMonthData.find(
                  item => item.Product_Category === weekItem.Product_Category
                );
                const growth = monthItem ? 
                  ((monthItem.Sales - weekItem.Sales * 4) / (weekItem.Sales * 4)) * 100 : 0;
                
                return (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {weekItem.Product_Category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatNumber(weekItem.Sales)} units
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {monthItem ? formatNumber(monthItem.Sales) + ' units' : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                        growth >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DemandPrediction;