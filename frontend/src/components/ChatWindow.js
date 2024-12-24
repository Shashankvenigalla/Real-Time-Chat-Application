import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function ChatWindow({ username }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    socket.on('message', (message) => setMessages((prev) => [...prev, message]));
  }, []);

  const sendMessage = () => {
    const message = { username, text };
    socket.emit('message', message);
    setMessages((prev) => [...prev, message]);
    setText('');
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.username}: </strong>{msg.text}
          </div>
        ))}
      </div>
      <input onChange={(e) => setText(e.target.value)} value={text} placeholder="Type a message" />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default ChatWindow;
