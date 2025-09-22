function generateUsername(prefix = 'wuddy') {
    const chars = "abcdefghijklmnopqrstuvwxyz1234567890";
    let randomStr = "";
    for (let i = 0; i < 8; i++) {
        randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `${prefix}_${randomStr}`
}

module.exports = generateUsername