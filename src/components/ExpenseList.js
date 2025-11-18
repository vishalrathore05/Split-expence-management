import { useState, useEffect } from "react";
// Assuming you have a way to get icons, here using a generic placeholder
// import { TagFill, PeopleFill, CalendarDate, WalletFill } from 'react-bootstrap-icons'; 

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const selfId = "You"; // Represents yourself in the split

  useEffect(() => {
    // Load saved expenses from localStorage
    const saved = JSON.parse(localStorage.getItem("expenses")) || [];

    // --- DEMO DATA FOR INITIAL LOAD ---
    if (saved.length === 0) {
      const demoExpenses = [
        {
          note: "Dinner at Thai Place",
          amount: 40.00,
          category: "Food",
          group: "Friends",
          date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
          split: { Alice: 10.00, Bob: 10.00, [selfId]: 20.00 }, // You paid more
        },
        {
          note: "Fuel for Road Trip",
          amount: 120.50,
          category: "Travel",
          group: "Road Trip Crew",
          date: new Date(Date.now() - 2 * 86400000).toISOString(), // 2 days ago
          split: { Mia: 30.13, Tom: 30.13, [selfId]: 60.24 }, // Uneven split/Paid by you
        },
        {
          note: "Netflix Subscription",
          amount: 15.99,
          category: "Bills",
          group: null, // Personal expense
          date: new Date().toISOString(),
          split: { [selfId]: 15.99 },
        },
      ];
      localStorage.setItem("expenses", JSON.stringify(demoExpenses));
      setExpenses(demoExpenses);
    } else {
      setExpenses(saved);
    }
  }, []);

  const formatCurrency = (amount) => {
    return `₹${parseFloat(amount).toFixed(2)}`;
  };

  const getSelfShare = (expense) => {
    return expense.split[selfId] || 0;
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 fw-bolder text-primary">💰 Expense History</h2>
      <p className="text-muted mb-4">A complete record of all your spending and splits.</p>

      {/* --- Empty State --- */}
      {expenses.length === 0 && (
        <div className="alert alert-info text-center mt-5" role="alert">
          <h4 className="alert-heading">No Expenses Yet!</h4>
          <p>Start by adding an expense to see your spending history here.</p>
        </div>
      )}

      {/* --- Expense Grid/List --- */}
      {/* Use a list layout that is better for detail-rich items */}
      <div className="d-flex flex-column gap-3"> 
        {expenses
          .slice() // Create a shallow copy
          .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by newest first
          .map((e, i) => {
          
          const selfShare = getSelfShare(e);
          
          // Helper to order split: 'You' first, then others
          const orderedSplit = { 
            [selfId]: e.split[selfId], 
            ...Object.fromEntries(
              Object.entries(e.split).filter(([user]) => user !== selfId)
            )
          };

          return (
            // 1. Expense Item Card: Shadow, rounded corners, clean padding
            <div 
              key={i} 
              className="card shadow-sm border-0 rounded-3 p-3"
            >
              <div className="d-flex justify-content-between align-items-start">
                
                {/* 2. Main Title (Note & Total Amount) */}
                <div className="flex-grow-1">
                  <h5 className="mb-1 fw-bold text-dark">{e.note || "Untitled Expense"}</h5>
                  <p className="text-muted small mb-2">
                    <i className="bi bi-tag-fill">🏷️</i> {e.category} 
                    {e.group && (
                        <span className="ms-3">
                            <i className="bi bi-people-fill">👥</i> {e.group}
                        </span>
                    )}
                  </p>
                </div>
                
                {/* 3. Amount Badge (Largest and most prominent) */}
                <div className="text-end">
                    <span className="badge bg-primary fs-5 p-2 rounded-pill">
                      {formatCurrency(e.amount)}
                    </span>
                    <p className="small text-muted mt-1 mb-0">Total Amount</p>
                </div>
              </div>

              <hr className="my-2" />

              {/* 4. Footer Row for Splits and Date */}
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                
                {/* Date */}
                <div className="text-start small text-muted">
                    <i className="bi bi-calendar-date">📅</i> {new Date(e.date).toLocaleDateString()}
                </div>

                {/* Self Share / You Owe/Get Back */}
                <div className={`text-end fw-semibold small px-2 rounded-pill ${
                    selfShare === e.amount ? 'text-success bg-success-subtle' : // You paid it all
                    selfShare > 0 ? 'text-danger bg-danger-subtle' : // You owe/paid part
                    'text-success bg-success-subtle' // Default/Other case (shouldn't happen with current logic)
                }`}>
                    You Paid: {formatCurrency(selfShare)}
                </div>
              </div>
              
              {/* 5. Split Details (Collapsible/Hidden by default is often modern, but showing for clarity) */}
              <div className="mt-3 border-top pt-2">
                  <span className="small fw-semibold text-muted me-3">Split:</span>
                  <div className="d-flex flex-wrap mt-2 gap-2">
                    {Object.entries(orderedSplit).map(([user, amt]) => (
                      <div
                        key={user}
                        // MODERN SPLIT CHIP: pill shape, subtle background
                        className={`badge rounded-pill px-3 py-2 border ${
                          user === selfId ? "bg-primary-subtle text-primary fw-bold" : "bg-light text-dark fw-normal"
                        }`}
                      >
                        {user}: {formatCurrency(amt)}
                      </div>
                    ))}
                  </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ExpenseList;