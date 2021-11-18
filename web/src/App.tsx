import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import ScriptContainer from './components/ScriptContainer'
import Configuration from './components/Configuration'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Configuration />} />
          <Route path="/builder" element={
            <DndProvider backend={HTML5Backend}>
              <ScriptContainer />
            </DndProvider>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
