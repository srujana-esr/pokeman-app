import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BattleView from "./pages/BattleView";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/battle" element={<BattleView />} /> 
    </Routes>
  </Router>
);

export default App;
