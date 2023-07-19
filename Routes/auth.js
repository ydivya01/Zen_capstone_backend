const express = require("express") ;
const { adminRegister, login, stuRegister } =  require("../Controllers/auth.js");
const { authenticates } = require( "../Controllers/authenticate.js");


const router = express.Router();

router.post("/stuRegister", stuRegister)
router.post("/login", login)
router.post("/adminRegister", adminRegister)


module.exports = router