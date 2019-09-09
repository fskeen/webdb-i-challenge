const express = require("express");
const router = express.Router();
const db = require('./accountsDb')

router.use(express.json())



module.exports = router