const axios = require('axios');

const testRegistration = async () => {
    try {
        const res = await axios.post('http://localhost:5000/api/auth/register', {
            nom: 'Test User',
            email: `test${Date.now()}@example.com`,
            motDePasse: 'password123'
        });
        console.log('Success:', res.data);
    } catch (err) {
        console.error('Error Status:', err.response?.status);
        console.error('Error Data:', err.response?.data);
    }
};

testRegistration();
