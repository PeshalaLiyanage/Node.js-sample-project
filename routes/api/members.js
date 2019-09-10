const express = require('express');
const router = express.Router();
const members = require('../../Members');

router.get('/', (req, res) => {
    res.send('<h1>Hello Hello</h1>')
});

router.get('/', (req, res) => {
    res.json(members);
});

router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id ));
    if(found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)))
    }else {
        res.status(400).json({message: `No member found with the id ${req.params.id}`})
    }
});

router.post('/', (req,  res) => {
    res.send(req.body)
});

router.put('/:id', (req, res) => {

    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found){
        const updateMember = req.body;

        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                member.name = updateMember.name ? updateMember.name :  member.name;
                member.email = updateMember.email ? updateMember.email :  member.email;
            }
        });
        res.send(members)
    }
    else {
        res.status(400).json({message: `No member found with the id ${req.params.id}`})
    }
});
module.exports = router;