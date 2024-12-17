import "./App.css";
import BaseLayout from "./layouts/BaseLayout";
import Home from "./pages/home/Home";
import Search from "./pages/search/Search";
import Login from "./pages/member/Login";
import Register from "./pages/member/Register";
import { Routes, Route } from "react-router-dom";
import RedirectHandler from "./pages/member/RedirectHandler";

function App() {
  return (
    <BaseLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/oauth2/redirect" element={<RedirectHandler />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/mypage" element={<Mypage />} /> */}
      </Routes>
    </BaseLayout>
  );
}

export default App;
