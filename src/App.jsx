import { BrowserRouter, Routes, Route } from "react-router-dom";
import Topbar from "./components/Topbar";
import DashboardHome from "./pages/DashboardHome";
import UserForm from "./pages/UserForm";
import UserList from "./pages/UserList";
import RemovedUsers from "./pages/RemovedUsers";

function MainApp() {
  return (
    <BrowserRouter>
      <Topbar />

      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/form" element={<UserForm />} />
        <Route path="/display" element={<UserList />} />
        <Route path="/deleted" element={<RemovedUsers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MainApp;