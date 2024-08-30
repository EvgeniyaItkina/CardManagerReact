import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from './components/about/About';
import FavCards from './components/favoriteCards/FavCards';
import Home from './components/home/Home';
import MyCards from './components/myCards/MyCards';
import NavbarMaterialUI from './components/navBar/NavbarMaterialUI';
import Login from './components/login/Login';
import Registration from './components/registration/Registration';
import Store from './Store'
import { Provider } from 'react-redux';
import CardView from './components/one_card/CardView';
import MyCardsNew from './components/myCards/MyCardsNew';
import MyCardsEdit from './components/myCards/MyCardsEdit';
import MyCardsDelete from './components/myCards/MyCardsDelete';
import { useState } from 'react';
import Footer from './footer/Footer';
import ProfileChange from './components/ProfileChange';
import CRM from './components/admin_CRM/CRM';


function App() {
  const [searchText, setSearchText] = useState('');

  return (
    <div className="App">
      <Provider store={Store}>
        <BrowserRouter basename="/CardManagerReact">
          <NavbarMaterialUI onSearch={setSearchText} />
          <nav className="horizontal-nav">
          </nav>
          <Routes>
            <Route path="/" element={<Home searchText={searchText} />} />
            <Route path="/about" element={<About />} />
            <Route path="/favCards" element={<FavCards searchText={searchText} />} />
            <Route path="/myCards" element={<MyCards searchText={searchText} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/cardview/:cardId" element={<CardView />} />
            <Route path="/mycardsnew" element={<MyCardsNew />} />
            <Route path="//mycardsedit/:cardId" element={<MyCardsEdit />} />
            <Route path="/mycardsdelete/:cardId" element={<MyCardsDelete />} />
            <Route path="/profilechange" element={<ProfileChange />} />
            <Route path="/CRM" element={<CRM searchText={searchText} />} />
          </Routes>
          <Footer />
        </BrowserRouter>

      </Provider>
    </div>
  );
}

export default App;
