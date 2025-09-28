import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updatedUser } from "../features/authSlice";

const Setting = () => {
    const { user, loading, error } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [form, setForm] = useState({ firstName: "", lastName: "", username: "" });
    const [email, setEmail] = useState("");
    const [passwords, setPasswords] = useState({ current: "", newPass: "", confirm: "" });

    const [activeTab, setActiveTab] = useState("name");

    // Email verification modal state
    const [showModal, setShowModal] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");
    const [verifyStatus, setVerifyStatus] = useState("");

    // Handle name/username update
    const handleNameUpdate = (e) => {
        e.preventDefault();
        dispatch(updatedUser({ userId: user._id, updateData: { firstName: form.firstName, lastName: form.lastName } }));

    };

    const handleUsernameUpdate = (e) => {
        e.preventDefault();
        dispatch(updatedUser({ userId: user._id, updateData: { username: form.username } }));
    };

    // Handle email update
    const handleEmailUpdate = (e) => {
        e.preventDefault();
        dispatch(updatedUser({ userId: user._id, updateData: { email } }));
        setShowModal(true); // Show verification modal
    };

    // Handle password reset
    const handlePasswordReset = (e) => {
        e.preventDefault();
        if (passwords.newPass !== passwords.confirm) {
            alert("Passwords do not match!");
            return;
        }
        dispatch(updatedUser({ userId: user._id, updateData: { password: passwords.newPass, currentPassword: passwords.current } }));
    };

    // Verify email code
    const handleVerifyEmail = async () => {
        try {
            await axios.put(
                `http://localhost:5000/api/user/${user._id}/verify-email`,
                { code: verificationCode },
                { withCredentials: true }
            );
            setVerifyStatus("Email verified successfully!");
            setShowModal(false);
            setEmail(""); // reset input
            dispatch(updatedUser({ userId: user._id, updateData: { isEmailVerified: true } }));
        } catch (err) {
            setVerifyStatus(err.response?.data?.message || "Invalid verification code");
        }
    };

    return (
        <div className="container mx-auto mt-6 grid grid-cols-3 gap-4 font-[Poppins]">
            {/* Sidebar */}
            <div className="col-span-1 border-2 w-full bg-[#206059]/10 h-[500px] rounded-md p-5 tracking-wide">
                {["name", "email", "password"].map((tab) => (
                    <div
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`text-xl border-b-2 border-gray-300 p-4 cursor-pointer transition 
              ${activeTab === tab ? "text-[#206059]/90 font-semibold bg-white rounded-md" : "hover:text-[#206059]/90"}`}
                    >
                        {tab === "name" && "Update Name"}
                        {tab === "email" && "Email Update"}
                        {tab === "password" && "Password Reset"}
                    </div>
                ))}
            </div>

            {/* Loading & Error */}
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {/* Main Content */}
            <div className="col-span-2 border-2 w-full bg-[#206059]/20 rounded-md p-5 tracking-wide">
                {/* Name & Username */}
                {activeTab === "name" && (
                    <>
                        <h6 className="text-2xl font-bold mb-6">Update Name & Username</h6>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-5 rounded-md border w-full max-w-sm">
                                <form onSubmit={handleNameUpdate}>
                                    <div className="flex flex-col gap-3">
                                        <label className="text-[16px] font-medium">First Name</label>
                                        <input
                                            type="text"
                                            value={form.firstName}
                                            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                                            placeholder={user.firstName || "First Name"}
                                            className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#206059]"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-3 mt-4">
                                        <label className="text-[16px] font-medium">Last Name</label>
                                        <input
                                            type="text"
                                            value={form.lastName}
                                            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                                            placeholder={user.lastName || "Last Name"}
                                            className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#206059]"
                                        />
                                    </div>
                                    <button className="bg-[#206059] mt-4 w-full rounded-md p-2 text-white hover:bg-[#184a44] transition">
                                        Update
                                    </button>
                                </form>
                            </div>

                            <div className="p-5 rounded-md border w-full max-w-sm">
                                <form onSubmit={handleUsernameUpdate}>
                                    <div className="flex flex-col gap-3">
                                        <label className="text-[16px] font-medium">Username</label>
                                        <input
                                            type="text"
                                            value={form.username}
                                            onChange={(e) => setForm({ ...form, username: e.target.value })}
                                            placeholder={user.username || "Username"}
                                            className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#206059]"
                                        />
                                    </div>
                                    <button className="bg-[#206059] mt-4 w-full rounded-md p-2 text-white hover:bg-[#184a44] transition">
                                        Update Username
                                    </button>
                                </form>
                            </div>
                        </div>
                    </>
                )}

                {/* Email */}
                {activeTab === "email" && (
                    <>
                        <h6 className="text-2xl font-bold mb-6">Update Email</h6>
                        <div className="p-5 rounded-md border w-full max-w-sm">
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div className="flex flex-col gap-3">
                                    <label className="text-[16px] font-medium">New Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder={`${user.isEmailVerified ? "✅" : "❌"} ${user.email}`}
                                        className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#206059]"
                                    />
                                </div>
                                <button
                                    type="button" // NOT submit
                                    onClick={() => {
                                        if (!email) return alert("Enter email first");
                                        handleEmailUpdate()
                                        setShowModal(true); // show verification input
                                    }}
                                    className="bg-[#206059] mt-4 w-full rounded-md p-2 text-white hover:bg-[#184a44] transition"
                                >
                                    Send Code
                                </button>
                            </form>


                            {/* Verification section inside the email container */}
                            {showModal && (
                                <div className="mt-4 border-t pt-4">
                                    <label className="text-[16px] font-medium">Enter Verification Code</label>
                                    <input
                                        type="text"
                                        maxLength={6}
                                        value={verificationCode}
                                        onChange={(e) => setVerificationCode(e.target.value)}
                                        placeholder="6-digit code"
                                        className="border rounded-md p-2 w-full mt-2 focus:outline-none focus:ring-2 focus:ring-[#206059]"
                                    />
                                    {verifyStatus && <p className="text-red-500 mt-2">{verifyStatus}</p>}
                                    <div className="flex justify-end gap-2 mt-2">
                                        <button
                                            className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
                                            onClick={() => { setShowModal(false); setVerificationCode(""); setVerifyStatus(""); }}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className="bg-[#206059] text-white px-4 py-2 rounded-md hover:bg-[#184a44]"
                                            onClick={handleVerifyEmail}
                                        >
                                            Verify & Update Email
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}


                {/* Password */}
                {activeTab === "password" && (
                    <>
                        <h6 className="text-2xl font-bold mb-6">Reset Password</h6>
                        <div className="p-5 rounded-md border w-full max-w-sm">
                            <form onSubmit={handlePasswordReset}>
                                <div className="flex flex-col gap-3">
                                    <label className="text-[16px] font-medium">Current Password</label>
                                    <input
                                        type="password"
                                        value={passwords.current}
                                        onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                                        placeholder="Enter current password"
                                        className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#206059]"
                                    />
                                </div>
                                <div className="flex flex-col gap-3 mt-4">
                                    <label className="text-[16px] font-medium">New Password</label>
                                    <input
                                        type="password"
                                        value={passwords.newPass}
                                        onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
                                        placeholder="Enter new password"
                                        className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#206059]"
                                    />
                                </div>
                                <div className="flex flex-col gap-3 mt-4">
                                    <label className="text-[16px] font-medium">Confirm Password</label>
                                    <input
                                        type="password"
                                        value={passwords.confirm}
                                        onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                                        placeholder="Confirm new password"
                                        className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#206059]"
                                    />
                                </div>
                                <button className="bg-[#206059] mt-4 w-full rounded-md p-2 text-white hover:bg-[#184a44] transition">
                                    Reset Password
                                </button>
                            </form>
                        </div>
                    </>
                )}
            </div>


        </div>
    );
};

export default Setting;
