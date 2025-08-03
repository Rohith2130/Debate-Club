

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Agents from './components/Agengts';  // Fixed typo
import Chat from './components/Chat';
import ChatApp from './components/ChatApp';
import Login from './components/Login';
import Starting from './components/Starting';
import Summary from './components/Summary'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Starting />} />
        <Route path="/login" element={<Login />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/chat-app" element={<ChatApp />} />
        <Route path="/summary" element={<Summary />}/>
      </Routes>
    </Router>
  );
}

export default App;

