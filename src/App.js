import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Slider';

function App() {
  return (
    <div className="App">
      <Sidebar />
      {/* <h1>Welcome to the Video Editor App</h1> */}
      <Outlet /> {/* This renders the matched child route component */}
    </div>
  );
}

export default App;
