// App.js
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Pharmacy from "./pages/Pharmacy";
import Drug from "./pages/Drug";
import Store from "./pages/Store";
import Home from './pages/Home';
import DrugSearch from './pages/Drugsearch';
import Stock from './pages/Stock';
import StoreStock from './pages/Store_Stock';
import Hospital from './pages/Hospital';
import ScrollToTop from './components/scrolltop/ScrollTop';
import GNB from './components/navbar/Gnb';

import ChatbotIcon from "./components/chatbot/ChatbotIcon";

function App() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NCP_CLIENT_ID}`;
    script.async = true;
    document.head.appendChild(script);
  }, []);
  return (
    <BrowserRouter>
    <GNB />
    <ChatbotIcon/>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/drug' element={<Drug />} />
        <Route path='/pharmacy' element={<Pharmacy />} />
        <Route path='/store' element={<Store />} />
        <Route path='/hospital' element={<Hospital />} />
        <Route path='/drug/search/:query' element={<DrugSearch />} />
        <Route path="/store/stock/:id" element={<Stock />} />
        <Route path='/Store_Stock' element={<StoreStock />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
