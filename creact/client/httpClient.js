import fetch from 'isomorphic-fetch';

export let post = (url, data, callBack, failure) => {
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
    .then(data => {
        callBack(data);
    }).catch(error => {
        console.log(`request failed ${error}`);
        failure(error);
    });
};

export let get = (url, callBack, failure) => {
    return fetch(
        url,
        {
            method: 'GET',
            mode: 'no-cors'
        }
    )
    .then((response) => {
        return callBack(response.json());
    }).catch(error => {
        console.log(`request failed ${error}`);
        failure(error);
    });
};