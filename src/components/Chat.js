import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import socket from "../connection"; // Import the central socket instance
import { useAuthcontext } from "../Contexts/AuthContext";
// import dummyProfilePic from "../assets/dummy-profile.png"; // Add a dummy profile picture

function Chat() {
  const { room } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const { TheatorUser } = useAuthcontext();

  useEffect(() => {
    // Listen for incoming messages
    socket.on("receiveMessage", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Cleanup on component unmount
    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        username: TheatorUser.username || "Anonymous",
        text: message,
        time: new Date().toLocaleTimeString(),
      };

      console.log(room, newMessage);

      // Emit the message to the server
      socket.emit("chatMessage", { room, message: newMessage });

      console.log(socket);

      // Clear the input field
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="chat-container flex flex-col h-full border-2 border-gray-200 rounded-md shadow-lg">
      <div className="chat-header bg-blue-500 text-white font-bold text-lg p-2 rounded-t-md">
        Live Chat
      </div>
      <div className="chat-messages flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className="chat-message flex items-start mb-4">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
              // Use a path to your dummy profile picture
              alt="profile"
              className="w-8 h-8 rounded-full mr-2"
            />
            <div>
              <div className="font-semibold">{msg.username}</div>
              <div className="text-sm">{msg.text}</div>
              <div className="text-xs text-gray-500">{msg.time}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input p-4 border-t-2 border-gray-200">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          className="mt-2 w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
