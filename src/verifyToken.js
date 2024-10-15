const jwt = require("jsonwebtoken")

const verifyToken = async(req,res,next)=>{
  const token = req.header("Authorization")
  if(!token) return res.status(400).json({msg:"Acess Denied"})
    try {
      const verify = jwt.verify(token,process.env.JWT)
      req.user = verify
      next()
    } catch (error) {
      res.status(500).json({error:error.message})
    }
}

module.exports = verifyToken;