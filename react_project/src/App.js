import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from './components/About';
import Contact from './components/Contact';
import FavCards from './components/FavCards';
import Home from './components/Home';
import MyCards from './components/MyCards';
import NavbarMaterialUI from './components/NavbarMaterialUI';
import Login from './components/Login';
import Registration from './components/Registration';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <NavbarMaterialUI />
        <nav className="horizontal-nav">
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/favCards" element={<FavCards />} />
          <Route path="/myCards" element={<MyCards />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
