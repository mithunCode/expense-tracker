import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Auth } from "../src/pages/auth/index";
import Expense from "./pages/expense";
const App = () => {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" exact element={<Auth />} />
          <Route path="/expense" element={<Expense />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
