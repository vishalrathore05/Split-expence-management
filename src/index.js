// //he's saying put my enitre app in the the root which is present in the index.html where all application run on the browser

// // So index.js only does one thing:
//importing react makes jsx work
// react build components and react dom convert those component into real html page
// // Tell React where to show your app.


import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
//pares of all components 