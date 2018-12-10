const URL = process.env.URL || 'http://192.168.1.4:2018/WebApi/';

let accessToken = null;

const makeRequest = async (url, contentType, body) => {
  let bodyData;

  if (contentType === 'application/json; charset=utf-8') {
    bodyData = JSON.stringify(body);
  } else {
    bodyData = body;
  }

  const headers = new Headers();
  headers.append('Content-Type', contentType);
  if (accessToken) {
    headers.append('Authorization', `Bearer ${accessToken}`);
  }

  const request = {
    method: 'POST',
    mode: 'cors',
    credentials: 'omit',
    headers,
    body: bodyData,
  };

  const response = await fetch(url, request);

  if (response.ok) {
    return response;
  }
  // else
  throw new Error(response.statusText);
};

export const getToken = async (companyName = 'DEMO') => {
  const url = `${URL}token`;

  const tokenRequestBody = {
    username: 'FEUP',
    password: 'qualquer1',
    company: companyName,
    instance: 'DEFAULT',
    grant_type: 'password',
    line: 'professional',
  };

  const bodyData = new URLSearchParams();

  Object.keys(tokenRequestBody).forEach((key) => {
    bodyData.append(key, tokenRequestBody[key]);
  });

  const response = await makeRequest(url, 'application/x-www-form-urlencoded', bodyData);
  const responseJson = await response.json();

  accessToken = responseJson.access_token;
  console.log(`GOT ACCESS TOKEN -> ${accessToken}`);
};

export const dbQuery = (queryString) => {
  const url = `${URL}Administrador/Consulta`;
  return makeRequest(url, 'application/json; charset=utf-8', queryString);
};