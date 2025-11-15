import { useState } from "react";

function AddExpense() {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("");
  const [group, setGroup] = useState("");
  const [categories, setCategories] = useState(["Food", "Travel", "Shopping"]);
  const [groups] = useState(["Friends", "Office", "Family"]);

  const addExpense = () => {
    if (!amount || !category) return;
    alert("Expense added (dummy only for now)");
    setAmount("");
    setNote("");
    setCategory("");
  };

  return (
    <div>
      <h3>Add Expense</h3>

      <label>Amount</label>
      <input
        className="form-control mb-2"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <label>Note</label>
      <input
        className="form-control mb-2"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <label>Category</label>
      <select
        className="form-control mb-2"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select Category</option>
        {categories.map((c, i) => (
          <option key={i}>{c}</option>
        ))}
      </select>

      <label>Group</label>
      <select
        className="form-control mb-3"
        value={group}
        onChange={(e) => setGroup(e.target.value)}
      >
        <option value="">Select Group</option>
        {groups.map((g, i) => (
          <option key={i}>{g}</option>
        ))}
      </select>

      <button className="btn btn-success" onClick={addExpense}>
        Save Expense
      </button>
    </div>
  );
}

export default AddExpense;
