// its(useState) gives us to change and store the data instide the component 
// So useState is React’s way of saying:
// “Keep this value safe. If it changes, update the screen.
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AddExpense from "./components/AddExpense";
import ExpenseList from "./components/ExpenseList";
import Groups from "./components/Groups";
import MonthlySummary from "./components/MonthlySummary";

function App() {
  const [page, setPage] = useState("home");
  //page = store the current page 
  //setPage = function usedtochange the page
  //if page home the show home page

  return (
    <div>
      <Navbar setPage={setPage} />

      <div className="container mt-4">
        {page === "home" && <Home />}
        {page === "add-expense" && <AddExpense />}
        {page === "expense-list" && <ExpenseList />}
        {page === "groups" && <Groups />}
        {page === "monthly-summary" && <MonthlySummary />}
      </div>
    </div>
  );
}
export default App;
