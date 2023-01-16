import { Route, Routes } from "react-router-dom";
import MainPage from "./pages";
import Layout from "./components/Layout";
import ArticlePage from "./pages/ArticlePage";
import AdvancedSearchPage from "./pages/AdvancedSearchPage";
import NotFound from "./pages/NotFound";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path=":id" element={<ArticlePage />} />
        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/advanced-search" element={<AdvancedSearchPage />} />
    </Routes>
  );
}

export default App;
