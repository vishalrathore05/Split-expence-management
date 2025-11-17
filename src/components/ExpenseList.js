import { useState, useEffect } from "react";

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const selfId = "You"; // Represents yourself in the split

  useEffect(() => {
    // Get saved expenses from localStorage
    const saved = JSON.parse(localStorage.getItem("expenses")) || [];

    // If no expenses exist (like on GitHub Pages first load), add demo data
    if (saved.length === 0) {
      const demoExpenses = [
        {
          note: "Dinner at Thai Place",
          amount: 40,
          category: "Food",
          group: "Friends",
          date: new Date().toISOString(),
          split: { user1: 10, user2: 10, user3: 10, [selfId]: 10 },
        },
        {
          note: "Movie Night",
          amount: 60,
          category: "Entertainment",
          group: "Office",
          date: new Date().toISOString(),
          split: { userA: 20, userB: 20, [selfId]: 20 },
        },
      ];
      localStorage.setItem("expenses", JSON.stringify(demoExpenses));
      setExpenses(demoExpenses);
    } else {
      setExpenses(saved);
    }
  }, []);

  return (
    <div>
      <h3>Expense List</h3>

      {expenses.length === 0 && <p>No expenses added yet.</p>}

      <ul className="list-group">
        {expenses.map((e, i) => (
          <li key={i} className="list-group-item">
            <strong>Note:</strong> {e.note || "No note"} <br />
            <strong>Category:</strong> {e.category} <br />
            <strong>Group:</strong> {e.group || "Personal"} <br />

            {e.split && (
              <div className="mb-2">
                <strong>Split:</strong>
                <div className="d-flex flex-wrap mt-1">
                  {Object.entries(e.split)
                    .filter(([user]) => user !== selfId) // remove yourself
                    .map(([user, amt]) => (
                      <div
                        key={user}
                        className="me-3 mb-1 p-2 border rounded bg-light"
                      >
                        {user}: ₹{amt}
                      </div>
                    ))}
                </div>
              </div>
            )}

            <strong>Date:</strong> {new Date(e.date).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;
