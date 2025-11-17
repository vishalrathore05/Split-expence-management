import { useState, useEffect } from "react";

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(saved);
  }, []);

  return (
    <div>
      <h3>Expense List</h3>

      {expenses.length === 0 && <p>No expenses added yet.</p>}

      <ul className="list-group">
        {expenses.map((e, i) => (
          <li key={i} className="list-group-item">
            <strong>Note:</strong> {e.note || "No note"}<br />
            <strong>Amount:</strong> ₹{e.amount}<br />
            <strong>Category:</strong> {e.category}<br />
            <strong>Group:</strong> {e.group || "Personal"}<br />
            <strong>Split:</strong>
            <ul>
              {e.split && Object.entries(e.split).map(([user, amt]) => (
                <li key={user}>{user} → ₹{amt}</li>
              ))}
            </ul>
            <strong>Date:</strong> {new Date(e.date).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;
