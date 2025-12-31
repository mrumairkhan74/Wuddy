import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const apiUrl = import.meta.env.VITE_BACKEND_API
const VerifyEmail = () => {
    const [code, setCode] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { userId } = useParams();

    console.log(userId)
    const handleVerify = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus("");

        try {
            await axios.put(
                `${apiUrl}/user/${userId}/verify-email`,
                { code },
                { withCredentials: true } // send cookies if using session
            );
            setStatus("Email verified successfully!");
            setTimeout(() => navigate("/"), 2000); // redirect after success
        } catch (error) {
            setStatus(error.response?.data?.message || "Invalid code");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h2 className="text-2xl font-medium mb-4">Verify Your Email</h2>
            <form onSubmit={handleVerify} className="flex flex-col gap-3">
                <input
                    type="text"
                    placeholder="Enter verification code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="p-3 border border-gray-300 rounded-md"
                    required
                />
                <button
                    type="submit"
                    className="bg-[#206059] text-white p-3 rounded-md hover:bg-[#206059]/90"
                    disabled={loading}
                >
                    {loading ? "Verifying..." : "Verify"}
                </button>
            </form>
            {status && <p className="mt-4 text-center text-red-500">{status}</p>}
        </div>
    );
};

export default VerifyEmail;
