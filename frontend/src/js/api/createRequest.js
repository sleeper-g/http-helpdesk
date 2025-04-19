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

  const text = await response.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch (error) {
    console.warn('Ошибка парсинга JSON:', error, 'Ответ:', text);
    throw error;
  }
};

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};