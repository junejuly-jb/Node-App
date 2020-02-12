const fetch = require("node-fetch");
const API_BASE_URL = "http://localhost:3000/api/v1";

module.exports = (express) => {
    const router = express.Router();

    router.get("/", (req, res) => {

        const userURL = API_BASE_URL + "/users";
        getAllUsers(userURL)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                return res.render('index/index', {
                    showHeader: true,
                    success: true,
                    users: data.data
                });
            });
    });

    // router.get('/user-delete/:id', (req, res) => {
    //     const id = req.params.id;
    //     const userURL = API_BASE_URL + "/user-delete/" + id;


    //     deleteUser(userURL)
    //         .then((res) => {
    //             return res.json();
    //         })
    //         .then((data) => {
    //             return res.render('index/index', {
    //                 if (!data.success) {

    //                 }

    //             });
    //         });
    // })


    return router;
}

function getAllUsers(url) {
    const options = {
        method: 'GET',
    }
    return fetch(url, options);
}

// function deleteUser(url) {
//     const options = {
//         method: 'DELETE',
//     }
//     return fetch(url, options);
// }