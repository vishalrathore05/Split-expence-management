// App.js
// React Router lets us create multiple pages in a SPA
//• Router wraps the whole app. Without it, routing doesn’t work.
// • Routes is a container that holds all your routes.
// • Route defines ONE page/URL.
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
          {/* When URL equals path, show this component.*/}
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
