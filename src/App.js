import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cards from './components/Cards';
import Navbar from './components/Navbar';
import Single from './components/Single';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Cards />} />
          <Route path="/single/:id" element={<Single />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
