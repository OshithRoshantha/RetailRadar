import axios from "axios";

export const agentReply = async (ask: string) => {
    const response = await axios.post('http://localhost:8000/retailradar/askAgent', {
        question: ask
    }, {
        headers: {
            'Content-Type': 'application/json',
          },
    });
    return response.data;
} 