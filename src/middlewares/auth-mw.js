const jwt = require("jsonwebtoken")
const validator = require("../validators/validator")

const authorization = async function (req, res, next) {
    try {
        let token = req.headers["authorization"]
        token = token && token.split(" ")[1] 
        if (!token) return res.send({ status: false, message: "authentication token must be present in headers" });

        const userId = req.params.userId
        if (Object.keys(userId) == 0) return res.status(400).send({ status: false, message: "Please enter userId in path param....." })
        if(!validator.isValidID(userId)) return res.status(400).send({ status: false, message: "Please enter valid userId"})
            
        let decodedtoken = jwt.verify(token, "Project-5/shopping-cart", { ignoreExpiration: true })
        if (!decodedtoken) return res.status(401).send({ status: false, msg: "token is invalid" })
            
        let time = Math.floor(Date.now() / 1000)
        if (decodedtoken.exp < time) {
            return res.status(401).send({ status: false, message: "token expired, please login again" });
        }

        //  CHECK : authorization
        if (decodedtoken.userId != userId) return res.status(403).send({ status: false, message: "You haven't right to perform this task" })

        next();
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports.authorization = authorization