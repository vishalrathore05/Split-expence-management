import { useState, useEffect } from "react";
import { TrashFill } from 'react-bootstrap-icons'; // Assuming you have an icon library like react-icons or similar

function Groups() {
  const [groups, setGroups] = useState([]); // store all groups
  const [groupName, setGroupName] = useState("");
  const [membersInput, setMembersInput] = useState(""); // comma separated users

  useEffect(() => {
    const savedGroups = JSON.parse(localStorage.getItem("groups")) || [];
    setGroups(savedGroups);
  }, []);

  useEffect(() => {
    localStorage.setItem("groups", JSON.stringify(groups));
  }, [groups]);

  const addGroup = (e) => {
    e.preventDefault();
    if (!groupName.trim()) {
        alert("Please enter a group name.");
        return;
    }

    // Split members input by comma and trim spaces
    const members = membersInput
      .split(",")
      .map((m) => m.trim())
      .filter((m) => m); // remove empty strings

    const newGroup = { name: groupName.trim(), members }; 
    setGroups([...groups, newGroup]);

    setGroupName("");
    setMembersInput("");
  };

  const deleteGroup = (nameToDelete) => {
    if (window.confirm(`Are you sure you want to delete the group "${nameToDelete}"?`)) {
        const updatedGroups = groups.filter(g => g.name !== nameToDelete);
        setGroups(updatedGroups);
    }
  };


  return (
    <div className="container py-5">
      <h2 className="mb-4 fw-bolder text-dark">👥 Manage Groups</h2>
      
      {/* --- Two-Column Layout for modern design distinction --- */}
      <div className="row g-4">
        
        {/* === COLUMN 1: ADD NEW GROUP CARD (Wider on medium screens) === */}
        <div className="col-lg-5 col-md-12">
          {/* MODERN CARD STYLING: Elevated and clean */}
          <div className="card border-0 shadow-sm p-4 rounded-4 bg-light">
            <h4 className="fw-bold mb-4 text-primary">Create New Group</h4>
            <form onSubmit={addGroup}>
              
              {/* Group Name Input */}
              <div className="mb-3">
                <label htmlFor="groupName" className="form-label fw-semibold text-muted">Group Name</label>
                <input
                  id="groupName"
                  className="form-control border-0 shadow-sm bg-white p-3"
                  placeholder="e.g., Roommates, Family, Travel Buddies"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  required
                />
              </div>

              {/* Members Input */}
              <div className="mb-4">
                <label htmlFor="membersInput" className="form-label fw-semibold text-muted">Members (Comma-Separated)</label>
                <input
                  id="membersInput"
                  className="form-control border-0 shadow-sm bg-white p-3"
                  placeholder="Alice, Bob, Carol"
                  value={membersInput}
                  onChange={(e) => setMembersInput(e.target.value)}
                />
                <small className="form-text text-muted mt-2">Your name is automatically included when tracking expenses.</small>
              </div>

              {/* Add Button */}
              <div className="d-grid mt-4">
                <button 
                  type="submit" 
                  className="btn btn-lg btn-primary fw-bold rounded-pill"
                >
                  ➕ Create Group
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* === COLUMN 2: GROUPS LIST (Scrollable, distinct background) === */}
        <div className="col-lg-7 col-md-12">
            <div className="p-4 bg-white rounded-4 shadow-sm h-100">
                <h4 className="fw-bold mb-4">Existing Groups ({groups.length})</h4>
                
                {groups.length === 0 ? (
                    <div className="alert alert-info text-center mt-5" role="alert">
                        You haven't created any groups yet!
                    </div>
                ) : (
                    <ul className="list-group list-group-flush">
                    {groups.map((g) => (
                      <li key={g.name} className="list-group-item d-flex justify-content-between align-items-center py-3 px-0 border-bottom">
                        <div>
                          <strong className="text-dark fs-5">{g.name}</strong>
                          <div className="text-muted small mt-1">
                            {g.members.length > 0 ? (
                                g.members.join(", ")
                            ) : (
                                <em>No additional members</em>
                            )}
                          </div>
                        </div>
                        <button 
                            className="btn btn-sm btn-outline-danger border-0" 
                            onClick={() => deleteGroup(g.name)}
                            aria-label={`Delete group ${g.name}`}
                        >
                            {/* Using a placeholder for an actual Trash icon */}
                            <i className="bi bi-trash-fill">🗑️</i> 
                            {/* If using react-bootstrap-icons, it would be: <TrashFill /> */}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}

export default Groups;