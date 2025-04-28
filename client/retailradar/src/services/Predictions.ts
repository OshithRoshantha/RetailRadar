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