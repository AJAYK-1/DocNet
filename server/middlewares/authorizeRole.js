const authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.json({ msg: "Access denied", status: 403 })
        }
        next()
    }
}

module.exports = authorizeRole