// src/App.tsx
import React from 'react';
import Notification from "./components/Notifications";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Notification System</h1>
      <Notification />
    </div>
  );
};

export default App;
