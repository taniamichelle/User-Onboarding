import React from 'react';
import './App.css';
import CopyUserForm from './components/Form';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My Formik Form:</h1>
        <CopyUserForm />
      </header>
    </div>
  );
}

export default App;
