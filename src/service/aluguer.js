import axios from 'axios';

const url = 'http://localhost:3001';

export function all () {
    return new Promise((resolve, reject) => {
        axios.get(url+"/rent", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        }).then(res => {
            resolve(res.data);
        });
    });
};

export function rent (movie) {
    return new Promise((resolve, reject) => {
        axios.post(url+"/rent", movie, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        }).then(res => {
            resolve(res.data);
        });
    });
};

export function devolver (id) {
    return new Promise((resolve, reject) => {
        axios.get(url+"/rent/" + id + "/return", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        }).then(res => {
            resolve(res.data);
        });
    });
};
