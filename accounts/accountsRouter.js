const express = require("express");
const router = express.Router();
const db = require('./accountsDb')

router.use(express.json())

// GET all accounts 

router.get('/', async (req, res) => {
    try {
        const accounts = await db.get()
        res.status(200).json(accounts)
    } catch (err) {
        console.log(err)
        res.status(500).json({error: "Error retrieving accounts."})
    }
})

// Get account by ID

// router.get('/:id', async (req, res) => {
//     const id = req.params.id
//     try {
//         const account = db.getById(id)
//         res.status(200).json(account)
//     } catch (err) {
//         console.log(err)
//         res.status(500)
//     }
// })

module.exports = router