const redisKeys = {
    emailVerify: (userId) => `verify:email:${userId}`,
    phoneNoVerify: (userId) => `verify:phoneNo:${userId}`,
    passwordVerify: (userId) => `verify:password:${userId}`
}

module.exports = redisKeys