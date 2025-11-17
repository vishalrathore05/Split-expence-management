// import { useState, useEffect } from "react";

// function Groups() {
//   const [groups, setGroups] = useState([]); 
//   const [groupName, setGroupName] = useState("");

//   // Load groups from localStorage when page first opens
//   //also change into the string '["friends", "family"]'
//   useEffect(() => {
//     const savedGroups = localStorage.getItem("groups");
//     if (savedGroups) {
//       setGroups(JSON.parse(savedGroups)); 
//     }
//   }, []);

//   // Save groups to localStorage whenever groups change
//   useEffect(() => {
//     localStorage.setItem("groups", JSON.stringify(groups));
//   }, [groups]);
//   //saves the updated list automatically.
//   const addGroup = () => {
//     if (!groupName.trim()) return;

//     setGroups([...groups, groupName]); 
//     setGroupName(""); 
//   };

//   return (
//     <div>
//       <h3>Groups</h3>

//       {/* Input box */}
//       <input
//         className="form-control mb-2"
//         placeholder="Enter group name"
//         value={groupName}
//         onChange={(e) => setGroupName(e.target.value)}
//       />

//       {/* Add button */}
//       <button className="btn btn-primary mb-3" onClick={addGroup}>
//         Add Group
//       </button>

//       {/* Group list */}
//       <ul className="list-group">
//         {groups.map((g, i) => (
//           <li key={i} className="list-group-item">{g}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Groups;

import { useState, useEffect } from "react";

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

  const addGroup = () => {
    if (!groupName.trim()) return;

    // Split members input by comma and trim spaces
    const members = membersInput
      .split(",")
      .map((m) => m.trim())
      .filter((m) => m); // remove empty strings

    const newGroup = { name: groupName, members }; // save as object
    setGroups([...groups, newGroup]);

    setGroupName("");
    setMembersInput("");
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

      <input
        className="form-control mb-2"
        placeholder="Add members, separated by commas (e.g., Alice, Bob)"
        value={membersInput}
        onChange={(e) => setMembersInput(e.target.value)}
      />

      <button className="btn btn-primary mb-3" onClick={addGroup}>
        Add Group
      </button>

      <ul className="list-group">
        {groups.map((g, i) => (
          <li key={i} className="list-group-item">
            <strong>{g.name}</strong> - Members: {g.members ? g.members.join(", ") : "No members"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Groups;
