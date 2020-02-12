'use strict';
const API_BASE_URL = "http://localhost:3000/api/v1";

function deleteUser(evt) {
    evt.preventDefault();

    const id = document.getElementById("id").value;

    console.log(id);



    doDelete(id)
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

function doDelete(id) {
    const url = API_BASE_URL + "/deleteUser";
    const options = {
        method: 'GET',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return fetch(url, options);
}