const URL = process.env.URL || "http://192.168.1.3:2018/WebApi/"

let access_token = null;

export const getToken = async (companyName = "DEMO") => {
    let tokenRequestBody = {
        'username': "FEUP",
        'password': "qualquer1",
        'company': companyName,
        'instance': "DEFAULT",
        'grant_type': "password",
        'line': "professional",
    };

    let url = URL + "token";

    let bodyData = new URLSearchParams();
    3

    Object.keys(tokenRequestBody).forEach((key) => {
        bodyData.append(key, tokenRequestBody[key])
    })

    await makeRequest(url, "application/x-www-form-urlencoded", bodyData);

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

    const headers = new Headers();
    headers.append('Content-Type', contentType);
    if (access_token) {
        headers.append('Authorization', 'Bearer ' + access_token)
    }

    let request = {
        method: 'POST',
        mode: "cors",
        credentials: "omit",
        headers: headers,
        body: bodyData
    }

    console.log(request);

    const response = await fetch(url, request);

    if (response.ok) {
        return response;
    } else {
        throw new Error(response.statusText);
    }
}