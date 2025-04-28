import axios from "axios";

export const webScrape = async () => {
    const response = await axios.get('http://localhost:8000/retailradar/scrape' ,{
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
}