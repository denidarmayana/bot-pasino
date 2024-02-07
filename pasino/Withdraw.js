const axios = require('axios');

async function action(token,coin,address,amount) {
  try {
    const data = {
      token: token,
      coin:coin,
      method:"DIRECT",
      address:address,
      amount:amount
    };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.pasino.io/withdraw/place-withdrawal',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error:', error.message);
    } else {
      console.error('Unexpected Error:', error);
    }
    throw error;
  }
}

module.exports = { action };
