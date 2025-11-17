import { Route, BrowserRouter as Router, Routes } from 'react-router';
import './App.css';
import Sidebar from './components/Sidebar.tsx';
import { FilterProvider } from './components/FilterContext.tsx';
import MainContent from './components/MainContent.tsx';
import ProductPage from './components/ProductPage.tsx';
import PopularBlogs from './components/PopularBlogs.tsx';
import TopSellers from './components/TopSellers.tsx';

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <FilterProvider>
          <Sidebar />

          <div className="rounded w-full flex justify-between flex-wrap">
            <Routes>
              <Route path="/" element={<MainContent />} />
            </Routes>
            <Routes>
              <Route path="/products/:id" element={<ProductPage />} />
            </Routes>
          </div>

          <div className="">
            <PopularBlogs />
            <TopSellers />
          </div>
        </FilterProvider>
      </div>
    </Router>
  );
}

export default App;
