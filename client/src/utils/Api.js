const url = 'localhost:7000';

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=utf-8'
};

export function fetchAccounts() {
    return fetch(`http://${url}/accounts`, {headers})
        .then((res) => res.json())
}
