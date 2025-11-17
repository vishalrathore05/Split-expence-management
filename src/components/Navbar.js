// import { Link } from "react-router-dom";

// function Navbar() {
//   return (
//     <nav className="navbar navbar-dark bg-dark px-4">
//       <Link className="navbar-brand" to="/">
//         Expense Tracker
//       </Link>

//       <ul className="navbar-nav flex-row ms-auto">
//         <li className="nav-item mx-2">
//           <Link className="nav-link" to="/add-expense">Add Expense</Link>
//         </li>
//         <li className="nav-item mx-2">
//           <Link className="nav-link" to="/expense-list">Expense List</Link>
//         </li>
//         <li className="nav-item mx-2">
//           <Link className="nav-link" to="/groups">Groups</Link>
//         </li>
//         <li className="nav-item mx-2">
//           <Link className="nav-link" to="/monthly-summary">Monthly Summary</Link>
//         </li>
//       </ul>
//     </nav>
//   );
// }

// export default Navbar;


// //in this above you can see we have use <link> instead of <a> becau se<Link> is React Router’s version of <a>. But <a> reloads the whole page.
// //we use className because class is js keyword


import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">Expense Splitter</Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item mx-2">
            <Link className="nav-link" to="/add-expense">💰 Add Expense</Link>
          </li>
          <li className="nav-item mx-2">
            <Link className="nav-link" to="/expense-list">📄 Expense List</Link>
          </li>
          <li className="nav-item mx-2">
            <Link className="nav-link" to="/groups">👥 Groups</Link>
          </li>
          <li className="nav-item mx-2">
            <Link className="nav-link" to="/monthly-summary">📊 Monthly Summary</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
