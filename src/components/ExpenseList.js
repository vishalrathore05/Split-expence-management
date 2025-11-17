import { useState, useEffect } from "react";

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("expenses");
    if (saved) setExpenses(JSON.parse(saved));
  }, []);

  return (
    <div className="card-section">
      <h3 className="text-center mb-3">Expense List</h3>
      {expenses.length === 0 ? (
        <p className="text-center">No expenses added yet.</p>
      ) : (
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Note</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Group</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((e,i)=>(
              <tr key={i}>
                <td>{e.note || "No note"}</td>
                <td>₹{e.amount}</td>
                <td>{e.category}</td>
                <td>{e.group || "None"}</td>
                <td>{new Date(e.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ExpenseList;
