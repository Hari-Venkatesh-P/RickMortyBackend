const axios = require("axios");

const makeAPICall = async (method, URL, data, headers) => {
  const config = {
    method: method,
    url: URL,
    data: {
      ...data,
    },
    headers: {
      ...headers,
    },
  };
  let response = await axios(config)
  return response;
};



module.exports = {
    makeAPICall
}