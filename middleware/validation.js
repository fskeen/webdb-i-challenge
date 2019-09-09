const db = require('../accounts/accountsDb')

module.exports = {
    validateAccountID,
    validateAccountBody
}

function validateAccountID(req, res, next) {
    const id = req.params.id
    console.log(id)
    db.getById(id)
    .then((account) => {
            req.validAccount = account
            next()
    })
    .catch(() => {
        res.status(404).json({
            error: "Couldn't find that post in the system."
        })
    })
}
// async function validateAccountID(req, res, next) {
//     const id = req.params.id
//     console.log(id)
//     try {
//         const validAccount = db.getById(id)
//         req.account = validAccount;
//         next();
//     } catch (err) {
//         res.status(404).json({error: "No account found with that ID number."})
//     }
// }

function validateAccountBody (req, res, next) {
    if (!req.body) {
        res.status(400).json({message: "Missing required information. Please check all fields before submitting."})
    } else if (!req.body.name) {
        res.status(400).json({message: "Account name is required. Please make sure it is filled out before submitting."})
    } else if (!req.body.budget) {
        res.status(400).json({message: "Account budget is required. Please make sure it is filled out before submitting."})
    } else {
        next()
    }
}