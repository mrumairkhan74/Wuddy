const multer = require('multer')

const storage = multer.memoryStorage()
const upload = multer({
    limits: { fileSize: 10 * 1024 * 1024 },
    storage: storage
})

module.exports = upload 