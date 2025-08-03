

import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Newton from "../assets/Newton.jpg";

const Starting = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="bg-[#10284e] h-screen flex flex-col items-center overflow-hidden"
    >
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <nav className="flex justify-between bg-[#0A1931] text-[#F4C430] p-4">
          <h1 className="text-2xl font-bold">Debate Club</h1>
          <ul className="flex space-x-6">
            <li>
              <a
                href="#"
                className="p-2 hover:text-[#FFD700] transition-colors duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="p-2 hover:text-[#FFD700] transition-colors duration-300"
              >
                About
              </a>
            </li>
            <li>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate("/login")}
                className="bg-[#CD7F32] text-[#F5F5DC] hover:bg-[#ff9e3e] p-2 px-4 rounded transition-all"
              >
                Login
              </motion.button>
            </li>
          </ul>
        </nav>
      </motion.header>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-5xl text-[#F4C430] p-6 text-center font-bold"
      >
        TIME TRAVEL DEBATE CLUB
      </motion.h1>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center justify-center w-full p-6">
        {/* Text container */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-lg text-[#F4C430] m-4 text-center md:text-left"
        >
          <p className="text-lg">
            Have you ever imagined debating with Socrates, Einstein, or even a
            leader from the distant future? What if you could challenge Julius
            Caesar on military strategy or discuss artificial intelligence
            ethics with a futuristic philosopher? With the Time-Travel Debate
            Club, history and imagination come to life! This platform allows you
            to engage in AI-powered debates with characters from any era—past,
            present, or future. Whether you want to question the philosophies of
            great thinkers, debate scientific advancements with legendary
            innovators, or predict the future with AI-generated personas, this
            club gives you the power to do so. Simply select a character, and
            our AI-driven system will generate responses based on their
            historical beliefs, knowledge, and speech style. 
          </p>
          {/* Get Started Button */}
          <div className="mt-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/login")}
              className="bg-[#F4C430] text-[#10284e] hover:bg-[#FFD700] p-3 px-6 rounded-lg text-lg font-semibold transition-all"
            >
              Get Started
            </motion.button>
          </div>
        </motion.div>

        {/* Image */}
        <motion.img
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          src={Newton}
          alt="Newton"
          className="max-h-[200px] max-w-[200px] m-4 rounded-xl shadow-lg"
        />
      </div>
    </motion.div>
  );
};

export default Starting;



