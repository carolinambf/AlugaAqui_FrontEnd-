import axios from 'axios';

const url = 'http://localhost:3001';                                   // ligação á nossa API

export function all () {
    return new Promise((resolve, reject) => {
        axios.get(url+"/rent", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),  // manda um token de verificação  
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
                Authorization: "Bearer " + localStorage.getItem("token"),   // manda um token de verificação para alugar 
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
                Authorization: "Bearer " + localStorage.getItem("token"),  // manda um token para verificação de devolução
            },
        }).then(res => {
            resolve(res.data);
        });
    });
};
