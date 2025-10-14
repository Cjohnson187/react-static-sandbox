# React Sandbox

This repository hosts a simple, single-file React application designed as a project portfolio sandbox. It demonstrates modern React functional components, `useState` hook usage, and a custom **hash-based routing** system to manage navigation between different "projects" without needing an external router library.

---

## 🚀 Features

* **Single-File Application:** All components, logic, and styling are contained within `src/App.tsx`, following the single-file mandate for simplified deployment and focused development.
* **Custom Hash Routing:** Uses native browser `window.location.hash` and the `hashchange` event listener to create client-side routing, allowing navigation between `/#counter` and `/#todo`.
* **Fully Responsive UI:** Styled using **Tailwind CSS** utility classes for a modern, dark-themed, and adaptive user experience across all devices.
* **Project 1: React Counter App:** A foundational example demonstrating the use of `useState` for simple numeric state management.
* **Project 2: Simple To-Do List:** An interactive list that uses local React state to manage adding, toggling, and deleting tasks. *Note: Data is not persistent and resets on page refresh.*

---

## 🛠️ Technologies Used

* **React:** Functional components and Hooks (`useState`, `useEffect`, `useCallback`, `useMemo`).
* **TypeScript:** Provides strong typing for components, props, and state (`TodoItem`, `PageRoute`).
* **Tailwind CSS:** Used via CDN for rapid and responsive styling.
* **Lucide React:** Used for sharp, lightweight icons.

---

## 📂 Project Structure Overview

The entire application is self-contained within `src/App.tsx`.

1.  **Type Definitions:** Defines custom types like `PageRoute`, `Project`, and `TodoItem` for strong typing.
2.  **`PROJECTS` Array:** A constant array defining all available projects, linking their IDs, names, icons, and component functions.
3.  **Routing Utilities:** Functions (`getRouteFromHash`, `MapsTo`) manage reading and writing to the URL hash.
4.  **Project Components:** Individual components (`CounterProject`, `TodoListProject`) demonstrating specific React features.
5.  **`HomePage` Component:** Displays the index of all available projects.
6.  **`App` Component:** The main entry point that manages the global `currentPage` state and uses the `componentsMap` to conditionally render the active project component based on the URL hash.

---

## ⚙️ How to Run

Since this is a single, self-contained TypeScript/React file, you can run it directly in any environment configured for React development (like a sandbox or a local create-react-app project).

1.  Ensure you have a React environment set up.
2.  Place the code into `src/App.tsx`.
3.  Run the development server (`npm start` or similar).

The application will start on the home page (`/`), where you can click cards to navigate to projects like:

* `http://localhost:3000/#counter`
* `http://localhost:3000/#todo`
```eof
