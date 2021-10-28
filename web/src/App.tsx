import React from 'react';
import logo from './logo.svg';
import './App.css';
import ScriptContainer from './components/ScriptContainer'
import Configuration from './components/Configuration'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  return (
    <div className="App">
        <Configuration />
        <DndProvider backend={HTML5Backend}>
          <ScriptContainer />
        </DndProvider>
    </div>
  );
}

export default App;
