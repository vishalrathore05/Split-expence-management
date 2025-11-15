<<<<<<< HEAD
📘 Expense Splitter & Expense Tracker (Beginner React Version)

A simple, beginner-friendly React Single Page Application (SPA) for tracking expenses and splitting costs among people.
No backend.
No database.
All data is stored locally using localStorage.

Perfect for learning React fundamentals like components, props, state (useState), conditional rendering, and organizing UI screens.

📝 1. Project Folder Structure
expence-spliter-management/
│
│ package.json
│ public/
│    index.html
│
└── src/
     index.js
     App.js
     style.css
     └── components/
           Navbar.js
           Home.js
           AddExpense.js
           ExpenseList.js
           Groups.js
           MonthlySummary.js

What each file does:

• public/index.html: Main HTML page. React mounts the whole app here.
• src/index.js: Starting point of the React app. Renders <App />.
• src/App.js: The main controller. Switches pages based on state.
• src/style.css: Custom styling (optional, small).
• src/components/: Each file is one screen of the app.

🎨 2. Why Bootstrap?

This project uses Bootstrap for styling because:

It looks clean without writing CSS

It gives ready-made forms, layouts, spacing, and buttons

Perfect for beginners who want to focus on logic instead of UI

Only one import needed:

import "bootstrap/dist/css/bootstrap.min.css";

⚛️ 3. What ReactDOM Does
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);


Simple explanation:

React looks for <div id="root"></div> in index.html

createRoot creates a space for React to draw the app

render(<App />) puts our whole React app inside that div

This is how React becomes visible inside the browser.

📥 4. Understanding Imports in App.js
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AddExpense from "./components/AddExpense";
import ExpenseList from "./components/ExpenseList";
import Groups from "./components/Groups";
import MonthlySummary from "./components/MonthlySummary";


Explanation:

useState helps us create variables that update the UI

every other import is a component (a UI screen)

App.js needs these to show them based on what the user clicks

🔁 5. Page Switching Logic (SPA)

In App.js:

{page === "home" && <Home />}
{page === "add-expense" && <AddExpense />}
{page === "expense-list" && <ExpenseList />}
{page === "groups" && <Groups />}
{page === "monthly-summary" && <MonthlySummary />}


Meaning:
"Show this component only if the page state matches its name."

This is how we create navigation without changing actual web pages.

📦 6. Why We Use useState()

useState() creates a special variable that:

stores data

updates the screen whenever the data changes

Example:

const [groups, setGroups] = useState([]);


Meaning:

groups holds the current list of groups

setGroups updates that list and refreshes the UI

Without useState, React wouldn't re-render when values change.

➕ 7. Example: Adding a Group
const addGroup = () => {
  if (!groupName.trim()) return;

  setGroups([...groups, groupName]);
  setGroupName("");
};


Explanation:

Prevent empty names

Add new group to old list using spread operator

Clear the input box

React redraws the updated list automatically

Where do setGroups and setGroupName come from?
From these lines:

const [groups, setGroups] = useState([]);
const [groupName, setGroupName] = useState("");

💾 8. Data Storage

No backend.
No MongoDB.
No APIs.

We use:

localStorage


This keeps data safe until the user clears the browser.

📊 9. Features Included
✔ Add Expenses

Create a new expense with date, amount, description, and category.

✔ Category Dropdown

Predefined categories + option to add new ones.

✔ Groups

Create groups of people (friends, family, roommates).

✔ Split Expenses

Choose:

equal split

custom split

✔ Expense List

View all expenses in a clean table.

✔ Monthly Summary

Shows:

total expense

category breakdown

who owes who (for group expenses)
=======
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
>>>>>>> d75cea2 (Initialize project using Create React App)
