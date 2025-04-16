const createRequest = async (url, port, methodName, method, id, data) => {
  const uri = typeof id === 'undefined'
    ? `http://${url}:${port}/?method=${methodName}`
    : `http://${url}:${port}/?method=${methodName}&id=${id}`;
  const options = {
    method,
    headers: {
            'Content-Type': 'application/json',
    },
  };
  if (method === 'POST') {
    options.body = JSON.stringify(data);
  }
  try {
    const response = await fetch(uri, options);
    if (!response.ok) {
      throw Error("Request failed");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export default createRequest;
