import React, { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPaperPlane, FaMicrophone } from "react-icons/fa";

function Chat() {
  const location = useLocation();
  const selectedCharacter = location.state?.character?.name || "Newton";
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [difficulty, setDifficulty] = useState("Medium");
  const [tone, setTone] = useState("Formal");

  const messageEndRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true; // Show live text updates
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript); // Update input field with real-time speech
      };

      recognitionRef.current.onend = () => {
        setListening(false);
        sendMessage(input);
      };
    }
  }, [input]);

  const speakText = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;
    synth.speak(utterance);
  };

  const sendMessage = useCallback(async (msg = input) => {
    if (!msg.trim()) return;

    const userMessage = { text: msg, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/chat", {
        message: msg,
        character: selectedCharacter,
        difficulty,
        tone,
      });

      const aiMessage = { text: response.data.reply || "I didn't understand that.", sender: "ai" };
      setMessages((prev) => [...prev, aiMessage]);

      speakText(aiMessage.text);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setMessages((prev) => [...prev, { text: "Error: Unable to fetch response.", sender: "ai" }]);
    } finally {
      setLoading(false);
    }
  }, [input, selectedCharacter, difficulty, tone]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  const startListening = () => {
    if (recognitionRef.current) {
      setListening(true);
      recognitionRef.current.start();
    }
  };

  const calculateScore = () => {
    let aiMessages = messages.filter(m => m.sender === "ai");
    let totalWords = aiMessages.reduce((acc, msg) => acc + msg.text.split(" ").length, 0);
    let score = Math.min(10, Math.max(1, Math.floor(totalWords / 10)));
    return score;
  };

  const endChat = () => {
    const score = calculateScore();
    navigate('/summary', { state: { messages, character: selectedCharacter, score } });
  };

  return (
    <div className="flex flex-col h-screen p-6 bg-gray-900 text-white">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold mb-4 text-center">{selectedCharacter} Chat</h2>
        <button 
          className="bg-red-600 min-w-10 p-3 rounded text-white" 
          onClick={endChat}
        >
          END
        </button>
      </div>

      {/* Tone Selection Dropdown */}
      <div className="mb-3 flex items-center space-x-4">
        <label className="mr-2">Tone:</label>
        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="p-2 bg-gray-700 text-white rounded"
        >
          <option value="Formal">Formal</option>
          <option value="Sarcastic">Sarcastic</option>
          <option value="Friendly">Friendly</option>
          <option value="Philosophical">Philosophical</option>
          <option value="Angry">Angry</option>
        </select>
      </div>

      {/* Response Length Selection */}
      <div className="mb-3 flex items-center space-x-4">
        <label className="mr-2">Response Length:</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="p-2 bg-gray-700 text-white rounded"
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <div className="flex-grow overflow-y-auto p-4 bg-gray-800 rounded-xl shadow-lg">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            className={`mb-2 p-3 rounded-lg w-fit max-w-xs ${msg.sender === "user" ? "bg-blue-500 ml-auto" : "bg-gray-600"}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <strong>{msg.sender === "user" ? "You" : selectedCharacter}:</strong> {msg.text}
          </motion.div>
        ))}

        {loading && (
          <motion.div
            className="mb-2 p-3 rounded-lg w-fit max-w-xs bg-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            <strong>{selectedCharacter}:</strong> <span className="italic">Typing...</span>
          </motion.div>
        )}

        <div ref={messageEndRef} />
      </div>

      <div className="flex items-center mt-4 space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          className="flex-grow p-3 rounded-xl bg-gray-700 text-white border-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <motion.button
          onClick={() => sendMessage()}
          className="p-3 bg-blue-500 hover:bg-blue-600 rounded-full shadow-lg"
          whileHover={{ scale: 1.1 }}
          disabled={loading || !input.trim()}
        >
          <FaPaperPlane size={20} />
        </motion.button>

        <motion.button
          onClick={startListening}
          className={`p-3 ${listening ? "bg-red-500" : "bg-green-500"} hover:bg-green-600 rounded-full shadow-lg`}
          whileHover={{ scale: 1.1 }}
        >
          <FaMicrophone size={20} />
        </motion.button>
      </div>
    </div>
  );
}

export default Chat;

