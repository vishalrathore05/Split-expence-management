import { useState } from "react";

function Groups() {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");

  const addGroup = () => {
    if (!groupName.trim()) return;
    setGroups([...groups, groupName]);
    setGroupName("");
  };

  return (
    <div>
      <h3>Groups</h3>

      <input
        className="form-control mb-2"
        placeholder="Enter group name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />

      <button className="btn btn-primary mb-3" onClick={addGroup}>
        Add Group
      </button>

      <ul className="list-group">
        {groups.map((g, i) => (
          <li key={i} className="list-group-item">{g}</li>
        ))}
      </ul>
    </div>
  );
}

export default Groups;
