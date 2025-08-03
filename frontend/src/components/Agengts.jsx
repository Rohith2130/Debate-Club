
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import DebateClubLogo from '../assets/Clock.jpg';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Agents = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.showToast && location.state?.message) {
      toast.success(location.state.message);
    }
  }, [location.state]);

  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [difficulty, setDifficulty] = useState('Easy');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (name) => {
    setLoading(true);
    setError('');
    setSelectedCharacter(null);

    try {
      const response = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`
      );
      const data = await response.json();

      if (data.type === 'standard') {
        setSelectedCharacter({
          name: data.title,
          description: data.extract,
          image: data.thumbnail?.source || 'https://via.placeholder.com/150',
        });
      } else {
        setError('Character not found. Try another name.');
      }
    } catch (err) {
      setError('Error fetching character info.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCharacter = () => {
    if (selectedCharacter) {
      navigate('/chat', {
        state: { character: selectedCharacter, difficulty },
      });
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center bg-[#0A1931] min-h-screen p-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.img
        src={DebateClubLogo}
        alt="Debate Club"
        className="absolute top-4 left-4 w-20 h-20 cursor-pointer rounded-full transition-transform hover:scale-110"
        onClick={() => navigate('/')}
      />

      <motion.h1
        className="text-5xl md:text-6xl font-extrabold text-[#F4C430] mb-8 tracking-wide uppercase"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Choose Any Character
      </motion.h1>

      <motion.div
        className="bg-[#CD7F32] p-6 rounded-3xl shadow-2xl w-full max-w-3xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <input
          type="text"
          placeholder="Enter character name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch(e.target.value);
          }}
          className="mb-4 w-full p-3 rounded-xl border-2 border-[#F4C430] text-black placeholder-gray-500 shadow-md"
        />

        {loading && <p className="text-white text-center">Loading...</p>}

        {selectedCharacter && (
          <div className="flex flex-col items-center text-center space-y-4">
            <img
              src={selectedCharacter.image}
              alt={selectedCharacter.name}
              className="w-24 h-24 rounded-xl shadow-lg border-2 border-[#F4C430]"
            />
            <p className="text-white text-lg font-semibold">{selectedCharacter.name}</p>
            <p className="text-white">{selectedCharacter.description}</p>
          </div>
        )}

        {error && <p className="text-white text-center mt-4">{error}</p>}
      </motion.div>

     
      <motion.div className="mt-6 flex space-x-4">
        {['Easy', 'Medium', 'Hard'].map((level) => (
          <motion.button
            key={level}
            onClick={() => setDifficulty(level)}
            className={`px-6 py-3 rounded-xl shadow-lg font-semibold transition-colors ${
              difficulty === level
                ? 'bg-[#F4C430] text-black'
                : 'bg-[#CD7F32] text-white'
            }`}
          >
            {level}
          </motion.button>
        ))}
      </motion.div>

      {selectedCharacter && (
        <motion.button
          className="bg-[#CD7F32] text-white px-6 py-3 mt-6 rounded-xl shadow-lg hover:bg-[#A55D20] transition-colors font-semibold"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleSelectCharacter}
        >
          Chat with {selectedCharacter.name}
        </motion.button>
      )}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </motion.div>
  );
};

export default Agents;
