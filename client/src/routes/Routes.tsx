import { Routes as RouterRoutes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Products from '../pages/Products';
import AboutUs from '../pages/AboutUs';
import MyAccount from '../pages/MyAccount';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import Register from '../pages/Register';
import SingleProduct from '../pages/SingleProduct';
import NotFound from '../pages/NotFound';
import ProtectedRoute from '../components/ProtectedRoute';
import Basket from '../pages/Basket';

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/logout' element={<Logout />} />
      <Route path='/register' element={<Register />} />
      <Route
        path='/items'
        element={
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        }
      />
      <Route
        path='/items/:itemid'
        element={
          <ProtectedRoute>
            <SingleProduct />
          </ProtectedRoute>
        }
      />
      <Route path='/aboutus' element={<AboutUs />} />
      <Route
        path='/myaccount'
        element={
          <ProtectedRoute>
            <MyAccount />
          </ProtectedRoute>
        }
      />
      h
      <Route path='/basket' element={<Basket />} />
      <Route path='*' element={<NotFound />} />
    </RouterRoutes>
  );
};

export default Routes;
