const express = require('express');
const fs = require('fs');
// const path = require('path');

const router = express.Router();

const fsUser = fs.readFileSync('./public/user.json');
let allUser = JSON.parse(fsUser);

router
    .route('/')

    //GET ............................
    .get((req, res) => {
        const { person } = req.query;
        res.json(allUser.slice(0, person));
    })


    .post((req,res) => {
        allUser.push(req.body);
        res.send(allUser)
    })

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        const randomUser = allUser.filter(user => user.id == id)
        res.send(randomUser)
    })
    .patch((req,res) => {
        const { id } = req.params;
        const updateData = allUser.find(user => user.id == id);
        
        updateData.gender = req.body.gender;
        updateData.name = req.body.name;
        updateData.contact = req.body.contact;
        updateData.address = req.body.address;
        updateData.photoUrl = req.body.photoUrl;
        res.send(allUser)
    })




    .delete((req,res) => {
        const {id} = req.params;
        allUser = allUser.filter(user => user.id !== id)
        res.send(allUser);
    })

module.exports = router;