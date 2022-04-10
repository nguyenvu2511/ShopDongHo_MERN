import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { DataProvider } from './GlobalState';

import MainPage from './components/mainpages/Pages';
import Header1 from './components/headers/Header1';
import Footer from './components/footer/Footer';
function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header1 />
          <MainPage />
          <Footer />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
