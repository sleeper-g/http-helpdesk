export const baseURL = 'http://localhost:7070';

export const requestCallback = async (url, methodName, method, id = null, data = null) => {
  const params = new URLSearchParams();
  params.set('method', methodName);
  if (id) params.set('id', id);

  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };

  if (method === 'POST' || method === 'PUT') {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(`${url}/?${params.toString()}`, options);
  if (!response.ok) throw new Error('Ошибка запроса');

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  }
  return null;
};

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};
