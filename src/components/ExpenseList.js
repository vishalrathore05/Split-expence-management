import { useState, useEffect } from "react";

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const selfId = "self"; // replace with your own user ID

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(saved);
  }, []);

  return (
    <div>
      <h3 className="mb-4 text-center">Expense List</h3>

      {expenses.length === 0 && <p className="text-center">No expenses added yet.</p>}

      <div className="row">
        {expenses.map((e, i) => (
          <div key={i} className="col-md-6 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{e.note || "No note"}</h5>
                <p className="mb-1"><strong>Category:</strong> {e.category}</p>
                <p className="mb-1"><strong>Group:</strong> {e.group || "Personal"}</p>

                {e.split && (
                  <div className="mb-2">
                    <strong>Split:</strong>
                    <div className="d-flex flex-wrap">
                      {Object.entries(e.split)
                        .filter(([user]) => user !== selfId) // remove yourself
                        .map(([user, amt]) => (
                          <div key={user} className="me-3 mb-1 p-2 border rounded bg-light">
                            {user}: ₹{amt}
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                <p className="text-muted"><small>{new Date(e.date).toLocaleString()}</small></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpenseList;
