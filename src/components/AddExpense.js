// import { useState, useEffect } from "react";

// function AddExpense() {
//     //store each data in this fields
//   const [amount, setAmount] = useState("");
//   const [note, setNote] = useState("");
//   const [category, setCategory] = useState("");
//   const [group, setGroup] = useState("");

//   //here using the array to display the data on the dropdown 
//   const [categories, setCategories] = useState([]);
//   const [groups, setGroups] = useState([]);

//   // Load categories and groups on first load
//   useEffect(() => {
//     const savedCategories = JSON.parse(localStorage.getItem("categories"));
//     const savedGroups = JSON.parse(localStorage.getItem("groups")) || [];

//     // If categories DON'T exist, create default ones
//     if (!savedCategories) {
//       const defaultCategories = ["Food", "Travel", "Shopping"];
//       localStorage.setItem("categories", JSON.stringify(defaultCategories));
//       setCategories(defaultCategories);
//     } else {
//       setCategories(savedCategories);
//     }

//     setGroups(savedGroups);
//   }, []);

//   // Save expense to localStorage
//   const addExpense = () => {
//     if (!amount || !category) {
//       alert("Amount + Category required");
//       return;
//     }
//     //packing all the values the user entered into one object.
//     const newExpense = {
//       amount, note, category, group, date: new Date().toISOString(),
//     };

//     //here are are going to find old expence 
//     //and then push new expence into this 
//     // so the expense list will look like this 
//     // ...old exp 1
//     // ...old exp 2
//     // new exp
//     const oldExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
//     oldExpenses.push(newExpense);

//     localStorage.setItem("expenses", JSON.stringify(oldExpenses));

//     alert("Expense saved!");
//     //reset input fields
//     setAmount("");
//     setNote("");
//     setCategory("");
//     setGroup("");
//   };

//   return (
//     <div>
//       <h3>Add Expense</h3>

//       <label>Amount</label>
//       <input
//         className="form-control mb-2"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//       />

//       <label>Note</label>
//       <input
//         className="form-control mb-2"
//         value={note}
//         onChange={(e) => setNote(e.target.value)}
//       />

//       <label>Category</label>
//       <select
//         className="form-control mb-2"
//         value={category}
//         onChange={(e) => setCategory(e.target.value)}
//       >
//         <option value="">Select Category</option>
//         {categories.map((c, i) => (
//           <option key={i}>{c}</option>
//         ))}
//       </select>

//       <label>Group</label>
//       <select
//         className="form-control mb-3"
//         value={group}
//         onChange={(e) => setGroup(e.target.value)}
//       >
//         <option value="">Select Group</option>
//         {groups.map((g, i) => (
//           <option key={i}>{g}</option>
//         ))}
//       </select>

//       <button className="btn btn-success" onClick={addExpense}>
//         Save Expense
//       </button>
//     </div>
//   );
// }

// export default AddExpense;


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AddExpense() {
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("");
  const [group, setGroup] = useState("");

  const [categories, setCategories] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const savedCategories = JSON.parse(localStorage.getItem("categories")) || ["Food", "Travel", "Shopping"];
    setCategories(savedCategories);

    const savedGroups = JSON.parse(localStorage.getItem("groups")) || [];
    setGroups(savedGroups);
  }, []);

    // inside addExpense function in AddExpense.js
    const addExpense = () => {
      if (!amount || !category) {
        alert("Amount + Category required");
        return;
      }

      // Determine who owes what
      const usersInGroup = groups.length; // number of other users
      const totalUsers = usersInGroup + 1; // including yourself
      const perUserAmount = (parseFloat(amount) / totalUsers).toFixed(2);

      const split = {};
      groups.forEach((user) => {
        split[user] = perUserAmount;
      });

      // you can skip displaying yourself if you want
      split["You"] = perUserAmount;

      const newExpense = {
        amount,
        note,
        category,
        group,
        split, // <-- always include split
        date: new Date().toISOString(),
      };

      const oldExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
      oldExpenses.push(newExpense);

      localStorage.setItem("expenses", JSON.stringify(oldExpenses));

      alert("Expense saved!");
    };


  return (
    <div>
      <h3>Add Expense</h3>

      <label>Amount</label>
      <input className="form-control mb-2" value={amount} onChange={(e) => setAmount(e.target.value)} />

      <label>Note</label>
      <input className="form-control mb-2" value={note} onChange={(e) => setNote(e.target.value)} />

      <label>Category</label>
      <select className="form-control mb-2" value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        {categories.map((c, i) => <option key={i}>{c}</option>)}
      </select>

      <label>Group</label>
      <select className="form-control mb-3" value={group} onChange={(e) => setGroup(e.target.value)}>
        <option value="">Select Group</option>
        {groups.map((g, i) => <option key={i}>{g.name}</option>)}
      </select>

      <button className="btn btn-success" onClick={addExpense}>💾 Save Expense</button>
    </div>
  );
}

export default AddExpense;
