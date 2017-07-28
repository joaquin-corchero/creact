import fetch from 'isomorphic-fetch';

function post(url, data, callBack) {
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

function get (url, callBack){
    return fetch(
        url,
        { method: 'get' },
    )
    .then((response) => {
        return response.json();
    }).catch((error) => {
        console.log(`There was an errror with the request: ${error}`);
        throw error;
    });
}

function checkStatus (response){
    if (response.status >= 200 && response.status < 300) {
        console.log(`Request successful ${response}`);
        return response;
    } else {
        const error = new Error(`HTTP Error ${response.statusText}`);
        error.status = response.statusText;
        error.response = response;
        console.log(`There was an errror with the request: ${error}`);
        throw error;
    }
}

function parseJSON (response) {
    console.log('parsing Json');
    return response.json();
}

const Client = { get, post };

export default Client;