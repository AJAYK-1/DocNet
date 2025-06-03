const User = require('../models/userModel')


const AdminviewUsers = async(req,res) => {
    try {
        const allUsers = await User.find({})
        console.log(allUsers)
        res.json(allUsers)
    } catch (err) {
        console.log(err)
    }
}


module.exports = {AdminviewUsers}