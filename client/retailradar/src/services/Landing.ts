import axios from "axios";

export const signUp = async (businessName, email, password) => {
    await axios.post('http://localhost:8000/retailradar/signup', {
        businessName: businessName,
        email: email,
        password: password
    },
        {
        headers: {
            'Content-Type': 'application/json',
          },
    });
}