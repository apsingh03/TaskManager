import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";

import "bootstrap/dist/css/bootstrap.min.css";
import TaskManager from "./pages/TaskManager";


function App() {
  return (
    <>
      <Routes>
         <Route path="/" element={<HomePage />}></Route> 
        <Route path="/signup" element={<SignUp />}></Route>
  
 
      </Routes>
    </>
  );
}

export default App;
