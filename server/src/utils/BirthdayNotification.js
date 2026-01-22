const cron = require('node-cron');
const UserModel = require('../models/UserModel')
const { notifyUser } = require('./NotificationService');
const NotificationModel = require('../models/NotificationModel')

const server = require('../../server');

const io = server.io("io");


cron.schedule("0 0 * * *", async () => {
    try {
        const today = new Date();
        const month = today.getMonth() + 1;
        const day = today.getDate();

        const users = await UserModel.find(
            { dateOfBirth: { $exists: true } },
            { firstName: 1, lastName: 1, dateOfBirth: 1, email: 1 }
        );


        for (let user of users) {
            const dob = user.dateOfBirth
            if (!dob) continue;

            const userMonth = dob.getMonth() + 1;
            const userDay = dob.getDate();

            if (userMonth === month && userDay === day) {
                // 1. Save in DB
                const notification = await NotificationModel.create({
                    userId: user._id,
                    message: `🎉 Wishing you a wonderful day, ${user.firstName} ${user.lastName}`,
                    type: "BirthdayNotification",
                    isRead: false
                });

                // 2. Send live notification (socket + email if needed)
                io.to(user._id.toString()).emit('new-notification', notification);

                await notifyUser(
                    user._id,
                    user.email, // optional, can pass null if you don’t want email
                    "🎉 Happy Birthday!",
                    message,
                    "Birthday"
                );
            }
        }

        console.log("✅ Birthday notifications saved and sent.");
    } catch (error) {
        console.error("❌ Error sending birthday notifications:", error);
    }
}, { timezone: 'Asia/Karachi' });