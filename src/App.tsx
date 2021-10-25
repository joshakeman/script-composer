import React from 'react';
import logo from './logo.svg';
import './App.css';
import TextBox from './components/TextBox'
import ScriptContainer from './components/ScriptContainer';
import Container from './components/ScriptContainer'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  return (
    <div className="App">
        <DndProvider backend={HTML5Backend}>
          <Container />
        </DndProvider>
    </div>
  );
}

export default App;
