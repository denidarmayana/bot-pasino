const axios = require('axios');

async function action(email, password) {
  try {
    const data = {
      user: email,
      password: password,
      api_key: "31c84acdf24da08c2e60fcf28ee08a64792d38692182533905dc62c04776f8d4"
    };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.pasino.io/api/login',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    const response = await axios.request(config);
    return response.data; // Assuming you want to return the data from the response
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific errors
      console.error('Axios Error:', error.message);
    } else {
      // Handle other types of errors
      console.error('Unexpected Error:', error);
    }
    throw error; // Rethrow the error for the caller to handle
  }
}

module.exports = { action };
