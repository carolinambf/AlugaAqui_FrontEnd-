import axios from 'axios';

const url = 'http://localhost:3001';

export function price (id) {
    return new Promise((resolve, reject) => {
        axios.get(url + "/movie/" + id + "/price", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        }).then(res => {
            resolve(res.data);
        });
    });
};
