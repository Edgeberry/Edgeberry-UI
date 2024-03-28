import React from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <h1>Edge Gateway UI</h1>

        <Routes>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
