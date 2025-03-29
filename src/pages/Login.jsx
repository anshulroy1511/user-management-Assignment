import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

 // Function to handle form submission (Login)
const Loginform = () => {
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://reqres.in/api/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/users");
       toast.success("User Login successfully!");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
<div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-200 via-blue-200 to-purple-500">

    {/* login form */}
     <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-8 rounded-xl w-80 flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <input
          type="email"
          className="border p-3 rounded-full focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          required
        />
        <input
          type="password"
          className="border p-3 rounded-full focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button
          type="submit"
          className="bg-purple-500 text-white py-2 rounded-full shadow-md hover:bg-purple-600 transition"
        >
          LOGIN
        </button>
       
      </form>
    </div>
  );
};

export default Loginform;
