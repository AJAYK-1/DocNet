const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueName + path.extname(file.originalname))
    }
})


const upload = multer({  storage })


module.exports = upload