import React from "react";
//showing react code in the browser
//its an engine start....
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
//render the app component on the screen
root.render(<App />);



//he's saying put my enitre app in the the root which is present in the index.html where all application run on the browser

// So index.js only does one thing:
// Tell React where to show your app.