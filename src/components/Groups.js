import { useState, useEffect } from "react";

function Groups() {
  const [groups, setGroups] = useState([]); 
  const [groupName, setGroupName] = useState("");

  // Load groups from localStorage when page first opens
  useEffect(() => {
    const savedGroups = localStorage.getItem("groups");
    if (savedGroups) {
      setGroups(JSON.parse(savedGroups)); 
    }
  }, []);

  // Save groups to localStorage whenever groups change
  useEffect(() => {
    localStorage.setItem("groups", JSON.stringify(groups));
  }, [groups]);

  const addGroup = () => {
    if (!groupName.trim()) return;

    setGroups([...groups, groupName]); 
    setGroupName(""); 
  };

  return (
    <div>
      <h3>Groups</h3>

      {/* Input box */}
      <input
        className="form-control mb-2"
        placeholder="Enter group name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />

      {/* Add button */}
      <button className="btn btn-primary mb-3" onClick={addGroup}>
        Add Group
      </button>

      {/* Group list */}
      <ul className="list-group">
        {groups.map((g, i) => (
          <li key={i} className="list-group-item">{g}</li>
        ))}
      </ul>
    </div>
  );
}

export default Groups;
