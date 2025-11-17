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
      <div className="flex min-h-screen overflow-hidden">
        <FilterProvider>

          {/* Sidebar - 25% */}
          <div className="w-1/4 bg-gray-50 shadow-lg overflow-y-auto">
            <Sidebar />
          </div>

          {/* Main Content - 50% */}
          <div className="w-1/2bg-white overflow-y-auto">
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/products/:id" element={<ProductPage />} />
            </Routes>
          </div>

          {/* Right Section - 25% */}
          <div className="w-1/4 bg-gradient-to-b from-gray-900 to-gray-950 p-4 space-y-6 overflow-y-auto">
            <PopularBlogs />
            <TopSellers />
          </div>

        </FilterProvider>
      </div>
    </Router>
  );
}

export default App;
