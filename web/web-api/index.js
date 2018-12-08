const URL = process.env.URL || "http://192.168.1.83:2018/WebApi/"

const tokenRequestBody = {
    'username': "FEUP",
    'password': "qualquer1",
    'company': "DEMO",
    'instance': "DEFAULT",
    'grant_type': "password",
    'line': "professional",
};


export const getToken = () => makeRequest(URL + "token", "application/x-www-form-urlencoded", tokenRequestBody)

export const dbQuery = (queryString) => makeRequest(URL + "Administrador/Consulta", "application/json", queryString)

const makeRequest = async (url, contentType, body) => {
    let bodyData = null;

    if (contentType === "application/x-www-form-urlencoded") {
        bodyData = new URLSearchParams();

        Object.keys(body).forEach((key) => {
            bodyData.append(key, body[key])
        })
    } else if (contentType === "application/json") {
        bodyData = JSON.stringify(body);
    }

    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': contentType,
        },
        body: bodyData // body data type must match "Content-Type" header
    });

    if (response.ok) return response.json();
    else throw new Error(response.statusText);

};