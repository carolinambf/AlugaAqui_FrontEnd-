import axios from 'axios';

const url = 'http://localhost:3001';

export function registar (user) {
    return new Promise((resolve, reject) => {
        axios.post(url + "/user/register", user)
        .then(res => {
            resolve(res.data);
        });
    });
};

export function login (user) {
    return new Promise((resolve, reject) => {
        axios.post(url + "/user/login", user)
        .then(res => {
            resolve(res.data);
        });
    });
};

export function autenticado () {
    return new Promise((resolve, reject) => {
        axios.get(url + "/user", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        }).then(res => {
            resolve(res.data);
        });
    });
}

export function logout (user) {
    return new Promise((resolve, reject) => {
        axios.post(url + "/user/logout", {}, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then(res => {
            resolve(res.data);
        });
    });
};
