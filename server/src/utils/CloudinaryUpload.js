const cloudinary = require('../config/cloudinary');
const { Readable } = require('stream')


// profile images
const uploadProfileImgToCloudinary = (fileBuffer, folder = 'wuddy/ProfileImages') => {
    return new Promise((resolve, reject) => {
        const bufferStream = new Readable();
        bufferStream.push(fileBuffer);
        bufferStream.push(null);

        const stream = cloudinary.uploader.upload_stream(
            {
                folder, resource_type: 'image', quality: "auto:best",   // ensures best possible quality
                fetch_format: "auto"
            },
            (error, result) => {
                if (error) return reject(error)
                resolve(result);
            }
        );
        bufferStream.pipe(stream);
    })
}
const uploadGroupImgToCloudinary = (fileBuffer, folder = 'wuddy/Chat/GroupProfile') => {
    return new Promise((resolve, reject) => {
        const bufferStream = new Readable();
        bufferStream.push(fileBuffer);
        bufferStream.push(null);

        const stream = cloudinary.uploader.upload_stream(
            {
                folder, resource_type: 'image', quality: "auto:best",   // ensures best possible quality
                fetch_format: "auto"
            },
            (error, result) => {
                if (error) return reject(error)
                resolve(result);
            }
        );
        bufferStream.pipe(stream);
    })
}

// cover images of profile
const uploadCoverImgToCloudinary = (fileBuffer, folder = 'wuddy/CoversImages') => {
    return new Promise((resolve, reject) => {
        const bufferStream = new Readable();
        bufferStream.push(fileBuffer);
        bufferStream.push(null);

        const stream = cloudinary.uploader.upload_stream(
            {
                folder, resource_type: 'image', quality: "auto:best",   // ensures best possible quality
                fetch_format: "auto"
            },
            (error, result) => {
                if (error) return reject(error)
                resolve(result);
            }
        );
        bufferStream.pipe(stream);
    })
};

// postImages
const uploadPostsImagesToCloudinary = (fileBuffer, folder = 'wuddy/posts/images') => {
    return new Promise((resolve, reject) => {
        const bufferStream = new Readable();
        bufferStream.push(fileBuffer);
        bufferStream.push(null);

        const stream = cloudinary.uploader.upload_stream(
            {
                folder, resource_type: 'image', quality: "auto:best",   // ensures best possible quality
                fetch_format: "auto"
            },
            (error, result) => {
                if (error) return reject(error)
                resolve(result);
            }
        );
        bufferStream.pipe(stream);
    })
};
// post videos
const uploadPostVideosToCloudinary = (fileBuffer, folder = 'wuddy/post/videos') => {
    return new Promise((resolve, reject) => {
        const bufferStream = new Readable();
        bufferStream.push(fileBuffer);
        bufferStream.push(null);

        const stream = cloudinary.uploader.upload_stream(
            { folder, resource_type: 'video' },
            (error, result) => {
                if (error) return reject(error)
                resolve(result);
            }
        );
        bufferStream.pipe(stream);
    })
};


module.exports = {
    uploadCoverImgToCloudinary,
    uploadProfileImgToCloudinary,
    uploadPostsImagesToCloudinary,
    uploadPostVideosToCloudinary,
    uploadGroupImgToCloudinary
}