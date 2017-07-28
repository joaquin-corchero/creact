import fetch from 'isomorphic-fetch';

export let post = (url, data, callBack) => {
    return fetch(
        url,
        {
            method: 'POST',
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    )
    .then(checkStatus)
    .then(parseJSON)
    .then(callBack);
}

export let get = (url, callBack) => {
    return fetch(
        url,
        {
            method: 'GET',
            mode: 'no-cors'
        }
    )
    .then(checkStatus)
    .then(parseJSON)
    .then(callBack);
};

let checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        const error = new Error(`HTTP Error ${response.statusText}`);
        error.status = response.statusText;
        error.response = response;
        console.log(error);
        throw error;
    }
}

let parseJSON = (response) => {
    return response.json();
}