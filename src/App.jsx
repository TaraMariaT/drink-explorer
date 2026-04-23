import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Saved from "./pages/Saved";

function App() {
  return (
    <div className="app">
      <header className="header">
        <h2>🍸 Drink Explorer</h2>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/saved">Saved</Link>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/saved" element={<Saved />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;