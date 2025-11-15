function Navbar({ setPage }) {
    return (
      <nav className="navbar navbar-dark bg-dark px-3">
        <span className="navbar-brand">Expense Splitter</span>
  
        <div>
          <button className="btn btn-light me-2" onClick={() => setPage("home")}>
            Home
          </button>
          <button className="btn btn-light me-2" onClick={() => setPage("add-expense")}>
            Add Expense
          </button>
          <button className="btn btn-light me-2" onClick={() => setPage("expense-list")}>
            Expense List
          </button>
          <button className="btn btn-light me-2" onClick={() => setPage("groups")}>
            Groups
          </button>
          <button className="btn btn-light" onClick={() => setPage("monthly-summary")}>
            Monthly Summary
          </button>
        </div>
      </nav>
    );
  }
  
  export default Navbar;
  