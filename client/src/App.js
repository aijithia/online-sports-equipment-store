import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './Login/Login';
import AdminHome from './Modules/Admin/AdminHome';
import ManageServices from './Modules/Seller/Components/ManageProducts';
import CustomerHome from './Modules/Customer/CustomerHome';
import MyBookings from './Modules/Customer/Components/MyBookings';
// import SellerHome from './Modules/Seller/SellerHome';
import Products from './Modules/Customer/Components/Products';
import Cart from './Modules/Customer/Cart';
import Home from './Modules/Customer/Home';
import { AuthProvider  ,AuthContext} from './Auth/AuthContext';
// import { AuthProvider, AuthContext } from './AuthContext';


function ProtectedRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? children : <Navigate to="/Login" />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/Home" />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Login" element={<LoginPage/>} />
          
          <Route path="/AdminHome" element={<ProtectedRoute><AdminHome /></ProtectedRoute>} />
          {/* <Route path="/SellerHome" element={<ProtectedRoute><SellerHome /></ProtectedRoute>} /> */}
          <Route path="/ManageServices" element={<ProtectedRoute><ManageServices /></ProtectedRoute>} />
          <Route path="/CustomerHome" element={<ProtectedRoute><CustomerHome /></ProtectedRoute>} />
          <Route path="/Products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
          <Route path="/Cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/MyBookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
