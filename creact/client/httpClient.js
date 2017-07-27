module.exports = function post(url, data) {
  return fetch(
        url, 
        {
            method: 'POST',
            headers: 
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
    )
    .then(function(response) {
        return response.json();
    });
};