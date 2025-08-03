import React, { useState, useEffect, useCallback } from "react";

const ChatApp = () => {
  const [character, setCharacter] = useState("Albert Einstein");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [listening, setListening] = useState(false);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = null;

  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
  }

  // Function to send a message
  const sendMessage = useCallback(async (inputMessage = message) => {
    if (!inputMessage.trim()) return;

    const userMessage = { sender: "You", text: inputMessage };
    setChat((prevChat) => [...prevChat, userMessage]);

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ character, message: inputMessage }),
      });

      const data = await response.json();
      const botReply = { sender: character, text: data.reply || "No response received." };

      setChat((prevChat) => [...prevChat, botReply]);
      speak(botReply.text);

    } catch (error) {
      console.error("Error fetching response:", error);
      setChat((prevChat) => [...prevChat, { sender: character, text: "Error getting response." }]);
    }

    setMessage("");
  }, [character]);

  useEffect(() => {
    if (!recognition) return;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMessage(transcript);
      sendMessage(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setListening(false);
    };
  }, [sendMessage]);

  const startListening = () => {
    if (recognition) {
      setListening(true);
      recognition.start();
    } else {
      alert("Your browser does not support speech recognition.");
    }
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.voice = speechSynthesis.getVoices().find(voice => voice.name.includes("Google")) || speechSynthesis.getVoices()[0];
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="chat-container">
      <h2>Time-Travel Debate Club</h2>

      <select value={character} onChange={(e) => setCharacter(e.target.value)}>
        <option>Albert Einstein</option>
        <option>Adolf Hitler</option>
        <option>Abraham Lincoln</option>
        <option>Leonardo da Vinci</option>
        <option>Marie Curie</option>
      </select>

      <div className="chat-box">
        {chat.map((msg, index) => (
          <p key={index} className={msg.sender === "You" ? "user" : "bot"}>
            <strong>{msg.sender}:</strong> {msg.text}
          </p>
        ))}
      </div>

      <input 
        type="text" 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
        placeholder="Ask something..." 
      />
      <button onClick={() => sendMessage(message)}>Send</button>
      <button onClick={startListening} disabled={listening}>🎤 Speak</button>
    </div>
  );
};

export default ChatApp;