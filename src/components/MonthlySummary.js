import { useState, useEffect } from "react";
import { XCircleFill } from 'react-bootstrap-icons'; // Assuming you have 'react-bootstrap-icons' installed

function MonthlySummary() {
  const [expenses, setExpenses] = useState([]);
  
  // State for filtering
  const [selectedMonth, setSelectedMonth] = useState(""); 
  const [expenseTypeFilter, setExpenseTypeFilter] = useState("all"); 
  const selfId = "You"; // Key used for your share

  useEffect(() => {
    // Load expenses from localStorage
    const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(savedExpenses);
  }, []);

  // --- Filtering Logic ---
  const filteredExpenses = expenses
    .filter(expense => {
      // 1. Filter by Month/Year
      if (selectedMonth) {
        const expenseMonthYear = new Date(expense.date).toISOString().substring(0, 7);
        if (expenseMonthYear !== selectedMonth) {
          return false;
        }
      }
      
      // 2. Filter by Expense Type
      if (expenseTypeFilter === 'personal') {
        return expense.group === null || expense.group === undefined;
      }
      if (expenseTypeFilter === 'group') {
        return expense.group !== null && expense.group !== undefined && expense.group.length > 0;
      }
      
      return true; // If 'all'
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort newest first

  const formatCurrency = (amount) => {
    return `₹${parseFloat(amount).toFixed(2)}`;
  };
  
  const totalFilteredAmount = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  // --- Handlers ---
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleClearMonth = () => {
    setSelectedMonth("");
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 fw-bolder text-info">📅 Monthly Expense Summary</h2>
      
      {/* --- Filter Bar --- */}
      <div className="row mb-4 align-items-center bg-light p-3 rounded-3 shadow-sm">
        
        {/* Column 1: Date Picker and Clear Button */}
        <div className="col-md-6 mb-3 mb-md-0">
          <label className="form-label fw-semibold text-muted d-block">Filter by Month & Year</label>
          <div className="input-group">
            <input
              type="month"
              className="form-control"
              value={selectedMonth}
              onChange={handleMonthChange}
            />
            {selectedMonth && (
              <button
                className="btn btn-outline-danger"
                onClick={handleClearMonth}
                title="Clear Month Filter"
              >
                <XCircleFill />
              </button>
            )}
          </div>
        </div>

        {/* Column 2: Personal/Group Filter */}
        <div className="col-md-6">
          <label htmlFor="typeFilter" className="form-label fw-semibold text-muted">Expense Type</label>
          <select
            id="typeFilter"
            className="form-select"
            value={expenseTypeFilter}
            onChange={(e) => setExpenseTypeFilter(e.target.value)}
          >
            <option value="all">All Expenses</option>
            <option value="personal">Personal Expenses Only</option>
            <option value="group">Group Expenses Only</option>
          </select>
        </div>
      </div>
      
      {/* --- Summary Totals Card --- */}
      <div className="card text-white bg-info mb-4 shadow-lg border-0">
          <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                  <h5 className="card-title mb-0">Total Filtered Spending</h5>
                  <p className="card-text small">{filteredExpenses.length} records shown</p>
              </div>
              <span className="h3 fw-bolder">{formatCurrency(totalFilteredAmount)}</span>
          </div>
      </div>

      {/* --- Expense List Display --- */}
      {filteredExpenses.length === 0 ? (
        <div className="alert alert-warning text-center mt-5">
          No expenses match your current filters.
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {filteredExpenses.map((e, i) => {
            
            // Logic to ensure 'You' is displayed first in the split list
            const orderedSplit = { 
              [selfId]: e.split[selfId], 
              ...Object.fromEntries(
                Object.entries(e.split || {}).filter(([user]) => user !== selfId)
              )
            };

            return (
              <div 
                key={i} 
                className="card shadow-sm border-0 rounded-3 p-3 bg-white"
              >
                <div className="d-flex justify-content-between align-items-start">
                  
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
                  
                  <div className="text-end">
                      <span className="badge bg-primary fs-5 p-2 rounded-pill">
                        {formatCurrency(e.amount)}
                      </span>
                      <p className="small text-muted mt-1 mb-0">Total</p>
                  </div>
                </div>

                <hr className="my-2" />
                
                {/* --- ADDED SPLIT BREAKDOWN --- */}
                <div className="mb-2">
                    <span className="small fw-semibold text-muted me-3">Split Details:</span>
                    <div className="d-flex flex-wrap mt-2 gap-2">
                      {Object.entries(orderedSplit).map(([user, amt]) => (
                        <div
                          key={user}
                          // Reusing the modern split chip/badge styling
                          className={`badge rounded-pill px-3 py-2 border ${
                            user === selfId ? "bg-primary-subtle text-primary fw-bold" : "bg-light text-dark fw-normal"
                          }`}
                        >
                          {user}: {formatCurrency(amt)}
                        </div>
                      ))}
                    </div>
                </div>
                {/* --- END SPLIT BREAKDOWN --- */}


                <div className="text-start small text-muted border-top pt-2 mt-2">
                    <i className="bi bi-calendar-date">📅</i> {new Date(e.date).toLocaleDateString()}
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MonthlySummary;