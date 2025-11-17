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
