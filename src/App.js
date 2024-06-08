import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivateRoute from "./common/PrivateRoute";
import { useSelector } from "react-redux";
import AddClient from "./pages/AddClient";
import ViewLogs from "./pages/ViewLogs"
import PrivateAmishRoute from "./common/PrivateAmishRoute";
import AddEngineer from "./pages/AddEngineer";

function App() {
  const {employee} = useSelector((state) => state.employee)
  return (
   <>
    <Routes>
      <Route path="/"  element={
      <PrivateRoute>
        <Home/>
      </PrivateRoute>}/>
      <Route path="/login" element={<Login/>} />
      <Route path="/addClient" element={<AddClient/>} />
      <Route path="/addEngineer" element={<AddEngineer/>}/>

      <Route path="/view-logs" element={<PrivateAmishRoute><ViewLogs/></PrivateAmishRoute>} />
    </Routes>
   </>
  );
}

export default App;
