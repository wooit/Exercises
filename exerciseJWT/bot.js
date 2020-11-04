const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

//  1/ appeller le serveur sur le port 3000 et recuperer le jwt (avec un admin ou un member)
//  2/ appeller le serveur sur le port 4000 et recuperer les infos avec le jwt
setInterval(()=>{
    axios.post('http://localhost:3000/login', {
        username: 'john',
        password: 'password123admin'
    })
    .then(res=>{
        //on refait la methode axios pour afficher la liste des livres
        // console.log(res.data.accessToken)
        // console.log(res.data)
        axios.get('http://localhost:4000/books', {
        headers: {"Authorization" : `Bearer ${res.data.accessToken}`}
        })
        .then(res=>{
            console.log(res.data);
        })
        .catch(err =>{
            console.error(err);
        })
    })
    .catch(err =>{
        console.error(err);
    })
}, 5000, 0)

//  3/ toutes les 10 minutes, ajouter un nouvel element (avec un admin)
setInterval(() =>{
    axios.post('http://localhost:3000/login', {
        username: 'john',
        password: 'password123admin'
    })
    .then(res=>{
        axios.post('http://localhost:4000/books',{
        author: new Date().getTime(),
        country: new Date().getTime(),
        language: new Date().getTime(),
        pages: new Date().getTime(),
        title: new Date().getTime(),
        year: new Date().getTime()
        },
        //on met le headers avant les data pour pas qu'il soit confondu dans les data
        {headers: {"Authorization" : `Bearer ${res.data.accessToken}`}}) 
        .then(res=>{
            console.log(res.config.data)
        })
        .catch(err =>{
            console.error(err)
        })
    })
    .catch(err =>{
        console.error(err);
    })
}, 6000, 0)


app.listen(5000, () => {
    console.log('Bot running on http://localhost:5000');
});



//-------------------------------------------------------------------------------------------------------------------------------------

//EXO1

// setInterval(()=>{
//     axios.post('http://localhost:3000/login', {
//         username: 'john',
//         password: 'password123admin'
//     })
//     .then(res=>{
//         console.log(res.data)
//     })
//     .catch()

// }, 10000, 0)



//EXO2
// ===== AUTOMATISATION DU POST & DU GET =====
// setInterval(()=>{
//     axios.post('http://localhost:3000/login', {
//         username: 'john',
//         password: 'password123admin'
//     })
//     .then(res=>{
//         console.log(res.data.accessToken)
//         axios.get('http://localhost:4000/books', {
//         headers: {"Authorization" : `Bearer ${res.data.accessToken}`}
//         })
//         .then(res=>{
//             console.log(res.data);
//         })
//         .catch(err =>{
//             console.error(err);
//         })
//     })
//     .catch(err =>{
//         console.error(err);
//     })
// }, 5000, 0)


//EXO 1 ET 2 COMBINED
//let token = "";

// setInterval(()=>{
//     axios.post('http://localhost:3000/login', {
//         username: 'john',
//         password: 'password123admin'
//     })
//     .then(res=>{
//         token = res.data.accessToken
//         console.log(token)
//         axios.get('http://localhost:4000/books', {
//             headers:{"Authorization" : `Bearer ${token}`}
//         })
//         .then(res=>{
//             console.log(res.data)
//         })
//         .catch()
//     })
//     .catch()

// }, 20000, 0)


