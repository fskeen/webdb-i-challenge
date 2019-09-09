const express = require("express");
const router = express.Router();
const db = require('./accountsDb')
const { validateAccountID, validateAccountBody } = require("../middleware/validation")

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

router.get('/:id', validateAccountID, (req, res) => {
    res.status(200).json(req.validAccount)
})

// Create new account

router.post('/', validateAccountBody, async (req, res) => {
    const account = req.body;
    try {
        const newAccount = await db.insert(account)
        res.status(201).json({account: newAccount})
    } catch (err) {
        res.status(500).json({error: "Couldn't add account to database."})
    }
})

module.exports = router