'use strict';
const API_BASE_URL = "http://localhost:3000/api/v1";

function add(evt) {
    evt.preventDefault();

    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const age = document.getElementById("age").value;

    const user = { fname, lname, age }

    doAdd(user)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if (!data.success) {
                alert(data.message);
                return;
            }

            alert(data.message);
            location.href = '/';
        });
}

function doAdd(user) {
    const url = API_BASE_URL + "/createUser";
    const options = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return fetch(url, options);
}