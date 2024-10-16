const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")
const {check} = require("express-validator")
const verifyToken = require("../verifyToken")

router.post("/users/register",
  [
    check("username","Username is required").not().isEmpty(),
    check("email","email is required").isEmail(),
    check("password","password must be minimum 8 characters").isLength({min:8}),
  ],authController.register)
router.post("/users/login",
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  authController.login)
router.get("/users/profile",verifyToken,authController.getProfile)
router.patch("/users/profile",verifyToken,authController.updateProfile)



module.exports = router;