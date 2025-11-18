import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AddExpense() {
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("");
  
  // New State: Determines if the expense is 'personal' or 'group'
  const [expenseType, setExpenseType] = useState("personal"); 
  
  // Retained State: Stores the selected group name (only relevant if expenseType is 'group')
  const [group, setGroup] = useState(""); 

  const [categories, setCategories] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    // Load categories
    const savedCategories = JSON.parse(localStorage.getItem("categories")) || ["Food", "Travel", "Shopping", "Bills", "Others"];
    setCategories(savedCategories);

    // Load groups (FETCH CODE RESTORED)
    const savedGroups = JSON.parse(localStorage.getItem("groups")) || [];
    setGroups(savedGroups);
  }, []);

  const addExpense = (e) => {
    e.preventDefault(); 

    // Basic validation
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
        return alert("Please enter a valid amount.");
    }
    if (!category) {
        return alert("Please select a category.");
    }
    // Validation for Group Selection
    if (expenseType === 'group' && !group) {
        return alert("Please select a group for this expense.");
    }

    let split = {};
    const expenseAmount = parseFloat(amount);
    let selectedGroup = null;

    if (expenseType === 'group' && group) {
      selectedGroup = groups.find((g) => g.name === group);
      
      // Group Split Logic (RESTORED)
      if (selectedGroup) {
        const totalMembers = selectedGroup.members.length + 1; // including self
        const share = (expenseAmount / totalMembers);

        split["You"] = parseFloat(share.toFixed(2));
        selectedGroup.members.forEach((m) => {
          split[m] = parseFloat(share.toFixed(2));
        });
      }
    } else {
      // Personal Expense Split
      split["You"] = expenseAmount; 
    }

    const newExpense = {
      amount: expenseAmount,
      note,
      category,
      group: expenseType === 'group' ? group : null, // Save group name or null
      split,
      date: new Date().toISOString(),
    };

    const oldExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    oldExpenses.push(newExpense);
    localStorage.setItem("expenses", JSON.stringify(oldExpenses));

    alert("Expense saved successfully!");
    setAmount(""); setNote(""); setCategory(""); setExpenseType("personal"); setGroup("");
    
    navigate("/expense-list");
  };

  return (
    <div className="container py-5"> 
      <div className="row justify-content-center"> 
        <div className="col-lg-7 col-md-9">

          {/* MODERN CARD STYLING */}
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden"> 
            
            <div className="card-header bg-white border-bottom-0 pt-4 pb-0">
                <h2 className="text-center fw-bolder text-primary mb-1">Record Expense</h2>
                <p className="text-center text-muted mb-4">Track every cent with precision.</p>
            </div>

            <div className="card-body p-md-5 p-4">
              <form onSubmit={addExpense}> 

                {/* Amount Field - Focus on primary input */}
                <div className="mb-4">
                  <label htmlFor="amountInput" className="form-label fw-semibold text-muted">Amount ($)</label>
                  <div className="input-group">
                      <span className="input-group-text bg-light border-end-0 fs-5 fw-bold">$</span>
                      <input 
                        id="amountInput"
                        type="number"
                        step="0.01" 
                        className="form-control form-control-lg border-start-0 border-top-0 border-end-0 border-bottom border-2 text-primary fw-bolder fs-4 p-2" 
                        placeholder="0.00"
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)} 
                        required 
                      />
                  </div>
                </div>

                {/* Expense Type Field (New/Modified Primary Dropdown) */}
                <div className="mb-4">
                  <label htmlFor="expenseTypeSelect" className="form-label fw-semibold text-muted">Expense For</label>
                  <select 
                    id="expenseTypeSelect"
                    className="form-select border-0 shadow-sm bg-light"
                    value={expenseType} 
                    onChange={(e) => {
                        setExpenseType(e.target.value);
                        setGroup(""); // Clear group selection if type changes
                    }}
                    required
                  >
                    <option value="personal">Personal Expense</option>
                    <option value="group">Group Split</option>
                  </select>
                </div>

                {/* Group Selection Dropdown (CONDITIONAL RENDERING) */}
                {expenseType === 'group' && (
                    <div className="mb-4">
                        <label htmlFor="groupSelect" className="form-label fw-semibold text-muted">Select Group</label>
                        {groups.length === 0 ? (
                            <div className="alert alert-warning small py-2">
                                No groups found. Create one on the Groups page!
                            </div>
                        ) : (
                            <select 
                                id="groupSelect"
                                className="form-select border-0 shadow-sm bg-light" 
                                value={group} 
                                onChange={(e) => setGroup(e.target.value)}
                                required={expenseType === 'group'} // Make required only when type is 'group'
                            >
                                <option value="" disabled>-- Choose a Group --</option>
                                {groups.map((g, i) => <option key={i} value={g.name}>{g.name} ({g.members.length + 1} members)</option>)}
                            </select>
                        )}
                    </div>
                )}
                {/* End Conditional Group Selection */}


                {/* Category Field */}
                <div className="mb-4">
                  <label htmlFor="categorySelect" className="form-label fw-semibold text-muted">Category</label>
                  <select 
                    id="categorySelect"
                    className="form-select border-0 shadow-sm bg-light" 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="" disabled>-- Select expense category --</option>
                    {categories.map((c, i) => <option key={i} value={c}>{c}</option>)}
                  </select>
                </div>
                
                {/* Note Field */}
                <div className="mb-5"> 
                  <label htmlFor="noteInput" className="form-label fw-semibold text-muted">Note / Description</label>
                  <input 
                    id="noteInput"
                    type="text" 
                    className="form-control border-0 shadow-sm bg-light" 
                    placeholder="e.g., Dinner at the new Italian place"
                    value={note} 
                    onChange={(e) => setNote(e.target.value)} 
                  />
                </div>

                {/* MODERN BUTTON */}
                <div className="d-grid"> 
                  <button 
                    type="submit" 
                    className="btn btn-lg btn-primary fw-bold rounded-pill shadow-sm"
                  >
                    💾 Save and Record
                  </button>
                </div>
              </form>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddExpense;