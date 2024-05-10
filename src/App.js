import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivateRoute from "./common/PrivateRoute";
import { useSelector } from "react-redux";

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
    </Routes>
   </>
  );
}

export default App;
