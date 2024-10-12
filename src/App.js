import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PhotoGrid from './components/PhotoGrid';
import PhotoDetail from './components/PhotoDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PhotoGrid />} />
        <Route path="/photos/:id" element={<PhotoDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
