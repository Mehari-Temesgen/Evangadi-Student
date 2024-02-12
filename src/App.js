import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./App.css";
import axios from "axios";
import Home from "./Components/Home/Home";
import Signin from "./pages/SignUI/Signin";
import Section from "./pages/Section/Section";
import Signup from "./pages/SignUI/Signup";
import Forum from "./pages/Forum/Forum";
import Askq from "./pages/Askq/Askq";
import { createContext, useEffect, useState } from "react";
import AuthRequired from "./Components/Authentication/AuthRequired";
import Answer from "./Components/Answer/Answer";
axios.defaults.baseURL = "http://localhost:4000";
export const AuthContext = createContext();
function App() {
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get("/api/users/check", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data);
        // console.log(data);
        if (window.location.pathname !== "/forum") {
          window.location.replace("/forum");
        }
      } catch (err) {
        console.log(err);
        navigate("/signin", {
          state: {
            from: location.pathname,
          },
        });
      }
    };
    getUser();
  }, [token]);
  return (
    <>
      <AuthContext.Provider value={{ user, setUser }}>
        <AnimatePresence mode="wait">
          <Routes key={location.key} location={location}>
            <Route path="/" element={<Home />}>
              <Route element={<Section />}>
                <Route path="/" element={<Signin />} />
                <Route path="signin" element={<Signin />} />
                <Route path="signup" element={<Signup />} />
              </Route>
              <Route element={<AuthRequired />}>
                <Route path="/forum" element={<Forum />}>
                  <Route index element={<Answer />} />
                </Route>
                <Route path="/forum/askQ" element={<Askq />} />
              </Route>
            </Route>
          </Routes>
        </AnimatePresence>
      </AuthContext.Provider>
    </>
  );
}

export default App;
