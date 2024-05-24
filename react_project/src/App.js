import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import About from './components/About';
import Contact from './components/Contact';
import FavCards from './components/FavCards';
import Home from './components/Home';
import MyCards from './components/MyCards';

function App() {
  return (
    <div className="App">
      <header className="App-header">


        <BrowserRouter>
          <nav className="horizontal-nav">
            <ul>
              {/* все  линки должны быть так же указаны path соответсвующий ссылке на компонент */}
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/favCards">Fav Cards</Link></li>
              <li><Link to="/myCards">My Cards</Link></li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/favCards" element={<FavCards />} />
            <Route path="/myCards" element={<MyCards />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
