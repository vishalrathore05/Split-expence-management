import { useState } from "react";

function Groups() {
  const [groups, setGroups] = useState([]);
  //groups = store all groups
  const [groupName, setGroupName] = useState("");
    //store individal group name when we are going to create
    //use can see we have use useStae becasue every time user addd group that time needs to update the screen so as discussed on change or store we will use useState there
    
  const addGroup = () => {
    if (!groupName.trim()) return;
    setGroups([...groups, groupName]);
    //here we use spread operators (...groups)
    setGroupName("");
    //this is not tricky here we are just clear the input boxxxxx
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
