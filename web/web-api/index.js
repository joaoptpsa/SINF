let URL = null;
let accessToken = null;

const makeRequest = async (url, contentType, body) => {
  if (!URL) throw new Error('Need to setup url with getToken function.');

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

  const response = await fetch(`${URL}/${url}`, request);

  if (response.ok) {
    return response.json();
  }
  // else
  throw new Error(response.statusText, response.status);
};

export const getToken = async (companyName, url) => {
  URL = url;

  console.log(`Connecting to primavera webapi in ${URL}`);

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

  const response = await makeRequest('token', 'application/x-www-form-urlencoded', bodyData);

  console.log(response);

  accessToken = response.access_token;

  return accessToken;
};

export const dbQuery = queryString => makeRequest('Administrador/Consulta', 'application/json; charset=utf-8', queryString);
