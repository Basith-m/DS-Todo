const jwt = require('jsonwebtoken')

const jwtMiddleware = (req, res, next) => {
    const token = req.headers['authorization'].split(" ")[1]
    // console.log("token");
    try{
        const jwtResponse = jwt.verify(token,process.env.JWT_KEY)
        req.payload = jwtResponse.userId
        next()
    }
    catch(err){
        res.status(401).json("Authorizatio failed !!! Please login...")
    }
}

module.exports = jwtMiddleware