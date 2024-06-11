import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from './components/About';
import FavCards from './components/FavCards';
import Home from './components/Home';
import MyCards from './components/MyCards';
import NavbarMaterialUI from './components/NavbarMaterialUI';
import Login from './components/Login';
import Registration from './components/Registration';
import Store from './Store'
import { Provider } from 'react-redux';
import CardView from './components/CardView';
import MyCardsNew from './components/MyCardsNew';
import MyCardsEdit from './components/MyCardsEdit';
import MyCardsDelete from './components/MyCardsDelete';
import { useState } from 'react';
import Footer from './components/Footer';


function App() {
  const [searchText, setSearchText] = useState('');

  return (
    <div className="App">
      <Provider store={Store}>
        <BrowserRouter>
          <NavbarMaterialUI onSearch={setSearchText} />
          <nav className="horizontal-nav">
          </nav>
          <Routes>
            <Route path="/" element={<Home searchText={searchText} />} />
            <Route path="/about" element={<About />} />
            <Route path="/favCards" element={<FavCards />} />
            <Route path="/myCards" element={<MyCards />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/cardview/:cardId" element={<CardView />} />
            <Route path="/mycardsnew" element={<MyCardsNew />} />
            <Route path="//mycardsedit/:cardId" element={<MyCardsEdit />} />
            <Route path="/mycardsdelete/:cardId" element={<MyCardsDelete />} />
          </Routes>
          <Footer />
        </BrowserRouter>

      </Provider>
    </div>
  );
}

export default App;
