import axios from "axios";

export const salesPredict = async () => {
    const response = await axios.get('http://localhost:8000/retailradar/predict/sales', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    return response.data;
}

export const demandPredict = async () => {
    const response = await axios.get('http://localhost:8000/retailradar/predict/demand', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    return response.data;
}

export const churnPredict = async (churnFormData) => {
  const response = await axios.post('http://localhost:8000/retailradar/predict/churn', {
    Total_Spend: parseFloat(churnFormData.totalSpend),
    Total_Purchases: parseInt(churnFormData.totalPurchases),
    Recency: parseFloat(churnFormData.recency),
    Avg_Order_Value: parseFloat(churnFormData.avgOrderValue)
  },{
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data;
}