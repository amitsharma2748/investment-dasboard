import { Routes, Route } from "react-router-dom"; 
import PageNotFound from "./modules/page_not_found/PageNotFound";
import IndexUserList from "./modules/users/IndexUserList";
import UserDetailedPage from "./modules/users/component/UserDetailedPage";

function App() {
  return (
    <Routes>
      {/* Home Page - List of Users */}
      <Route path="/" element={<IndexUserList />} />

      {/* User Details Page */}
      <Route path="/user/:userId" element={<UserDetailedPage />} />

      {/* Fallback Route - 404 Page */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
