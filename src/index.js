import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Hist from "./pages/Hist";
import Appt from "./pages/Appt";
import Symp from "./pages/Symp";
import Med from "./pages/Med";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NoPage from "./pages/NoPage";
import Appz from "./Appz";



export default function App() {

  const isAuthenticated = !!localStorage.getItem("authToken");

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={isAuthenticated ? <Layout /> : <Navigate to="/login" />} />
        <Route path="/allah" element={<Appz />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {isAuthenticated && (
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/nopage" element={<NoPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/med" element={<Med />} />
          <Route path="/hist" element={<Hist />} />
          <Route path="/appt" element={<Appt />} />
          <Route path="/symp" element={<Symp />} />
        </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);