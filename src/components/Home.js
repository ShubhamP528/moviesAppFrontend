import React from "react";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 min-h-screen text-white py-16">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-5xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to Synchronous Video Watching
        </motion.div>
        <motion.div
          className="text-lg mb-12 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Watch movies and TV shows together with friends, synchronized in
          real-time
        </motion.div>
        <motion.button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 mb-8 block mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Get Started
        </motion.button>
        <motion.div
          className="text-xl mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Featured Movies
        </motion.div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          {[...Array(6)].map((_, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 rounded-lg shadow-xl overflow-hidden"
              style={{
                paddingBottom: "56.25%", // Aspect ratio 16:9
                backgroundImage: `url('https://source.unsplash.com/random/${Math.floor(
                  Math.random() * 800
                )}x${Math.floor(Math.random() * 600)}?movie')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 1.2, duration: 0.8 }}
            ></motion.div>
          ))}
        </motion.div>
        <motion.div
          className="mt-16 text-sm opacity-50 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          Scroll down to discover more
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
