const { createClient } = require('redis')

const client = createClient({
    url: process.env.REDIS_URL
});

client.on("error", (err) => {
    console.error('❌Redis Client Error', err);
});
client.on("connect", () => {
    console.log('✅Redis Client Connect');
});

client.on("ready", () => {
    console.log('✅ Redis Client Ready');
});
(async () => {
    try {
        if (!client.isOpen) {
            await client.connect();
            console.log("Redis connection Established")
        }
    } catch (err) {
        console.error("Redis connection failed:", err);
    }
})();

process.on("SIGINT", async () => {
    await client.quit();
    console.log("Redis connection closed");
    process.exit(0)
    
})
process.on("SIGTERM", async () => {
    await client.quit();
    console.log("Redis connection closed");
    process.exit(0)
    
})



module.exports = client