import React from 'react';
import API from './hooks/NaverAPI';
import GNB from './components/navbar/Gnb';

function App() {
  return (
    <>
    <GNB/>
    <API/>
    </>
  );
}

export default App;