import axios from "axios";

const token = sessionStorage.getItem('jwtToken');

export const agentReply = async (ask: string) => {
    const response = await axios.post('http://localhost:8000/retailradar/askAgent', {
        question: ask
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
    });
    return response.data;
} 