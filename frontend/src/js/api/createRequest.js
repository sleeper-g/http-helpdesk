const createRequest = async ({
  url = "http://127.0.0.1",
  port = "7070",
  method = "allTickets",
  id = "",
}) => {
  console.log("Fetching data");
  if (id) {
    url = `${url}:${port}/?method=${method}`;
  } else {
    url = `${url}:${port}/?method=${method}`;
  }
  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw Error("Request failed");
    }
    const data = await response.json();
    console.log(response.status);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export default createRequest;
