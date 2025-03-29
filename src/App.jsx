import { Routes, Route,} from "react-router-dom";
import Loginform from "./Pages/Login";
import UsersList from "./pages/User";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      {/* react-toastify for notifications */}
       <ToastContainer position="top-left" />
      <Routes>
        <Route path="/" element={<Loginform/>}/>
        <Route path="/users" element={<UsersList/>} />
      </Routes>
    </div>
  );
}

export default App;
