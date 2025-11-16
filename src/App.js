// App.js
// React Router lets us create multiple pages in a SPA
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AddExpense from "./components/AddExpense";
import ExpenseList from "./components/ExpenseList";
import Groups from "./components/Groups";
import MonthlySummary from "./components/MonthlySummary";

function App() {
  return (
    <Router>
      <Navbar />

      <div className="container mt-4">
        <Routes>
          {/* Each Route loads a component based on URL */}
          <Route path="/" element={<Home />} />
          <Route path="/add-expense" element={<AddExpense />} />
          <Route path="/expense-list" element={<ExpenseList />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/monthly-summary" element={<MonthlySummary />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
