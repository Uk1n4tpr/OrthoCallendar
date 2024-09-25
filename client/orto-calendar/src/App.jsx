import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import axios from "axios";
import Calendar from "./components/Calendar";
import { Toaster } from "react-hot-toast";
import Program from "./components/Program";
import Doktori from "./components/Doktori";
import Archive from "./components/smallComponents/Archive";
import PreOp from "./components/smallComponents/PreOp";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />

      <Router>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/calendar" element={<Calendar />}></Route>
          <Route path="/program" element={<Program />}></Route>
          <Route path="/doktor/:_id/:name" element={<Doktori />}></Route>
          <Route path="/archive" element={<Archive />}></Route>
          <Route path="/pre-op" element={<PreOp />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
