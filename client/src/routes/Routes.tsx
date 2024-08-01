import { Routes as RouterRoutes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Products from '../pages/Products';
import AboutUs from '../pages/AboutUs';
import MyAccount from '../pages/MyAccount';

const Routes = () => {
    return {
        <RouterRoutes>
            <Route path='/' element={<Home />} />

        </RouterRoutes>
                



    };
};

export default Routes;