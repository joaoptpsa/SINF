const URL = process.env.URL || "http://192.168.1.83:2018/WebApi/"

let access_token = null;

const tokenRequestBody = {
    'username': "FEUP",
    'password': "qualquer1",
    'company': "DEMO",
    'instance': "DEFAULT",
    'grant_type': "password",
    'line': "professional",
};


export const getToken = async () => {
    let url = URL + "token";

    let bodyData = new URLSearchParams();

    Object.keys(tokenRequestBody).forEach((key) => {
        bodyData.append(key, tokenRequestBody[key])
    })

    const response = await makeRequest(url, "application/x-www-form-urlencoded", bodyData);

    const responseJson = await response.json();

    access_token = responseJson.access_token;

    console.log("GOT ACCESS TOKEN : " + access_token);
}

export const dbQuery = (queryString) => makeRequest(URL + "Administrador/Consulta", "application/json; charset=utf-8", queryString)


const makeRequest = async (url, contentType, body) => {
    let bodyData;

    if (contentType === "application/json; charset=utf-8") {
        bodyData = JSON.stringify(body);
    } else {
        bodyData = body;
    }

    const headers = new Headers({
        'Content-Type': contentType,
        'Authorization': access_token ? 'Bearer ' + access_token : null
    })

    let request = {
        method: 'POST',
        mode: "cors",
        credentials: "omit",
        headers: headers,
        body: bodyData
    }

    const response = await fetch(url, request);

    if (response.ok) {
        return response;
    } else {
        throw new Error(response.statusText);
    }
}