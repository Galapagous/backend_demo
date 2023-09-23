const express = require('express')
const verifyUser = require('../middleware/verifyToken')
const router = express.Router()

router.get('/', verifyUser, (req, res)=>{
    
})

router.get('/:id', verifyUser, (req, res)=>{
    res.send('fetch a specific user')
})

router.put('/:id', verifyUser, (req, res)=>{
    res.send('update a user')
})

router.delete('/:id', verifyUser, (req, res)=>{
    res.send('delete a user')
})


module.exports = router