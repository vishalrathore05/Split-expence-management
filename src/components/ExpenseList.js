import { useState, useEffect } from "react";

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("expenses");
    if (saved) {
      setExpenses(JSON.parse(saved));
    }
  }, []);

  return (
    <div>
      <h3>Expense List</h3>

      {expenses.length === 0 && <p>No expenses added yet.</p>}

      <ul className="list-group">
        {expenses.map((e, i) => (
          <li key={i} className="list-group-item">
            <strong>Note: {e.note || "No note"}</strong>
            <br />
            Amount: ₹{e.amount}
            <br />
            Category: {e.category}
            <br />
            Group: {e.group || "None"}
            <br />
            Date: {new Date(e.date).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;
