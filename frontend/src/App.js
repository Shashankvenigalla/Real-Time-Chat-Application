import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';

function App() {
  const [username, setUsername] = useState('');

  return (
    <div>
      {username ? (
        <ChatWindow username={username} />
      ) : (
        <div>
          <h1>Enter your username</h1>
          <input onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        </div>
      )}
    </div>
  );
}

export default App;
