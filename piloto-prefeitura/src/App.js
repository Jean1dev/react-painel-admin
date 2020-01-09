import React from 'react';
import './App.css';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import Routes from './routes'
import { store, persistor } from './redux'

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Routes></Routes>
        </PersistGate>
    </Provider>
  );
}

export default App;
