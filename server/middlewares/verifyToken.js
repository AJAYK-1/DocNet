const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.json({ msg: "No token provided", status: 401 })
        }

        const token = authHeader.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        req.user = decoded
        next()

    } catch (err) {
        return res.json({ msg: "Invalid or expired token", status: 401 })
    }
}

module.exports = verifyToken