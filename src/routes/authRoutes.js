const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")
const {check} = require("express-validator")

router.post("/users/register",
  [
    check("username","Username is required").not().isEmpty(),
    check("email","email is required").isEmail(),
    check("password","\password must be minimum 8 characters").isLength({min:8}),
  ],authController.register)
router.post("/users/login",
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  authController.login)



module.exports = router;