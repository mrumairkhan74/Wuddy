import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Typewriter } from 'react-simple-typewriter'
import logo from '/public/logo.png'
const Loading = ({ onFinish }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onFinish();
        }, 2000);
        return () => clearTimeout(timer);
    }, [onFinish])

    return (
        <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#206059]">
            {/* Logo with a fade-in scale animation */}
            <motion.img
                src={logo}
                alt="Wuddy Logo"
                className="w-28 h-25 mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
            />

            {/* App name with CreamCake font + typewriter effect */}
            <motion.h1
                className="text-white text-6xl"
                style={{ fontFamily: 'CreamCake, cursive' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8 }}
            >
                <Typewriter
                    words={['Wuddy']}
                    cursor
                    cursorStyle="|"
                    typeSpeed={150}
                    delaySpeed={1500}
                />
            </motion.h1>

            {/* Tagline under the name */}
            <motion.p
                className="text-white text-lg mt-4 tracking-wide font-[Poppins]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 1, y: -30 }}
                transition={{ duration: 0.8 }}
            >
                Where Social and Professional Life Meet
            </motion.p>
        </div>
    )
}

export default Loading
