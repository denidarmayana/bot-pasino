const axios = require('axios');
async function action(username,email,password) {
  try {
    const data ={
      "user_name": username,
      "user_email": email,
      "password": password,
      "agreement": "1",
      "referrer": "277064",
      "api_key": "31c84acdf24da08c2e60fcf28ee08a64792d38692182533905dc62c04776f8d4"
    };
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.pasino.io/api/register',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error('Error in getDigiFlazzPrabayar:', error);
    throw error; // Rethrow the error for the caller to handle
  }
}
module.exports = { action };