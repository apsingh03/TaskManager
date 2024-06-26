import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import TaskManager from "./pages/TaskManager";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<PrivateRoute element={<HomePage />} />} />
      </Routes>
    </>
  );
}

export default App;
