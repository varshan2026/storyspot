import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/header";
import StoryHome from "./components/home";
import PageNot from "./components/pagenot";
import Storyscript from "./components/script";
import Detailscript from "./components/fullscript";
import Admin from "./components/admin";

function App() {
  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<StoryHome />} />
        <Route path="/scripts" element={<Storyscript />} />
        <Route path="/scripts/:id" element={<Detailscript />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<PageNot />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
