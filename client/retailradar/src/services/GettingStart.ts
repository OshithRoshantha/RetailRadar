import axios from "axios";

const token = sessionStorage.getItem('jwtToken');

export const uploader = async (csvFile: File) => {
    const formData = new FormData();
    formData.append('file', csvFile);
    await axios.post('http://localhost:8000/retailradar/uploader', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });
}

export const initializer = async () => {
    const response = await axios.get('http://localhost:8000/retailradar/initialize', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    return response.data;
}