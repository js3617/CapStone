import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Pharmacy from "./pages/Pharmacy";
import Drug from "./pages/Drug";
import Store from "./pages/Store";
import Home from './pages/Home';
import DrugSearch from './pages/Drugsearch';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Stock from './pages/Stock';
import ScrollToTop from './components/scrolltop/ScrollTop';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ScrollToTop/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/drug' element={<Drug/>} />
      <Route path='/pharmacy' element={<Pharmacy/>} />
      <Route path='/store' element={<Store/>} />
      <Route path='/drug/search/:query' element={<DrugSearch />} />
      <Route path="/store/stock/:id" element={<Stock/>} />
    </Routes>
    <App />
  </BrowserRouter>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
