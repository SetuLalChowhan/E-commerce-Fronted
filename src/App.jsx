import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home"; 
import Navbar from "./components/Navbar";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Cart from "./Pages/Cart";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path={"/"} element={<Home/>} />
        <Route path={"/login"} element={<Login/>} />
        <Route path={"/register"} element={<Register/>} />
        <Route path={"/cart"} element={<Cart/>} />
      </Routes>
    </Router>
    <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </>
    
  );
}

export default App;
