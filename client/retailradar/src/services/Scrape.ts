import axios from "axios";

const token = sessionStorage.getItem('jwtToken');

export const webScrape = async () => {
    const response = await axios.get('http://localhost:8000/retailradar/scrape' ,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    return response.data;
}