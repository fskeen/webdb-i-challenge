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

// Edit account information

router.put('/:id', validateAccountID, validateAccountBody, (req, res) => {
    const id = req.params.id;
    const changes = req.body;
        db.update(id, changes)
        .then (edited => { if (edited)
            return res.status(200).json({message: `Account successfully updated.`}) 
        })        
        .catch ( err => {
            console.log(err)
            res.status(500).json({error: "Unable to update account."})
        })
})

// Delete an account
router.delete('/:id', validateAccountID, (req, res) => {
    const id = req.params.id;
    db.remove(id)
        .then((count) => {
                res.status(200).json({message: `${count} account deleted successfully.`})
        })
        .catch (() => {
          res.status(500).json({error: "Can't delete that user. Hmm."})  
        })
})

router.get('/:limit/:sortBy/:sortDir', (req, res) => {
    const { limit, sortBy, sortDir} = req.params;
    console.log(sortBy)
    db.getByQuery(limit, sortBy, sortDir)
        .then((list) => {
            res.status(200).json(list)
        })
        .catch(() => {
            res.status(500).json({error: "Couldn't retrieve accounts with that query."})
        })
})

module.exports = router