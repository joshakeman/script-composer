import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './App.css';
import Appbar from './components/Appbar'
import ScriptContainer from './components/ScriptContainer'
import Configuration from './components/Configuration'
import ShowSelect from './components/ShowSelect'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Appbar />
      <div className="main">
          <Routes>
            <Route path="/" element={<ShowSelect />} />
            <Route path="/settings" element={<Configuration />} />
            <Route path="/builder" element={
              <DndProvider backend={HTML5Backend}>
                <ScriptContainer />
              </DndProvider>
            } />
          </Routes>
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
