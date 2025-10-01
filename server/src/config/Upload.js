const multer = require('multer')

const storage = multer.memoryStorage()
const upload = multer({
    limits: { fileSize: 10 * 1024 * 1024 },
    storage: storage
})

const uploadUserImages = upload.fields([
    { name: 'profileImg', maxCount: 1 },
    { name: 'coverImg', maxCount: 1 },
])
const uploadPostMedia = upload.fields([
    { name: 'postImg', maxCount: 1 },
    { name: 'postVideo', maxCount: 1 },
])
module.exports = {uploadUserImages,uploadPostMedia} 